import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, ExternalLink, Eye } from "lucide-react";
import { toast } from "sonner";
import QuizDetailsModal from "./QuizDetailsModal";

// 🔥 Replace mock imports with real API
import { fetchQuizHistory, fetchQuizDetails } from "@/utils/api";

const HistoryTab = () => {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const data = await fetchQuizHistory();
console.log("datax ",data)
      // Your backend doesn't send question_count, so compute it
      const transformed = data.map(item => ({
        ...item,
        question_count: item.quiz?.length || 0,
        created_at: item.created_at || new Date().toISOString() 
      }));

      setHistory(transformed);
    } catch (error) {
      toast.error("Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (id,index) => {
    setLoadingDetails(true);
    setModalOpen(true);

    try {
      const details =history[index]

      // Add missing fields if needed
      setSelectedQuiz({
        ...details,
        question_count: details.quiz?.length || 0
      });
    } catch (error) {
      toast.error("Failed to load quiz details");
      setModalOpen(false);
    } finally {
      setLoadingDetails(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-foreground mb-2">Quiz History</h2>
          <p className="text-muted-foreground">
            View all previously generated quizzes
          </p>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No quizzes generated yet</p>
          </div>
        ) : (
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Questions</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((item,index) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>

                    <TableCell>
                      <a 
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1 text-sm"
                      >
                        View Article
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </TableCell>

                    <TableCell>
                      <Badge variant="secondary">
                        {item.question_count} questions
                      </Badge>
                    </TableCell>

                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(item.created_at)}
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(item.id,index)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      <QuizDetailsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        quiz={selectedQuiz}
        loading={loadingDetails}
      />
    </div>
  );
};

export default HistoryTab;
