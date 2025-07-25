// 기존 퀴즈 데이터를 import
import { 
  romanticQuiz,
  workplaceQuiz,
  friendshipQuiz,
  gamingQuiz,
  compatibilityMatrix,
  getQuizByCategory
} from './quizData';

// 설문 데이터로 별칭 export
export { 
  romanticQuiz as romanticSurvey,
  workplaceQuiz as workplaceSurvey,
  friendshipQuiz as friendshipSurvey,
  gamingQuiz as gamingSurvey,
  compatibilityMatrix
};

// 카테고리별 설문 가져오기 함수 - 새로운 카테고리 포함
export const getSurveyByCategory = (category) => {
  console.log('🔍 getSurveyByCategory 호출:', category);
  
  let result;
  switch (category) {
    case 'romantic':
      result = romanticQuiz;
      break;
    case 'workplace':
      result = workplaceQuiz;
      break;
    case 'friendship':
      result = friendshipQuiz;
      break;
    case 'gaming':
      result = gamingQuiz;
      break;
    default:
      console.warn('⚠️ 알 수 없는 카테고리, romantic으로 기본 설정:', category);
      result = romanticQuiz;
      break;
  }
  
  console.log('📊 설문 데이터 반환:', { 
    category, 
    questionsCount: result?.length || 0,
    firstQuestion: result?.[0]?.question || 'N/A'
  });
  
  return result;
};

// 기존 함수들도 별칭으로 export
export { getQuizByCategory }; 