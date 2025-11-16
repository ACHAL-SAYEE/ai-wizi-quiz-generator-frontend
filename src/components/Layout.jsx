import { NavLink } from "@/components/NavLink";
import { Brain, History } from "lucide-react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Wiki Quiz</h1>
                <p className="text-sm text-muted-foreground">AI-Powered Wikipedia Quiz Generator</p>
              </div>
            </div>

            {/* Side-by-side Navigation */}
            <nav className="flex gap-2">
              <NavLink
                to="/"
                end
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:bg-muted"
                activeClassName="bg-primary text-primary-foreground hover:bg-primary"
              >
                <Brain className="h-4 w-4" />
                Generate Quiz
              </NavLink>
              <NavLink
                to="/history"
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:bg-muted"
                activeClassName="bg-primary text-primary-foreground hover:bg-primary"
              >
                <History className="h-4 w-4" />
                History
              </NavLink>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      {/* <footer className="border-t mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>AI-Powered Learning Platform.</p>
        </div>
      </footer> */}
    </div>
  );
};

export default Layout;
