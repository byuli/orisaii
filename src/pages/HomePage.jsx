import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Briefcase, Users, ArrowRight, Wifi, WifiOff } from 'lucide-react';
import { createRoom } from '../utils/firebase';
import { db } from '../lib/firebase';
import useAppStore from '../store/useAppStore';
import toast from 'react-hot-toast';

const HomePage = () => {
  const navigate = useNavigate();
  const { setUser, setRoom } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [nickname, setNickname] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isFirestoreConnected, setIsFirestoreConnected] = useState(!!db);

  useEffect(() => {
    setIsFirestoreConnected(!!db);
  }, []);

  const categories = [
    {
      id: 'romantic',
      title: '연인 궁합',
      description: '사랑하는 사람과의 심리적 궁합을 확인해보세요',
      icon: Heart,
      color: 'from-pink-400 to-red-400',
      textColor: 'text-pink-600',
    },
    {
      id: 'workplace',
      title: '직장 동료 궁합',
      description: '함께 일하는 동료들과의 협업 궁합을 알아보세요',
      icon: Briefcase,
      color: 'from-blue-400 to-indigo-400',
      textColor: 'text-blue-600',
    }
  ];

  const handleCreateRoom = async () => {
    if (!selectedCategory) {
      toast.error('카테고리를 선택해주세요.');
      return;
    }
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
        toast.success('방이 생성되었습니다!');
      } else {
        toast.success('🎯 Demo 모드로 방이 생성되었습니다! (Firestore 활성화 후 실제 기능 이용 가능)');
      }
      navigate(`/room/${roomId}`);
    } catch (error) {
      toast.error('방 생성에 실패했습니다: ' + error.message);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Users className="text-white text-5xl mr-4" />
            <h1 className="text-5xl font-bold text-white">Orisaii</h1>
          </div>
          <p className="text-xl text-white/80 mb-4">
            심리학 기반 궁합 테스트로 더 깊은 관계를 만들어보세요
          </p>
          
          {/* 연결 상태 표시 */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {isFirestoreConnected ? (
              <>
                <Wifi className="text-green-400 text-lg" />
                <span className="text-green-400 text-sm font-medium">실시간 연결됨</span>
              </>
            ) : (
              <>
                <WifiOff className="text-yellow-400 text-lg" />
                <span className="text-yellow-400 text-sm font-medium">Demo 모드 (Firestore 비활성화)</span>
              </>
            )}
          </div>
        </div>

        {/* 메인 카드 */}
        <div className="card max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            어떤 궁합을 확인하고 싶나요?
          </h2>

          {/* 카테고리 선택 */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  className={`
                    relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200
                    ${selectedCategory === category.id 
                      ? 'border-primary-500 bg-primary-50 shadow-lg' 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }
                  `}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${category.color} mb-4`}>
                    <IconComponent className="text-white text-2xl" />
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${category.textColor}`}>
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {category.description}
                  </p>
                  {selectedCategory === category.id && (
                    <div className="absolute top-4 right-4">
                      <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 닉네임 입력 */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              닉네임
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="사용할 닉네임을 입력하세요"
              className="input-field"
              maxLength={12}
            />
            <p className="text-xs text-gray-500 mt-1">
              최대 12자까지 입력 가능합니다
            </p>
          </div>

          {/* 방 생성 버튼 */}
          <button
            onClick={handleCreateRoom}
            disabled={isCreating || !selectedCategory || !nickname.trim()}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {isCreating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                방 생성 중...
              </>
            ) : (
              <>
                방 만들기
                <ArrowRight className="text-xl" />
              </>
            )}
          </button>

          {/* 안내 문구 */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            {isFirestoreConnected ? (
              <p className="text-sm text-gray-600 text-center">
                방을 만들면 고유한 초대 URL이 생성됩니다.<br />
                친구들과 함께 퀴즈를 풀고 궁합을 확인해보세요! (최대 6명)
              </p>
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
};

export default HomePage; 