import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import QuestionCard from "./QuestionCard";
import AssessmentResults from "./AssessmentResults";
import { assessmentSections } from "@/data/assessmentQuestions";
import { Answer, AssessmentResult } from "@/types/assessment";
import { calculateAssessmentResult } from "@/utils/assessmentCalculator";

interface AssessmentFlowProps {
  onComplete: (result: AssessmentResult) => void;
}

const AssessmentFlow = ({ onComplete }: AssessmentFlowProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const totalQuestions = assessmentSections.reduce((sum, section) => sum + section.questions.length, 0);
  const completedQuestions = answers.length;
  const progress = (completedQuestions / totalQuestions) * 100;

  const currentSectionData = assessmentSections[currentSection];
  const currentQuestionData = currentSectionData.questions[currentQuestion];
  const currentAnswer = answers.find(a => a.questionId === currentQuestionData.id);

  const handleAnswer = (answer: Answer) => {
    const newAnswers = answers.filter(a => a.questionId !== answer.questionId);
    newAnswers.push(answer);
    setAnswers(newAnswers);
  };

  const canGoNext = () => {
    return currentAnswer !== undefined;
  };

  const handleNext = () => {
    if (currentQuestion < currentSectionData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentSection < assessmentSections.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentQuestion(0);
    } else {
      // Assessment complete
      const assessmentResult = calculateAssessmentResult(answers);
      setResult(assessmentResult);
      setIsComplete(true);
      onComplete(assessmentResult);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setCurrentQuestion(assessmentSections[currentSection - 1].questions.length - 1);
    }
  };

  const canGoPrevious = () => {
    return currentSection > 0 || currentQuestion > 0;
  };

  if (isComplete && result) {
    return <AssessmentResults result={result} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-primary">
                {currentSectionData.title}
              </h1>
              <p className="text-muted-foreground">
                {currentSectionData.description}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">
                Question {completedQuestions + 1} of {totalQuestions}
              </div>
              <div className="text-sm text-muted-foreground">
                Section {currentSection + 1} of {assessmentSections.length}
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress: {Math.round(progress)}%</span>
              <span>{completedQuestions} answered</span>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="max-w-3xl mx-auto mb-8">
          <QuestionCard
            question={currentQuestionData}
            answer={currentAnswer}
            onAnswer={handleAnswer}
          />
        </div>

        {/* Navigation */}
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={!canGoPrevious()}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center gap-4">
            {currentAnswer && (
              <div className="flex items-center gap-2 text-secondary">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm">Answered</span>
              </div>
            )}
          </div>

          <Button
            onClick={handleNext}
            disabled={!canGoNext()}
            className="bg-gradient-primary hover:shadow-glow text-primary-foreground flex items-center gap-2"
          >
            {currentSection === assessmentSections.length - 1 && 
             currentQuestion === currentSectionData.questions.length - 1 
              ? "Complete Assessment" 
              : "Next"
            }
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Section Progress */}
        <div className="max-w-3xl mx-auto mt-8">
          <div className="flex justify-center gap-2">
            {assessmentSections.map((section, index) => (
              <div
                key={section.id}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index < currentSection
                    ? "bg-secondary"
                    : index === currentSection
                    ? "bg-primary"
                    : "bg-border"
                }`}
                title={section.title}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentFlow;