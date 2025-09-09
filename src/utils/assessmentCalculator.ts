import { Answer, AssessmentResult, WISCARScore, PersonalityTraits } from "@/types/assessment";

export const calculateAssessmentResult = (answers: Answer[]): AssessmentResult => {
  // Helper function to get answer value as number
  const getNumericValue = (questionId: string, defaultValue: number = 0): number => {
    const answer = answers.find(a => a.questionId === questionId);
    if (!answer) return defaultValue;
    
    if (typeof answer.value === 'number') {
      return answer.value;
    }
    
    if (typeof answer.value === 'string') {
      // For Likert scales, convert text to numeric
      const likertMap: { [key: string]: number } = {
        'Strongly Disagree': 1,
        'Disagree': 2,
        'Neutral': 3,
        'Agree': 4,
        'Strongly Agree': 5
      };
      
      return likertMap[answer.value] || parseInt(answer.value) || defaultValue;
    }
    
    return defaultValue;
  };

  // Calculate Psychometric Score (0-100)
  const psychometricScore = calculatePsychometricScore(answers, getNumericValue);
  
  // Calculate Technical Score (0-100)
  const technicalScore = calculateTechnicalScore(answers, getNumericValue);
  
  // Calculate WISCAR Scores (0-100 each)
  const wiscarScores = calculateWISCARScores(answers, getNumericValue);
  
  // Calculate Overall Score
  const overallScore = Math.round(
    (psychometricScore * 0.3 + technicalScore * 0.4 + 
     (Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6) * 0.3)
  );

  // Determine recommendation
  let recommendation: 'yes' | 'maybe' | 'no';
  if (overallScore >= 75 && technicalScore >= 70) {
    recommendation = 'yes';
  } else if (overallScore >= 60) {
    recommendation = 'maybe';
  } else {
    recommendation = 'no';
  }

  // Generate insights
  const { strengths, improvements } = generateInsights(psychometricScore, technicalScore, wiscarScores);
  
  // Generate learning path
  const learningPath = generateLearningPath(technicalScore, wiscarScores, recommendation);
  
  // Generate alternative paths if needed
  const alternativePaths = recommendation === 'no' ? generateAlternativePaths(psychometricScore, technicalScore) : undefined;

  // Calculate confidence score
  const confidenceScore = Math.min(95, Math.max(60, overallScore + (technicalScore > 80 ? 10 : 0)));

  return {
    overallScore,
    psychometricScore,
    technicalScore,
    wiscarScores,
    recommendation,
    strengths,
    improvements,
    learningPath,
    alternativePaths,
    confidenceScore
  };
};

const calculatePsychometricScore = (answers: Answer[], getNumericValue: (id: string, defaultValue?: number) => number): number => {
  const interestScore = (
    getNumericValue('psych_1') + 
    getNumericValue('psych_2') + 
    getNumericValue('psych_5')
  ) / 3;
  
  const personalityScore = (
    getNumericValue('psych_3') + 
    getNumericValue('psych_4') + 
    getNumericValue('psych_6')
  ) / 3;
  
  const motivationScore = getNumericValue('psych_7');
  
  return Math.round(((interestScore + personalityScore + motivationScore) / 3) * 20);
};

const calculateTechnicalScore = (answers: Answer[], getNumericValue: (id: string, defaultValue?: number) => number): number => {
  let score = 0;
  let totalQuestions = 0;
  
  // Knowledge questions (right/wrong)
  const knowledgeQuestions = ['tech_1', 'tech_2', 'tech_3', 'tech_7'];
  const correctAnswers = {
    'tech_1': 'C/C++',
    'tech_2': 'Message Queuing Telemetry Transport',
    'tech_3': 'Healthcare data privacy and security',
    'tech_7': 'To protect patient privacy and comply with regulations'
  };
  
  knowledgeQuestions.forEach(qId => {
    const answer = answers.find(a => a.questionId === qId);
    if (answer && answer.value === correctAnswers[qId as keyof typeof correctAnswers]) {
      score += 25;
    }
    totalQuestions += 25;
  });
  
  // Experience questions (scaled)
  const experienceScore = (
    getNumericValue('tech_5') + 
    getNumericValue('tech_6') + 
    getNumericValue('tech_8')
  ) / 3;
  
  score += experienceScore * 20;
  totalQuestions += 100;
  
  return Math.min(100, Math.round((score / totalQuestions) * 100));
};

