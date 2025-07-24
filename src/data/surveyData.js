// 기존 퀴즈 데이터를 import
import { 
  romanticQuiz,
  workplaceQuiz,
  compatibilityMatrix,
  getQuizByCategory
} from './quizData';

// 설문 데이터로 별칭 export
export { 
  romanticQuiz as romanticSurvey,
  workplaceQuiz as workplaceSurvey,
  compatibilityMatrix
};

// 카테고리별 설문 가져오기 함수
export const getSurveyByCategory = (category) => {
  switch (category) {
    case 'romantic':
      return romanticQuiz;
    case 'workplace':
      return workplaceQuiz;
    default:
      return romanticQuiz;
  }
};

// 기존 함수들도 별칭으로 export
export { getQuizByCategory }; 