// 연인 궁합 퀴즈 (재미있게 개선된 버전 - 10문항)
export const romanticQuiz = [
  {
    id: 1,
    question: "💕 좀비 아포칼립스가 온다면, 연인과 함께...",
    emoji: "🧟‍♂️",
    funComment: "생존 본능을 확인해볼까요?",
    options: [
      { value: "A", text: "무기를 들고 함께 싸운다", trait: "warrior", personality: "전투형" },
      { value: "B", text: "안전한 곳을 찾아 피한다", trait: "strategic", personality: "전략형" },
      { value: "C", text: "다른 생존자들과 연합한다", trait: "social", personality: "협력형" },
      { value: "D", text: "연인만 지키고 도망간다", trait: "protective", personality: "보호형" }
    ]
  },
  {
    id: 2,
    question: "🍕 배달앱에서 음식을 주문할 때 우리는...",
    emoji: "📱",
    funComment: "일상의 소소한 취향이 중요해요!",
    options: [
      { value: "A", text: "나는 치킨, 너는 피자 각자 시킨다", trait: "independent", personality: "개성형" },
      { value: "B", text: "하나 시켜서 나눠먹는다", trait: "sharing", personality: "공유형" },
      { value: "C", text: "상대가 좋아하는 걸로 맞춰준다", trait: "considerate", personality: "배려형" },
      { value: "D", text: "둘 다 우유부단해서 2시간 고민한다", trait: "indecisive", personality: "신중형" }
    ]
  },
  {
    id: 3,
    question: "🎬 넷플릭스에서 영화 고를 때...",
    emoji: "🎭",
    funComment: "취향의 충돌이 일어날 수 있어요!",
    options: [
      { value: "A", text: "액션 vs 로맨스로 매번 싸운다", trait: "different_taste", personality: "대조형" },
      { value: "B", text: "가위바위보로 정한다", trait: "fair", personality: "공정형" },
      { value: "C", text: "미리 번갈아가며 정해놓는다", trait: "organized", personality: "계획형" },
      { value: "D", text: "서로 추천해주며 새로운 장르 도전", trait: "adventurous", personality: "모험형" }
    ]
  },
  {
    id: 4,
    question: "📱 연인의 폰이 계속 울릴 때 내 반응은...",
    emoji: "😤",
    funComment: "질투와 신뢰의 경계선을 확인해봐요!",
    options: [
      { value: "A", text: "누구인지 물어본다", trait: "curious", personality: "호기심형" },
      { value: "B", text: "신경 안 쓰는 척 하지만 실은 궁금하다", trait: "pretending", personality: "츤데레형" },
      { value: "C", text: "정말로 신경 안 쓴다", trait: "trusting", personality: "신뢰형" },
      { value: "D", text: "은근히 화면을 훔쳐본다", trait: "sneaky", personality: "스파이형" }
    ]
  },
  {
    id: 5,
    question: "🎁 연인 생일선물로 뭘 준비할까?",
    emoji: "🎂",
    funComment: "사랑 표현 방식을 알아봐요!",
    options: [
      { value: "A", text: "비싸고 실용적인 선물", trait: "practical", personality: "실용형" },
      { value: "B", text: "직접 만든 의미있는 선물", trait: "handmade", personality: "정성형" },
      { value: "C", text: "깜짝 이벤트와 경험 선물", trait: "experiential", personality: "이벤트형" },
      { value: "D", text: "상대가 진짜 원하는 걸 미리 조사", trait: "investigative", personality: "탐정형" }
    ]
  },
  {
    id: 6,
    question: "🌧️ 데이트 중 갑자기 비가 온다면...",
    emoji: "☔",
    funComment: "돌발 상황 대처법을 확인해봐요!",
    options: [
      { value: "A", text: "우산 없이 그냥 뛴다", trait: "spontaneous", personality: "즉흥형" },
      { value: "B", text: "카페에서 비 멈추길 기다린다", trait: "patient", personality: "여유형" },
      { value: "C", text: "편의점에서 우산을 산다", trait: "problem_solver", personality: "해결형" },
      { value: "D", text: "하나의 우산에 함께 들어간다", trait: "romantic", personality: "로맨틱형" }
    ]
  },
  {
    id: 7,
    question: "🛏️ 주말 오후, 이상적인 데이트는?",
    emoji: "😴",
    funComment: "이상형을 확인해봐요!",
    options: [
      { value: "A", text: "집에서 침대에 누워 넷플릭스", trait: "homebody", personality: "집순이형" },
      { value: "B", text: "카페 투어하며 사진 찍기", trait: "aesthetic", personality: "감성형" },
      { value: "C", text: "놀이공원이나 액티비티", trait: "active", personality: "활동형" },
      { value: "D", text: "새로운 맛집 탐방", trait: "foodie", personality: "미식형" }
    ]
  },
  {
    id: 8,
    question: "💬 연인과 첫 싸움 후 화해 방법은?",
    emoji: "😠",
    funComment: "갈등 해결 스타일을 확인해요!",
    options: [
      { value: "A", text: "먼저 연락해서 사과한다", trait: "proactive", personality: "적극형" },
      { value: "B", text: "맛있는 음식을 사들고 간다", trait: "food_peace", personality: "미식평화형" },
      { value: "C", text: "상대가 먼저 연락할 때까지 기다린다", trait: "stubborn", personality: "고집형" },
      { value: "D", text: "장문의 편지나 메시지를 보낸다", trait: "communicator", personality: "소통형" }
    ]
  },
  {
    id: 9,
    question: "🚗 연인의 운전 스타일이 너무 다를 때...",
    emoji: "🚙",
    funComment: "관용과 참을성을 테스트해봐요!",
    options: [
      { value: "A", text: "내가 운전대를 잡는다", trait: "controlling", personality: "컨트롤형" },
      { value: "B", text: "조수석에서 내비게이션만 도와준다", trait: "supportive", personality: "서포트형" },
      { value: "C", text: "눈 감고 음악을 듣는다", trait: "accepting", personality: "순응형" },
      { value: "D", text: "은근히 브레이크 밟는 시늉을 한다", trait: "nervous", personality: "걱정형" }
    ]
  },
  {
    id: 10,
    question: "🎪 연인이 갑자기 '서커스단에 들어가고 싶다'고 한다면?",
    emoji: "🤹‍♀️",
    funComment: "상상력과 지지력을 확인해봐요!",
    options: [
      { value: "A", text: "'나도 함께 간다!' 무조건 지지", trait: "supportive_dreamer", personality: "꿈지지형" },
      { value: "B", text: "'현실적으로 생각해보자' 조언", trait: "realistic", personality: "현실형" },
      { value: "C", text: "'재미있겠다! 어떤 기술 배울 거야?' 호기심", trait: "curious_supporter", personality: "호기심형" },
      { value: "D", text: "'헤어지자...' 이건 너무하다", trait: "practical_limit", personality: "한계형" }
    ]
  }
];