const calculateWISCARScores = (answers: Answer[], getNumericValue: (id: string, defaultValue?: number) => number): WISCARScore => {
  return {
    will: Math.round(((getNumericValue('wiscar_will_1') * 20) + (getNumericValue('wiscar_will_2') * 10)) / 2),
    interest: Math.round(getNumericValue('wiscar_interest_1') * 10),
    skill: calculateSkillScore(answers),
    cognitive: calculateCognitiveScore(answers),
    ability: Math.round(getNumericValue('wiscar_ability_1') * 20),
    realWorld: Math.round(((getNumericValue('wiscar_real_1') * 10) + getMotivationScore(answers)) / 2)
  };
};

const calculateSkillScore = (answers: Answer[]): number => {
  const skillAnswer = answers.find(a => a.questionId === 'wiscar_skill_1');
  if (!skillAnswer) return 20;
  
  const skills = (skillAnswer.value as string).split(',');
  if (skills.includes('None of the above')) return 20;
  
  return Math.min(100, 20 + (skills.length * 15));
};

const calculateCognitiveScore = (answers: Answer[]): number => {
  const cognitiveAnswer = answers.find(a => a.questionId === 'wiscar_cognitive_1');
  if (!cognitiveAnswer) return 50;
  
  const correctAnswer = 'Review the system logs for error messages';
  return cognitiveAnswer.value === correctAnswer ? 90 : 60;
};

const getMotivationScore = (answers: Answer[]): number => {
  const motivationAnswer = answers.find(a => a.questionId === 'wiscar_real_2');
  if (!motivationAnswer) return 50;
  
  const motivationScores: { [key: string]: number } = {
    'Making a difference in patient care': 90,
    'Interest in cutting-edge technology': 80,
    'Job security in growing field': 70,
    'Flexible work opportunities': 60,
    'High salary potential': 50
  };
  
  return motivationScores[motivationAnswer.value as string] || 50;
};

const generateInsights = (psychometricScore: number, technicalScore: number, wiscarScores: WISCARScore) => {
  const strengths: string[] = [];
  const improvements: string[] = [];
  
  // Analyze strengths
  if (psychometricScore >= 75) {
    strengths.push("Strong personality fit and motivation for healthcare technology");
  }
  if (technicalScore >= 75) {
    strengths.push("Solid technical foundation and knowledge base");
  }
  if (wiscarScores.will >= 80) {
    strengths.push("High willingness and persistence to learn new skills");
  }
  if (wiscarScores.interest >= 80) {
    strengths.push("Genuine interest in healthcare technology intersection");
  }
  
  // Analyze improvements
  if (technicalScore < 60) {
    improvements.push("Strengthen technical skills, especially in IoT and healthcare systems");
  }
  if (wiscarScores.skill < 60) {
    improvements.push("Develop foundational programming and technical skills");
  }
  if (psychometricScore < 60) {
    improvements.push("Consider if healthcare technology aligns with your interests and values");
  }
  if (wiscarScores.cognitive < 70) {
    improvements.push("Practice systematic problem-solving and troubleshooting approaches");
  }
  
  return { strengths, improvements };
};

const generateLearningPath = (technicalScore: number, wiscarScores: WISCARScore, recommendation: string): string[] => {
  const path: string[] = [];
  
  if (recommendation === 'yes') {
    path.push("Complete Python for Healthcare Data Analysis course");
    path.push("Learn IoT fundamentals and embedded systems programming");
    path.push("Study HIPAA compliance and healthcare data security");
    path.push("Build a portfolio project: Patient monitoring dashboard");
    path.push("Pursue IoT or Healthcare Informatics certification");
  } else if (recommendation === 'maybe') {
    if (technicalScore < 70) {
      path.push("Start with Programming Fundamentals (Python or C++)");
      path.push("Learn networking basics and cloud platforms");
    }
    path.push("Introduction to Healthcare Technology course");
    path.push("Complete a project in healthcare data analysis");
    path.push("Consider internship or volunteer work in healthtech");
  } else {
    path.push("Assess if healthcare technology truly interests you");
    path.push("Consider foundational courses in your stronger areas");
    path.push("Explore alternative technology careers that match your profile");
  }
  
  return path;
};

const generateAlternativePaths = (psychometricScore: number, technicalScore: number): string[] => {
  const alternatives: string[] = [];
  
  if (technicalScore >= 60) {
    alternatives.push("Software Quality Assurance for Medical Devices");
    alternatives.push("General IoT Development (Non-Healthcare)");
  }
  
  if (psychometricScore >= 60) {
    alternatives.push("Healthcare Data Analyst");
    alternatives.push("Clinical Research Coordinator");
  }
  
  alternatives.push("Embedded Systems Engineer");
  alternatives.push("Technical Writer for Healthcare");
  
  return alternatives;
};