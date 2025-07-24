import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Copy, Crown, Users, Play, UserPlus, Heart, Briefcase, ExternalLink } from 'lucide-react';
import { getRoom, joinRoom, subscribeToRoom } from '../utils/firebase';
import useAppStore from '../store/useAppStore';
import toast from 'react-hot-toast';

const RoomPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user, room, setUser, setRoom } = useAppStore();
  const [joinNickname, setJoinNickname] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showJoinForm, setShowJoinForm] = useState(false);

  useEffect(() => {
    const initializeRoom = async () => {
      console.log('🏠 RoomPage 초기화 시작, roomId:', roomId);
      
      try {
        const roomData = await getRoom(roomId);
        console.log('🏠 방 데이터 조회 완료:', roomData);
        setRoom(roomData);
        
        // URL로 직접 접근한 경우 참여 폼 표시
        if (!user.nickname) {
          console.log('🏠 사용자 닉네임 없음, 참여 폼 표시');
          setShowJoinForm(true);
        }
      } catch (error) {
        console.error('🏠 방 초기화 실패:', error);
        toast.error('방을 찾을 수 없습니다.');
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    if (roomId) {
      console.log('🏠 roomId 존재, 초기화 진행:', roomId);
      initializeRoom();
    } else {
      console.error('🏠 roomId 없음');
      setIsLoading(false);
    }
  }, [roomId, navigate, setRoom, user.nickname]);

  useEffect(() => {
    if (roomId) {
      const unsubscribe = subscribeToRoom(roomId, (roomData) => {
        if (roomData) {
          setRoom(roomData);
          
          // 퀴즈가 시작되면 퀴즈 페이지로 이동
          if (roomData.status === 'quiz') {
            navigate(`/quiz/${roomId}`);
          }
          // 모든 사람이 완료하면 결과 페이지로 이동
          else if (roomData.status === 'completed') {
            navigate(`/result/${roomId}`);
          }
        }
      });

      return () => unsubscribe();
    }
  }, [roomId, setRoom, navigate]);

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    if (!joinNickname.trim()) {
      toast.error('닉네임을 입력해주세요.');
      return;
    }

    setIsJoining(true);
    try {
      await joinRoom(roomId, joinNickname.trim());
      setUser({
        nickname: joinNickname.trim(),
        roomId,
        isHost: false
      });
      setShowJoinForm(false);
      toast.success('방에 참여했습니다!');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsJoining(false);
    }
  };

  const handleCopyUrl = () => {
    const url = `${window.location.origin}/room/${roomId}`;
    navigator.clipboard.writeText(url);
    toast.success('초대 URL이 복사되었습니다!');
  };

  const handleStartQuiz = () => {
    navigate(`/quiz/${roomId}`);
  };

  const getCategoryInfo = () => {
    if (room.category === 'romantic') {
      return {
        title: '연인 궁합',
        icon: Heart,
        color: 'text-pink-600',
        bgColor: 'bg-pink-50'
      };
    } else {
      return {
        title: '직장 동료 궁합',
        icon: Briefcase,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50'
      };
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center">
        <div className="text-white text-xl">로딩 중...</div>
      </div>
    );
  }

  if (showJoinForm) {
    const categoryInfo = getCategoryInfo();
    const IconComponent = categoryInfo.icon;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
        <div className="card max-w-md mx-auto">
          <div className="text-center mb-6">
            <div className={`inline-flex p-3 rounded-lg ${categoryInfo.bgColor} mb-4`}>
              <IconComponent className={`text-3xl ${categoryInfo.color}`} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {categoryInfo.title} 테스트
            </h2>
            <p className="text-gray-600">
              호스트: <span className="font-semibold">{room.hostNickname}</span>
            </p>
          </div>

          <form onSubmit={handleJoinRoom}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                닉네임
              </label>
              <input
                type="text"
                value={joinNickname}
                onChange={(e) => setJoinNickname(e.target.value)}
                placeholder="사용할 닉네임을 입력하세요"
                className="input-field"
                maxLength={12}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isJoining}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isJoining ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  참여 중...
                </>
              ) : (
                <>
                  <UserPlus className="text-xl" />
                  방 참여하기
                </>
              )}
            </button>
          </form>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              현재 참여자: {room.participants?.length || 0}/6명
            </p>
          </div>
        </div>
      </div>
    );
  }

  const categoryInfo = getCategoryInfo();
  const IconComponent = categoryInfo.icon;
  const isHost = user.isHost;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Orisaii</h1>
          <div className="flex items-center justify-center text-white/80">
            <IconComponent className="text-xl mr-2" />
            <span>{categoryInfo.title} 테스트</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* 참가자 목록 */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Users className="text-xl" />
                  참가자 ({room.participants?.length || 0}/6)
                </h2>
                {room.participants?.length >= 2 && isHost && (
                  <button
                    onClick={handleStartQuiz}
                    className="btn-primary flex items-center gap-2"
                  >
                    <Play className="text-lg" />
                    퀴즈 시작
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {room.participants?.map((participant, index) => (
                  <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                      {participant.nickname[0].toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-800">
                          {participant.nickname}
                        </span>
                        {participant.isHost && (
                          <Crown className="text-yellow-500 text-lg" />
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        {participant.isHost ? '방장' : '참가자'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {(room.participants?.length || 0) < 6 && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700 text-center">
                    더 많은 친구들을 초대해보세요! 아래 초대 URL을 공유하세요.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 초대 URL */}
            <div className="card">
              <h3 className="text-lg font-bold text-gray-800 mb-4">초대 URL</h3>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={`${window.location.origin}/room/${roomId}`}
                  readOnly
                  className="input-field text-sm"
                />
                <button
                  onClick={handleCopyUrl}
                  className="btn-secondary px-3 py-3"
                  title="URL 복사"
                >
                  <Copy className="text-lg" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                이 URL을 친구들에게 공유하세요
              </p>
            </div>

            {/* 게임 규칙 */}
            <div className="card">
              <h3 className="text-lg font-bold text-gray-800 mb-4">게임 방법</h3>
              <ol className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="bg-primary-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                  친구들이 방에 참여할 때까지 기다려요
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                  모두 함께 심리 테스트를 진행해요
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                  궁합 결과를 확인하고 공유해요
                </li>
              </ol>
            </div>

            {/* 주의사항 */}
            {!isHost && (
              <div className="card">
                <h3 className="text-lg font-bold text-gray-800 mb-4">알림</h3>
                <p className="text-sm text-gray-600">
                  방장이 퀴즈를 시작하면 자동으로 퀴즈 페이지로 이동됩니다.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPage; 