import { ArrowRight, Zap } from "lucide-react";

interface CTAInterface {
  handleDashboardClick: () => void;
}

const CTA: React.FC<CTAInterface> = ({ handleDashboardClick }) => {
  return (
    <div className="text-center">
      <button
        onClick={handleDashboardClick}
        className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 opacity-50 dark:opacity-20"></div>
        <div className="relative flex items-center">
          <Zap className="mr-3 h-6 w-6" />
          Go to My Dashboard
          <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </button>
    </div>
  );
};

export default CTA;
