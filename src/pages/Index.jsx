import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, History } from "lucide-react";
import GenerateQuizTab from "@/components/GenerateQuizTab";
import HistoryTab from "@/components/HistoryTab";

const Index = () => {
  const [activeTab, setActiveTab] = useState("generate");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">DeepKlarity Wiki Quiz</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Wikipedia Quiz Generator</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="generate" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Generate Quiz
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-6">
            <GenerateQuizTab />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <HistoryTab />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 DeepKlarity Technologies. AI-Powered Learning Platform.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
