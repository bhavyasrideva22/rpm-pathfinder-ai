import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Question, Answer } from "@/types/assessment";
import { useState } from "react";

interface QuestionCardProps {
  question: Question;
  answer?: Answer;
  onAnswer: (answer: Answer) => void;
}

const QuestionCard = ({ question, answer, onAnswer }: QuestionCardProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(
    question.type === 'multiple-choice' && answer?.value 
      ? (answer.value as string).split(',') 
      : []
  );
  const [sliderValue, setSliderValue] = useState<number[]>([
    answer?.value ? Number(answer.value) : question.scale?.min || 1
  ]);

  const handleSingleChoice = (value: string) => {
    onAnswer({
      questionId: question.id,
      value: value
    });
  };

  const handleMultipleChoice = (value: string, checked: boolean) => {
    let newValues: string[];
    if (checked) {
      newValues = [...selectedValues, value];
    } else {
      newValues = selectedValues.filter(v => v !== value);
    }
    setSelectedValues(newValues);
    onAnswer({
      questionId: question.id,
      value: newValues.join(',')
    });
  };

  const handleScale = (value: number[]) => {
    setSliderValue(value);
    onAnswer({
      questionId: question.id,
      value: value[0]
    });
  };

  const renderQuestionInput = () => {
    switch (question.type) {
      case 'likert':
      case 'single-choice':
        return (
          <RadioGroup
            value={answer?.value as string || ''}
            onValueChange={handleSingleChoice}
            className="space-y-3"
          >
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-3">
                <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                <Label 
                  htmlFor={`${question.id}-${index}`}
                  className="cursor-pointer flex-1 py-2"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Checkbox
                  id={`${question.id}-${index}`}
                  checked={selectedValues.includes(option)}
                  onCheckedChange={(checked) => 
                    handleMultipleChoice(option, checked as boolean)
                  }
                />
                <Label 
                  htmlFor={`${question.id}-${index}`}
                  className="cursor-pointer flex-1 py-2"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );

      case 'scale':
        return (
          <div className="space-y-6">
            <div className="px-2">
              <Slider
                value={sliderValue}
                onValueChange={handleScale}
                max={question.scale?.max || 10}
                min={question.scale?.min || 1}
                step={1}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground px-2">
              <span>{question.scale?.minLabel}</span>
              <span className="font-medium text-primary">
                {sliderValue[0]}
              </span>
              <span>{question.scale?.maxLabel}</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="bg-gradient-card border-0 shadow-elegant">
      <CardHeader>
        <CardTitle className="text-lg leading-relaxed">
          {question.question}
        </CardTitle>
        {question.required && (
          <span className="text-sm text-destructive">* Required</span>
        )}
      </CardHeader>
      <CardContent>
        {renderQuestionInput()}
      </CardContent>
    </Card>
  );
};

export default QuestionCard;