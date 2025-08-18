import { CheckCircle2 } from "lucide-react";

interface ResultCardProps {
  title: string;
  icon: React.ReactNode;
  iconBg: string; // e.g., "from-blue-500 to-cyan-500"
  skillLevel?: string;
  notes?: string[];
}

const ResultCard: React.FC<ResultCardProps> = ({
  title,
  icon,
  iconBg,
  skillLevel,
  notes = [],
}) => {
  return (
    <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300">
      <div className="flex items-center mb-4">
        <div
          className={`w-12 h-12 bg-gradient-to-br ${iconBg} rounded-xl flex items-center justify-center mr-4`}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {title}
          </h3>
          {skillLevel && (
            <p className="text-blue-600 dark:text-blue-400 font-medium">
              {skillLevel}
            </p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        {notes.map((note, i) => (
          <div
            key={i}
            className="flex items-center text-slate-600 dark:text-slate-300"
          >
            <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
            <span>{note}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultCard;
