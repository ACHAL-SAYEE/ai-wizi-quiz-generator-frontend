import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

const QuizCard = ({ question, selectedAnswer, onSelectAnswer, showResult, quizMode }) => {
  const isCorrect = selectedAnswer === question.answer;
  
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-success text-success-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'hard':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex-1">
          {question.question}
        </h3>
        <Badge className={getDifficultyColor(question.difficulty)}>
          {question.difficulty}
        </Badge>
      </div>

      <div className="space-y-3 mb-4">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrectOption = option === question.answer;
          
          let buttonClass = "w-full justify-start text-left h-auto py-3 px-4 ";
          
          if (showResult) {
            if (isCorrectOption) {
              buttonClass += "bg-success/10 border-success text-success hover:bg-success/20";
            } else if (isSelected && !isCorrect) {
              buttonClass += "bg-destructive/10 border-destructive text-destructive hover:bg-destructive/20";
            } else {
              buttonClass += "opacity-50";
            }
          } else if (isSelected) {
            buttonClass += "bg-primary text-primary-foreground";
          } else {
            buttonClass += "bg-secondary hover:bg-secondary/80";
          }

          return (
            <Button
              key={index}
              variant="outline"
              className={buttonClass}
              onClick={() => !showResult && onSelectAnswer(option)}
              disabled={showResult && !quizMode}
            >
              <span className="flex items-center gap-4 w-full">
                <span className="font-semibold">{String.fromCharCode(65 + index)}.</span>
                <span className="flex-1">{option}</span>
                {showResult && isCorrectOption && (
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                )}
                {showResult && isSelected && !isCorrect && (
                  <XCircle className="h-5 w-5 flex-shrink-0" />
                )}
              </span>
            </Button>
          );
        })}
      </div>

      {showResult && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Explanation: </span>
            {question.explanation}
          </p>
        </div>
      )}
    </Card>
  );
};

export default QuizCard;
