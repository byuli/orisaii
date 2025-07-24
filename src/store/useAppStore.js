import { create } from 'zustand';

const useAppStore = create((set, get) => ({
  // 현재 사용자 정보
  user: {
    nickname: '',
    roomId: '',
    isHost: false,
  },

  // 방 정보
  room: {
    id: '',
    category: '', // 'romantic' | 'workplace'
    hostNickname: '',
    participants: [],
    status: 'waiting', // 'waiting' | 'survey' | 'completed'
    createdAt: null,
  },

  // 퀴즈 관련 (기존 호환성)
  quiz: {
    currentQuestion: 0,
    answers: {},
    isCompleted: false,
  },

  // 설문 관련
  survey: {
    currentQuestion: 0,
    answers: {},
    isCompleted: false,
  },

  // 결과 관련
  results: null,

  // Actions
  setUser: (user) => set((state) => ({
    user: { ...state.user, ...user }
  })),

  setRoom: (room) => set((state) => ({
    room: { ...state.room, ...room }
  })),

  setQuizAnswer: (questionId, answer) => set((state) => ({
    quiz: {
      ...state.quiz,
      answers: {
        ...state.quiz.answers,
        [questionId]: answer
      }
    }
  })),

  setSurveyAnswer: (questionId, answer) => set((state) => ({
    survey: {
      ...state.survey,
      answers: {
        ...state.survey.answers,
        [questionId]: answer
      }
    },
    // 기존 quiz 상태도 동기화
    quiz: {
      ...state.quiz,
      answers: {
        ...state.quiz.answers,
        [questionId]: answer
      }
    }
  })),

  nextQuestion: () => set((state) => ({
    quiz: {
      ...state.quiz,
      currentQuestion: state.quiz.currentQuestion + 1
    }
  })),

  completeQuiz: () => set((state) => ({
    quiz: {
      ...state.quiz,
      isCompleted: true
    }
  })),

  completeSurvey: () => set((state) => ({
    survey: {
      ...state.survey,
      isCompleted: true
    },
    // 기존 quiz 상태도 동기화
    quiz: {
      ...state.quiz,
      isCompleted: true
    }
  })),

  setResults: (results) => set({ results }),

  // 초기화
  reset: () => set({
    user: {
      nickname: '',
      roomId: '',
      isHost: false,
    },
    room: {
      id: '',
      category: '',
      hostNickname: '',
      participants: [],
      status: 'waiting',
      createdAt: null,
    },
    quiz: {
      currentQuestion: 0,
      answers: {},
      isCompleted: false,
    },
    survey: {
      currentQuestion: 0,
      answers: {},
      isCompleted: false,
    },
    results: null,
  }),
}));

export default useAppStore; 