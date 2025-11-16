import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import {
  X,
  ExternalLink,
  BookOpen,
  Users,
  MapPin,
  Building2
} from "lucide-react";

import QuizCard from "./QuizCard";

const QuizDetailsModal = ({ open, onClose, quiz, loading }) => {
  return (
    <Popup
      open={open}
      closeOnDocumentClick
      onClose={onClose}
      modal
      nested
      contentStyle={{
        padding: 20,
        borderRadius: "12px",
        maxWidth: "900px",
        width: "95%",
        maxHeight: "90vh",
        overflow: "hidden",
        background: "white",
      }}
      overlayStyle={{
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(2px)",
      }}
    >
      <div className="flex flex-col h-full relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 z-50"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-3 border-b border-gray-200">
          <h2 className="text-2xl font-bold">
            {quiz?.title || "Loading..."}
          </h2>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 pt-4 overflow-y-auto space-y-6" style={{ maxHeight: "calc(90vh - 70px)" }}>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
            </div>
          ) : (
            quiz && (
              <>

                {/* Wikipedia Link */}
                <a
                  href={quiz.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-1 text-sm"
                >
                  View on Wikipedia
                  <ExternalLink className="h-3 w-3" />
                </a>

                {/* Summary */}
                <p className="text-muted-foreground">{quiz.summary}</p>

                {/* Entities */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Entity label="People" icon={Users} items={quiz.key_entities.people} />
                  <Entity label="Organizations" icon={Building2} items={quiz.key_entities.organizations} />
                  <Entity label="Locations" icon={MapPin} items={quiz.key_entities.locations} />
                </div>

                {/* Sections */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold text-sm">Article Sections</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quiz.sections.map((section, i) => (
                      <span key={i} className="px-2 py-1 border rounded text-xs">
                        {section}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Questions */}
                <div>
                  <h3 className="text-lg font-bold mb-3">Quiz Questions</h3>
                  <div className="space-y-3">
                    {quiz.quiz.map((question) => (
                      <QuizCard
                        key={question.id}
                        question={question}
                        selectedAnswer={null}
                        onSelectAnswer={() => {}}
                        showResult={true}
                        quizMode={false}
                      />
                    ))}
                  </div>
                </div>

                {/* Related Topics */}
                <div className="p-4 border rounded-lg">
                  <h3 className="text-base font-semibold mb-3">Related Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {quiz.related_topics.map((topic, i) => (
                      <span key={i} className="px-2 py-1 border rounded text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

              </>
            )
          )}

        </div>
      </div>
    </Popup>
  );
};

const Entity = ({ icon: Icon, label, items }) => (
  <div>
    <div className="flex items-center gap-2 mb-1">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className="font-semibold text-sm">{label}</span>
    </div>
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span key={i} className="px-2 py-1 bg-secondary rounded text-xs">
          {item}
        </span>
      ))}
    </div>
  </div>
);

export default QuizDetailsModal;
