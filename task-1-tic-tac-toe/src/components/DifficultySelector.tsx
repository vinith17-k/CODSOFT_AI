import { cn } from "@/lib/utils";

export type Difficulty = "easy" | "medium" | "hard";

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

const difficulties: { value: Difficulty; label: string }[] = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

export const DifficultySelector = ({ difficulty, onDifficultyChange }: DifficultySelectorProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="text-sm text-muted-foreground mr-2">Difficulty:</span>
      <div className="flex bg-secondary/50 rounded-lg p-1">
        {difficulties.map((d) => (
          <button
            key={d.value}
            onClick={() => onDifficultyChange(d.value)}
            className={cn(
              "px-3 sm:px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
              difficulty === d.value
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            {d.label}
          </button>
        ))}
      </div>
    </div>
  );
};