// 직장 동료 궁합 퀴즈 (재미있게 개선된 버전 - 10문항)
export const workplaceQuiz = [
  {
    id: 1,
    question: "🔥 갑자기 중요한 프레젠테이션을 맡게 되었을 때...",
    emoji: "📊",
    funComment: "위기 대응 능력을 확인해봐요!",
    options: [
      { value: "A", text: "밤새서라도 완벽하게 준비한다", trait: "perfectionist", personality: "완벽주의형" },
      { value: "B", text: "동료들에게 도움을 요청한다", trait: "collaborative", personality: "협력형" },
      { value: "C", text: "기존 자료를 재활용해서 빠르게 만든다", trait: "efficient", personality: "효율형" },
      { value: "D", text: "일단 피하고 싶지만... 어쩔 수 없이 한다", trait: "reluctant", personality: "수동형" }
    ]
  },
  {
    id: 2,
    question: "☕ 사무실 커피머신이 고장났을 때 나는...",
    emoji: "💔",
    funComment: "일상의 소소한 문제 해결법을 봐요!",
    options: [
      { value: "A", text: "즉시 관리실에 신고한다", trait: "immediate_action", personality: "즉시행동형" },
      { value: "B", text: "근처 카페에서 커피를 사온다", trait: "alternative", personality: "대안형" },
      { value: "C", text: "고장 원인을 찾아서 직접 고쳐본다", trait: "hands_on", personality: "직접형" },
      { value: "D", text: "'오늘은 커피 없는 날이구나' 체념한다", trait: "accepting", personality: "체념형" }
    ]
  },
  {
    id: 3,
    question: "🍰 동료가 사무실에 케이크를 가져왔을 때...",
    emoji: "🎂",
    funComment: "사회성과 눈치를 확인해봐요!",
    options: [
      { value: "A", text: "가장 먼저 다가가서 먹는다", trait: "bold", personality: "적극형" },
      { value: "B", text: "다른 사람들이 먹는 걸 보고 따라한다", trait: "follower", personality: "관찰형" },
      { value: "C", text: "'고맙다'고 인사하고 정중히 받는다", trait: "polite", personality: "예의형" },
      { value: "D", text: "다이어트 중이라며 정중히 거절한다", trait: "self_controlled", personality: "절제형" }
    ]
  },
  {
    id: 4,
    question: "📧 중요한 이메일에 오타를 발견했을 때...",
    emoji: "😱",
    funComment: "실수 대처법을 확인해봐요!",
    options: [
      { value: "A", text: "즉시 정정 메일을 보낸다", trait: "immediate_correction", personality: "즉시수정형" },
      { value: "B", text: "개별적으로 연락해서 정정한다", trait: "personal_approach", personality: "개별접근형" },
      { value: "C", text: "다음 메일에서 자연스럽게 언급한다", trait: "subtle", personality: "은근형" },
      { value: "D", text: "아무도 못 봤길 바라며 넘어간다", trait: "hopeful", personality: "희망형" }
    ]
  },
  {
    id: 5,
    question: "🏃‍♂️ 승진 기회가 생겼을 때 나의 전략은?",
    emoji: "📈",
    funComment: "야망과 전략을 확인해봐요!",
    options: [
      { value: "A", text: "밤늦게까지 일해서 성과를 낸다", trait: "workaholic", personality: "워커홀릭형" },
      { value: "B", text: "상사와의 관계를 더욱 돈독히 한다", trait: "relationship", personality: "관계형" },
      { value: "C", text: "동료들과 협력해서 팀 성과를 올린다", trait: "team_player", personality: "팀플레이형" },
      { value: "D", text: "자연스럽게 실력으로 인정받기를 기다린다", trait: "natural", personality: "자연형" }
    ]
  },
  {
    id: 6,
    question: "💻 회사 컴퓨터가 느려서 짜증날 때...",
    emoji: "🐌",
    funComment: "스트레스 대처법을 봐요!",
    options: [
      { value: "A", text: "IT팀에 바로 연락한다", trait: "direct_action", personality: "직접행동형" },
      { value: "B", text: "동료 컴퓨터를 잠깐 빌린다", trait: "resourceful", personality: "기지형" },
      { value: "C", text: "재부팅하고 최적화 프로그램을 돌린다", trait: "technical", personality: "기술형" },
      { value: "D", text: "짜증내면서도 그냥 참고 쓴다", trait: "enduring", personality: "인내형" }
    ]
  },
  {
    id: 7,
    question: "🍕 점심 메뉴를 정할 때 우리 팀은...",
    emoji: "🤔",
    funComment: "의사결정 스타일을 확인해봐요!",
    options: [
      { value: "A", text: "내가 먼저 제안한다", trait: "leader", personality: "리더형" },
      { value: "B", text: "다양한 옵션을 조사해서 제시한다", trait: "researcher", personality: "조사형" },
      { value: "C", text: "다수결로 정하자고 제안한다", trait: "democratic", personality: "민주형" },
      { value: "D", text: "아무거나 좋다고 말한다", trait: "flexible", personality: "유연형" }
    ]
  },
  {
    id: 8,
    question: "📞 업무 시간에 개인 전화가 올 때...",
    emoji: "☎️",
    funComment: "공사 구분과 예의를 확인해봐요!",
    options: [
      { value: "A", text: "아예 받지 않는다", trait: "strict_boundary", personality: "경계엄수형" },
      { value: "B", text: "조용히 나가서 짧게 받는다", trait: "considerate", personality: "배려형" },
      { value: "C", text: "자리에서 작은 목소리로 받는다", trait: "discreet", personality: "신중형" },
      { value: "D", text: "급한 일일 수도 있으니 일단 받는다", trait: "responsive", personality: "반응형" }
    ]
  },
  {
    id: 9,
    question: "🎉 팀 회식 자리에서 나는...",
    emoji: "🍻",
    funComment: "사교성과 회식 스타일을 봐요!",
    options: [
      { value: "A", text: "분위기 메이커 역할을 한다", trait: "entertainer", personality: "분위기메이커형" },
      { value: "B", text: "조용히 앉아서 음식만 먹는다", trait: "quiet", personality: "조용형" },
      { value: "C", text: "적당히 참여하며 대화한다", trait: "moderate", personality: "적당형" },
      { value: "D", text: "빠른 시간 내에 자리를 뜬다", trait: "early_leave", personality: "조기퇴근형" }
    ]
  },
  {
    id: 10,
    question: "🚀 '화성 이주 프로젝트' 팀에 뽑혔다면?",
    emoji: "👨‍🚀",
    funComment: "모험심과 도전 정신을 확인해봐요!",
    options: [
      { value: "A", text: "'언제 출발하나요?' 즉시 수락", trait: "adventurous", personality: "모험형" },
      { value: "B", text: "'계약서부터 검토해볼게요' 신중 검토", trait: "cautious", personality: "신중형" },
      { value: "C", text: "'팀원들은 누구인가요?' 인적사항 확인", trait: "people_focused", personality: "인간중심형" },
      { value: "D", text: "'죄송하지만...' 정중히 거절", trait: "risk_averse", personality: "안전형" }
    ]
  }
];

