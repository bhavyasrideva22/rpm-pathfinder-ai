import { useState } from "react";
import AssessmentLanding from "@/components/Assessment/AssessmentLanding";
import AssessmentFlow from "@/components/Assessment/AssessmentFlow";
import { AssessmentResult } from "@/types/assessment";

const Assessment = () => {
  const [showAssessment, setShowAssessment] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const handleStartAssessment = () => {
    setShowAssessment(true);
  };

  const handleAssessmentComplete = (result: AssessmentResult) => {
    setResult(result);
  };

  if (!showAssessment) {
    return <AssessmentLanding onStartAssessment={handleStartAssessment} />;
  }

  return <AssessmentFlow onComplete={handleAssessmentComplete} />;
};

export default Assessment;