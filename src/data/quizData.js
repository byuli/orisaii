// 연인 궁합 퀴즈
export const romanticQuiz = [
  {
    id: 1,
    question: "갈등이 생겼을 때 나는 주로...",
    options: [
      { value: "A", text: "바로 대화로 해결하려고 한다", trait: "direct" },
      { value: "B", text: "시간을 두고 생각한 후 이야기한다", trait: "thoughtful" },
      { value: "C", text: "감정이 가라앉을 때까지 기다린다", trait: "patient" },
      { value: "D", text: "상대방이 먼저 말할 때까지 기다린다", trait: "passive" }
    ]
  },
  {
    id: 2,
    question: "사랑을 표현할 때 나는...",
    options: [
      { value: "A", text: "말로 자주 표현한다", trait: "verbal" },
      { value: "B", text: "행동으로 보여준다", trait: "action" },
      { value: "C", text: "선물이나 편지로 표현한다", trait: "gift" },
      { value: "D", text: "함께 시간을 보내는 것으로 표현한다", trait: "time" }
    ]
  },
  {
    id: 3,
    question: "데이트 계획을 세울 때 나는...",
    options: [
      { value: "A", text: "미리 상세하게 계획한다", trait: "planner" },
      { value: "B", text: "대략적인 틀만 정한다", trait: "flexible" },
      { value: "C", text: "그때그때 즉흥적으로 결정한다", trait: "spontaneous" },
      { value: "D", text: "상대방이 정해주기를 기다린다", trait: "adaptive" }
    ]
  },
  {
    id: 4,
    question: "서로 다른 의견을 가질 때 나는...",
    options: [
      { value: "A", text: "내 의견을 적극적으로 피력한다", trait: "assertive" },
      { value: "B", text: "타협점을 찾으려고 노력한다", trait: "collaborative" },
      { value: "C", text: "상대방 의견을 먼저 들어본다", trait: "listener" },
      { value: "D", text: "상대방 의견에 맞춰준다", trait: "accommodating" }
    ]
  },
  {
    id: 5,
    question: "스트레스를 받을 때 나는...",
    options: [
      { value: "A", text: "혼자만의 시간이 필요하다", trait: "independent" },
      { value: "B", text: "연인과 함께 있으면서 위로받고 싶다", trait: "dependent" },
      { value: "C", text: "친구들과 수다를 떨며 풀어낸다", trait: "social" },
      { value: "D", text: "취미활동으로 스트레스를 해소한다", trait: "activity" }
    ]
  },
  {
    id: 6,
    question: "미래에 대해 이야기할 때 나는...",
    options: [
      { value: "A", text: "구체적인 계획을 세우는 것을 좋아한다", trait: "future_focused" },
      { value: "B", text: "꿈을 이야기하는 것을 좋아한다", trait: "dreamer" },
      { value: "C", text: "현재에 집중하는 편이다", trait: "present_focused" },
      { value: "D", text: "자연스럽게 흘러가는 대로 두는 편이다", trait: "flow" }
    ]
  }
];

// 직장 동료 궁합 퀴즈
export const workplaceQuiz = [
  {
    id: 1,
    question: "프로젝트를 시작할 때 나는...",
    options: [
      { value: "A", text: "전체적인 계획을 먼저 세운다", trait: "strategic" },
      { value: "B", text: "바로 실행에 들어간다", trait: "action_oriented" },
      { value: "C", text: "팀원들과 충분히 논의한다", trait: "collaborative" },
      { value: "D", text: "과거 경험을 바탕으로 접근한다", trait: "experience_based" }
    ]
  },
  {
    id: 2,
    question: "회의에서 나는 주로...",
    options: [
      { value: "A", text: "적극적으로 의견을 제시한다", trait: "vocal" },
      { value: "B", text: "질문을 많이 한다", trait: "inquisitive" },
      { value: "C", text: "다른 사람의 의견을 잘 들어준다", trait: "listener" },
      { value: "D", text: "요약하고 정리하는 역할을 한다", trait: "organizer" }
    ]
  },
  {
    id: 3,
    question: "업무 우선순위를 정할 때 나는...",
    options: [
      { value: "A", text: "데드라인을 기준으로 정한다", trait: "deadline_focused" },
      { value: "B", text: "중요도를 기준으로 정한다", trait: "priority_focused" },
      { value: "C", text: "팀의 필요에 따라 조정한다", trait: "team_focused" },
      { value: "D", text: "개인의 역량을 고려해서 정한다", trait: "resource_focused" }
    ]
  },
  {
    id: 4,
    question: "문제가 발생했을 때 나는...",
    options: [
      { value: "A", text: "빠르게 해결책을 찾는다", trait: "solution_oriented" },
      { value: "B", text: "원인을 분석한다", trait: "analytical" },
      { value: "C", text: "팀원들과 상의한다", trait: "consultative" },
      { value: "D", text: "경험자의 조언을 구한다", trait: "advisory_seeking" }
    ]
  },
  {
    id: 5,
    question: "피드백을 받을 때 나는...",
    options: [
      { value: "A", text: "적극적으로 받아들인다", trait: "receptive" },
      { value: "B", text: "구체적인 예시를 요청한다", trait: "detail_oriented" },
      { value: "C", text: "감정적으로 받아들인다", trait: "emotional" },
      { value: "D", text: "천천히 소화한다", trait: "reflective" }
    ]
  }
];

// 성향별 궁합 매트릭스
export const compatibilityMatrix = {
  romantic: {
    direct: { direct: 0.8, thoughtful: 0.7, patient: 0.6, passive: 0.4 },
    thoughtful: { direct: 0.7, thoughtful: 0.9, patient: 0.8, passive: 0.6 },
    patient: { direct: 0.6, thoughtful: 0.8, patient: 0.7, passive: 0.9 },
    passive: { direct: 0.4, thoughtful: 0.6, patient: 0.9, passive: 0.5 },
    
    verbal: { verbal: 0.9, action: 0.7, gift: 0.8, time: 0.6 },
    action: { verbal: 0.7, action: 0.8, gift: 0.6, time: 0.9 },
    gift: { verbal: 0.8, action: 0.6, gift: 0.7, time: 0.8 },
    time: { verbal: 0.6, action: 0.9, gift: 0.8, time: 0.9 },
    
    planner: { planner: 0.8, flexible: 0.7, spontaneous: 0.4, adaptive: 0.6 },
    flexible: { planner: 0.7, flexible: 0.8, spontaneous: 0.7, adaptive: 0.8 },
    spontaneous: { planner: 0.4, flexible: 0.7, spontaneous: 0.6, adaptive: 0.9 },
    adaptive: { planner: 0.6, flexible: 0.8, spontaneous: 0.9, adaptive: 0.7 },
  },
  
  workplace: {
    strategic: { strategic: 0.8, action_oriented: 0.7, collaborative: 0.9, experience_based: 0.8 },
    action_oriented: { strategic: 0.7, action_oriented: 0.6, collaborative: 0.8, experience_based: 0.7 },
    collaborative: { strategic: 0.9, action_oriented: 0.8, collaborative: 0.9, experience_based: 0.8 },
    experience_based: { strategic: 0.8, action_oriented: 0.7, collaborative: 0.8, experience_based: 0.7 },
    
    vocal: { vocal: 0.6, inquisitive: 0.8, listener: 0.9, organizer: 0.7 },
    inquisitive: { vocal: 0.8, inquisitive: 0.7, listener: 0.8, organizer: 0.8 },
    listener: { vocal: 0.9, inquisitive: 0.8, listener: 0.7, organizer: 0.9 },
    organizer: { vocal: 0.7, inquisitive: 0.8, listener: 0.9, organizer: 0.8 },
  }
};

export const getQuizByCategory = (category) => {
  switch (category) {
    case 'romantic':
      return romanticQuiz;
    case 'workplace':
      return workplaceQuiz;
    default:
      return romanticQuiz;
  }
}; 