// 친구 궁합 퀴즈 (재미있게 개선된 버전 - 10문항)
export const friendshipQuiz = [
  {
    id: 1,
    question: "🍕 친구와 피자를 시킬 때 나는...",
    emoji: "🍕",
    funComment: "음식 취향으로 우정도 알 수 있어요!",
    options: [
      { value: "A", text: "내가 좋아하는 걸로 주문한다", trait: "decisive", personality: "결정형" },
      { value: "B", text: "친구 취향을 먼저 물어본다", trait: "considerate", personality: "배려형" },
      { value: "C", text: "반반으로 시킨다", trait: "compromising", personality: "타협형" },
      { value: "D", text: "새로운 메뉴에 도전한다", trait: "adventurous", personality: "모험형" }
    ]
  },
  {
    id: 2,
    question: "📱 친구가 답장을 안 할 때 나의 반응은?",
    emoji: "📱",
    funComment: "소통 스타일을 확인해봐요!",
    options: [
      { value: "A", text: "계속 메시지를 보낸다", trait: "persistent", personality: "적극형" },
      { value: "B", text: "하루 정도 기다린다", trait: "patient", personality: "인내형" },
      { value: "C", text: "바쁠 수도 있지 하고 넘어간다", trait: "understanding", personality: "이해형" },
      { value: "D", text: "직접 만나서 확인한다", trait: "direct", personality: "직접형" }
    ]
  },
  {
    id: 3,
    question: "🎬 친구와 영화를 볼 때 장르 선택은?",
    emoji: "🎬",
    funComment: "취향 조율 능력을 봐요!",
    options: [
      { value: "A", text: "내가 보고 싶은 것 위주로", trait: "self_focused", personality: "주도형" },
      { value: "B", text: "친구가 좋아할 만한 것으로", trait: "friend_focused", personality: "친구중심형" },
      { value: "C", text: "둘 다 처음 보는 것으로 도전", trait: "experimental", personality: "실험형" },
      { value: "D", text: "가위바위보로 정한다", trait: "fair", personality: "공정형" }
    ]
  },
  {
    id: 4,
    question: "💰 친구가 돈을 빌려달라고 할 때...",
    emoji: "💰",
    funComment: "신뢰와 경계의 균형을 확인해요!",
    options: [
      { value: "A", text: "금액 상관없이 바로 빌려준다", trait: "generous", personality: "관대형" },
      { value: "B", text: "이유를 묻고 빌려준다", trait: "cautious", personality: "신중형" },
      { value: "C", text: "적은 금액만 빌려준다", trait: "careful", personality: "조심형" },
      { value: "D", text: "차라리 밥을 사준다", trait: "alternative", personality: "대안형" }
    ]
  },
  {
    id: 5,
    question: "🎉 친구 생일파티를 계획할 때 나는...",
    emoji: "🎉",
    funComment: "이벤트 기획력을 확인해봐요!",
    options: [
      { value: "A", text: "깜짝 파티를 준비한다", trait: "surprise_planner", personality: "서프라이즈형" },
      { value: "B", text: "친구가 원하는 걸 물어본다", trait: "collaborative", personality: "협력형" },
      { value: "C", text: "간단하게 케이크만 준비", trait: "simple", personality: "심플형" },
      { value: "D", text: "다른 친구들과 함께 준비", trait: "team_player", personality: "팀워크형" }
    ]
  },
  {
    id: 6,
    question: "😢 친구가 힘들어할 때 나는...",
    emoji: "😢",
    funComment: "위로 스타일을 확인해봐요!",
    options: [
      { value: "A", text: "계속 옆에서 들어준다", trait: "listener", personality: "경청형" },
      { value: "B", text: "해결책을 제시한다", trait: "problem_solver", personality: "해결형" },
      { value: "C", text: "재미있는 일로 기분전환", trait: "entertainer", personality: "기분전환형" },
      { value: "D", text: "맛있는 음식을 사준다", trait: "comforter", personality: "위로형" }
    ]
  },
  {
    id: 7,
    question: "🚗 여행갈 때 친구와의 역할 분담은?",
    emoji: "🚗",
    funComment: "여행 스타일을 확인해봐요!",
    options: [
      { value: "A", text: "내가 모든 계획을 세운다", trait: "planner", personality: "계획형" },
      { value: "B", text: "친구가 계획하면 따라간다", trait: "follower", personality: "따라가기형" },
      { value: "C", text: "역할을 나누어서 준비", trait: "organizer", personality: "분담형" },
      { value: "D", text: "즉흥적으로 다닌다", trait: "spontaneous", personality: "즉흥형" }
    ]
  },
  {
    id: 8,
    question: "💭 친구의 비밀을 들었을 때...",
    emoji: "💭",
    funComment: "신뢰도를 측정해봐요!",
    options: [
      { value: "A", text: "무덤까지 가져간다", trait: "trustworthy", personality: "신뢰형" },
      { value: "B", text: "다른 가까운 친구에게만 말한다", trait: "selective_sharer", personality: "선택공유형" },
      { value: "C", text: "조언을 구하려고 말할 수도", trait: "advice_seeker", personality: "조언구함형" },
      { value: "D", text: "실수로 말할까 봐 걱정된다", trait: "worried", personality: "걱정형" }
    ]
  },
  {
    id: 9,
    question: "🎯 친구와 의견이 크게 다를 때...",
    emoji: "🎯",
    funComment: "갈등 해결 방식을 봐요!",
    options: [
      { value: "A", text: "끝까지 내 의견을 고수한다", trait: "stubborn", personality: "고집형" },
      { value: "B", text: "친구 의견도 일리가 있다고 인정", trait: "open_minded", personality: "열린형" },
      { value: "C", text: "중간점을 찾으려 노력한다", trait: "mediator", personality: "중재형" },
      { value: "D", text: "그냥 화제를 바꾼다", trait: "avoider", personality: "회피형" }
    ]
  },
  {
    id: 10,
    question: "🌟 친구가 갑자기 '외계인이 존재한다고 확신한다'면?",
    emoji: "🌟",
    funComment: "포용력과 개방성을 확인해봐요!",
    options: [
      { value: "A", text: "'나도 그렇게 생각해!' 동조한다", trait: "supportive", personality: "지지형" },
      { value: "B", text: "'근거가 있어?' 논리적으로 접근", trait: "logical", personality: "논리형" },
      { value: "C", text: "'재밌는 생각이네!' 관심 표현", trait: "curious", personality: "호기심형" },
      { value: "D", text: "'너답다...' 그냥 웃고 넘어감", trait: "accepting", personality: "수용형" }
    ]
  }
];

// 게임 동료 궁합 퀴즈 (재미있게 개선된 버전 - 10문항)
export const gamingQuiz = [
  {
    id: 1,
    question: "🎮 새로운 게임을 시작할 때 나는...",
    emoji: "🎮",
    funComment: "게임 접근 방식을 확인해봐요!",
    options: [
      { value: "A", text: "튜토리얼을 꼼꼼히 본다", trait: "methodical", personality: "체계형" },
      { value: "B", text: "바로 게임에 뛰어든다", trait: "impulsive", personality: "즉흥형" },
      { value: "C", text: "공략을 먼저 찾아본다", trait: "strategic", personality: "전략형" },
      { value: "D", text: "친구들과 함께 배운다", trait: "social", personality: "사교형" }
    ]
  },
  {
    id: 2,
    question: "⚔️ 팀 전투에서 나의 역할은?",
    emoji: "⚔️",
    funComment: "전투 스타일을 알아봐요!",
    options: [
      { value: "A", text: "최전선에서 돌격한다", trait: "aggressive", personality: "공격형" },
      { value: "B", text: "뒤에서 서포트한다", trait: "supportive", personality: "서포트형" },
      { value: "C", text: "상황을 보고 판단한다", trait: "tactical", personality: "전술형" },
      { value: "D", text: "팀원들을 지휘한다", trait: "leader", personality: "리더형" }
    ]
  },
  {
    id: 3,
    question: "💰 게임 내 아이템 구매할 때...",
    emoji: "💰",
    funComment: "투자 성향을 확인해봐요!",
    options: [
      { value: "A", text: "성능 좋은 것만 산다", trait: "performance", personality: "성능형" },
      { value: "B", text: "예쁜/멋진 스킨을 산다", trait: "aesthetic", personality: "미적형" },
      { value: "C", text: "꼭 필요한 것만 산다", trait: "practical", personality: "실용형" },
      { value: "D", text: "무료로만 플레이한다", trait: "frugal", personality: "절약형" }
    ]
  },
  {
    id: 4,
    question: "😡 게임에서 연속으로 질 때 나는...",
    emoji: "😡",
    funComment: "스트레스 대처법을 봐요!",
    options: [
      { value: "A", text: "더 열심히 연습한다", trait: "persistent", personality: "끈기형" },
      { value: "B", text: "잠깐 다른 게임을 한다", trait: "adaptive", personality: "적응형" },
      { value: "C", text: "게임을 끄고 휴식한다", trait: "self_aware", personality: "자제형" },
      { value: "D", text: "친구들과 대화로 푼다", trait: "social_relief", personality: "소통형" }
    ]
  },
  {
    id: 5,
    question: "🏆 팀이 이겼을 때 내 반응은?",
    emoji: "🏆",
    funComment: "승리 반응을 확인해봐요!",
    options: [
      { value: "A", text: "\"제가 캐리했죠!\" 자랑한다", trait: "confident", personality: "자신감형" },
      { value: "B", text: "\"우리 팀워크 최고!\" 팀을 칭찬", trait: "team_focused", personality: "팀중심형" },
      { value: "C", text: "조용히 뿌듯해한다", trait: "humble", personality: "겸손형" },
      { value: "D", text: "다음 게임을 바로 시작한다", trait: "game_focused", personality: "게임몰입형" }
    ]
  },
  {
    id: 6,
    question: "🎯 어려운 보스를 마주쳤을 때...",
    emoji: "🎯",
    funComment: "도전 정신을 확인해봐요!",
    options: [
      { value: "A", text: "혼자서 계속 도전한다", trait: "solo_challenger", personality: "단독도전형" },
      { value: "B", text: "팀원들과 전략을 짠다", trait: "team_strategist", personality: "팀전략형" },
      { value: "C", text: "공략을 찾아본다", trait: "researcher", personality: "연구형" },
      { value: "D", text: "레벨을 더 올리고 온다", trait: "preparer", personality: "준비형" }
    ]
  },
  {
    id: 7,
    question: "🗣️ 게임 중 의사소통 방식은?",
    emoji: "🗣️",
    funComment: "소통 스타일을 봐요!",
    options: [
      { value: "A", text: "계속 떠들면서 한다", trait: "chatty", personality: "수다형" },
      { value: "B", text: "중요한 것만 말한다", trait: "concise", personality: "간결형" },
      { value: "C", text: "거의 말을 안 한다", trait: "quiet", personality: "조용형" },
      { value: "D", text: "분위기에 맞춰 조절한다", trait: "flexible", personality: "유연형" }
    ]
  },
  {
    id: 8,
    question: "📊 게임 통계를 볼 때 가장 중요한 것은?",
    emoji: "📊",
    funComment: "성과 측정 방식을 확인해요!",
    options: [
      { value: "A", text: "개인 킬/데스 비율", trait: "individual", personality: "개인성과형" },
      { value: "B", text: "팀 승률", trait: "team_success", personality: "팀성공형" },
      { value: "C", text: "개인 성장 그래프", trait: "improvement", personality: "성장형" },
      { value: "D", text: "재미있었던 순간들", trait: "fun_focused", personality: "재미중심형" }
    ]
  },
  {
    id: 9,
    question: "🕐 게임 시간 관리는?",
    emoji: "🕐",
    funComment: "시간 관리 능력을 봐요!",
    options: [
      { value: "A", text: "시간 가는 줄 모르고 한다", trait: "immersive", personality: "몰입형" },
      { value: "B", text: "알람을 맞춰놓고 한다", trait: "controlled", personality: "통제형" },
      { value: "C", text: "친구들과 약속시간만 정한다", trait: "social_timing", personality: "사교시간형" },
      { value: "D", text: "기분에 따라 다르다", trait: "mood_dependent", personality: "기분따라형" }
    ]
  },
  {
    id: 10,
    question: "🚀 팀원이 '나 프로게이머 될 거야!'라고 한다면?",
    emoji: "🚀",
    funComment: "꿈 지지와 현실감각을 확인해요!",
    options: [
      { value: "A", text: "'나도 함께 도전할게!' 동참", trait: "ambitious", personality: "야망형" },
      { value: "B", text: "'일단 연습 더 해보자' 현실조언", trait: "realistic", personality: "현실형" },
      { value: "C", text: "'응원할게!' 무조건 지지", trait: "supportive", personality: "응원형" },
      { value: "D", text: "'그래도 재미로만 하자' 취미추천", trait: "casual", personality: "캐주얼형" }
    ]
  }
];

