import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  onSnapshot,
  arrayUnion,
  arrayRemove,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import {
  mockCreateRoom,
  mockGetRoom,
  mockJoinRoom,
  mockSubscribeToRoom,
  mockSaveQuizAnswers,
  mockSaveSurveyAnswers,
  mockSaveResults,
  mockGetResults
} from './mockFirebase';

// 고유한 방 ID 생성
export const generateRoomId = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// 방 생성
export const createRoom = async (category, hostNickname) => {
  if (!db) {
    console.warn('⚠️ Firestore가 비활성화됨. Mock 모드로 전환합니다.');
    return await mockCreateRoom(category, hostNickname);
  }
  
  try {
    const roomId = generateRoomId();
    console.log('🔵 방 생성 시도:', { roomId, category, hostNickname });
    
    const now = new Date();
    const roomData = {
      id: roomId,
      category,
      hostNickname,
      participants: [{
        nickname: hostNickname,
        isHost: true,
        joinedAt: now,
        quizCompleted: false,
        answers: {}
      }],
      status: 'waiting',
      createdAt: now, // serverTimestamp() 대신 일반 Date 사용
      maxParticipants: 6
    };

    console.log('🔵 Firestore에 저장할 데이터:', roomData);
    await setDoc(doc(db, 'rooms', roomId), roomData);
    console.log('✅ 방 생성 성공:', roomId);
    
    return roomId;
  } catch (error) {
    console.error('방 생성 실패, Mock 모드로 전환:', error);
    return await mockCreateRoom(category, hostNickname);
  }
};

