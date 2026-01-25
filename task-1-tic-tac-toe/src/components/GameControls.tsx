import { Button } from "@/components/ui/button";
import { RotateCcw, Trash2 } from "lucide-react";

interface GameControlsProps {
  onRestart: () => void;
  onResetScore: () => void;
}

export const GameControls = ({ onRestart, onResetScore }: GameControlsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <Button
        onClick={onRestart}
        className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-2 rounded-xl shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Restart Game
      </Button>
      
      <Button
        onClick={onResetScore}
        variant="outline"
        className="border-border/60 text-muted-foreground hover:text-foreground hover:bg-secondary px-6 py-2 rounded-xl"
      >
        <Trash2 className="w-4 h-4 mr-2" />
        Reset Score
      </Button>
    </div>
  );
};