// 성향별 궁합 매트릭스 (재미있는 조합으로 업데이트)
export const compatibilityMatrix = {
  romantic: {
    // 기본 궁합도
    warrior: { warrior: 0.7, strategic: 0.8, social: 0.9, protective: 0.8 },
    strategic: { warrior: 0.8, strategic: 0.6, social: 0.7, protective: 0.9 },
    social: { warrior: 0.9, strategic: 0.7, social: 0.8, protective: 0.7 },
    protective: { warrior: 0.8, strategic: 0.9, social: 0.7, protective: 0.6 },
    
    independent: { independent: 0.5, sharing: 0.8, considerate: 0.7, indecisive: 0.6 },
    sharing: { independent: 0.8, sharing: 0.9, considerate: 0.9, indecisive: 0.7 },
    considerate: { independent: 0.7, sharing: 0.9, considerate: 0.8, indecisive: 0.8 },
    indecisive: { independent: 0.6, sharing: 0.7, considerate: 0.8, indecisive: 0.4 },
    
    different_taste: { different_taste: 0.6, fair: 0.8, organized: 0.7, adventurous: 0.9 },
    fair: { different_taste: 0.8, fair: 0.8, organized: 0.9, adventurous: 0.8 },
    organized: { different_taste: 0.7, fair: 0.9, organized: 0.8, adventurous: 0.7 },
    adventurous: { different_taste: 0.9, fair: 0.8, organized: 0.7, adventurous: 0.8 },
    
    curious: { curious: 0.7, pretending: 0.6, trusting: 0.8, sneaky: 0.5 },
    pretending: { curious: 0.6, pretending: 0.8, trusting: 0.7, sneaky: 0.7 },
    trusting: { curious: 0.8, pretending: 0.7, trusting: 0.9, sneaky: 0.4 },
    sneaky: { curious: 0.5, pretending: 0.7, trusting: 0.4, sneaky: 0.6 },
    
    practical: { practical: 0.8, handmade: 0.7, experiential: 0.6, investigative: 0.9 },
    handmade: { practical: 0.7, handmade: 0.9, experiential: 0.8, investigative: 0.7 },
    experiential: { practical: 0.6, handmade: 0.8, experiential: 0.9, investigative: 0.8 },
    investigative: { practical: 0.9, handmade: 0.7, experiential: 0.8, investigative: 0.8 },
    
    spontaneous: { spontaneous: 0.8, patient: 0.7, problem_solver: 0.6, romantic: 0.9 },
    patient: { spontaneous: 0.7, patient: 0.9, problem_solver: 0.8, romantic: 0.8 },
    problem_solver: { spontaneous: 0.6, patient: 0.8, problem_solver: 0.7, romantic: 0.7 },
    romantic: { spontaneous: 0.9, patient: 0.8, problem_solver: 0.7, romantic: 0.8 },
    
    homebody: { homebody: 0.9, aesthetic: 0.7, active: 0.4, foodie: 0.8 },
    aesthetic: { homebody: 0.7, aesthetic: 0.8, active: 0.6, foodie: 0.9 },
    active: { homebody: 0.4, aesthetic: 0.6, active: 0.8, foodie: 0.7 },
    foodie: { homebody: 0.8, aesthetic: 0.9, active: 0.7, foodie: 0.9 },
    
    proactive: { proactive: 0.8, food_peace: 0.9, stubborn: 0.5, communicator: 0.9 },
    food_peace: { proactive: 0.9, food_peace: 0.8, stubborn: 0.7, communicator: 0.8 },
    stubborn: { proactive: 0.5, food_peace: 0.7, stubborn: 0.4, communicator: 0.6 },
    communicator: { proactive: 0.9, food_peace: 0.8, stubborn: 0.6, communicator: 0.9 },
    
    controlling: { controlling: 0.5, supportive: 0.7, accepting: 0.8, nervous: 0.6 },
    supportive: { controlling: 0.7, supportive: 0.9, accepting: 0.8, nervous: 0.8 },
    accepting: { controlling: 0.8, supportive: 0.8, accepting: 0.7, nervous: 0.9 },
    nervous: { controlling: 0.6, supportive: 0.8, accepting: 0.9, nervous: 0.6 },
    
    supportive_dreamer: { supportive_dreamer: 0.9, realistic: 0.6, curious_supporter: 0.9, practical_limit: 0.3 },
    realistic: { supportive_dreamer: 0.6, realistic: 0.8, curious_supporter: 0.7, practical_limit: 0.9 },
    curious_supporter: { supportive_dreamer: 0.9, realistic: 0.7, curious_supporter: 0.8, practical_limit: 0.5 },
    practical_limit: { supportive_dreamer: 0.3, realistic: 0.9, curious_supporter: 0.5, practical_limit: 0.7 }
  },
  
  workplace: {
    perfectionist: { perfectionist: 0.7, collaborative: 0.8, efficient: 0.6, reluctant: 0.5 },
    collaborative: { perfectionist: 0.8, collaborative: 0.9, efficient: 0.8, reluctant: 0.7 },
    efficient: { perfectionist: 0.6, collaborative: 0.8, efficient: 0.8, reluctant: 0.6 },
    reluctant: { perfectionist: 0.5, collaborative: 0.7, efficient: 0.6, reluctant: 0.5 },
    
    immediate_action: { immediate_action: 0.8, alternative: 0.7, hands_on: 0.9, accepting: 0.6 },
    alternative: { immediate_action: 0.7, alternative: 0.8, hands_on: 0.6, accepting: 0.7 },
    hands_on: { immediate_action: 0.9, alternative: 0.6, hands_on: 0.8, accepting: 0.5 },
    accepting: { immediate_action: 0.6, alternative: 0.7, hands_on: 0.5, accepting: 0.7 },
    
    bold: { bold: 0.7, follower: 0.8, polite: 0.8, self_controlled: 0.6 },
    follower: { bold: 0.8, follower: 0.6, polite: 0.9, self_controlled: 0.8 },
    polite: { bold: 0.8, follower: 0.9, polite: 0.9, self_controlled: 0.8 },
    self_controlled: { bold: 0.6, follower: 0.8, polite: 0.8, self_controlled: 0.7 },
    
    immediate_correction: { immediate_correction: 0.8, personal_approach: 0.9, subtle: 0.6, hopeful: 0.4 },
    personal_approach: { immediate_correction: 0.9, personal_approach: 0.8, subtle: 0.8, hopeful: 0.6 },
    subtle: { immediate_correction: 0.6, personal_approach: 0.8, subtle: 0.8, hopeful: 0.7 },
    hopeful: { immediate_correction: 0.4, personal_approach: 0.6, subtle: 0.7, hopeful: 0.6 },
    
    workaholic: { workaholic: 0.8, relationship: 0.6, team_player: 0.7, natural: 0.5 },
    relationship: { workaholic: 0.6, relationship: 0.8, team_player: 0.9, natural: 0.7 },
    team_player: { workaholic: 0.7, relationship: 0.9, team_player: 0.9, natural: 0.8 },
    natural: { workaholic: 0.5, relationship: 0.7, team_player: 0.8, natural: 0.8 },
    
    direct_action: { direct_action: 0.8, resourceful: 0.9, technical: 0.7, enduring: 0.6 },
    resourceful: { direct_action: 0.9, resourceful: 0.8, technical: 0.8, enduring: 0.7 },
    technical: { direct_action: 0.7, resourceful: 0.8, technical: 0.9, enduring: 0.6 },
    enduring: { direct_action: 0.6, resourceful: 0.7, technical: 0.6, enduring: 0.7 },
    
    leader: { leader: 0.7, researcher: 0.8, democratic: 0.9, flexible: 0.8 },
    researcher: { leader: 0.8, researcher: 0.8, democratic: 0.8, flexible: 0.7 },
    democratic: { leader: 0.9, researcher: 0.8, democratic: 0.8, flexible: 0.9 },
    flexible: { leader: 0.8, researcher: 0.7, democratic: 0.9, flexible: 0.7 },
    
    strict_boundary: { strict_boundary: 0.8, considerate: 0.7, discreet: 0.8, responsive: 0.5 },
    considerate: { strict_boundary: 0.7, considerate: 0.9, discreet: 0.9, responsive: 0.8 },
    discreet: { strict_boundary: 0.8, considerate: 0.9, discreet: 0.8, responsive: 0.7 },
    responsive: { strict_boundary: 0.5, considerate: 0.8, discreet: 0.7, responsive: 0.8 },
    
    entertainer: { entertainer: 0.8, quiet: 0.6, moderate: 0.9, early_leave: 0.5 },
    quiet: { entertainer: 0.6, quiet: 0.7, moderate: 0.8, early_leave: 0.8 },
    moderate: { entertainer: 0.9, quiet: 0.8, moderate: 0.8, early_leave: 0.7 },
    early_leave: { entertainer: 0.5, quiet: 0.8, moderate: 0.7, early_leave: 0.6 },
    
    adventurous: { adventurous: 0.9, cautious: 0.6, people_focused: 0.8, risk_averse: 0.4 },
    cautious: { adventurous: 0.6, cautious: 0.8, people_focused: 0.7, risk_averse: 0.9 },
    people_focused: { adventurous: 0.8, cautious: 0.7, people_focused: 0.9, risk_averse: 0.6 },
    risk_averse: { adventurous: 0.4, cautious: 0.9, people_focused: 0.6, risk_averse: 0.8 }
  },
  friendship: {
    decisive: { decisive: 0.8, persistent: 0.7, self_focused: 0.6, friend_focused: 0.9 },
    persistent: { decisive: 0.7, persistent: 0.9, understanding: 0.8, direct: 0.6 },
    understanding: { decisive: 0.6, persistent: 0.8, understanding: 0.9, direct: 0.7 },
    direct: { decisive: 0.6, persistent: 0.7, understanding: 0.7, direct: 0.8 },
    
    generous: { generous: 0.9, cautious: 0.8, careful: 0.7, alternative: 0.6 },
    cautious: { generous: 0.8, cautious: 0.9, careful: 0.8, alternative: 0.7 },
    careful: { generous: 0.7, cautious: 0.8, careful: 0.9, alternative: 0.8 },
    alternative: { generous: 0.6, cautious: 0.7, careful: 0.8, alternative: 0.9 },
    
    surprise_planner: { surprise_planner: 0.9, collaborative: 0.8, simple: 0.7, team_player: 0.6 },
    collaborative: { surprise_planner: 0.8, collaborative: 0.9, simple: 0.8, team_player: 0.7 },
    simple: { surprise_planner: 0.7, collaborative: 0.8, simple: 0.9, team_player: 0.8 },
    team_player: { surprise_planner: 0.6, collaborative: 0.7, simple: 0.8, team_player: 0.9 },
    
    listener: { listener: 0.9, problem_solver: 0.8, entertainer: 0.7, comforter: 0.6 },
    problem_solver: { listener: 0.8, problem_solver: 0.9, entertainer: 0.8, comforter: 0.7 },
    entertainer: { listener: 0.7, problem_solver: 0.8, entertainer: 0.9, comforter: 0.8 },
    comforter: { listener: 0.6, problem_solver: 0.7, entertainer: 0.8, comforter: 0.9 },
    
    planner: { planner: 0.8, follower: 0.7, organizer: 0.6, spontaneous: 0.9 },
    follower: { planner: 0.7, follower: 0.9, organizer: 0.8, spontaneous: 0.8 },
    organizer: { planner: 0.6, follower: 0.8, organizer: 0.9, spontaneous: 0.7 },
    spontaneous: { planner: 0.9, follower: 0.8, organizer: 0.7, spontaneous: 0.8 },
    
    trustworthy: { trustworthy: 0.9, selective_sharer: 0.8, advice_seeker: 0.7, worried: 0.6 },
    selective_sharer: { trustworthy: 0.8, selective_sharer: 0.9, advice_seeker: 0.8, worried: 0.7 },
    advice_seeker: { trustworthy: 0.7, selective_sharer: 0.8, advice_seeker: 0.9, worried: 0.8 },
    worried: { trustworthy: 0.6, selective_sharer: 0.7, advice_seeker: 0.8, worried: 0.9 },
    
    stubborn: { stubborn: 0.7, open_minded: 0.6, mediator: 0.5, avoider: 0.4 },
    open_minded: { stubborn: 0.6, open_minded: 0.8, mediator: 0.7, avoider: 0.6 },
    mediator: { stubborn: 0.5, open_minded: 0.7, mediator: 0.9, avoider: 0.8 },
    avoider: { stubborn: 0.4, open_minded: 0.6, mediator: 0.8, avoider: 0.9 },
    
    supportive: { supportive: 0.9, logical: 0.8, curious: 0.7, accepting: 0.6 },
    logical: { supportive: 0.8, logical: 0.9, curious: 0.8, accepting: 0.7 },
    curious: { supportive: 0.7, logical: 0.8, curious: 0.9, accepting: 0.8 },
    accepting: { supportive: 0.6, logical: 0.7, curious: 0.8, accepting: 0.9 }
  },
  gaming: {
    methodical: { methodical: 0.9, impulsive: 0.8, strategic: 0.7, social: 0.6 },
    impulsive: { methodical: 0.8, impulsive: 0.9, strategic: 0.8, social: 0.7 },
    strategic: { methodical: 0.7, impulsive: 0.8, strategic: 0.9, social: 0.8 },
    social: { methodical: 0.6, impulsive: 0.7, strategic: 0.8, social: 0.9 },
    
    aggressive: { aggressive: 0.8, supportive: 0.7, tactical: 0.6, leader: 0.5 },
    supportive: { aggressive: 0.7, supportive: 0.9, tactical: 0.8, leader: 0.7 },
    tactical: { aggressive: 0.6, supportive: 0.8, tactical: 0.9, leader: 0.8 },
    leader: { aggressive: 0.5, supportive: 0.7, tactical: 0.8, leader: 0.9 },
    
    performance: { performance: 0.9, aesthetic: 0.8, practical: 0.7, frugal: 0.6 },
    aesthetic: { performance: 0.8, aesthetic: 0.9, practical: 0.8, frugal: 0.7 },
    practical: { performance: 0.7, aesthetic: 0.8, practical: 0.9, frugal: 0.8 },
    frugal: { performance: 0.6, aesthetic: 0.7, practical: 0.8, frugal: 0.9 },
    
    persistent: { persistent: 0.9, adaptive: 0.8, self_aware: 0.7, social_relief: 0.6 },
    adaptive: { persistent: 0.8, adaptive: 0.9, self_aware: 0.8, social_relief: 0.7 },
    self_aware: { persistent: 0.7, adaptive: 0.8, self_aware: 0.9, social_relief: 0.8 },
    social_relief: { persistent: 0.6, adaptive: 0.7, self_aware: 0.8, social_relief: 0.9 },
    
    confident: { confident: 0.8, team_focused: 0.7, humble: 0.6, game_focused: 0.5 },
    team_focused: { confident: 0.7, team_focused: 0.9, humble: 0.8, game_focused: 0.7 },
    humble: { confident: 0.6, team_focused: 0.8, humble: 0.9, game_focused: 0.8 },
    game_focused: { confident: 0.5, team_focused: 0.7, humble: 0.8, game_focused: 0.9 },
    
    solo_challenger: { solo_challenger: 0.9, team_strategist: 0.8, researcher: 0.7, preparer: 0.6 },
    team_strategist: { solo_challenger: 0.8, team_strategist: 0.9, researcher: 0.8, preparer: 0.7 },
    researcher: { solo_challenger: 0.7, team_strategist: 0.8, researcher: 0.9, preparer: 0.8 },
    preparer: { solo_challenger: 0.6, team_strategist: 0.7, researcher: 0.8, preparer: 0.9 },
    
    chatty: { chatty: 0.9, concise: 0.8, quiet: 0.7, flexible: 0.6 },
    concise: { chatty: 0.8, concise: 0.9, quiet: 0.8, flexible: 0.7 },
    quiet: { chatty: 0.7, concise: 0.8, quiet: 0.9, flexible: 0.8 },
    flexible: { chatty: 0.6, concise: 0.7, quiet: 0.8, flexible: 0.9 },
    
    individual: { individual: 0.9, team_success: 0.8, improvement: 0.7, fun_focused: 0.6 },
    team_success: { individual: 0.8, team_success: 0.9, improvement: 0.8, fun_focused: 0.7 },
    improvement: { individual: 0.7, team_success: 0.8, improvement: 0.9, fun_focused: 0.8 },
    fun_focused: { individual: 0.6, team_success: 0.7, improvement: 0.8, fun_focused: 0.9 },
    
    immersive: { immersive: 0.9, controlled: 0.8, social_timing: 0.7, mood_dependent: 0.6 },
    controlled: { immersive: 0.8, controlled: 0.9, social_timing: 0.8, mood_dependent: 0.7 },
    social_timing: { immersive: 0.7, controlled: 0.8, social_timing: 0.9, mood_dependent: 0.8 },
    mood_dependent: { immersive: 0.6, controlled: 0.7, social_timing: 0.8, mood_dependent: 0.9 },
    
    ambitious: { ambitious: 0.9, realistic: 0.8, supportive: 0.7, casual: 0.6 },
    realistic: { ambitious: 0.8, realistic: 0.9, supportive: 0.8, casual: 0.7 },
    supportive: { ambitious: 0.7, realistic: 0.8, supportive: 0.9, casual: 0.8 },
    casual: { ambitious: 0.6, realistic: 0.7, supportive: 0.8, casual: 0.9 }
  }
};

