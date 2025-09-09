import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Users, Trophy, ArrowRight } from "lucide-react";

interface AssessmentLandingProps {
  onStartAssessment: () => void;
}

const AssessmentLanding = ({ onStartAssessment }: AssessmentLandingProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Trophy className="w-4 h-4" />
            Professional Career Assessment
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
            Remote Patient Monitoring
            <br />
            <span className="text-foreground">Engineer Assessment</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover your readiness and alignment for a career in Remote Patient Monitoring Engineering. 
            Get personalized insights, skill mapping, and career guidance tailored to your profile.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="px-4 py-2">
              <Clock className="w-4 h-4 mr-2" />
              20-30 minutes
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              Psychometric Analysis
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Personalized Results
            </Badge>
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-primary">Career Alignment</CardTitle>
              <CardDescription>
                Discover how well your personality and interests align with RPM engineering roles
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-primary">Technical Readiness</CardTitle>
              <CardDescription>
                Assess your current technical skills and identify areas for improvement
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-primary">Learning Path</CardTitle>
              <CardDescription>
                Get personalized recommendations for courses, certifications, and next steps
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Assessment Overview */}
        <Card className="max-w-4xl mx-auto bg-gradient-card border-0 shadow-glow mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Assessment Overview</CardTitle>
            <CardDescription>
              This comprehensive assessment evaluates multiple dimensions of your readiness
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-primary mb-4">What We'll Assess:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Psychometric Profile:</strong> Personality traits, interests, and motivation patterns
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Technical Aptitude:</strong> Programming, networking, healthcare IoT knowledge
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>WISCAR Framework:</strong> Will, Interest, Skill, Cognitive readiness, Ability to learn, Real-world alignment
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-primary mb-4">You'll Receive:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Trophy className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Detailed Report:</strong> Comprehensive analysis of your strengths and growth areas
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Trophy className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Career Guidance:</strong> Personalized recommendations and alternative paths
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Trophy className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Learning Roadmap:</strong> Curated courses and certifications for your journey
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <Button 
            onClick={onStartAssessment}
            size="lg"
            className="bg-gradient-primary hover:shadow-glow text-primary-foreground px-8 py-6 text-lg font-semibold group transition-all duration-300"
          >
            Start Your Assessment
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            No registration required • Get instant results
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssessmentLanding;