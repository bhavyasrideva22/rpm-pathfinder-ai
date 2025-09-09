import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AssessmentResult } from "@/types/assessment";
import { CheckCircle2, AlertCircle, XCircle, TrendingUp, BookOpen, Target, Users } from "lucide-react";
import WISCARChart from "./WISCARChart";

interface AssessmentResultsProps {
  result: AssessmentResult;
}

const AssessmentResults = ({ result }: AssessmentResultsProps) => {
  const getRecommendationIcon = () => {
    switch (result.recommendation) {
      case 'yes':
        return <CheckCircle2 className="w-8 h-8 text-secondary" />;
      case 'maybe':
        return <AlertCircle className="w-8 h-8 text-yellow-500" />;
      case 'no':
        return <XCircle className="w-8 h-8 text-destructive" />;
    }
  };

  const getRecommendationMessage = () => {
    switch (result.recommendation) {
      case 'yes':
        return {
          title: "Excellent Fit!",
          description: "You show strong alignment and readiness for a career in Remote Patient Monitoring Engineering.",
          color: "text-secondary"
        };
      case 'maybe':
        return {
          title: "Promising Potential",
          description: "You have good foundational qualities but would benefit from additional skill development.",
          color: "text-yellow-600"
        };
      case 'no':
        return {
          title: "Consider Alternatives",
          description: "RPM Engineering may not be the best fit, but there are related paths that might suit you better.",
          color: "text-destructive"
        };
    }
  };

  const recommendation = getRecommendationMessage();

  const handleDownloadReport = () => {
    // In a real app, this would generate a PDF report
    console.log("Downloading detailed report...");
  };

  const handleRetakeAssessment = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            {getRecommendationIcon()}
          </div>
          
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Assessment Complete
            </span>
          </h1>
          
          <div className="max-w-2xl mx-auto">
            <h2 className={`text-2xl font-semibold mb-2 ${recommendation.color}`}>
              {recommendation.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {recommendation.description}
            </p>
          </div>
        </div>

        {/* Overall Scores */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader className="text-center">
              <CardTitle className="text-primary">Overall Score</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {result.overallScore}
              </div>
              <Progress value={result.overallScore} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                Confidence: {result.confidenceScore}%
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader className="text-center">
              <CardTitle className="text-primary">Psychometric Fit</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {result.psychometricScore}
              </div>
              <Progress value={result.psychometricScore} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                Personality & Interest Alignment
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader className="text-center">
              <CardTitle className="text-primary">Technical Readiness</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {result.technicalScore}
              </div>
              <Progress value={result.technicalScore} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                Current Technical Knowledge
              </p>
            </CardContent>
          </Card>
        </div>

        {/* WISCAR Analysis */}
        <Card className="mb-12 bg-gradient-card border-0 shadow-elegant">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-primary">
              WISCAR Readiness Framework
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Your readiness across six key dimensions
            </p>
          </CardHeader>
          <CardContent>
            <WISCARChart scores={result.wiscarScores} />
          </CardContent>
        </Card>

        {/* Insights Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Strengths */}
          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-secondary">
                <TrendingUp className="w-5 h-5" />
                Your Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{strength}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Areas for Improvement */}
          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Target className="w-5 h-5" />
                Growth Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.improvements.map((improvement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{improvement}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Path */}
        <Card className="mb-12 bg-gradient-card border-0 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <BookOpen className="w-5 h-5" />
              Recommended Learning Path
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {result.learningPath.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-semibold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alternative Paths (if recommendation is 'no') */}
        {result.alternativePaths && result.alternativePaths.length > 0 && (
          <Card className="mb-12 bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Users className="w-5 h-5" />
                Alternative Career Paths
              </CardTitle>
              <p className="text-muted-foreground">
                Based on your profile, these careers might be a better fit:
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {result.alternativePaths.map((path, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {path}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={handleDownloadReport}
              size="lg"
              className="bg-gradient-primary hover:shadow-glow text-primary-foreground"
            >
              Download Detailed Report
            </Button>
            <Button
              onClick={handleRetakeAssessment}
              variant="outline"
              size="lg"
            >
              Retake Assessment
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            This assessment provides insights based on your current responses. As you grow and develop new skills, 
            your results may change. Consider retaking this assessment periodically to track your progress.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;