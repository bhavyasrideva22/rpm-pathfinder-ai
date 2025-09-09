export interface Question {
  id: string;
  type: 'likert' | 'multiple-choice' | 'single-choice' | 'scale';
  section: 'psychometric' | 'technical' | 'wiscar';
  category?: string;
  question: string;
  options?: string[];
  scale?: {
    min: number;
    max: number;
    minLabel: string;
    maxLabel: string;
  };
  required: boolean;
}

export interface Answer {
  questionId: string;
  value: number | string;
  text?: string;
}

export interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface WISCARScore {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorld: number;
}

export interface AssessmentResult {
  overallScore: number;
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: WISCARScore;
  recommendation: 'yes' | 'maybe' | 'no';
  strengths: string[];
  improvements: string[];
  learningPath: string[];
  alternativePaths?: string[];
  confidenceScore: number;
}

export interface PersonalityTraits {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

export interface AssessmentState {
  currentSection: number;
  currentQuestion: number;
  answers: Answer[];
  isComplete: boolean;
  result?: AssessmentResult;
}