// 재미있는 궁합 타입 및 별명 추가
export const compatibilityTypes = {
  romantic: {
    95: { nickname: "우주 최강 커플 💫", description: "여러분은 운명입니다!" },
    90: { nickname: "환상의 듀오 ✨", description: "완벽한 조합이에요!" },
    85: { nickname: "달콤한 케미 🍯", description: "정말 잘 어울려요!" },
    80: { nickname: "좋은 파트너 💕", description: "서로를 잘 이해해요!" },
    75: { nickname: "괜찮은 조합 👍", description: "노력하면 더 좋아질 거예요!" },
    70: { nickname: "평범한 커플 😊", description: "평범하지만 나쁘지 않아요!" },
    65: { nickname: "톰과 제리 😅", description: "싸우면서도 정이 있어요!" },
    60: { nickname: "극과 극 ⚡", description: "다른 것이 매력일 수도!" },
    55: { nickname: "어색한 사이 😐", description: "시간이 필요해요!" },
    50: { nickname: "평행선 ➡️", description: "각자의 길을 가는 게 나을지도..." }
  },
  workplace: {
    95: { nickname: "드림팀 🏆", description: "최고의 협업 파트너!" },
    90: { nickname: "환상의 콤비 ⭐", description: "일이 술술 풀려요!" },
    85: { nickname: "완벽한 팀워크 🤝", description: "서로 보완이 잘 돼요!" },
    80: { nickname: "좋은 동료 👔", description: "함께 일하기 좋아요!" },
    75: { nickname: "괜찮은 파트너 📈", description: "조금만 더 맞춰보세요!" },
    70: { nickname: "평범한 동료 💼", description: "무난하게 일할 수 있어요!" },
    65: { nickname: "어정쩡한 사이 🤔", description: "역할 분담이 필요해요!" },
    60: { nickname: "기름과 물 💧", description: "스타일이 많이 달라요!" },
    55: { nickname: "소통 필요 📞", description: "대화가 더 필요해요!" },
    50: { nickname: "따로 또 같이 🔄", description: "각자 일하는 게 나을지도..." }
  },
  friendship: {
    95: { nickname: "완벽한 친구 쌍 💖", description: "서로 이해하고 신뢰해요!" },
    90: { nickname: "친구 중 친구 🤝", description: "서로 잘 어울려요!" },
    85: { nickname: "친구 중 친구 중 친구 🤗", description: "서로 재미있게 놀아요!" },
    80: { nickname: "친구 중 친구 중 친구 중 친구 🤝", description: "서로 도움이 되요!" },
    75: { nickname: "친구 중 친구 중 친구 중 친구 중 친구 🤝", description: "서로 즐거운 시간을 보내요!" },
    70: { nickname: "친구 중 친구 중 친구 중 친구 중 친구 중 친구 🤝", description: "서로 소통하며 성장해요!" },
    65: { nickname: "친구 중 친구 중 친구 중 친구 중 친구 중 친구 중 친구 🤝", description: "서로 즐거운 추억을 만들어요!" },
    60: { nickname: "친구 중 친구 중 친구 중 친구 중 친구 중 친구 중 친구 중 친구 🤝", description: "서로 소중한 친구가 되었어요!" },
    55: { nickname: "친구 중 친구 중 친구 중 친구 중 친구 중 친구 중 친구 중 친구 중 친구 🤝", description: "서로 즐거운 추억을 만들어요!" },
    50: { nickname: "친구 중 친구 중 친구 중 친구 중 친구 중 친구 중 친구 중 친구 중 친구 중 친구 🤝", description: "서로 소중한 친구가 되었어요!" }
  },
  gaming: {
    95: { nickname: "완벽한 게임 파트너 🎮", description: "서로 재미있게 놀아요!" },
    90: { nickname: "친구 중 게임 파트너 🤝", description: "서로 도움이 되요!" },
    85: { nickname: "친구 중 게임 파트너 중 게임 파트너 🤗", description: "서로 재미있게 놀아요!" },
    80: { nickname: "친구 중 게임 파트너 중 게임 파트너 중 게임 파트너 🤝", description: "서로 도움이 되요!" },
    75: { nickname: "친구 중 게임 파트너 중 게임 파트너 중 게임 파트너 중 게임 파트너 🤝", description: "서로 즐거운 시간을 보내요!" },
    70: { nickname: "친구 중 게임 파트너 중 게임 파트너 중 게임 파트너 중 게임 파트너 중 게임 파트너 🤝", description: "서로 즐거운 추억을 만들어요!" },
    65: { nickname: "친구 중 게임 파트너 중 게임 파트너 중 게임 파트너 중 게임 파트너 중 게임 파트너 중 게임 파트너 🤝", description: "서로 소중한 친구가 되었어요!" },
    60: { nickname: "친구 중 게임 파트너 중 게임 파트너 중 게임 파트너 중 게임 파트너 중 게임 파트너 중 게임 파트너 중 게임 파트너 🤝", description: "서로 즐거운 추억을 만들어요!" },
    55: { nickname: "친구 중 게임 파트너 중 게임 파트너 중 게임 파트너 중 게임 파트너 중 게임 파트너 중 게임 파트너 중 게임 파트너 중 게임 파트너 🤝", description: "서로 소중한 친구가 되었어요!" },
    50: { nickname: "친구 중 게임 파트너 중 게임 파트너 중 게임 파트너 중 게임 파트너 중 게임 파트너 중 게임 파트너 중 게임 파트너 중 게임 파트너 중 게임 파트너 🤝", description: "서로 즐거운 추억을 만들어요!" }
  }
};

// 성향별 재미있는 설명 추가
export const personalityDescriptions = {
  romantic: {
    전투형: "위기 상황에서 연인과 함께 맞서는 용감한 전사! ⚔️",
    전략형: "차근차근 계획하며 안전을 중시하는 현명한 전략가! 🧠",
    협력형: "모두와 함께 힘을 합치는 따뜻한 리더! 🤝",
    보호형: "연인을 위해서라면 무엇이든 하는 든든한 보호자! 🛡️",
    // ... 더 많은 성향들
  },
  workplace: {
    완벽주의형: "디테일 하나하나 놓치지 않는 품질의 수호자! 🔍",
    협력형: "팀워크로 모든 것을 해결하는 협업의 달인! 🤝",
    효율형: "최소한의 노력으로 최대의 효과를 내는 효율성 마스터! ⚡",
    수동형: "조용히 자신의 몫을 다하는 신중한 실무자! 🤫",
    // ... 더 많은 성향들
  },
  friendship: {
    결정형: "친구와 함께 하는 일은 빠르고 명확하게 결정하는 타입! ⚔️",
    배려형: "친구의 취향과 상황을 고려하여 소통하는 타입! 🤝",
    타협형: "친구와 의견이 다를 때 소통하며 합의를 이루는 타입! 🤗",
    모험형: "친구와 함께 새로운 경험을 도전하는 타입! 🚀",
    신중형: "친구와 관계에 대해 신중하게 판단하고 결정하는 타입! 🧠",
    호기심형: "친구의 생각이나 의견에 관심을 가지고 물어보는 타입! 🤔",
    츤데레형: "친구와 함께 있을 때는 조용하지만, 실은 궁금해하는 타입! 😤",
    꿈지지형: "친구의 상상력과 모험심에 반응하는 타입! 🌟",
    한계형: "친구의 상상이나 모험을 너무 믿지 않고 현실적으로 생각하는 타입! 📝",
    현실형: "친구의 상상이나 모험을 현실적으로 받아들이고 조언하는 타입! 💡"
  },
  gaming: {
    체계형: "게임을 시작할 때 튜토리얼을 꼼꼼히 보고 전략을 세우는 타입! 🧠",
    즉흥형: "게임에 뛰어들어 즉흥적으로 플레이하는 타입! 🎮",
    전략형: "게임 내 아이템 구매나 전투 전략을 고려하는 타입! 💰",
    사교형: "게임 중 친구들과 함께 소통하며 대화하는 타입! ��️",
    공격형: "팀 전투에서 최전선에서 돌격하는 타입! ⚔️",
    서포트형: "팀 전투에서 뒤에서 서포트하는 타입! 🛡️",
    전술형: "팀 전투에서 상황을 보고 판단하는 타입! 🎯",
    리더형: "팀 전투에서 팀원들을 지휘하는 타입! 👨‍🚀",
    성능형: "게임 내 아이템 구매 시 성능이 좋은 것만 사는 타입! 🎮",
    미적형: "게임 내 아이템 구매 시 예쁜/멋진 스킨을 사는 타입! 🎨",
    실용형: "게임 내 아이템 구매 시 꼭 필요한 것만 사는 타입! 🛍️",
    절약형: "게임 내 아이템 구매 시 무료로만 플레이하는 타입! 💰",
    끈기형: "게임에서 연속으로 질 때 더 열심히 연습하는 타입! ��",
    적응형: "게임에서 연속으로 질 때 잠깐 다른 게임을 하는 타입! 🎮",
    자제형: "게임에서 연속으로 질 때 게임을 끄고 휴식하는 타입! 🛌",
    소통형: "게임에서 연속으로 질 때 친구들과 대화로 푸는 타입! 💬",
    자신감형: "팀이 이겼을 때 자신감 있게 자랑하는 타입! 🎉",
    팀중심형: "팀이 이겼을 때 팀워크를 칭찬하는 타입! 🤝",
    겸손형: "팀이 이겼을 때 조용히 뿌듯해하는 타입! 😊",
    게임몰입형: "팀이 이겼을 때 다음 게임을 바로 시작하는 타입! 🎮",
    단독도전형: "어려운 보스를 마주쳤을 때 혼자서 계속 도전하는 타입! 🎯",
    팀전략형: "어려운 보스를 마주쳤을 때 팀원들과 전략을 짠 타입! 🤝",
    연구형: "어려운 보스를 마주쳤을 때 공략을 찾아보는 타입! 📚",
    준비형: "어려운 보스를 마주쳤을 때 레벨을 더 올리고 온다는 타입! 📈",
    수다형: "게임 중 의사소통 방식이 계속 떠들면서 하는 타입! 🗣️",
    간결형: "게임 중 의사소통 방식이 중요한 것만 말하는 타입! 💬",
    조용형: "게임 중 의사소통 방식이 거의 말을 안 하는 타입! 😴",
    유연형: "게임 중 의사소통 방식이 분위기에 맞춰 조절하는 타입! 🎭",
    개인성과형: "게임 통계를 볼 때 개인 킬/데스 비율을 중요시하는 타입! 🎮",
    팀성공형: "게임 통계를 볼 때 팀 승률을 중요시하는 타입! 📊",
    성장형: "게임 통계를 볼 때 개인 성장 그래프를 중요시하는 타입! 📈",
    재미중심형: "게임 통계를 볼 때 재미있었던 순간들을 중요시하는 타입! 🎮",
    몰입형: "게임 시간 관리가 시간 가는 줄 모르고 하는 타입! 🕐",
    통제형: "게임 시간 관리가 알람을 맞춰놓고 하는 타입! ��",
    사교시간형: "게임 시간 관리가 친구들과 약속시간만 정한다는 타입! 📅",
    기분따라형: "게임 시간 관리가 기분에 따라 다르는 타입! 😐",
    야망형: "팀원이 '나 프로게이머 될 거야!'라고 한다면 꿈을 지지하는 타입! 🚀",
    현실형: "팀원이 '나 프로게이머 될 거야!'라고 한다면 현실적인 조언을 하는 타입! 📝",
    응원형: "팀원이 '나 프로게이머 될 거야!'라고 한다면 무조건 지지하는 타입! 🤝",
    캐주얼형: "팀원이 '나 프로게이머 될 거야!'라고 한다면 취미로만 하자고 추천하는 타입! 🎮"
  }
};

export const getQuizByCategory = (category) => {
  switch (category) {
    case 'romantic':
      return romanticQuiz;
    case 'workplace':
      return workplaceQuiz;
    case 'friendship':
      return friendshipQuiz;
    case 'gaming':
      return gamingQuiz;
    default:
      return romanticQuiz;
  }
}; 