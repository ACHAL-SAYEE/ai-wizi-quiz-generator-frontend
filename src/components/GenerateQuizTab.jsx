import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ExternalLink, BookOpen, Users, MapPin, Building2 } from "lucide-react";
import { generateQuiz } from "@/utils/api";
import { toast } from "sonner";
import QuizCard from "./QuizCard";

const GenerateQuizTab = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [quizMode, setQuizMode] = useState(false);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

const handleGenerate = async () => {
  if (!url.trim()) {
    toast.error("Please enter a Wikipedia URL");
    return;
  }

  setLoading(true);
  setQuizData(null);
  setQuizMode(false);
  setAnswers({});
  setShowResults(false);

  try {
    const data = await generateQuiz(url);   
    setQuizData(data);
    toast.success("Quiz generated successfully!");
  } catch (error) {
    toast.error(error.message || "Failed to generate quiz");
  } finally {
    setLoading(false);
  }
};


  const handleStartQuiz = () => {
    setQuizMode(true);
    setAnswers({});
    setShowResults(false);
  };

  const handleSelectAnswer = (questionId, answer) => {
    console.log("ansers ",answers)
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmitQuiz = () => {
    const unanswered = quizData.quiz.filter((q,i) => !answers[i]);
    if (unanswered.length > 0) {
      toast.error(`Please answer all questions (${unanswered.length} remaining)`);
      return;
    }
    console.log("answers12 ",answers)
    setShowResults(true);
    
    const correct = quizData.quiz.filter((q,i) => answers[i] === q.answer).length;
    const percentage = Math.round((correct / quizData.quiz.length) * 100);
    
    toast.success(`Quiz completed! Score: ${correct}/${quizData.quiz.length} (${percentage}%)`);
  };

  const getScore = () => {
    if (!showResults) return null;
    const correct = quizData.quiz.filter((q,i) => answers[i] === q.answer).length;
    return { correct, total: quizData.quiz.length, percentage: Math.round((correct / quizData.quiz.length) * 100) };
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Generate Quiz</h2>
            <p className="text-muted-foreground">
              Enter a Wikipedia article URL to generate an AI-powered quiz
            </p>
          </div>
          
          <div className="flex gap-3">
            <Input
              placeholder="https://en.wikipedia.org/wiki/Article_Name"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
              className="flex-1"
            />
            <Button 
              onClick={handleGenerate} 
              disabled={loading}
              className="bg-primary hover:bg-primary/90"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Quiz"
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Quiz Results */}
      {quizData && (
        <div className="space-y-6">
          {/* Article Info */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">{quizData.title}</h2>
                <a 
                  href={quizData.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-1 text-sm"
                >
                  View on Wikipedia
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              {!quizMode && (
                <Button onClick={handleStartQuiz} variant="default">
                  Take Quiz
                </Button>
              )}
              {quizMode && !showResults && (
                <Button onClick={handleSubmitQuiz} variant="default">
                  Submit Quiz
                </Button>
              )}
            </div>

            <p className="text-muted-foreground mb-4">{quizData.summary}</p>

            {/* Key Entities */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold text-sm">People</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {quizData.key_entities.people.map((person, i) => (
                    <Badge key={i} variant="secondary">{person}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold text-sm">Organizations</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {quizData.key_entities.organizations.map((org, i) => (
                    <Badge key={i} variant="secondary">{org}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold text-sm">Locations</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {quizData.key_entities.locations.map((loc, i) => (
                    <Badge key={i} variant="secondary">{loc}</Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Sections */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold text-sm">Article Sections</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quizData.sections.map((section, i) => (
                  <Badge key={i} variant="outline">{section}</Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* Score Display */}
          {showResults && (
            <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Quiz Results</h3>
                <div className="text-5xl font-bold text-primary mb-2">
                  {getScore().correct}/{getScore().total}
                </div>
                <p className="text-lg text-muted-foreground">
                  {getScore().percentage}% Correct
                </p>
              </div>
            </Card>
          )}

          {/* Quiz Questions */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              {quizMode ? "Answer the Questions" : "Quiz Questions"}
            </h3>
            <div className="space-y-4">
              {quizData.quiz.map((question,index) => (
                <QuizCard
                  key={index}
                  question={question}
                  selectedAnswer={answers[index]}
                  onSelectAnswer={(answer) => handleSelectAnswer(index, answer)}
                  showResult={showResults || !quizMode}
                  quizMode={quizMode}
                />
              ))}
            </div>
          </div>

          {/* Related Topics */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-3">Related Topics</h3>
            <div className="flex flex-wrap gap-2">
              {quizData.related_topics.map((topic, i) => (
                <Badge key={i} variant="outline" className="text-sm">
                  {topic}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default GenerateQuizTab;
