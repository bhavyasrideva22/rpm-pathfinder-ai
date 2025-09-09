import { WISCARScore } from "@/types/assessment";
import { Progress } from "@/components/ui/progress";

interface WISCARChartProps {
  scores: WISCARScore;
}

const WISCARChart = ({ scores }: WISCARChartProps) => {
  const dimensions = [
    {
      key: 'will' as keyof WISCARScore,
      label: 'Will',
      description: 'Motivation & Persistence',
      color: 'bg-blue-500'
    },
    {
      key: 'interest' as keyof WISCARScore,
      label: 'Interest',
      description: 'Curiosity & Passion',
      color: 'bg-green-500'
    },
    {
      key: 'skill' as keyof WISCARScore,
      label: 'Skill',
      description: 'Current Abilities',
      color: 'bg-purple-500'
    },
    {
      key: 'cognitive' as keyof WISCARScore,
      label: 'Cognitive',
      description: 'Problem-solving Ability',
      color: 'bg-orange-500'
    },
    {
      key: 'ability' as keyof WISCARScore,
      label: 'Ability to Learn',
      description: 'Learning Readiness',
      color: 'bg-red-500'
    },
    {
      key: 'realWorld' as keyof WISCARScore,
      label: 'Real-World Alignment',
      description: 'Career Goal Fit',
      color: 'bg-teal-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Radar Chart Alternative - Bar Chart */}
      <div className="grid md:grid-cols-2 gap-6">
        {dimensions.map((dimension) => (
          <div key={dimension.key} className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-primary">{dimension.label}</h4>
                <p className="text-sm text-muted-foreground">{dimension.description}</p>
              </div>
              <div className="text-2xl font-bold text-primary">
                {scores[dimension.key]}
              </div>
            </div>
            
            <div className="space-y-2">
              <Progress 
                value={scores[dimension.key]} 
                className="h-3"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span className="font-medium">
                  {scores[dimension.key]}/100
                </span>
                <span>100</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-accent/50 rounded-lg p-4 mt-6">
        <h4 className="font-semibold text-primary mb-2">WISCAR Summary</h4>
        <p className="text-sm text-muted-foreground">
          Your highest scoring dimension is{' '}
          <span className="font-semibold text-primary">
            {dimensions.find(d => scores[d.key] === Math.max(...Object.values(scores)))?.label}
          </span>
          {' '}({Math.max(...Object.values(scores))}), indicating strong{' '}
          {dimensions.find(d => scores[d.key] === Math.max(...Object.values(scores)))?.description.toLowerCase()}.
          {Math.min(...Object.values(scores)) < 60 && (
            <>
              {' '}Consider focusing on improving your{' '}
              <span className="font-semibold text-primary">
                {dimensions.find(d => scores[d.key] === Math.min(...Object.values(scores)))?.label}
              </span>
              {' '}({Math.min(...Object.values(scores))}) for better overall readiness.
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default WISCARChart;