// Mock Firebase 함수들 (개발/테스트용)
let mockRooms = {
  // 테스트용 기본 방들
  'test-romantic': {
    id: 'test-romantic',
    category: 'romantic',
    hostNickname: '테스트호스트',
    participants: [{
      nickname: '테스트호스트',
      isHost: true,
      joinedAt: new Date(),
      surveyCompleted: false,
      quizCompleted: false,
      answers: {}
    }],
    status: 'waiting',
    createdAt: new Date(),
    maxParticipants: 6
  },
  'test-workplace': {
    id: 'test-workplace',
    category: 'workplace',
    hostNickname: '테스트호스트',
    participants: [{
      nickname: '테스트호스트',
      isHost: true,
      joinedAt: new Date(),
      surveyCompleted: false,
      quizCompleted: false,
      answers: {}
    }],
    status: 'waiting',
    createdAt: new Date(),
    maxParticipants: 6
  }
};
let mockResults = {};
let mockMessages = {}; // 각 방의 채팅 메시지 저장
let chatSubscribers = {}; // 채팅 구독자들 저장

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

// Mock 채팅 메시지 전송
export const mockSendChatMessage = async (roomId, nickname, message) => {
  if (!mockMessages[roomId]) {
    mockMessages[roomId] = [];
  }
  
  const now = new Date();
  const chatMessage = {
    id: Date.now().toString() + Math.random(),
    nickname,
    message: message.trim(),
    displayTime: now,
    createdAt: now,
    timestamp: now // Firebase 호환성을 위해 추가
  };
  
  mockMessages[roomId].push(chatMessage);
  
  // 구독자들에게 알림
  if (chatSubscribers[roomId]) {
    chatSubscribers[roomId].forEach(callback => {
      callback([...mockMessages[roomId]]);
    });
  }
  
  console.log('🎯 Mock 채팅 메시지 전송:', nickname, message);
  return true;
};

// Mock 채팅 메시지 실시간 구독
export const mockSubscribeToChatMessages = (roomId, callback) => {
  if (!mockMessages[roomId]) {
    mockMessages[roomId] = [];
  }
  
  if (!chatSubscribers[roomId]) {
    chatSubscribers[roomId] = [];
  }
  
  // 구독자 추가
  chatSubscribers[roomId].push(callback);
  
  // 즉시 현재 메시지들 전달
  callback([...mockMessages[roomId]]);
  
  // unsubscribe 함수 반환
  return () => {
    if (chatSubscribers[roomId]) {
      const index = chatSubscribers[roomId].indexOf(callback);
      if (index > -1) {
        chatSubscribers[roomId].splice(index, 1);
      }
    }
  };
}; 