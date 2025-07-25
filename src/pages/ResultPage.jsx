import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Share2, Download, Home, Heart, Users, Star, AlertTriangle, Trophy, Crown, BarChart3, Target, Lightbulb, Award, Zap, Sparkles, Camera, Gift } from 'lucide-react';
import { getRoom, getResults, saveResults } from '../utils/firebase';
import { analyzeGroupCompatibility, getTraitDescription, getCategoryName } from '../utils/compatibility';
import { getQuizByCategory, compatibilityTypes } from '../data/quizData';
import useAppStore from '../store/useAppStore';
import toast from 'react-hot-toast';

const ResultPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { room, setRoom, setResults } = useAppStore();
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedView, setSelectedView] = useState('overview');
  const [showShareCard, setShowShareCard] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [funFacts, setFunFacts] = useState([]);

  // 재미있는 별명 생성기
  const generateFunNickname = (person1, person2, percentage) => {
    const types = compatibilityTypes[room.category] || compatibilityTypes.romantic;
    
    // 궁합도에 따른 별명 찾기
    let nickname = null;
    for (let threshold of [95, 90, 85, 80, 75, 70, 65, 60, 55, 50]) {
      if (percentage >= threshold) {
        nickname = types[threshold];
        break;
      }
    }
    
    if (!nickname) {
      nickname = { nickname: "미지의 조합 🔍", description: "예상치 못한 케미!" };
    }
    
    return nickname;
  };

  // 성취 배지 시스템
  const calculateAchievements = (analysisData) => {
    const achievements = [];
    const pairCompatibilities = Object.values(analysisData.pairCompatibility);
    
    // 최고 궁합 배지
    const maxCompatibility = Math.max(...pairCompatibilities.map(p => p.percentage));
    if (maxCompatibility >= 95) {
      achievements.push({ 
        id: 'perfect_match', 
        title: '완벽한 궁합', 
        emoji: '💫', 
        description: '95% 이상의 완벽한 궁합을 달성했어요!',
        rarity: 'legendary'
      });
    } else if (maxCompatibility >= 90) {
      achievements.push({ 
        id: 'great_match', 
        title: '환상의 조합', 
        emoji: '⭐', 
        description: '90% 이상의 환상적인 궁합이에요!',
        rarity: 'epic'
      });
    }

    // 그룹 하모니 배지
    if (analysisData.groupStats.averageCompatibility >= 80) {
      achievements.push({ 
        id: 'group_harmony', 
        title: '그룹 하모니', 
        emoji: '🎵', 
        description: '전체 평균 궁합이 80% 이상이에요!',
        rarity: 'rare'
      });
    }

    // 다양성 배지
    const traitVariety = analysisData.groupStats.traitDistribution?.length || 0;
    if (traitVariety >= 8) {
      achievements.push({ 
        id: 'diversity_champion', 
        title: '다양성 챔피언', 
        emoji: '🌈', 
        description: '8가지 이상의 다양한 성향을 보여줬어요!',
        rarity: 'rare'
      });
    }

    // 팀워크 배지
    const collaborativeCount = Object.values(analysisData.individuals).filter(
      p => p.traits.some(t => t.trait.includes('collaborative') || t.trait.includes('team'))
    ).length;
    if (collaborativeCount >= 3) {
      achievements.push({ 
        id: 'teamwork_master', 
        title: '팀워크 마스터', 
        emoji: '🤝', 
        description: '3명 이상이 협력적인 성향을 보였어요!',
        rarity: 'common'
      });
    }

    return achievements;
  };

  // 재미있는 사실 생성
  const generateFunFacts = (analysisData) => {
    const facts = [];
    const individuals = Object.values(analysisData.individuals);
    const pairCompatibilities = Object.values(analysisData.pairCompatibility);
    
    // 성향 관련 사실
    const dominantTraits = analysisData.groupStats.traitDistribution?.slice(0, 3) || [];
    if (dominantTraits.length > 0) {
      facts.push({
        emoji: '🎯',
        title: '주요 성향',
        content: `이 그룹의 가장 흔한 성향은 "${dominantTraits[0].description}"이에요! ${dominantTraits[0].count}명이 이런 특성을 보였습니다.`
      });
    }

    // 궁합 관련 사실
    const perfectPairs = pairCompatibilities.filter(p => p.percentage >= 90).length;
    if (perfectPairs > 0) {
      facts.push({
        emoji: '💕',
        title: '완벽한 조합',
        content: `무려 ${perfectPairs}개의 조합이 90% 이상의 완벽한 궁합을 보였어요!`
      });
    }

    // 대조적인 조합
    const contrastPairs = pairCompatibilities.filter(p => p.percentage < 60).length;
    if (contrastPairs > 0) {
      facts.push({
        emoji: '⚡',
        title: '대조의 미학',
        content: `${contrastPairs}개의 조합은 서로 다른 성향으로 흥미로운 케미를 만들어냈어요!`
      });
    }

    // 그룹 크기별 사실
    const groupSize = individuals.length;
    facts.push({
      emoji: '👥',
      title: '그룹 분석',
      content: `${groupSize}명의 그룹에서 총 ${pairCompatibilities.length}가지 조합을 분석했어요!`
    });

    return facts;
  };

  // 공유용 카드 생성
  const generateShareCard = () => {
    if (!analysis) return null;
    
    const bestMatch = analysis.groupStats.bestMatch;
    const avgCompatibility = analysis.groupStats.averageCompatibility;
    
    return {
      title: `${room.category === 'romantic' ? '💕 연인 궁합' : '🏢 직장 궁합'} 테스트 결과`,
      subtitle: `${Object.keys(analysis.individuals).length}명의 궁합 분석 완료!`,
      highlight: bestMatch ? `최고 궁합: ${bestMatch.name1} × ${bestMatch.name2} (${Math.round(bestMatch.score * 100)}%)` : '',
      average: `평균 궁합도: ${avgCompatibility}%`,
      nickname: bestMatch ? generateFunNickname(bestMatch.name1, bestMatch.name2, Math.round(bestMatch.score * 100)).nickname : '',
      url: `${window.location.origin}/result/${roomId}`
    };
  };

  useEffect(() => {
    const initializeResults = async () => {
      try {
        // 기존 결과가 있는지 확인
        try {
          const existingResults = await getResults(roomId);
          if (existingResults.results) {
            setAnalysis(existingResults.results);
            setResults(existingResults.results);
            
            // 성취와 재미있는 사실 계산
            const newAchievements = calculateAchievements(existingResults.results);
            const newFunFacts = generateFunFacts(existingResults.results);
            setAchievements(newAchievements);
            setFunFacts(newFunFacts);
            
            setIsLoading(false);
            return;
          }
        } catch (error) {
          // 기존 결과가 없으면 새로 분석
        }

        // 방 정보 가져오기
        const roomData = await getRoom(roomId);
        setRoom(roomData);

        // 모든 참가자가 설문을 완료했는지 확인
        const allCompleted = roomData.participants.every(p => p.surveyCompleted || p.quizCompleted);
        if (!allCompleted) {
          toast.error('아직 모든 참가자가 설문을 완료하지 않았습니다.');
          navigate(`/room/${roomId}`);
          return;
        }

        // 설문 데이터 가져오기
        const quizData = getQuizByCategory(roomData.category);

        // 궁합 분석 수행
        const analysisResult = analyzeGroupCompatibility(
          roomData.participants,
          roomData.category,
          quizData
        );

        setAnalysis(analysisResult);
        setResults(analysisResult);

        // 성취와 재미있는 사실 계산
        const newAchievements = calculateAchievements(analysisResult);
        const newFunFacts = generateFunFacts(analysisResult);
        setAchievements(newAchievements);
        setFunFacts(newFunFacts);

        // 결과를 Firebase에 저장
        await saveResults(roomId, analysisResult);

        // 성취 알림
        if (newAchievements.length > 0) {
          toast.success(`🏆 ${newAchievements.length}개의 성취를 달성했습니다!`, { duration: 4000 });
        }

      } catch (error) {
        console.error('결과 분석 오류:', error);
        toast.error('결과를 불러올 수 없습니다.');
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    if (roomId) {
      initializeResults();
    }
  }, [roomId, navigate, setRoom, setResults]);

  const handleShare = async () => {
    const shareCard = generateShareCard();
    const shareText = `${shareCard.title}\n\n${shareCard.highlight}\n${shareCard.average}\n\n${shareCard.url}`;
    
    try {
      await navigator.share({
        title: shareCard.title,
        text: shareText,
        url: shareCard.url
      });
    } catch (error) {
      // 웹 공유 API가 지원되지 않으면 클립보드에 복사
      navigator.clipboard.writeText(shareText);
      toast.success('결과가 클립보드에 복사되었습니다! 📋');
    }
  };

  const handleShareCard = () => {
    setShowShareCard(true);
  };

  const getCompatibilityColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600 bg-green-100';
    if (percentage >= 70) return 'text-blue-600 bg-blue-100';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-100';
    if (percentage >= 50) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'epic': return 'from-purple-400 to-pink-500';
      case 'rare': return 'from-blue-400 to-indigo-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <div className="text-white text-xl">🧠 AI가 궁합을 분석하는 중...</div>
          <div className="text-white/60 text-sm mt-2">잠시만 기다려주세요</div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center">
        <div className="text-white text-xl">결과를 불러올 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🎉 궁합 분석 결과 
          </h1>
          <p className="text-white/80 mb-4">
            {room.category === 'romantic' ? '💕 연인 궁합' : '🏢 직장 동료 궁합'} 테스트
          </p>
          
          {/* 성취 배지 표시 */}
          {achievements.length > 0 && (
            <div className="flex justify-center gap-2 mb-4">
              {achievements.slice(0, 3).map((achievement, index) => (
                <div
                  key={achievement.id}
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm bg-gradient-to-r ${getRarityColor(achievement.rarity)} animate-pulse`}
                  title={achievement.description}
                >
                  <span>{achievement.emoji}</span>
                  <span>{achievement.title}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={handleShare}
              className="btn-secondary flex items-center gap-2 hover:bg-white hover:text-purple-600 transition-all"
            >
              <Share2 className="text-lg" />
              결과 공유
            </button>
            <button
              onClick={handleShareCard}
              className="btn-primary flex items-center gap-2"
            >
              <Camera className="text-lg" />
              카드 생성
            </button>
            <button
              onClick={() => navigate('/')}
              className="btn-secondary flex items-center gap-2 hover:bg-white hover:text-purple-600 transition-all"
            >
              <Home className="text-lg" />
              새 테스트
            </button>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="card mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { key: 'overview', label: '🏆 전체 요약', icon: Star },
              { key: 'pairs', label: '💕 상세 궁합', icon: Heart },
              { key: 'individuals', label: '👤 개인 성향', icon: Users },
              { key: 'achievements', label: '🎖️ 성취', icon: Award },
              { key: 'insights', label: '📊 심층 분석', icon: BarChart3 }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setSelectedView(key)}
                className={`
                  flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-all
                  ${selectedView === key
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                <Icon className="text-lg" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 전체 요약 */}
        {selectedView === 'overview' && (
          <div className="space-y-6">
            {/* 그룹 통계 */}
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Trophy className="text-yellow-500" />
                그룹 요약
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {analysis.groupStats.averageCompatibility}%
                  </div>
                  <div className="text-gray-600">평균 궁합도</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {analysis.groupStats.averageCompatibility >= 80 ? '🌟 환상적!' : 
                     analysis.groupStats.averageCompatibility >= 70 ? '👍 좋음' : 
                     analysis.groupStats.averageCompatibility >= 60 ? '😊 괜찮음' : '🤔 개선 필요'}
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {analysis.groupStats.mostCompatibleGroup.length}
                  </div>
                  <div className="text-gray-600">환상의 조합</div>
                  <div className="text-xs text-gray-500 mt-1">90% 이상 궁합</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {analysis.groupStats.potentialConflicts.length}
                  </div>
                  <div className="text-gray-600">개선 필요</div>
                  <div className="text-xs text-gray-500 mt-1">60% 미만 궁합</div>
                </div>
              </div>

              {/* 최고 궁합 */}
              {analysis.groupStats.bestMatch && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 mb-4 border border-green-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Trophy className="text-green-600 text-2xl" />
                    <h3 className="font-bold text-green-800 text-xl">최고 궁합 듀오</h3>
                    <Sparkles className="text-yellow-500 animate-pulse" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700 mb-2">
                      {analysis.groupStats.bestMatch.name1} × {analysis.groupStats.bestMatch.name2}
                    </div>
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {Math.round(analysis.groupStats.bestMatch.score * 100)}%
                    </div>
                    <div className="text-lg text-green-700 font-medium">
                      {generateFunNickname(
                        analysis.groupStats.bestMatch.name1,
                        analysis.groupStats.bestMatch.name2,
                        Math.round(analysis.groupStats.bestMatch.score * 100)
                      ).nickname}
                    </div>
                    <div className="text-sm text-green-600 mt-2">
                      {generateFunNickname(
                        analysis.groupStats.bestMatch.name1,
                        analysis.groupStats.bestMatch.name2,
                        Math.round(analysis.groupStats.bestMatch.score * 100)
                      ).description}
                    </div>
                  </div>
                </div>
              )}

              {/* 재미있는 사실들 */}
              {funFacts.length > 0 && (
                <div className="grid md:grid-cols-2 gap-4">
                  {funFacts.map((fact, index) => (
                    <div key={index} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{fact.emoji}</span>
                        <h4 className="font-bold text-purple-800">{fact.title}</h4>
                      </div>
                      <p className="text-sm text-purple-700">{fact.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 상세 궁합 */}
        {selectedView === 'pairs' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">💕 모든 조합 상세 분석</h2>
              
              <div className="space-y-4">
                {Object.values(analysis.pairCompatibility)
                  .sort((a, b) => b.percentage - a.percentage)
                  .map((pair, index) => {
                    const nickname = generateFunNickname(pair.person1, pair.person2, pair.percentage);
                    return (
                      <div key={index} className="border rounded-lg p-6 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                {pair.person1[0]}
                              </div>
                              <Heart className="text-red-400 text-xl animate-pulse" />
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                {pair.person2[0]}
                              </div>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-800 text-lg">
                                {pair.person1} × {pair.person2}
                              </div>
                              <div className="text-sm text-purple-600 font-medium">
                                {nickname.nickname}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-bold ${getCompatibilityColor(pair.percentage)}`}>
                              {pair.percentage}%
                            </div>
                            <div className="text-sm text-gray-500 mt-1">{pair.level.text}</div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-center text-sm text-gray-600 mb-2">
                            {nickname.description}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}

        {/* 개인 성향 - 기존 코드 유지 */}
        {selectedView === 'individuals' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {Object.values(analysis.individuals).map((person, index) => (
                <div key={index} className="card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {person.nickname[0].toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        {person.nickname}
                        {person.isHost && <Crown className="text-yellow-500" />}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {person.isHost ? '👑 방장' : '👥 참가자'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-700">🎯 주요 성향</h4>
                    {person.traits.slice(0, 3).map((trait, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-700 mb-1">
                            {getCategoryName(trait.category)}
                          </div>
                          <div className="text-sm text-gray-600">
                            {getTraitDescription(trait.trait, room.category)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 성취 탭 */}
        {selectedView === 'achievements' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Award className="text-yellow-500" />
                달성한 성취 ({achievements.length}개)
              </h2>
              
              {achievements.length === 0 ? (
                <div className="text-center py-12">
                  <Gift className="text-gray-400 text-6xl mx-auto mb-4" />
                  <div className="text-gray-500">이번에는 특별한 성취가 없었어요</div>
                  <div className="text-sm text-gray-400 mt-2">다음번에는 더 흥미로운 결과를 기대해보세요!</div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={achievement.id}
                      className={`p-6 rounded-lg bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white`}
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-3">{achievement.emoji}</div>
                        <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                        <p className="text-sm opacity-90">{achievement.description}</p>
                        <div className="mt-3">
                          <span className="text-xs px-2 py-1 bg-white/20 rounded-full">
                            {achievement.rarity === 'legendary' ? '전설' :
                             achievement.rarity === 'epic' ? '에픽' :
                             achievement.rarity === 'rare' ? '희귀' : '일반'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 심층 분석 - 기존 코드 유지하되 간소화 */}
        {selectedView === 'insights' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <BarChart3 className="text-primary-600" />
                심층 분석 리포트
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-bold text-blue-800 mb-2">📈 궁합 분포</h3>
                  <div className="space-y-2">
                    {[
                      { range: '90-100%', label: '완벽한 궁합', count: Object.values(analysis.pairCompatibility).filter(p => p.percentage >= 90).length },
                      { range: '80-89%', label: '환상의 조합', count: Object.values(analysis.pairCompatibility).filter(p => p.percentage >= 80 && p.percentage < 90).length },
                      { range: '70-79%', label: '좋은 궁합', count: Object.values(analysis.pairCompatibility).filter(p => p.percentage >= 70 && p.percentage < 80).length },
                      { range: '60-69%', label: '괜찮은 궁합', count: Object.values(analysis.pairCompatibility).filter(p => p.percentage >= 60 && p.percentage < 70).length }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.label}</span>
                        <span className="font-bold">{item.count}개</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-bold text-green-800 mb-2">💡 개선 제안</h3>
                  <div className="text-sm text-green-700 space-y-2">
                    {analysis.groupStats.averageCompatibility >= 80 ? (
                      <p>🎉 환상적인 팀워크! 서로의 강점을 더욱 살려보세요.</p>
                    ) : analysis.groupStats.averageCompatibility >= 60 ? (
                      <p>👍 좋은 균형감! 서로 다른 성향을 이해하고 존중하면 더욱 발전할 수 있어요.</p>
                    ) : (
                      <p>💪 소통이 핵심! 적극적인 소통과 상호 이해를 통해 더 좋은 관계를 만들어보세요.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 공유 카드 모달 */}
        {showShareCard && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">📸 공유 카드</h3>
                <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-6 rounded-lg mb-4">
                  <h4 className="text-lg font-bold mb-2">
                    {room.category === 'romantic' ? '💕 연인 궁합' : '🏢 직장 궁합'} 테스트
                  </h4>
                  <div className="text-sm mb-2">
                    {Object.keys(analysis.individuals).length}명 참여
                  </div>
                  <div className="text-2xl font-bold mb-2">
                    평균 궁합도: {analysis.groupStats.averageCompatibility}%
                  </div>
                  {analysis.groupStats.bestMatch && (
                    <div className="text-sm">
                      최고 궁합: {analysis.groupStats.bestMatch.name1} × {analysis.groupStats.bestMatch.name2}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowShareCard(false)}
                    className="flex-1 btn-secondary"
                  >
                    닫기
                  </button>
                  <button
                    onClick={() => {
                      handleShare();
                      setShowShareCard(false);
                    }}
                    className="flex-1 btn-primary"
                  >
                    공유하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 하단 안내 */}
        <div className="card mt-8 text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2">🎊 분석 완료!</h3>
          <p className="text-gray-600 mb-4">
            총 {Object.values(analysis.individuals).length}명이 참여한 {Object.keys(analysis.pairCompatibility).length}개 조합을 분석한 결과입니다.<br />
            심리학적 성향을 바탕으로 한 재미있는 분석이니, 실제 관계에서는 소통과 이해가 가장 중요하다는 것을 잊지 마세요! ✨
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleShare}
              className="btn-secondary flex-1 max-w-xs"
            >
              📱 결과 공유하기
            </button>
            <button
              onClick={() => navigate('/')}
              className="btn-primary flex-1 max-w-xs"
            >
              🎯 새로운 분석 시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage; 