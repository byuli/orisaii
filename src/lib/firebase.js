import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase 설정 - 환경변수에서 가져오기
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Firebase 앱 초기화
let app;
let db;

try {
  // Firebase 설정 유효성 검사
  const isValidConfig = firebaseConfig.apiKey && 
                       firebaseConfig.projectId && 
                       firebaseConfig.appId &&
                       !firebaseConfig.apiKey.includes('your-') &&
                       !firebaseConfig.messagingSenderId.includes('your-');

  if (isValidConfig) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log('✅ Firebase 초기화 성공');
  } else {
    console.warn('⚠️ Firebase 설정이 완료되지 않았습니다. .env 파일을 확인해주세요.');
    // Mock Firebase 인스턴스 생성 (개발 중 사용)
    db = null;
  }
} catch (error) {
  console.error('🔥 Firebase 초기화 실패:', error);
  db = null;
}

// Firestore 데이터베이스 인스턴스
export { db };

export default app; 