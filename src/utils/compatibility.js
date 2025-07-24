import { compatibilityMatrix } from '../data/quizData';

// 참가자의 성향 분석
export const analyzePersonality = (answers, quizData) => {
  const traits = {};
  
  // 각 질문의 답변에서 성향 추출
  Object.entries(answers).forEach(([questionId, answerValue]) => {
    const question = quizData.find(q => q.id === parseInt(questionId));
    if (question) {
      const selectedOption = question.options.find(opt => opt.value === answerValue);
      if (selectedOption) {
        traits[selectedOption.trait] = (traits[selectedOption.trait] || 0) + 1;
      }
    }
  });
  
  // 가장 두드러진 성향들 반환 (상위 3개)
  const sortedTraits = Object.entries(traits)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([trait, count]) => ({ trait, count }));
  
  return sortedTraits;
};

// 두 사람 간의 궁합 점수 계산
export const calculateCompatibility = (person1Traits, person2Traits, category) => {
  const matrix = compatibilityMatrix[category];
  if (!matrix) return 0.5; // 기본값
  
  let totalScore = 0;
  let comparisons = 0;
  
  person1Traits.forEach(({ trait: trait1, count: count1 }) => {
    person2Traits.forEach(({ trait: trait2, count: count2 }) => {
      if (matrix[trait1] && matrix[trait1][trait2] !== undefined) {
        // 성향의 빈도를 가중치로 사용
        const weight = (count1 + count2) / 2;
        totalScore += matrix[trait1][trait2] * weight;
        comparisons += weight;
      }
    });
  });
  
  return comparisons > 0 ? totalScore / comparisons : 0.5;
};

// 전체 그룹의 궁합 분석
export const analyzeGroupCompatibility = (participants, category, quizData) => {
  const analysisResults = {
    individuals: {},
    pairCompatibility: {},
    groupStats: {
      averageCompatibility: 0,
      bestMatch: null,
      worstMatch: null,
      mostCompatibleGroup: [],
      potentialConflicts: []
    }
  };
  
  // 각 참가자의 성향 분석
  participants.forEach(participant => {
    if (participant.quizCompleted && participant.answers) {
      analysisResults.individuals[participant.nickname] = {
        nickname: participant.nickname,
        traits: analyzePersonality(participant.answers, quizData),
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
      
      const compatibility = calculateCompatibility(
        person1.traits, 
        person2.traits, 
        category
      );
      
      const pairKey = `${name1}-${name2}`;
      analysisResults.pairCompatibility[pairKey] = {
        person1: name1,
        person2: name2,
        score: compatibility,
        percentage: Math.round(compatibility * 100),
        level: getCompatibilityLevel(compatibility)
      };
      
      totalCompatibilitySum += compatibility;
      pairCount++;
      
      // 최고/최악 조합 찾기
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
  
  // 높은 궁합을 가진 그룹 찾기 (80% 이상)
  analysisResults.groupStats.mostCompatibleGroup = Object.values(analysisResults.pairCompatibility)
    .filter(pair => pair.percentage >= 80)
    .sort((a, b) => b.percentage - a.percentage);
  
  // 잠재적 갈등 그룹 찾기 (50% 이하)
  analysisResults.groupStats.potentialConflicts = Object.values(analysisResults.pairCompatibility)
    .filter(pair => pair.percentage <= 50)
    .sort((a, b) => a.percentage - b.percentage);
  
  return analysisResults;
};

// 궁합 점수에 따른 레벨 분류
export const getCompatibilityLevel = (score) => {
  if (score >= 0.9) return { level: 'excellent', text: '완벽한 궁합', color: 'text-green-600' };
  if (score >= 0.8) return { level: 'great', text: '훌륭한 궁합', color: 'text-green-500' };
  if (score >= 0.7) return { level: 'good', text: '좋은 궁합', color: 'text-blue-500' };
  if (score >= 0.6) return { level: 'decent', text: '괜찮은 궁합', color: 'text-yellow-500' };
  if (score >= 0.5) return { level: 'average', text: '평범한 궁합', color: 'text-gray-500' };
  if (score >= 0.4) return { level: 'challenging', text: '주의 필요', color: 'text-orange-500' };
  return { level: 'difficult', text: '갈등 가능성', color: 'text-red-500' };
};

// 성향별 설명
export const getTraitDescription = (trait, category) => {
  const descriptions = {
    romantic: {
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
      adaptive: '상대방에게 맞춰주는 것을 자연스럽게 여깁니다.'
    },
    workplace: {
      strategic: '전략적으로 사고하고 계획을 세우는 타입입니다.',
      action_oriented: '실행력이 뛰어나고 빠른 결정을 내립니다.',
      collaborative: '팀워크를 중시하고 협업을 잘합니다.',
      experience_based: '경험을 바탕으로 판단하는 현실적인 타입입니다.',
      vocal: '적극적으로 의견을 제시하는 리더십형입니다.',
      inquisitive: '궁금한 것이 많고 학습 욕구가 강합니다.',
      listener: '다른 사람의 이야기를 잘 들어주는 조력형입니다.',
      organizer: '정리정돈을 잘하고 체계적인 성향입니다.'
    }
  };
  
  return descriptions[category]?.[trait] || '특별한 성향을 가지고 있습니다.';
}; 