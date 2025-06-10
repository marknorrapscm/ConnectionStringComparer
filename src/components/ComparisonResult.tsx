
import { Check, X, AlertTriangle } from 'lucide-react';

interface ComparisonResultProps {
  isMatch: boolean;
  bothValid: boolean;
  leftLength: number;
  rightLength: number;
}

const ComparisonResult = ({ isMatch, bothValid, leftLength, rightLength }: ComparisonResultProps) => {
  const getResultContent = () => {
    if (leftLength === 0 || rightLength === 0) {
      return {
        icon: <AlertTriangle className="text-yellow-400" size={32} />,
        title: "Waiting for both connection strings",
        subtitle: "Paste connection strings in both fields to compare",
        bgColor: "bg-yellow-500/10",
        borderColor: "border-yellow-400",
        shadowColor: "shadow-yellow-400/25"
      };
    }

    if (!bothValid) {
      return {
        icon: <X className="text-red-400" size={32} />,
        title: "Invalid connection string format",
        subtitle: "Please check that both strings are valid connection strings",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-400",
        shadowColor: "shadow-red-400/25"
      };
    }

    if (isMatch) {
      return {
        icon: <Check className="text-emerald-400" size={32} />,
        title: "Perfect Match! ✨",
        subtitle: "Both connection strings are identical and valid",
        bgColor: "bg-emerald-500",
        borderColor: "",
        shadowColor: "shadow-emerald-400/50 shadow-2xl"
      };
    }

    return {
      icon: <X className="text-red-400" size={32} />,
      title: "No Match",
      subtitle: `Strings differ (${leftLength} vs ${rightLength} characters)`,
      bgColor: "bg-red-500/10",
      borderColor: "border-red-400",
      shadowColor: "shadow-red-400/25"
    };
  };

  const result = getResultContent();

  return (
    <div className="flex justify-center">
      <div className={`
        ${result.bgColor} ${result.borderColor} ${result.shadowColor} 
        ${result.borderColor ? 'border-2' : ''} 
        rounded-xl p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 
        max-w-md w-full animate-fade-in
      `}>
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="animate-scale-in">
            {result.icon}
          </div>
          <h3 className="text-xl font-semibold text-white">
            {result.title}
          </h3>
          <p className="text-gray-300 text-sm">
            {result.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComparisonResult;
