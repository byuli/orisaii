// Mock Firebase 함수들 (개발/테스트용)
let mockRooms = {};
let mockResults = {};

// Mock 방 생성
export const mockCreateRoom = async (category, hostNickname) => {
  const roomId = Math.random().toString(36).substring(2, 15);
  const now = new Date();
  
  mockRooms[roomId] = {
    id: roomId,
    category,
    hostNickname,
    participants: [{
      nickname: hostNickname,
      isHost: true,
      joinedAt: now,
      surveyCompleted: false,
      quizCompleted: false, // 기존 호환성
      answers: {}
    }],
    status: 'waiting',
    createdAt: now,
    maxParticipants: 6
  };
  
  console.log('🎯 Mock 방 생성됨:', roomId);
  return roomId;
};

// Mock 방 정보 가져오기
export const mockGetRoom = async (roomId) => {
  const room = mockRooms[roomId];
  if (!room) {
    throw new Error('방을 찾을 수 없습니다.');
  }
  return room;
};

// Mock 방 참가
export const mockJoinRoom = async (roomId, nickname) => {
  const room = mockRooms[roomId];
  if (!room) {
    throw new Error('방을 찾을 수 없습니다.');
  }
  
  if (room.participants.length >= room.maxParticipants) {
    throw new Error('방이 가득 찼습니다.');
  }
  
  const existingNicknames = room.participants.map(p => p.nickname);
  if (existingNicknames.includes(nickname)) {
    throw new Error('이미 사용중인 닉네임입니다.');
  }
  
  room.participants.push({
    nickname,
    isHost: false,
    joinedAt: new Date(),
    surveyCompleted: false,
    quizCompleted: false, // 기존 호환성
    answers: {}
  });
  
  console.log('🎯 Mock 방 참가:', nickname);
  return true;
};

// Mock 실시간 구독 (간단한 폴링으로 시뮬레이션)
export const mockSubscribeToRoom = (roomId, callback) => {
  const interval = setInterval(() => {
    const room = mockRooms[roomId];
    if (room) {
      callback(room);
    }
  }, 1000);
  
  return () => clearInterval(interval);
};

// Mock 설문 답변 저장
export const mockSaveSurveyAnswers = async (roomId, nickname, answers) => {
  const room = mockRooms[roomId];
  if (!room) {
    throw new Error('방을 찾을 수 없습니다.');
  }
  
  room.participants = room.participants.map(participant => {
    if (participant.nickname === nickname) {
              return {
          ...participant,
          answers,
          surveyCompleted: true,
          quizCompleted: true, // 기존 호환성
          completedAt: new Date()
        };
    }
    return participant;
  });
  
  // 모든 참가자가 완료했는지 확인
      const allCompleted = room.participants.every(p => p.surveyCompleted || p.quizCompleted);
  if (allCompleted) {
    room.status = 'completed';
  }
  
  console.log('🎯 Mock 설문 답변 저장:', nickname);
  return true;
};

// 기존 호환성을 위한 별칭
export const mockSaveQuizAnswers = mockSaveSurveyAnswers;

// Mock 결과 저장
export const mockSaveResults = async (roomId, results) => {
  mockResults[roomId] = {
    roomId,
    results,
    createdAt: new Date()
  };
  console.log('🎯 Mock 결과 저장:', roomId);
  return true;
};

// Mock 결과 가져오기
export const mockGetResults = async (roomId) => {
  const result = mockResults[roomId];
  if (!result) {
    throw new Error('결과를 찾을 수 없습니다.');
  }
  return result;
}; 