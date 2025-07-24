# Orisaii - 심리학 기반 궁합 테스트 웹 앱

![Orisaii](https://img.shields.io/badge/React-18.x-blue.svg)
![Firebase](https://img.shields.io/badge/Firebase-10.x-orange.svg)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3.x-cyan.svg)

Orisaii는 최대 6명이 함께 참여할 수 있는 심리학 기반 궁합 테스트 웹 애플리케이션입니다. 연인 궁합과 직장 동료 궁합을 측정할 수 있으며, 실시간으로 결과를 공유할 수 있습니다.

## ✨ 주요 기능

- 🔥 **실시간 멀티플레이어**: 최대 6명이 동시 참여
- 💕 **연인 궁합 테스트**: 감정 처리, 갈등 대처 스타일 분석
- 💼 **직장 동료 궁합 테스트**: 협업 스타일, 의사결정 방식 분석
- 📊 **상세한 분석 결과**: 개인 성향, 페어 궁합, 그룹 통계
- 🔗 **URL 공유**: 고유한 방 링크로 쉬운 초대
- 📱 **반응형 디자인**: 모바일과 데스크톱 모두 지원
- 🎨 **감성적인 UI**: 깔끔하고 직관적인 인터페이스

## 🛠 기술 스택

- **Frontend**: React 19.x + Vite
- **Backend**: Firebase (Firestore, Hosting)
- **UI**: Tailwind CSS + Lucide React (아이콘)
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Notifications**: React Hot Toast

## 🚀 시작하기

### 필수 조건

- Node.js 18.x 이상
- Firebase 프로젝트 설정

### 설치 및 설정

1. **저장소 클론**
   ```bash
   git clone <repository-url>
   cd orisaii
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **Firebase 프로젝트 설정**
   - [Firebase Console](https://console.firebase.google.com/)에서 새 프로젝트 생성
   - Firestore Database 활성화
   - 웹 앱 추가 후 설정 정보 복사

4. **환경변수 설정**
   
   `.env` 파일을 프로젝트 루트에 생성:
   ```env
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=your-app-id
   ```

5. **개발 서버 실행**
   ```bash
   npm run dev
   ```

6. **빌드 및 배포**
   ```bash
   npm run build
   npm run preview
   ```

### Firebase Firestore 규칙

Firestore 보안 규칙을 다음과 같이 설정하세요:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 방(rooms) 컬렉션 규칙
    match /rooms/{roomId} {
      allow read, write: if true; // 개발 중에는 모든 접근 허용
    }
    
    // 결과(results) 컬렉션 규칙
    match /results/{resultId} {
      allow read, write: if true; // 개발 중에는 모든 접근 허용
    }
  }
}
```

> **주의**: 프로덕션 환경에서는 더 엄격한 보안 규칙을 적용하세요.

## 🎮 사용법

### 1. 방 생성
- 홈페이지에서 테스트 카테고리 선택 (연인 궁합 / 직장 동료 궁합)
- 닉네임 입력 후 방 생성

### 2. 친구 초대
- 생성된 고유 URL을 친구들에게 공유
- 최대 6명까지 참여 가능

### 3. 퀴즈 진행
- 방장이 퀴즈 시작
- 각자 개별적으로 심리 테스트 문항에 답변

### 4. 결과 확인
- 모든 참여자 완료 후 자동으로 결과 분석
- 개인 성향, 페어 궁합, 그룹 통계 확인
- 결과 URL 공유 가능

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
├── data/
│   └── quizData.js     # 퀴즈 문항 및 궁합 매트릭스
├── lib/
│   └── firebase.js     # Firebase 설정
├── pages/              # 페이지 컴포넌트
│   ├── HomePage.jsx    # 홈페이지 (카테고리 선택)
│   ├── RoomPage.jsx    # 방 대기실
│   ├── QuizPage.jsx    # 퀴즈 진행
│   └── ResultPage.jsx  # 결과 페이지
├── store/
│   └── useAppStore.js  # Zustand 상태 관리
├── utils/
│   ├── firebase.js     # Firebase 유틸리티 함수
│   └── compatibility.js # 궁합 분석 로직
└── styles/             # CSS 파일
```

## 🔮 향후 개선 계획

- [ ] 사용자 인증 시스템 추가
- [ ] 더 많은 카테고리 추가 (친구 궁합, 팀워크 등)
- [ ] 결과 히스토리 저장 기능
- [ ] 소셜 미디어 공유 최적화
- [ ] PWA(Progressive Web App) 지원
- [ ] 다국어 지원
- [ ] 더 정교한 심리학적 분석 알고리즘

## 🤝 기여하기

1. 이 저장소를 포크하세요
2. 새 기능 브랜치를 생성하세요 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋하세요 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성하세요

## 📄 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 생성해 주세요.

---

**Orisaii**로 더 깊은 관계를 만들어보세요! 💕
