import { compatibilityMatrix } from '../data/quizData';

// 참가자의 성향 분석 (개선된 버전)
export const analyzePersonality = (answers, quizData) => {
  const traits = {};
  const traitCategories = {};
  
  // 각 질문의 답변에서 성향 추출
  Object.entries(answers).forEach(([questionId, answerValue]) => {
    const question = quizData.find(q => q.id === parseInt(questionId));
    if (question) {
      const selectedOption = question.options.find(opt => opt.value === answerValue);
      if (selectedOption) {
        traits[selectedOption.trait] = (traits[selectedOption.trait] || 0) + 1;
        
        // 성향을 카테고리별로 분류
        const category = getTraitCategory(selectedOption.trait);
        if (!traitCategories[category]) {
          traitCategories[category] = {};
        }
        traitCategories[category][selectedOption.trait] = (traitCategories[category][selectedOption.trait] || 0) + 1;
      }
    }
  });
  
  // 가장 두드러진 성향들 반환 (상위 5개)
  const sortedTraits = Object.entries(traits)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([trait, count]) => ({ trait, count, category: getTraitCategory(trait) }));
  
  return { traits: sortedTraits, categories: traitCategories };
};

// 성향 카테고리 분류
export const getTraitCategory = (trait) => {
  const categories = {
    communication: ['direct', 'thoughtful', 'patient', 'passive', 'verbal', 'communicative', 'honest', 'diplomatic'],
    expression: ['action', 'gift', 'time', 'romantic', 'simple', 'problem_solver', 'comforter', 'supporter'],
    planning: ['planner', 'flexible', 'spontaneous', 'adaptive', 'future_focused', 'dreamer', 'present_focused', 'flow'],
    social: ['assertive', 'collaborative', 'listener', 'accommodating', 'sociable', 'balanced', 'reserved', 'private'],
    stress: ['independent', 'dependent', 'social', 'activity', 'systematic', 'positive'],
    work_style: ['strategic', 'action_oriented', 'experience_based', 'confident', 'evidence_based', 'consensus_seeking'],
    leadership: ['vocal', 'inquisitive', 'organizer', 'leader', 'creative', 'executor', 'supporter'],
    learning: ['methodical', 'hands_on', 'social_learning', 'trial_error', 'receptive', 'detail_oriented', 'reflective'],
    values: ['result_oriented', 'process_oriented', 'team_oriented', 'growth_oriented', 'objective', 'developmental']
  };
  
  for (const [category, traits] of Object.entries(categories)) {
    if (traits.includes(trait)) {
      return category;
    }
  }
  return 'other';
};

// 두 사람 간의 궁합 점수 계산 (개선된 버전)
export const calculateCompatibility = (person1Analysis, person2Analysis, category) => {
  const matrix = compatibilityMatrix[category];
  if (!matrix) return 0.5;
  
  const person1Traits = person1Analysis.traits || person1Analysis;
  const person2Traits = person2Analysis.traits || person2Analysis;
  
  let totalScore = 0;
  let comparisons = 0;
  
  person1Traits.forEach(({ trait: trait1, count: count1 }) => {
    person2Traits.forEach(({ trait: trait2, count: count2 }) => {
      if (matrix[trait1] && matrix[trait1][trait2] !== undefined) {
        const weight = (count1 + count2) / 2;
        totalScore += matrix[trait1][trait2] * weight;
        comparisons += weight;
      }
    });
  });
  
  return comparisons > 0 ? totalScore / comparisons : 0.5;
};

// 상세한 궁합 분석
export const getDetailedCompatibilityAnalysis = (person1Analysis, person2Analysis, category) => {
  const person1Traits = person1Analysis.traits || person1Analysis;
  const person2Traits = person2Analysis.traits || person2Analysis;
  
  const analysis = {
    overallScore: calculateCompatibility(person1Analysis, person2Analysis, category),
    strengths: [],
    challenges: [],
    recommendations: []
  };
  
  // 카테고리별 분석
  const categoryScores = {};
  const categoryCount = {};
  
  person1Traits.forEach(({ trait: trait1, count: count1 }) => {
    const category1 = getTraitCategory(trait1);
    person2Traits.forEach(({ trait: trait2, count: count2 }) => {
      const category2 = getTraitCategory(trait2);
      if (category1 === category2) {
        const matrix = compatibilityMatrix[category];
        if (matrix[trait1] && matrix[trait1][trait2] !== undefined) {
          const score = matrix[trait1][trait2];
          if (!categoryScores[category1]) categoryScores[category1] = 0;
          if (!categoryCount[category1]) categoryCount[category1] = 0;
          categoryScores[category1] += score;
          categoryCount[category1]++;
          
          if (score >= 0.8) {
            analysis.strengths.push({
              category: category1,
              description: `${getCategoryName(category1)} 영역에서 높은 호환성을 보입니다.`
            });
          } else if (score <= 0.5) {
            analysis.challenges.push({
              category: category1,
              description: `${getCategoryName(category1)} 영역에서 차이가 있어 이해와 배려가 필요합니다.`
            });
          }
        }
      }
    });
  });
  
  // 추천사항 생성
  if (analysis.overallScore >= 0.8) {
    analysis.recommendations.push('훌륭한 궁합입니다! 서로의 강점을 살려 더욱 발전적인 관계를 만들어보세요.');
  } else if (analysis.overallScore >= 0.6) {
    analysis.recommendations.push('좋은 궁합입니다. 서로 다른 점을 이해하고 존중하면 더욱 좋은 관계가 될 것입니다.');
  } else {
    analysis.recommendations.push('서로 다른 성향을 가지고 있어 더 많은 소통과 이해가 필요합니다. 차이를 인정하고 배려하는 마음이 중요해요.');
  }
  
  return analysis;
};

// 전체 그룹의 궁합 분석 (개선된 버전)
export const analyzeGroupCompatibility = (participants, category, quizData) => {
  const analysisResults = {
    individuals: {},
    pairCompatibility: {},
    groupStats: {
      averageCompatibility: 0,
      bestMatch: null,
      worstMatch: null,
      mostCompatibleGroup: [],
      potentialConflicts: [],
      categoryAnalysis: {}
    }
  };
  
  // 각 참가자의 성향 분석
  participants.forEach(participant => {
    if ((participant.surveyCompleted || participant.quizCompleted) && participant.answers) {
      const personalityAnalysis = analyzePersonality(participant.answers, quizData);
      analysisResults.individuals[participant.nickname] = {
        nickname: participant.nickname,
        traits: personalityAnalysis.traits,
        categories: personalityAnalysis.categories,
        isHost: participant.isHost
      };
    }
  });
  
  // 모든 참가자 조합에 대한 궁합 분석
  const participantNames = Object.keys(analysisResults.individuals);
  let totalCompatibilitySum = 0;
  let pairCount = 0;
  let bestScore = 0;
  let worstScore = 1;
  let bestPair = null;
  let worstPair = null;
  
  for (let i = 0; i < participantNames.length; i++) {
    for (let j = i + 1; j < participantNames.length; j++) {
      const name1 = participantNames[i];
      const name2 = participantNames[j];
      const person1 = analysisResults.individuals[name1];
      const person2 = analysisResults.individuals[name2];
      
      const compatibility = calculateCompatibility(person1, person2, category);
      const detailedAnalysis = getDetailedCompatibilityAnalysis(person1, person2, category);
      
      const pairKey = `${name1}-${name2}`;
      analysisResults.pairCompatibility[pairKey] = {
        person1: name1,
        person2: name2,
        score: compatibility,
        percentage: Math.round(compatibility * 100),
        level: getCompatibilityLevel(compatibility),
        detailed: detailedAnalysis
      };
      
      totalCompatibilitySum += compatibility;
      pairCount++;
      
      if (compatibility > bestScore) {
        bestScore = compatibility;
        bestPair = { name1, name2, score: compatibility };
      }
      if (compatibility < worstScore) {
        worstScore = compatibility;
        worstPair = { name1, name2, score: compatibility };
      }
    }
  }
  
  // 그룹 통계 계산
  analysisResults.groupStats.averageCompatibility = pairCount > 0 ? 
    Math.round((totalCompatibilitySum / pairCount) * 100) : 0;
  analysisResults.groupStats.bestMatch = bestPair;
  analysisResults.groupStats.worstMatch = worstPair;
  
  // 높은 궁합을 가진 그룹 찾기 (75% 이상)
  analysisResults.groupStats.mostCompatibleGroup = Object.values(analysisResults.pairCompatibility)
    .filter(pair => pair.percentage >= 75)
    .sort((a, b) => b.percentage - a.percentage);
  
  // 잠재적 갈등 그룹 찾기 (55% 이하)
  analysisResults.groupStats.potentialConflicts = Object.values(analysisResults.pairCompatibility)
    .filter(pair => pair.percentage <= 55)
    .sort((a, b) => a.percentage - b.percentage);
  
  // 그룹 전체의 성향 분포 분석
  const groupTraitDistribution = {};
  Object.values(analysisResults.individuals).forEach(person => {
    person.traits.forEach(({ trait, count }) => {
      groupTraitDistribution[trait] = (groupTraitDistribution[trait] || 0) + count;
    });
  });
  
  analysisResults.groupStats.traitDistribution = Object.entries(groupTraitDistribution)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([trait, count]) => ({ trait, count, description: getTraitDescription(trait, category) }));
  
  return analysisResults;
};

// 궁합 점수에 따른 레벨 분류 (개선된 버전)
export const getCompatibilityLevel = (score) => {
  if (score >= 0.9) return { level: 'excellent', text: '완벽한 궁합 ✨', color: 'text-green-600' };
  if (score >= 0.8) return { level: 'great', text: '환상의 조합 🎉', color: 'text-green-500' };
  if (score >= 0.7) return { level: 'good', text: '좋은 궁합 😊', color: 'text-blue-500' };
  if (score >= 0.6) return { level: 'decent', text: '괜찮은 궁합 👍', color: 'text-yellow-500' };
  if (score >= 0.5) return { level: 'average', text: '평범한 궁합 😐', color: 'text-gray-500' };
  if (score >= 0.4) return { level: 'challenging', text: '노력 필요 💪', color: 'text-orange-500' };
  return { level: 'difficult', text: '상당한 차이 🤔', color: 'text-red-500' };
};

// 카테고리 이름 반환
export const getCategoryName = (category) => {
  const names = {
    communication: '소통 방식',
    expression: '표현 방식',
    planning: '계획성',
    social: '사회성',
    stress: '스트레스 대처',
    work_style: '업무 스타일',
    leadership: '리더십',
    learning: '학습 방식',
    values: '가치관'
  };
  return names[category] || category;
};

