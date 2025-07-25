import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Users, Zap, Star, Trophy, Heart } from 'lucide-react';
import { getRoom, saveSurveyAnswers, subscribeToRoom } from '../utils/firebase';
import { getSurveyByCategory } from '../data/surveyData';
import useAppStore from '../store/useAppStore';
import toast from 'react-hot-toast';

const SurveyPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user, room, survey, setRoom, setSurveyAnswer, nextQuestion, completeSurvey } = useAppStore();
  
  // currentQuestionIndex를 useRef로 관리하여 중복 업데이트 방지
  const currentQuestionIndexRef = useRef(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [surveyData, setSurveyData] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());
  const [showFeedback, setShowFeedback] = useState(false);
  const [streak, setStreak] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showParticipantProgress, setShowParticipantProgress] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const [isProcessingAnswer, setIsProcessingAnswer] = useState(false);
  const [processedQuestions, setProcessedQuestions] = useState(new Set());

  // 안전한 질문 인덱스 변경 함수
  const moveToNextQuestion = () => {
    const currentIndex = currentQuestionIndexRef.current;
    const nextIndex = Math.min(currentIndex + 1, surveyData.length - 1);
    
    console.log('🔄 moveToNextQuestion 호출:', { 
      currentIndex, 
      nextIndex, 
      surveyDataLength: surveyData.length 
    });
    
    if (nextIndex !== currentIndex) {
      currentQuestionIndexRef.current = nextIndex;
      setCurrentQuestionIndex(nextIndex);
      console.log('✅ 질문 인덱스 업데이트 완료:', nextIndex);
    } else {
      console.log('⚠️ 인덱스 변경 없음 (이미 마지막 질문)');
    }
  };

  // ref와 state 동기화
  useEffect(() => {
    currentQuestionIndexRef.current = currentQuestionIndex;
  }, [currentQuestionIndex]);

  // 재미있는 피드백 메시지들
  const feedbackMessages = [
    { text: "좋은 선택이에요! 🎯", emoji: "🎯", color: "text-green-600" },
    { text: "흥미로운 답변이네요! ⭐", emoji: "⭐", color: "text-blue-600" },
    { text: "오~ 개성있는 선택! 💫", emoji: "💫", color: "text-purple-600" },
    { text: "재미있어요! 😄", emoji: "😄", color: "text-orange-600" },
    { text: "센스있는 답변! ✨", emoji: "✨", color: "text-pink-600" },
    { text: "이런 선택도 있군요! 🤔", emoji: "🤔", color: "text-indigo-600" },
    { text: "독특한 스타일이네요! 🌟", emoji: "🌟", color: "text-yellow-600" },
    { text: "멋진 답변! 👍", emoji: "👍", color: "text-green-600" }
  ];

  // 스피드 보너스 메시지
  const speedMessages = [
    { text: "번개같은 속도! ⚡", time: 3000 },
    { text: "빠른 결정력! 🚀", time: 5000 },
    { text: "신중한 선택! 🎯", time: 10000 }
  ];

  // 로딩 timeout 설정
  useEffect(() => {
    const timeout = setTimeout(() => {
      if ((!room.id || surveyData.length === 0) && !loadingTimeout) {
        console.warn('⏰ 로딩 타임아웃 발생');
        setLoadingTimeout(true);
      }
    }, 10000); // 10초 후 타임아웃

    return () => clearTimeout(timeout);
  }, [room.id, surveyData.length, loadingTimeout]);

  // currentQuestionIndex 범위 안전장치
  useEffect(() => {
    if (surveyData.length > 0 && currentQuestionIndex >= surveyData.length) {
      console.warn('⚠️ 질문 인덱스 범위 초과, 마지막 질문으로 조정:', currentQuestionIndex, '→', surveyData.length - 1);
      setCurrentQuestionIndex(surveyData.length - 1);
    }
  }, [currentQuestionIndex, surveyData.length]);

  // currentQuestionIndex 변경 추적 (디버깅용)
  useEffect(() => {
    console.log('📍 currentQuestionIndex 변경됨:', currentQuestionIndex, 
      `(질문: ${currentQuestionIndex + 1}/${surveyData.length})`);
  }, [currentQuestionIndex, surveyData.length]);

  useEffect(() => {
    console.log('🔍 SurveyPage useEffect 시작');
    console.log('📍 roomId from URL:', roomId);
    console.log('📍 current room.id:', room.id);
    console.log('📍 current room:', room);

    const initializeSurvey = async () => {
      try {
        if (!roomId) {
          console.error('❌ roomId가 없습니다!');
          toast.error('방 ID가 없습니다.');
          navigate('/');
          return;
        }

        if (!room.id) {
          console.log('🔄 방 데이터 로드 중...');
          const roomData = await getRoom(roomId);
          if (!roomData) {
            console.error('❌ 방 데이터를 찾을 수 없습니다');
            toast.error('방을 찾을 수 없습니다.');
            navigate('/');
            return;
          }
          console.log('✅ 방 데이터 로드됨:', roomData);
          setRoom(roomData);
          const surveyQuestions = getSurveyByCategory(roomData.category);
          console.log('📝 설문 카테고리:', roomData.category, '질문 개수:', surveyQuestions?.length);
          if (!surveyQuestions || surveyQuestions.length === 0) {
            console.error('❌ 설문 데이터를 찾을 수 없습니다');
            toast.error('설문 데이터를 찾을 수 없습니다.');
            navigate('/');
            return;
          }
          setSurveyData(surveyQuestions);
          console.log('✅ 설문 데이터 설정 완료');
          console.log('📊 설문 상세 정보:', {
            category: roomData.category,
            totalQuestions: surveyQuestions.length,
            questionIds: surveyQuestions.map(q => q.id),
            firstQuestion: surveyQuestions[0]?.question,
            lastQuestion: surveyQuestions[surveyQuestions.length - 1]?.question
          });
        } else {
          console.log('🔄 기존 방 데이터로 설문 로드 중...');
          const surveyQuestions = getSurveyByCategory(room.category);
          console.log('📝 설문 카테고리:', room.category, '질문 개수:', surveyQuestions?.length);
          if (!surveyQuestions || surveyQuestions.length === 0) {
            console.error('❌ 설문 데이터를 찾을 수 없습니다');
            toast.error('설문 데이터를 찾을 수 없습니다.');
            navigate('/');
            return;
          }
          setSurveyData(surveyQuestions);
          console.log('✅ 설문 데이터 설정 완료');
          console.log('📊 설문 상세 정보:', {
            category: room.category,
            totalQuestions: surveyQuestions.length,
            questionIds: surveyQuestions.map(q => q.id),
            firstQuestion: surveyQuestions[0]?.question,
            lastQuestion: surveyQuestions[surveyQuestions.length - 1]?.question
          });
        }
        setStartTime(Date.now());
        console.log('✅ 설문 초기화 완료');
      } catch (error) {
        console.error('❌ 설문 초기화 오류:', error);
        toast.error('설문을 불러올 수 없습니다.');
        navigate('/');
      }
    };

    // roomId가 있고, 아직 초기화되지 않았을 때만 실행
    if (roomId && (!room.id || surveyData.length === 0)) {
      initializeSurvey();
    }
  }, [roomId]); // roomId만 의존성으로 설정

  useEffect(() => {
    if (roomId) {
      const unsubscribe = subscribeToRoom(roomId, (roomData) => {
        if (roomData) {
          setRoom(roomData);
          
          // 모든 사람이 완료하면 결과 페이지로 이동
          if (roomData.status === 'completed') {
            navigate(`/result/${roomId}`);
          }
        }
      });

      return () => unsubscribe();
    }
  }, [roomId, setRoom, navigate]);

  // 현재 사용자의 답변 상태 확인
  const currentParticipant = room.participants?.find(p => p.nickname === user.nickname);
  const hasSurveyCompleted = currentParticipant?.surveyCompleted || false;

  const currentQuestion = surveyData[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === surveyData.length - 1;
  const totalQuestions = surveyData.length;

  // 디버깅 로그 추가 (문제 상황에서만)
  if (!currentQuestion && surveyData.length > 0) {
    console.log('📊 문제 상황 디버깅:', {
      'room.id': room.id,
      'surveyData.length': surveyData.length,
      'currentQuestionIndex': currentQuestionIndex,
      'currentQuestion': currentQuestion ? '존재함' : '없음',
      'hasSurveyCompleted': hasSurveyCompleted,
      'user.nickname': user.nickname,
      'currentParticipant': currentParticipant ? '찾음' : '못찾음'
    });
  }

  // 재미있는 피드백 표시 함수
  const showAnswerFeedback = (answer) => {
    const randomFeedback = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];
    const answerTime = Date.now() - startTime;
    const speedFeedback = speedMessages.find(s => answerTime <= s.time);
    
    setShowFeedback({ 
      ...randomFeedback, 
      speed: speedFeedback?.text,
      time: answerTime 
    });
    
    // 연속 답변 카운트
    setStreak(prev => prev + 1);
    setTotalTime(prev => prev + answerTime);
    setStartTime(Date.now());

    // 효과음 시뮬레이션 제거 (빠른 진행을 위해)
    // if (answerTime <= 3000) {
    //   toast.success('⚡ 번개 같은 속도!', { duration: 1000 });
    // }

    setTimeout(() => setShowFeedback(false), 500);
  };

  const handleAnswerSelect = (answer, option) => {
    // 안전장치: 이미 제출 중이거나 설문이 완료되었거나 답변 처리 중이면 무시
    if (isSubmitting || hasSurveyCompleted || isProcessingAnswer) {
      console.log('⚠️ 답변 선택 무시 - 이미 처리 중:', { 
        isSubmitting, 
        hasSurveyCompleted, 
        isProcessingAnswer 
      });
      return;
    }

    // 안전장치: 유효하지 않은 질문 인덱스 체크
    if (currentQuestionIndex >= surveyData.length) {
      console.error('⚠️ 유효하지 않은 질문 인덱스:', currentQuestionIndex, '/', surveyData.length);
      return;
    }

    // 안전장치: 이미 처리된 질문인지 체크
    if (processedQuestions.has(currentQuestion.id)) {
      console.log('⚠️ 이미 처리된 질문:', currentQuestion.id);
      return;
    }

    console.log('🎯 답변 선택 시작:', { 
      currentQuestionIndex, 
      answer, 
      questionId: currentQuestion.id 
    });

    // 답변 처리 시작
    setIsProcessingAnswer(true);
    setProcessedQuestions(prev => new Set([...prev, currentQuestion.id]));
    setSelectedAnswer(answer);
    
    // 답변 저장
    setSurveyAnswer(currentQuestion.id, answer);
    const newAnswer = { 
      questionId: currentQuestion.id, 
      answer: answer, 
      personality: option.personality,
      trait: option.trait,
      time: Date.now() - startTime
    };
    setAnswers(prev => [...prev, newAnswer]);

    // 연속 답변 카운트
    setStreak(prev => prev + 1);
    setTotalTime(prev => prev + (Date.now() - startTime));
    setStartTime(Date.now());

    // 즉시 다음 질문으로 이동하거나 설문 완료
    // 현재 인덱스로 마지막 질문인지 직접 확인
    const isCurrentlyLastQuestion = currentQuestionIndex === surveyData.length - 1;
    console.log('🔄 다음 질문 이동 체크:', { 
      currentQuestionIndex, 
      surveyDataLength: surveyData.length, 
      isLastQuestion: isCurrentlyLastQuestion 
    });
    
    // 짧은 딜레이 후 다음 질문으로 이동 (중복 실행 방지)
    setTimeout(() => {
      if (isCurrentlyLastQuestion) {
        console.log('✅ 마지막 질문 완료, 설문 제출');
        handleSubmitSurvey(answer);
      } else {
        console.log('➡️ 다음 질문으로 이동');
        moveToNextQuestion();
        setSelectedAnswer('');
        setIsProcessingAnswer(false); // 답변 처리 완료
      }
    }, 100); // 100ms 딜레이로 중복 실행 방지
  };

  const handleSubmitSurvey = async (finalAnswer = null) => {
    setIsSubmitting(true);
    try {
      const answerToUse = finalAnswer || selectedAnswer;
      const finalAnswers = {
        ...survey.answers,
        [currentQuestion.id]: answerToUse
      };

      await saveSurveyAnswers(roomId, user.nickname, finalAnswers);
      completeSurvey();
      
      // 완료 축하 메시지
      const avgTime = Math.round(totalTime / surveyData.length / 1000);
      toast.success(`🎉 설문 완료! 평균 답변 시간: ${avgTime}초`, { duration: 4000 });
      
    } catch (error) {
      toast.error('답변 저장에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
      setIsProcessingAnswer(false); // 답변 처리 플래그 해제
    }
  };

  // 더 명확한 로딩 조건 확인 - 조건 완화
  if (!room.id || surveyData.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full">
          {!loadingTimeout ? (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <div className="text-white text-xl mb-2">
                {!room.id ? '방 정보를 가져오는 중...' : '설문을 불러오는 중...'}
              </div>
              <div className="text-white/70 text-sm">
                카테고리: {room.category || '확인 중...'}
              </div>
              <div className="text-white/50 text-xs mt-2">
                잠시만 기다려주세요...
              </div>
            </>
          ) : (
            <div className="bg-black/20 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-white text-xl mb-4">🤔 로딩이 오래 걸리네요</div>
              <div className="text-white/80 text-sm mb-6">
                설문을 불러오는데 문제가 발생했습니다.
                <br />개발자 도구(F12) → Console에서 오류를 확인해보세요.
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  🔄 페이지 새로고침
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="w-full bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  🏠 홈으로 돌아가기
                </button>
                <button
                  onClick={() => navigate('/survey/test-romantic')}
                  className="w-full bg-pink-500/30 hover:bg-pink-500/40 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  💕 테스트 설문 체험하기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (hasSurveyCompleted) {
    const completedCount = room.participants?.filter(p => p.surveyCompleted).length || 0;
    const totalCount = room.participants?.length || 0;
    const avgAnswerTime = totalTime > 0 ? Math.round(totalTime / answers.length / 1000) : 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
        <div className="card max-w-md mx-auto text-center">
          <div className="mb-6">
            <div className="relative">
              <CheckCircle className="text-green-500 text-6xl mx-auto mb-4 animate-bounce" />
              <Trophy className="text-yellow-500 text-2xl absolute -top-2 -right-2 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              🎉 설문 완료!
            </h2>
            <p className="text-gray-600 mb-2">
              모든 참가자가 완료할 때까지 기다려주세요.
            </p>
            <div className="text-sm text-gray-500 mb-4">
              {completedCount === totalCount - 1 ? (
                <span className="text-orange-600 font-medium">🕐 한 명만 더 기다리면 돼요!</span>
              ) : completedCount >= totalCount / 2 ? (
                <span className="text-blue-600">⏱️ 절반 이상이 완료했어요!</span>
              ) : (
                <span>💭 다른 참가자들도 열심히 답변 중이에요...</span>
              )}
            </div>
            
            {/* 개인 성과 요약 */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4">
              <h3 className="font-bold text-gray-800 mb-2">🏆 당신의 성과</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{avgAnswerTime}초</div>
                  <div className="text-gray-600">평균 답변 시간</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{streak}</div>
                  <div className="text-gray-600">연속 답변</div>
                </div>
              </div>
            </div>
          </div>

          {/* 참가자 진행 상황 */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Users className="text-gray-500" />
                <span className="font-semibold">진행 상황</span>
              </div>
              <button 
                onClick={() => setShowParticipantProgress(!showParticipantProgress)}
                className="text-primary-600 text-sm hover:text-primary-700"
              >
                {showParticipantProgress ? '숨기기' : '자세히'}
              </button>
            </div>
            
            <div className="text-2xl font-bold text-primary-600 mb-2">
              {completedCount} / {totalCount}
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              ></div>
            </div>
            
            {/* 상세 참가자 상황 */}
            {showParticipantProgress && (
              <div className="mt-3 space-y-2">
                {room.participants?.map((participant, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {participant.nickname[0].toUpperCase()}
                      </div>
                      <span className={participant.nickname === user.nickname ? 'font-bold' : ''}>
                        {participant.nickname}
                        {participant.nickname === user.nickname && ' (나)'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {participant.surveyCompleted ? (
                        <>
                          <CheckCircle className="text-green-500 w-4 h-4" />
                          <span className="text-green-600 font-medium">완료</span>
                        </>
                      ) : (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                          <span className="text-blue-600">진행중</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              결과 분석 중... 잠시만 기다려주세요.
            </p>
            <div className="flex justify-center gap-1">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // currentQuestion 안전장치
  if (!currentQuestion && surveyData.length > 0) {
    console.error('❌ currentQuestion이 없음:', { currentQuestionIndex, surveyDataLength: surveyData.length });
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-white text-xl mb-4">⚠️ 설문 데이터 오류</div>
          <div className="text-white/80 text-sm mb-6">
            설문 질문을 불러올 수 없습니다.
            <br />현재 인덱스: {currentQuestionIndex}, 전체: {surveyData.length}
          </div>
          <button
            onClick={() => {
              setCurrentQuestionIndex(0);
              window.location.reload();
            }}
            className="bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg transition-colors"
          >
            🔄 다시 시도
          </button>
        </div>
      </div>
    );
  }

  const progress = (answers.length / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-4">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {room.category === 'romantic' ? '💕 연인 궁합' : '🏢 직장 동료 궁합'} 설문
          </h1>
          <div className="text-white/80">
            {user.nickname}님의 차례
          </div>
          
          {/* 현재 성과 표시 */}
          {streak > 0 && (
            <div className="mt-2 inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-100 px-3 py-1 rounded-full text-sm">
              <Zap className="w-4 h-4" />
              <span>{streak}연속 답변 중!</span>
            </div>
          )}
        </div>

        {/* 향상된 진행률 */}
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary-600" />
              질문 {Math.min(currentQuestionIndex + 1, totalQuestions)} / {totalQuestions}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {answers.length}개 답변 완료 ({Math.round(progress)}%)
              </span>
              {progress > 50 && <Star className="w-4 h-4 text-yellow-500" />}
            </div>
          </div>
          
          {/* 개발용 디버깅 정보 (임시) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="text-xs text-gray-400 mb-2 p-2 bg-gray-50 rounded">
              Debug: Index={currentQuestionIndex}, Total={totalQuestions}, Answers={answers.length}, 
              HasQuestion={currentQuestion ? 'Yes' : 'No'}
            </div>
          )}
          
          <div className="w-full bg-gray-200 rounded-full h-3 relative overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full"></div>
            </div>
          </div>
          
          {/* 마일스톤 표시 */}
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span className={answers.length >= Math.ceil(totalQuestions * 0.25) ? 'text-green-600 font-bold' : ''}>25%</span>
            <span className={answers.length >= Math.ceil(totalQuestions * 0.5) ? 'text-green-600 font-bold' : ''}>50%</span>
            <span className={answers.length >= Math.ceil(totalQuestions * 0.75) ? 'text-green-600 font-bold' : ''}>75%</span>
            <span className={answers.length >= totalQuestions ? 'text-green-600 font-bold' : ''}>완료</span>
          </div>
        </div>

        {/* 질문 카드 - 개선된 버전 */}
        <div className="card mb-6 relative overflow-hidden">
          {/* 애니메이션 배경 */}
          <div className="absolute top-0 right-0 text-6xl opacity-10">
            {currentQuestion.emoji}
          </div>
          
          <div className="relative z-10">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">{currentQuestion.emoji}</div>
                <div className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                  {currentQuestion.funComment}
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {currentQuestion.question}
              </h2>
            </div>

            {/* 향상된 선택지 */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <label
                  key={option.value}
                  className={`
                    block p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.02]
                    ${selectedAnswer === option.value
                      ? 'border-primary-500 bg-gradient-to-r from-primary-50 to-purple-50 shadow-lg scale-[1.02]'
                      : 'border-gray-200 hover:border-primary-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-primary-25 hover:shadow-md'
                    }
                    ${isProcessingAnswer ? 'pointer-events-none opacity-50' : ''}
                  `}
                  onClick={() => !isProcessingAnswer && handleAnswerSelect(option.value, option)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={option.value}
                    checked={selectedAnswer === option.value}
                    onChange={() => {}}
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div className={`
                      w-8 h-8 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-300
                      ${selectedAnswer === option.value
                        ? 'border-primary-500 bg-primary-500 shadow-lg'
                        : 'border-gray-300 hover:border-primary-400'
                      }
                    `}>
                      {selectedAnswer === option.value ? (
                        <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                      ) : (
                        <div className="text-sm font-bold text-gray-600">{option.value}</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 mb-1">
                        {option.text}
                      </div>
                      {option.personality && (
                        <div className="text-xs text-primary-600 bg-primary-100 px-2 py-1 rounded-full inline-block">
                          {option.personality}
                        </div>
                      )}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* 재미있는 피드백 표시 */}
        {showFeedback && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="bg-white rounded-lg shadow-2xl p-6 text-center transform animate-bounce">
              <div className="text-4xl mb-2">{showFeedback.emoji}</div>
              <div className={`text-lg font-bold ${showFeedback.color} mb-1`}>
                {showFeedback.text}
              </div>
              {showFeedback.speed && (
                <div className="text-sm text-gray-600">
                  {showFeedback.speed}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 안내 메시지 */}
        <div className="mt-6 text-center">
          <p className="text-white/70 text-sm mb-2">
            🎯 답변을 선택하면 자동으로 다음 질문으로 넘어갑니다.
          </p>
          <p className="text-white/60 text-xs mb-1">
            💡 정답이 있는 것은 아니에요. 평소 자신의 성향에 맞게 선택해주세요.
          </p>
          <p className="text-white/60 text-xs">
            ⏱️ 빠르게 답변할수록 더 높은 점수를 받을 수 있어요!
          </p>
        </div>

        {/* 하단 참가자 미니 상태 */}
        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center justify-between text-white/80 text-sm">
            <span>다른 참가자들</span>
            <span>{room.participants?.filter(p => p.surveyCompleted).length || 0}/{room.participants?.length || 0} 완료</span>
          </div>
          <div className="flex gap-1 mt-2">
            {room.participants?.map((participant, index) => (
              <div
                key={index}
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                  ${participant.surveyCompleted 
                    ? 'bg-green-500 text-white' 
                    : participant.nickname === user.nickname
                      ? 'bg-yellow-500 text-white animate-pulse'
                      : 'bg-white/30 text-white'
                  }
                `}
                title={participant.nickname}
              >
                {participant.nickname[0].toUpperCase()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyPage; 