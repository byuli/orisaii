import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Share2, Download, Home, Heart, Users, Star, AlertTriangle, Trophy, Crown } from 'lucide-react';
import { getRoom, getResults, saveResults } from '../utils/firebase';
import { analyzeGroupCompatibility, getTraitDescription } from '../utils/compatibility';
import { getQuizByCategory } from '../data/quizData';
import useAppStore from '../store/useAppStore';
import toast from 'react-hot-toast';

const ResultPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { room, setRoom, setResults } = useAppStore();
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedView, setSelectedView] = useState('overview'); // 'overview', 'pairs', 'individuals'

  useEffect(() => {
    const initializeResults = async () => {
      try {
        // 기존 결과가 있는지 확인
        try {
          const existingResults = await getResults(roomId);
          if (existingResults.results) {
            setAnalysis(existingResults.results);
            setResults(existingResults.results);
            setIsLoading(false);
            return;
          }
        } catch (error) {
          // 기존 결과가 없으면 새로 분석
        }

        // 방 정보 가져오기
        const roomData = await getRoom(roomId);
        setRoom(roomData);

        // 모든 참가자가 퀴즈를 완료했는지 확인
        const allCompleted = roomData.participants.every(p => p.quizCompleted);
        if (!allCompleted) {
          toast.error('아직 모든 참가자가 퀴즈를 완료하지 않았습니다.');
          navigate(`/room/${roomId}`);
          return;
        }

        // 퀴즈 데이터 가져오기
        const quizData = getQuizByCategory(roomData.category);

        // 궁합 분석 수행
        const analysisResult = analyzeGroupCompatibility(
          roomData.participants,
          roomData.category,
          quizData
        );

        setAnalysis(analysisResult);
        setResults(analysisResult);

        // 결과를 Firebase에 저장
        await saveResults(roomId, analysisResult);

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
    const url = `${window.location.origin}/result/${roomId}`;
    try {
      await navigator.share({
        title: 'Orisaii 궁합 테스트 결과',
        text: '우리의 궁합 테스트 결과를 확인해보세요!',
        url: url
      });
    } catch (error) {
      // 웹 공유 API가 지원되지 않으면 클립보드에 복사
      navigator.clipboard.writeText(url);
      toast.success('결과 URL이 복사되었습니다!');
    }
  };

  const getCompatibilityColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600 bg-green-100';
    if (percentage >= 70) return 'text-blue-600 bg-blue-100';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-100';
    if (percentage >= 50) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <div className="text-white text-xl">결과를 분석하는 중...</div>
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
          <h1 className="text-4xl font-bold text-white mb-2">궁합 분석 결과</h1>
          <p className="text-white/80">
            {room.category === 'romantic' ? '연인 궁합' : '직장 동료 궁합'} 테스트
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={handleShare}
              className="btn-secondary flex items-center gap-2"
            >
              <Share2 className="text-lg" />
              공유하기
            </button>
            <button
              onClick={() => navigate('/')}
              className="btn-primary flex items-center gap-2"
            >
              <Home className="text-lg" />
              홈으로
            </button>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="card mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { key: 'overview', label: '전체 요약', icon: Star },
              { key: 'pairs', label: '상세 궁합', icon: Heart },
              { key: 'individuals', label: '개인 성향', icon: Users }
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
              <h2 className="text-2xl font-bold text-gray-800 mb-6">그룹 요약</h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">
                    {analysis.groupStats.averageCompatibility}%
                  </div>
                  <div className="text-gray-600">평균 궁합도</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {analysis.groupStats.mostCompatibleGroup.length}
                  </div>
                  <div className="text-gray-600">높은 궁합 조합</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">
                    {analysis.groupStats.potentialConflicts.length}
                  </div>
                  <div className="text-gray-600">주의 필요 조합</div>
                </div>
              </div>

              {/* 최고 궁합 */}
              {analysis.groupStats.bestMatch && (
                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="text-green-600" />
                    <h3 className="font-bold text-green-800">최고 궁합</h3>
                  </div>
                  <p className="text-green-700">
                    <span className="font-semibold">{analysis.groupStats.bestMatch.name1}</span>과{' '}
                    <span className="font-semibold">{analysis.groupStats.bestMatch.name2}</span>가{' '}
                    <span className="font-bold">{Math.round(analysis.groupStats.bestMatch.score * 100)}%</span>의 
                    궁합을 보여줍니다!
                  </p>
                </div>
              )}

              {/* 주의 필요 */}
              {analysis.groupStats.worstMatch && analysis.groupStats.worstMatch.score < 0.6 && (
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="text-orange-600" />
                    <h3 className="font-bold text-orange-800">개선 포인트</h3>
                  </div>
                  <p className="text-orange-700">
                    <span className="font-semibold">{analysis.groupStats.worstMatch.name1}</span>과{' '}
                    <span className="font-semibold">{analysis.groupStats.worstMatch.name2}</span>는 
                    서로 다른 성향을 가지고 있어요. 상호 이해와 소통이 중요할 것 같습니다.
                  </p>
                </div>
              )}
            </div>

            {/* 높은 궁합 조합들 */}
            {analysis.groupStats.mostCompatibleGroup.length > 0 && (
              <div className="card">
                <h3 className="text-xl font-bold text-gray-800 mb-4">환상의 조합 ✨</h3>
                <div className="space-y-3">
                  {analysis.groupStats.mostCompatibleGroup.slice(0, 3).map((pair, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <span className="font-medium">
                          {pair.person1} × {pair.person2}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">{pair.percentage}%</div>
                        <div className="text-sm text-green-700">{pair.level.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 상세 궁합 */}
        {selectedView === 'pairs' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">모든 조합 상세 분석</h2>
              
              <div className="space-y-4">
                {Object.values(analysis.pairCompatibility)
                  .sort((a, b) => b.percentage - a.percentage)
                  .map((pair, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                              {pair.person1[0]}
                            </div>
                            <Heart className="text-gray-400 text-sm" />
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-bold">
                              {pair.person2[0]}
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">
                              {pair.person1} × {pair.person2}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCompatibilityColor(pair.percentage)}`}>
                            {pair.percentage}%
                          </div>
                          <div className="text-sm text-gray-500 mt-1">{pair.level.text}</div>
                        </div>
                      </div>
                      
                      {/* 성향 비교 */}
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium text-gray-700 mb-1">{pair.person1}의 주요 성향</div>
                          <div className="space-y-1">
                            {analysis.individuals[pair.person1]?.traits.slice(0, 2).map((trait, i) => (
                              <div key={i} className="text-gray-600">
                                • {getTraitDescription(trait.trait, room.category)}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-700 mb-1">{pair.person2}의 주요 성향</div>
                          <div className="space-y-1">
                            {analysis.individuals[pair.person2]?.traits.slice(0, 2).map((trait, i) => (
                              <div key={i} className="text-gray-600">
                                • {getTraitDescription(trait.trait, room.category)}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* 개인 성향 */}
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
                        {person.isHost ? '방장' : '참가자'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-700">주요 성향</h4>
                    {person.traits.map((trait, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                          {i + 1}
                        </div>
                        <div className="flex-1">
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

        {/* 하단 안내 */}
        <div className="card mt-8 text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2">🎉 테스트 완료!</h3>
          <p className="text-gray-600 mb-4">
            이 결과는 심리학적 성향을 바탕으로 한 재미있는 분석입니다.<br />
            실제 관계에서는 소통과 이해가 가장 중요하다는 것을 잊지 마세요!
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            새로운 테스트 시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage; 