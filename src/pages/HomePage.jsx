import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Briefcase, Users, ArrowRight, ArrowLeft, Gamepad2, Coffee, PartyPopper, Sparkles, Zap } from 'lucide-react';
import { createRoom } from '../utils/firebase';
import { db } from '../lib/firebase';
import useAppStore from '../store/useAppStore';
import toast from 'react-hot-toast';

const HomePage = () => {
  const navigate = useNavigate();
  const { setUser, setRoom } = useAppStore();
  const [currentStep, setCurrentStep] = useState(1); // 1: 카테고리 선택, 2: 닉네임 입력
  const [selectedCategory, setSelectedCategory] = useState('');
  const [nickname, setNickname] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isFirestoreConnected, setIsFirestoreConnected] = useState(!!db);
  const [animationIndex, setAnimationIndex] = useState(0);

  // 애니메이션을 위한 이모지 순환
  const animatedEmojis = ['✨', '🎯', '💫', '🌟', '⭐', '🎉'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationIndex((prev) => (prev + 1) % animatedEmojis.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    {
      id: 'romantic',
      title: '💕 연인 궁합',
      description: '사랑하는 사람과의 심리적 궁합을 확인해보세요',
      icon: Heart,
      color: 'from-pink-400 to-red-400',
      textColor: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      hoverColor: 'hover:bg-pink-100',
      emoji: '💕',
      funFact: '사랑의 화학반응을 분석해드려요!'
    },
    {
      id: 'workplace',
      title: '🏢 직장 동료 궁합',
      description: '함께 일하는 동료들과의 협업 궁합을 알아보세요',
      icon: Briefcase,
      color: 'from-blue-400 to-indigo-400',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverColor: 'hover:bg-blue-100',
      emoji: '🏢',
      funFact: '최고의 팀워크를 위한 분석!'
    },
    {
      id: 'friendship',
      title: '👥 친구 궁합',
      description: '소중한 친구들과의 우정과 성향 궁합을 확인해보세요',
      icon: Users,
      color: 'from-green-400 to-emerald-400',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      hoverColor: 'hover:bg-green-100',
      emoji: '��',
      funFact: '진정한 우정의 깊이를 측정해요!'
    },
    {
      id: 'gaming',
      title: '🎮 게임 동료 궁합',
      description: '함께 게임하는 팀원들과의 플레이 스타일 궁합을 분석해보세요',
      icon: Gamepad2,
      color: 'from-purple-400 to-violet-400',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      hoverColor: 'hover:bg-purple-100',
      emoji: '🎮',
      funFact: '승리를 위한 최고의 조합!'
    }
  ];

  const handleCreateRoom = async () => {
    if (!nickname.trim()) {
      toast.error('닉네임을 입력해주세요.');
      return;
    }

    setIsCreating(true);
    try {
      const roomId = await createRoom(selectedCategory, nickname.trim());
      
      // 사용자 정보 저장
      setUser({
        nickname: nickname.trim(),
        roomId,
        isHost: true
      });

      // 방 정보 저장
      setRoom({
        id: roomId,
        category: selectedCategory,
        hostNickname: nickname.trim(),
        status: 'waiting'
      });

      if (isFirestoreConnected) {
        toast.success('🎉 방이 생성되었습니다!');
      } else {
        toast.success('🎯 Demo 모드로 방이 생성되었습니다! (Firestore 활성화 후 실제 기능 이용 가능)', { duration: 4000 });
      }
      navigate(`/room/${roomId}`);
    } catch (error) {
      toast.error('방 생성에 실패했습니다: ' + error.message);
    } finally {
      setIsCreating(false);
    }
  };

  const selectedCategoryInfo = categories.find(cat => cat.id === selectedCategory);

  // 카테고리 선택 단계
  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Users className="text-white text-6xl mr-4 animate-pulse" />
                <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
                  {animatedEmojis[animationIndex]}
                </div>
              </div>
              <h1 className="text-6xl font-bold text-white bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                Orisaii
              </h1>
            </div>
            <p className="text-xl text-white/90 mb-4">
              🧠 AI 심리학 기반 궁합 테스트로 더 깊은 관계를 만들어보세요
            </p>
            <div className="flex justify-center gap-4 text-white/70 text-sm">
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                <span>빠른 분석</span>
              </div>
              <div className="flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                <span>재미있는 결과</span>
              </div>
              <div className="flex items-center gap-1">
                <PartyPopper className="w-4 h-4" />
                <span>공유 가능</span>
              </div>
            </div>
          </div>

          {/* 메인 카드 */}
          <div className="card max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
              어떤 궁합을 확인하고 싶나요?
            </h2>
            <p className="text-center text-gray-600 mb-8">
              각각 다른 질문과 분석 방식으로 정확한 궁합을 측정해드려요!
            </p>

            {/* 카테고리 선택 */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {categories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <div
                    key={category.id}
                    className={`
                      relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl
                      ${selectedCategory === category.id 
                        ? `${category.borderColor} ${category.bgColor} shadow-lg scale-105` 
                        : `border-gray-200 hover:${category.borderColor} ${category.hoverColor} hover:shadow-md`
                      }
                    `}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setTimeout(() => setCurrentStep(2), 300);
                    }}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* 배경 이모지 */}
                    <div className="absolute top-2 right-2 text-4xl opacity-20">
                      {category.emoji}
                    </div>
                    
                    <div className={`inline-flex p-4 rounded-lg bg-gradient-to-r ${category.color} mb-4 shadow-md`}>
                      <IconComponent className="text-white text-3xl" />
                    </div>
                    <h3 className={`text-xl font-bold mb-3 ${category.textColor}`}>
                      {category.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {category.description}
                    </p>
                    <div className={`text-xs ${category.textColor} font-medium`}>
                      {category.funFact}
                    </div>
                    
                    {selectedCategory === category.id && (
                      <div className="absolute top-4 right-4">
                        <div className={`w-8 h-8 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center shadow-lg animate-pulse`}>
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      </div>
                    )}
                    
                    {/* 호버 효과 */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                );
              })}
            </div>

            {/* 안내 문구 */}
            <div className="mt-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200">
              {isFirestoreConnected ? (
                <div className="text-center">
                  <h3 className="font-bold text-gray-800 mb-2">🎯 게임 방법</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    1. 카테고리를 선택하고 방을 만들어보세요<br />
                    2. 친구들과 함께 설문을 풀어보세요 (최대 6명)<br />
                    3. AI가 분석한 재미있는 궁합 결과를 확인하세요!
                  </p>
                  <div className="flex justify-center gap-4 text-xs text-gray-500">
                    <span>⏱️ 약 3-5분 소요</span>
                    <span>🧠 AI 심리 분석</span>
                    <span>📱 결과 공유 가능</span>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-orange-600 font-medium mb-2">
                    🎯 현재 Demo 모드로 실행 중입니다
                  </p>
                  <p className="text-xs text-gray-600">
                    완전한 기능을 위해 Firebase Console에서 Firestore Database를 활성화하세요.<br />
                    Demo 모드에서도 모든 기능을 체험할 수 있습니다!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 닉네임 입력 및 방 생성 단계
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <Users className="text-white text-4xl mr-3 animate-pulse" />
            <h1 className="text-4xl font-bold text-white">Orisaii</h1>
          </div>
        </div>

        {/* 메인 카드 */}
        <div className="card">
          {/* 뒤로가기 버튼 */}
          <button
            onClick={() => setCurrentStep(1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors transform hover:scale-105"
          >
            <ArrowLeft className="text-lg" />
            <span className="text-sm">카테고리 다시 선택</span>
          </button>

          {/* 선택된 카테고리 표시 */}
          {selectedCategoryInfo && (
            <div className="text-center mb-6 relative">
              {/* 배경 장식 */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-50 to-transparent rounded-lg"></div>
              
              <div className="relative z-10 py-4">
                <div className={`inline-flex p-4 rounded-lg bg-gradient-to-r ${selectedCategoryInfo.color} mb-3 shadow-lg animate-bounce`}>
                  <selectedCategoryInfo.icon className="text-white text-3xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {selectedCategoryInfo.title}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  {selectedCategoryInfo.description}
                </p>
                <div className={`text-xs ${selectedCategoryInfo.textColor} font-medium`}>
                  {selectedCategoryInfo.funFact}
                </div>
              </div>
            </div>
          )}

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 text-center mb-6">
              닉네임을 입력하고 방을 만들어보세요 ✨
            </h3>

            {/* 닉네임 입력 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                닉네임
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="사용할 닉네임을 입력하세요"
                  className="input-field pr-10"
                  maxLength={12}
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateRoom()}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  {selectedCategoryInfo?.emoji}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                최대 12자까지 입력 가능합니다
              </p>
            </div>

            {/* 방 생성 버튼 */}
            <button
              onClick={handleCreateRoom}
              disabled={isCreating || !nickname.trim()}
              className={`
                btn-primary w-full flex items-center justify-center gap-2 transition-all duration-300
                ${!isCreating && nickname.trim() ? 'hover:shadow-lg transform hover:scale-105' : ''}
              `}
            >
              {isCreating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  방 생성 중...
                </>
              ) : (
                <>
                  <span className="text-xl">{selectedCategoryInfo?.emoji}</span>
                  방 만들기
                  <ArrowRight className="text-xl" />
                </>
              )}
            </button>

            {/* 안내 문구 */}
            <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-purple-50 rounded-lg">
              {isFirestoreConnected ? (
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    🎯 방을 만들면 고유한 초대 URL이 생성됩니다
                  </p>
                  <p className="text-xs text-gray-500">
                    친구들과 함께 설문을 풀고 궁합을 확인해보세요!
                  </p>
                  <div className="flex justify-center gap-4 mt-2 text-xs text-gray-500">
                    <span>⚡ 즉시 시작</span>
                    <span>🤝 최대 6명</span>
                    <span>📊 AI 분석</span>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-orange-600 font-medium mb-2">
                    🎯 현재 Demo 모드로 실행 중입니다
                  </p>
                  <p className="text-xs text-gray-600">
                    완전한 기능을 위해 Firebase Console에서 Firestore Database를 활성화하세요.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 