// 방 정보 가져오기
export const getRoom = async (roomId) => {
  console.log('🔍 방 정보 조회 시도:', roomId);
  
  if (!db) {
    console.log('🔍 Firestore 비활성화, Mock 모드 사용');
    return await mockGetRoom(roomId);
  }
  
  try {
    console.log('🔍 Firestore에서 방 조회:', `rooms/${roomId}`);
    const roomDoc = await getDoc(doc(db, 'rooms', roomId));
    
    console.log('🔍 방 문서 존재:', roomDoc.exists());
    
    if (roomDoc.exists()) {
      const roomData = { id: roomDoc.id, ...roomDoc.data() };
      console.log('✅ 방 정보 조회 성공:', roomData);
      return roomData;
    } else {
      console.error('❌ 방 문서가 존재하지 않음:', roomId);
      throw new Error('방을 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('방 정보 가져오기 실패, Mock 모드로 전환:', error);
    return await mockGetRoom(roomId);
  }
};

// 방에 참가하기
export const joinRoom = async (roomId, nickname) => {
  if (!db) {
    return await mockJoinRoom(roomId, nickname);
  }
  
  try {
    const roomRef = doc(db, 'rooms', roomId);
    const roomDoc = await getDoc(roomRef);
    
    if (!roomDoc.exists()) {
      throw new Error('방을 찾을 수 없습니다.');
    }
    
    const roomData = roomDoc.data();
    
    // 최대 인원 확인
    if (roomData.participants.length >= roomData.maxParticipants) {
      throw new Error('방이 가득 찼습니다.');
    }
    
    // 닉네임 중복 확인
    const existingNicknames = roomData.participants.map(p => p.nickname);
    if (existingNicknames.includes(nickname)) {
      throw new Error('이미 사용중인 닉네임입니다.');
    }
    
    // 참가자 추가
    const newParticipant = {
      nickname,
      isHost: false,
      joinedAt: new Date(),
      quizCompleted: false,
      answers: {}
    };
    
    await updateDoc(roomRef, {
      participants: arrayUnion(newParticipant)
    });
    
    return true;
  } catch (error) {
    console.error('방 참가 실패, Mock 모드로 전환:', error);
    return await mockJoinRoom(roomId, nickname);
  }
};

// 방에서 나가기
export const leaveRoom = async (roomId, nickname) => {
  try {
    const roomRef = doc(db, 'rooms', roomId);
    const roomDoc = await getDoc(roomRef);
    
    if (!roomDoc.exists()) {
      throw new Error('방을 찾을 수 없습니다.');
    }
    
    const roomData = roomDoc.data();
    const participantToRemove = roomData.participants.find(p => p.nickname === nickname);
    
    if (participantToRemove) {
      await updateDoc(roomRef, {
        participants: arrayRemove(participantToRemove)
      });
    }
    
    return true;
  } catch (error) {
    console.error('방 나가기 실패:', error);
    throw error;
  }
};

// 퀴즈 답변 저장 (기존 호환성)
export const saveQuizAnswers = async (roomId, nickname, answers) => {
  return await saveSurveyAnswers(roomId, nickname, answers);
};

// 설문 답변 저장
export const saveSurveyAnswers = async (roomId, nickname, answers) => {
  if (!db) {
    return await mockSaveSurveyAnswers(roomId, nickname, answers);
  }
  
  try {
    const roomRef = doc(db, 'rooms', roomId);
    const roomDoc = await getDoc(roomRef);
    
    if (!roomDoc.exists()) {
      throw new Error('방을 찾을 수 없습니다.');
    }
    
    const roomData = roomDoc.data();
    const updatedParticipants = roomData.participants.map(participant => {
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
    
    await updateDoc(roomRef, {
      participants: updatedParticipants
    });
    
    // 모든 참가자가 설문을 완료했는지 확인
    const allCompleted = updatedParticipants.every(p => p.surveyCompleted || p.quizCompleted);
    if (allCompleted) {
      await updateDoc(roomRef, {
        status: 'completed'
      });
    }
    
    return true;
  } catch (error) {
    console.error('설문 답변 저장 실패, Mock 모드로 전환:', error);
    return await mockSaveSurveyAnswers(roomId, nickname, answers);
  }
};

// 방 상태 실시간 감지
export const subscribeToRoom = (roomId, callback) => {
  if (!db) {
    return mockSubscribeToRoom(roomId, callback);
  }
  
  try {
    const roomRef = doc(db, 'rooms', roomId);
    return onSnapshot(roomRef, (doc) => {
      if (doc.exists()) {
        callback({ id: doc.id, ...doc.data() });
      } else {
        callback(null);
      }
    });
  } catch (error) {
    console.error('실시간 구독 실패, Mock 모드로 전환:', error);
    return mockSubscribeToRoom(roomId, callback);
  }
};

// 결과 저장
export const saveResults = async (roomId, results) => {
  if (!db) {
    return await mockSaveResults(roomId, results);
  }
  
  try {
    const resultRef = doc(db, 'results', roomId);
    await setDoc(resultRef, {
      roomId,
      results,
      createdAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('결과 저장 실패, Mock 모드로 전환:', error);
    return await mockSaveResults(roomId, results);
  }
};

// 결과 가져오기
export const getResults = async (roomId) => {
  if (!db) {
    return await mockGetResults(roomId);
  }
  
  try {
    const resultDoc = await getDoc(doc(db, 'results', roomId));
    if (resultDoc.exists()) {
      return resultDoc.data();
    } else {
      throw new Error('결과를 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('결과 가져오기 실패, Mock 모드로 전환:', error);
    return await mockGetResults(roomId);
  }
};

// 방 상태 변경
export const updateRoomStatus = async (roomId, status) => {
  if (!db) {
    console.warn('⚠️ Firestore가 비활성화됨. Mock 모드입니다.');
    return true;
  }
  
  try {
    const roomRef = doc(db, 'rooms', roomId);
    await updateDoc(roomRef, {
      status: status
    });
    console.log(`✅ 방 상태 변경 완료: ${status}`);
    return true;
  } catch (error) {
    console.error('방 상태 변경 실패:', error);
    throw error;
  }
}; 