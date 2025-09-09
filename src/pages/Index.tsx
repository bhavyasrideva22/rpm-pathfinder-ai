import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    navigate("/assessment");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-medium mb-8">
            🏥 Professional Career Assessment Platform
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Discover Your
            </span>
            <br />
            <span className="text-foreground">Healthcare Tech Future</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Take our comprehensive Remote Patient Monitoring Engineer Assessment and unlock personalized 
            insights about your career readiness, technical aptitude, and learning path in healthcare technology.
          </p>
          
          <button
            onClick={handleStartAssessment}
            className="bg-gradient-primary hover:shadow-glow text-primary-foreground px-12 py-6 text-xl font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-elegant"
          >
            Start Assessment
          </button>
          
          <p className="text-sm text-muted-foreground mt-6">
            20-30 minutes • Comprehensive analysis • Instant results
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