// 성향별 설명 (대폭 확장된 버전)
export const getTraitDescription = (trait, category) => {
  const descriptions = {
    romantic: {
      // 기존 성향들
      direct: '직접적이고 솔직한 소통을 선호합니다.',
      thoughtful: '신중하고 깊이 있게 생각하는 편입니다.',
      patient: '인내심이 많고 차분한 성격입니다.',
      passive: '수용적이고 상대방을 배려하는 편입니다.',
      verbal: '말로 감정을 표현하는 것을 좋아합니다.',
      action: '행동으로 사랑을 보여주는 타입입니다.',
      gift: '선물과 작은 정성으로 마음을 전합니다.',
      time: '함께하는 시간을 가장 소중하게 여깁니다.',
      planner: '미리 계획하고 준비하는 것을 좋아합니다.',
      flexible: '유연하고 적응력이 좋습니다.',
      spontaneous: '즉흥적이고 자유로운 스타일입니다.',
      adaptive: '상대방에게 맞춰주는 것을 자연스럽게 여깁니다.',
      assertive: '자신의 의견을 당당하게 표현합니다.',
      collaborative: '함께 해결책을 찾아가는 것을 선호합니다.',
      listener: '상대방의 이야기를 진심으로 들어줍니다.',
      accommodating: '상대방의 입장을 이해하고 맞춰줍니다.',
      independent: '혼자만의 시간을 통해 에너지를 충전합니다.',
      dependent: '연인과의 교감을 통해 위로받습니다.',
      social: '사람들과 어울리며 스트레스를 해소합니다.',
      activity: '취미활동을 통해 마음의 평안을 찾습니다.',
      future_focused: '미래를 위한 구체적인 계획을 세웁니다.',
      dreamer: '아름다운 미래에 대한 꿈을 키워갑니다.',
      present_focused: '현재 순간의 소중함을 잘 아는 사람입니다.',
      flow: '자연스러운 흐름에 몸을 맡기는 편입니다.',
      
      // 새로 추가된 성향들
      communicative: '깊은 대화를 통해 마음을 나누는 것을 중요시합니다.',
      adventurous: '새로운 경험과 모험을 함께 즐기고 싶어합니다.',
      peaceful: '조용하고 평화로운 시간을 선호합니다.',
      sharing: '서로의 관심사를 공유하며 함께 성장하고 싶어합니다.',
      problem_solver: '연인의 어려움을 적극적으로 해결해주려 합니다.',
      comforter: '따뜻한 위로와 공감으로 마음을 어루만져줍니다.',
      supporter: '조용히 곁에서 든든한 지지자가 되어줍니다.',
      patient_supporter: '인내심을 갖고 기다려주는 마음이 깊습니다.',
      romantic: '특별한 순간과 로맨틱한 분위기를 만들어줍니다.',
      simple: '소박하고 진실된 마음을 가장 소중하게 여깁니다.',
      sociable: '사교적이고 사람들과 어울리는 것을 좋아합니다.',
      balanced: '사회적 상황에서 적절한 균형감을 유지합니다.',
      reserved: '내성적이고 조용한 성격을 가지고 있습니다.',
      private: '개인적인 공간과 시간을 중요하게 생각합니다.',
      learning: '서로의 새로운 면을 배우고 이해하려 노력합니다.',
      creative: '창의적인 해결책을 찾아내는 능력이 있습니다.',
      respectful: '서로의 다름을 인정하고 존중합니다.',
      clingy: '연인과 자주 연락하고 함께 있고 싶어합니다.',
      moderate: '적절한 거리감을 유지하며 관계를 발전시킵니다.',
      honest: '솔직하고 진실된 관계를 추구합니다.',
      diplomatic: '부드럽고 현명한 방식으로 문제를 해결합니다.',
      accepting: '상대방의 모든 면을 있는 그대로 받아들입니다.',
      optimistic: '긍정적인 마음으로 관계를 바라봅니다.',
      planning: '함께할 미래를 구체적으로 계획하고 준비합니다.',
      dreaming: '아름다운 꿈과 이상을 함께 나누며 키워갑니다.',
      natural: '자연스러운 관계의 흐름을 믿고 따라갑니다.',
      present: '현재의 행복과 만족을 가장 중요하게 여깁니다.',
      instant: '직감적이고 강렬한 감정을 중요시합니다.',
      gradual: '천천히 깊어지는 감정의 변화를 소중히 여깁니다.',
      friendship_based: '우정을 바탕으로 한 관계를 선호합니다.',
      destiny: '운명적인 만남과 연결을 믿습니다.'
    },
    workplace: {
      // 기존 성향들
      strategic: '전략적으로 사고하고 계획을 세우는 타입입니다.',
      action_oriented: '실행력이 뛰어나고 빠른 결정을 내립니다.',
      collaborative: '팀워크를 중시하고 협업을 잘합니다.',
      experience_based: '경험을 바탕으로 판단하는 현실적인 타입입니다.',
      vocal: '적극적으로 의견을 제시하는 리더십형입니다.',
      inquisitive: '궁금한 것이 많고 학습 욕구가 강합니다.',
      listener: '다른 사람의 이야기를 잘 들어주는 조력형입니다.',
      organizer: '정리정돈을 잘하고 체계적인 성향입니다.',
      deadline_focused: '마감일을 중요하게 여기고 시간 관리를 잘합니다.',
      priority_focused: '중요도에 따라 우선순위를 명확히 정합니다.',
      team_focused: '팀의 화합과 협력을 최우선으로 생각합니다.',
      resource_focused: '효율적인 자원 배분을 고려하는 현실적인 사고를 합니다.',
      solution_oriented: '문제 해결에 집중하고 실용적인 방안을 찾습니다.',
      analytical: '문제의 원인을 체계적으로 분석하는 능력이 뛰어납니다.',
      consultative: '동료들과의 상의를 통해 최선의 결정을 내립니다.',
      advisory_seeking: '경험 많은 선배의 조언을 구하는 것을 자연스럽게 여깁니다.',
      receptive: '피드백을 긍정적으로 받아들이고 개선하려 노력합니다.',
      detail_oriented: '구체적이고 세부적인 피드백을 선호합니다.',
      emotional: '감정적으로 피드백을 받아들이는 경향이 있습니다.',
      reflective: '피드백을 깊이 있게 성찰하고 내재화합니다.',
      
      // 새로 추가된 성향들
      confident: '자신감을 가지고 아이디어를 발표하는 적극적인 타입입니다.',
      evidence_based: '데이터와 근거를 바탕으로 논리적으로 접근합니다.',
      consensus_seeking: '팀원들의 합의를 중요시하고 의견을 수렴합니다.',
      experimental: '작은 실험을 통해 점진적으로 발전시켜 나갑니다.',
      systematic: '체계적이고 단계적으로 업무를 처리합니다.',
      communicative: '동료들과의 소통을 통해 문제를 해결합니다.',
      independent: '혼자서 집중하여 업무를 완성하는 것을 선호합니다.',
      positive: '긍정적인 마음가짐으로 어려움을 극복합니다.',
      leader: '팀을 이끄는 리더십을 자연스럽게 발휘합니다.',
      creative: '창의적인 아이디어와 새로운 관점을 제시합니다.',
      executor: '계획을 실행에 옮기는 실무 능력이 뛰어납니다.',
      supporter: '팀원들을 도우며 뒤에서 지원하는 역할을 선호합니다.',
      logical: '논리적 사고를 바탕으로 설득력 있게 의견을 전달합니다.',
      empathetic: '상대방의 감정을 이해하고 공감하는 능력이 뛰어납니다.',
      mediating: '갈등 상황에서 중재자 역할을 잘 수행합니다.',
      flexible: '상황에 따라 유연하게 대응하는 적응력이 좋습니다.',
      quiet: '조용하고 집중할 수 있는 환경에서 능력을 발휘합니다.',
      energetic: '활기차고 역동적인 분위기에서 더 좋은 성과를 냅니다.',
      adaptable: '어떤 환경에서도 잘 적응하는 뛰어난 적응력을 가지고 있습니다.',
      methodical: '매뉴얼과 절차를 철저히 따르는 체계적인 학습자입니다.',
      hands_on: '직접 실습하며 경험을 통해 배우는 것을 선호합니다.',
      social_learning: '동료들과의 교류를 통해 지식을 습득합니다.',
      trial_error: '시행착오를 통해 스스로 터득하는 것을 즐깁니다.',
      reorganizing: '상황에 맞게 계획을 재조정하는 능력이 뛰어납니다.',
      focused: '집중력을 발휘하여 효율적으로 업무를 처리합니다.',
      delegating: '업무를 적절히 분배하고 팀원들과 협력합니다.',
      calm: '침착함을 유지하며 안정적으로 업무를 진행합니다.',
      objective: '객관적이고 공정한 평가를 선호합니다.',
      detailed: '구체적이고 상세한 피드백을 통해 성장하려 합니다.',
      recognition_seeking: '인정과 격려를 통해 동기부여를 받습니다.',
      developmental: '지속적인 성장과 발전을 추구합니다.',
      change_agent: '조직의 변화와 혁신을 주도하려 합니다.',
      traditional: '기존의 검증된 방식과 문화를 존중합니다.',
      incremental: '점진적이고 안정적인 개선을 추구합니다.',
      result_oriented: '성과와 결과를 중시하며 목표 달성에 집중합니다.',
      process_oriented: '올바른 과정과 방법론을 중요하게 여깁니다.',
      team_oriented: '팀의 화합과 협력을 최우선 가치로 생각합니다.',
      growth_oriented: '개인적 성장과 지속적인 학습을 추구합니다.'
    }
  };
  
  return descriptions[category]?.[trait] || '독특하고 특별한 성향을 가지고 있습니다.';
};

 