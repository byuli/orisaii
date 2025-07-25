import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Copy, Crown, Users, Play, UserPlus, Heart, Briefcase, ExternalLink, MessageCircle, Sparkles, Target, Coffee, Lightbulb, Timer } from 'lucide-react';
import { getRoom, joinRoom, subscribeToRoom, updateRoomStatus, sendChatMessage, subscribeToChatMessages } from '../utils/firebase';
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
  
  // 재미 요소들
  const [currentTip, setCurrentTip] = useState(0);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [waitingTime, setWaitingTime] = useState(0);
  const [showPrediction, setShowPrediction] = useState(false);

  // 채팅 스크롤 ref
  const chatContainerRef = useRef(null);

  // 재미있는 팁들
  const funTips = [
    { 
      emoji: "💡", 
      title: "궁합의 비밀", 
      content: "심리학에서 '유사성-매력 가설'에 따르면, 비슷한 성향을 가진 사람들이 더 좋은 관계를 유지한다고 해요!" 
    },
    { 
      emoji: "🎯", 
      title: "정직한 답변의 힘", 
      content: "가장 정확한 결과를 위해서는 '이상적인 나'가 아닌 '진짜 나'의 모습으로 답변해주세요!" 
    },
    { 
      emoji: "🌟", 
      title: "다양성의 가치", 
      content: "서로 다른 성향도 충분히 매력적이에요. 상호 보완하며 성장할 수 있답니다!" 
    },
    { 
      emoji: "🚀", 
      title: "첫 인상의 마법", 
      content: "연구에 따르면 사람들은 첫 7초 안에 상대방에 대한 인상을 결정한다고 해요!" 
    },
    { 
      emoji: "💫", 
      title: "케미의 과학", 
      content: "좋은 케미는 도파민, 세로토닌, 옥시토신 등의 호르몬이 균형있게 분비될 때 나타나요!" 
    },
    { 
      emoji: "🎪", 
      title: "재미있는 사실", 
      content: "우리 뇌는 하루에 약 35,000번의 결정을 내린다고 해요. 오늘 가장 중요한 선택은 무엇일까요?" 
    }
  ];

  // 예상 궁합 메시지들
  const predictionMessages = [
    "🔮 곧 놀라운 궁합 결과를 확인하게 될 거예요!",
    "⭐ 예상보다 훨씬 흥미로운 결과가 나올 것 같아요!",
    "💫 이미 팀워크가 좋아 보이는데요?",
    "🎯 각자의 개성이 어떻게 조화를 이룰지 기대돼요!",
    "✨ 서로의 다른 점이 오히려 장점이 될 수도 있어요!"
  ];

  // 대기 시간 측정
  useEffect(() => {
    const interval = setInterval(() => {
      setWaitingTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 팁 자동 변경
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % funTips.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);



  // 간단한 채팅 기능 (시뮬레이션)
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() && roomId && user.nickname) {
      try {
        await sendChatMessage(roomId, user.nickname, newMessage.trim());
        setNewMessage('');
      } catch (error) {
        console.error('메시지 전송 실패:', error);
        toast.error('메시지 전송에 실패했습니다.');
      }
    }
  };

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
          
          // 설문이 시작되면 설문 페이지로 이동
          if (roomData.status === 'survey') {
            navigate(`/survey/${roomId}`);
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

  useEffect(() => {
    if (roomId) {
      const unsubscribe = subscribeToChatMessages(roomId, (messages) => {
        setMessages(messages);
      });
      return () => unsubscribe();
    }
  }, [roomId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

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
      toast.success('방에 참여했습니다! 🎉');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsJoining(false);
    }
  };

  const handleCopyUrl = () => {
    const url = `${window.location.origin}/room/${roomId}`;
    navigator.clipboard.writeText(url);
    toast.success('초대 URL이 복사되었습니다! 📋');
  };

  const handleStartSurvey = async () => {
    try {
      // 방 상태를 'survey'로 변경
      await updateRoomStatus(roomId, 'survey');
      toast.success('설문이 시작됩니다! 🚀');
      navigate(`/survey/${roomId}`);
    } catch (error) {
      console.error('설문 시작 실패:', error);
      toast.error('설문 시작에 실패했습니다.');
    }
  };

  const getCategoryInfo = () => {
    if (room.category === 'romantic') {
      return {
        title: '연인 궁합',
        icon: Heart,
        color: 'text-pink-600',
        bgColor: 'bg-pink-50',
        gradient: 'from-pink-400 to-red-400'
      };
    } else {
      return {
        title: '직장 동료 궁합',
        icon: Briefcase,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        gradient: 'from-blue-400 to-indigo-400'
      };
    }
  };

  const formatWaitingTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <div className="text-white text-xl">로딩 중...</div>
        </div>
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
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700 text-center">
                참여 후 모든 참가자가 모이면 성향 설문을 진행하게 됩니다
              </p>
            </div>
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
  const participantCount = room.participants?.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🎉 Orisaii</h1>
          <div className="flex items-center justify-center text-white/80 mb-3">
            <IconComponent className="text-xl mr-2" />
            <span>{categoryInfo.title} 테스트</span>
          </div>
          
          {/* 대기 시간 표시 */}
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-3 py-1 rounded-full text-sm">
            <Timer className="w-4 h-4" />
            <span>대기 시간: {formatWaitingTime(waitingTime)}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* 메인 영역 */}
          <div className="lg:col-span-3 space-y-6">
            {/* 참가자 목록 */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Users className="text-xl" />
                  참가자 ({participantCount}/6)
                </h2>
                {participantCount >= 2 && isHost && (
                  <button
                    onClick={handleStartSurvey}
                    className="btn-primary flex items-center gap-2 animate-pulse"
                  >
                    <Play className="text-lg" />
                    설문 시작
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {room.participants?.map((participant, index) => (
                  <div key={index} className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border-l-4 border-primary-500 hover:shadow-md transition-all duration-300">
                    <div className={`w-12 h-12 bg-gradient-to-r ${categoryInfo.gradient} rounded-full flex items-center justify-center text-white font-bold text-lg mr-3 animate-pulse`}>
                      {participant.nickname[0].toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-800">
                          {participant.nickname}
                        </span>
                        {participant.isHost && (
                          <Crown className="text-yellow-500 text-lg animate-bounce" />
                        )}
                        {participant.nickname === user.nickname && (
                          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">나</span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        {participant.isHost ? '👑 방장' : '👥 참가자'}
                      </span>
                    </div>
                    <div className="text-green-500">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 상태 메시지 */}
              {participantCount >= 2 ? (
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="text-green-600" />
                    <span className="font-bold text-green-800">🎉 준비 완료!</span>
                  </div>
                  <p className="text-sm text-green-700">
                    {isHost ? (
                      '모든 준비가 끝났습니다! "설문 시작" 버튼을 눌러 궁합 분석을 시작하세요.'
                    ) : (
                      '모든 준비가 끝났습니다! 방장이 설문을 시작하면 성향 분석이 진행됩니다.'
                    )}
                  </p>
                  
                  {/* 예상 궁합 */}
                  <div className="mt-3 p-3 bg-white/50 rounded-lg">
                    <div className="text-sm text-green-600 mb-1">🔮 예상 궁합</div>
                    <div className="text-sm text-green-700">
                      {predictionMessages[Math.floor(Math.random() * predictionMessages.length)]}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="text-blue-600" />
                    <span className="font-bold text-blue-800">더 많은 친구가 필요해요!</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    아래 초대 URL을 공유해서 더 많은 친구들을 초대해보세요!
                    <br />
                    <span className="text-xs text-blue-600">최소 2명부터 궁합 분석이 가능합니다.</span>
                  </p>
                </div>
              )}
            </div>

            {/* 실시간 채팅 */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="text-primary-600" />
                <h3 className="text-lg font-bold text-gray-800">대기실 채팅</h3>
                <span className="text-xs bg-primary-100 text-primary-600 px-2 py-1 rounded-full">LIVE</span>
              </div>
              
              <div ref={chatContainerRef} className="h-32 bg-gray-50 rounded-lg p-3 mb-3 overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 text-sm">
                    💬 첫 메시지를 남겨보세요!
                  </div>
                ) : (
                  <div className="space-y-2">
                    {messages.map((message) => (
                      <div key={message.id} className="text-sm text-gray-800">
                        <span className="font-medium">{message.nickname}</span>
                        <span className="text-gray-400 text-xs ml-2">
                          {message.displayTime && message.displayTime instanceof Date ? 
                            message.displayTime.toLocaleTimeString('ko-KR', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            }) : 
                            new Date().toLocaleTimeString('ko-KR', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })
                          }
                        </span>
                        <div className="ml-2">{message.message}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="메시지를 입력하세요..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  maxLength={100}
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="btn-primary px-4"
                >
                  전송
                </button>
              </form>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 초대 URL */}
            <div className="card">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <ExternalLink className="w-5 h-5" />
                초대 URL
              </h3>
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="text"
                  value={`${window.location.origin}/room/${roomId}`}
                  readOnly
                  className="input-field text-sm"
                />
                <button
                  onClick={handleCopyUrl}
                  className="btn-secondary px-3 py-3 hover:bg-primary-600 hover:text-white transition-colors"
                  title="URL 복사"
                >
                  <Copy className="text-lg" />
                </button>
              </div>
              <p className="text-xs text-gray-500">
                📱 이 URL을 친구들에게 공유하세요
              </p>
            </div>

            {/* 재미있는 팁 */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="text-yellow-500" />
                <h3 className="text-lg font-bold text-gray-800">재미있는 팁</h3>
              </div>
              <div className="transition-all duration-500 ease-in-out">
                <div className="text-center mb-3">
                  <div className="text-4xl mb-2">{funTips[currentTip].emoji}</div>
                  <div className="font-semibold text-gray-800 mb-2">{funTips[currentTip].title}</div>
                  <div className="text-sm text-gray-600">{funTips[currentTip].content}</div>
                </div>
                <div className="flex justify-center gap-1">
                  {funTips.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentTip ? 'bg-primary-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>



            {/* 게임 방법 */}
            <div className="card">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Coffee className="text-orange-500" />
                게임 방법
              </h3>
              <ol className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="bg-primary-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                  친구들이 방에 참여할 때까지 기다려요
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                  모두 함께 성향 설문을 진행해요 (약 3-5분)
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                  AI가 궁합을 분석해드려요
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">4</span>
                  결과를 확인하고 친구들과 공유해요!
                </li>
              </ol>
            </div>

            {/* 알림 */}
            {!isHost && (
              <div className="card bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200">
                <h3 className="text-lg font-bold text-orange-800 mb-2">📢 알림</h3>
                <p className="text-sm text-orange-700">
                  방장이 설문을 시작하면 자동으로 설문 페이지로 이동됩니다.
                  잠시만 기다려주세요!
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