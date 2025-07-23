import { ElementType } from "react";

interface SectionHeaderProps {
  icon: ElementType;
  section: string;
  question: string;
}

export default function SectionHeader({
  icon: Icon,
  section,
  question,
}: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-950/50 rounded-full text-blue-700 dark:text-blue-400 font-semibold text-sm mb-4">
        <Icon className="w-4 h-4 mr-2" />
        {section}
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
        {question}
      </h1>
    </div>
  );
}
