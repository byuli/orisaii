import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Clock, Users } from 'lucide-react';
import { getRoom, saveSurveyAnswers, subscribeToRoom } from '../utils/firebase';
import { getSurveyByCategory } from '../data/surveyData';
import useAppStore from '../store/useAppStore';
import toast from 'react-hot-toast';

const SurveyPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user, room, survey, setRoom, setSurveyAnswer, nextQuestion, completeSurvey } = useAppStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [surveyData, setSurveyData] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    const initializeSurvey = async () => {
      try {
        if (!room.id) {
          const roomData = await getRoom(roomId);
          setRoom(roomData);
          const surveyQuestions = getSurveyByCategory(roomData.category);
          setSurveyData(surveyQuestions);
        } else {
          const surveyQuestions = getSurveyByCategory(room.category);
          setSurveyData(surveyQuestions);
        }
        setStartTime(Date.now());
      } catch (error) {
        toast.error('설문을 불러올 수 없습니다.');
        navigate('/');
      }
    };

    initializeSurvey();
  }, [roomId, room.id, setRoom, navigate]);

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

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (!selectedAnswer) {
      toast.error('답변을 선택해주세요.');
      return;
    }

    // 답변 저장
    setSurveyAnswer(currentQuestion.id, selectedAnswer);

    if (isLastQuestion) {
      handleSubmitSurvey();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer('');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      // 이전 답변 불러오기
      const prevAnswer = survey.answers[surveyData[currentQuestionIndex - 1].id];
      setSelectedAnswer(prevAnswer || '');
    }
  };

  const handleSubmitSurvey = async () => {
    setIsSubmitting(true);
    try {
      const finalAnswers = {
        ...survey.answers,
        [currentQuestion.id]: selectedAnswer
      };

      await saveSurveyAnswers(roomId, user.nickname, finalAnswers);
      completeSurvey();
      toast.success('설문을 완료했습니다!');
      
      // 결과 대기 페이지로 이동하거나 현재 페이지에서 대기
      // navigate(`/result/${roomId}`);
    } catch (error) {
      toast.error('답변 저장에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center">
        <div className="text-white text-xl">설문을 불러오는 중...</div>
      </div>
    );
  }

  if (hasSurveyCompleted) {
    const completedCount = room.participants?.filter(p => p.surveyCompleted).length || 0;
    const totalCount = room.participants?.length || 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
        <div className="card max-w-md mx-auto text-center">
          <div className="mb-6">
            <CheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              설문 완료!
            </h2>
            <p className="text-gray-600">
              모든 참가자가 완료할 때까지 기다려주세요.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="text-gray-500" />
              <span className="font-semibold">진행 상황</span>
            </div>
            <div className="text-2xl font-bold text-primary-600">
              {completedCount} / {totalCount}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              ></div>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            결과 분석 중... 잠시만 기다려주세요.
          </p>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-4">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {room.category === 'romantic' ? '연인 궁합' : '직장 동료 궁합'} 설문
          </h1>
          <div className="text-white/80">
            {user.nickname}님의 차례
          </div>
        </div>

        {/* 진행률 */}
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              질문 {currentQuestionIndex + 1} / {totalQuestions}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progress)}% 완료
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* 질문 카드 */}
        <div className="card mb-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {currentQuestion.question}
            </h2>
          </div>

          {/* 선택지 */}
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <label
                key={option.value}
                className={`
                  block p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                  ${selectedAnswer === option.value
                    ? 'border-primary-500 bg-primary-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                <input
                  type="radio"
                  name="answer"
                  value={option.value}
                  checked={selectedAnswer === option.value}
                  onChange={(e) => handleAnswerSelect(e.target.value)}
                  className="sr-only"
                />
                <div className="flex items-center">
                  <div className={`
                    w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center
                    ${selectedAnswer === option.value
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-300'
                    }
                  `}>
                    {selectedAnswer === option.value && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">
                      {option.value}. {option.text}
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* 네비게이션 버튼 */}
        <div className="flex justify-between">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="text-lg" />
            이전
          </button>

          <button
            onClick={handleNextQuestion}
            disabled={!selectedAnswer || isSubmitting}
            className="btn-primary flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                제출 중...
              </>
            ) : isLastQuestion ? (
              <>
                완료
                <CheckCircle className="text-lg" />
              </>
            ) : (
              <>
                다음
                <ArrowRight className="text-lg" />
              </>
            )}
          </button>
        </div>

        {/* 안내 메시지 */}
        <div className="mt-6 text-center">
          <p className="text-white/70 text-sm">
            정답이 있는 것은 아니에요. 평소 자신의 성향에 맞게 선택해주세요.
          </p>
          <p className="text-white/60 text-xs mt-2">
            모든 참가자가 설문을 완료하면 궁합 분석 결과를 확인할 수 있습니다
          </p>
        </div>
      </div>
    </div>
  );
};

export default SurveyPage; 