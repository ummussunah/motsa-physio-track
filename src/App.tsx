import { LanguageProvider } from "./contexts/LanguageContext";
import { Toaster } from "./components/ui/sonner";
import MainLayout from "./components/MainLayout";
import Dashboard from "./components/Dashboard";
import ExerciseList from "./components/ExerciseList";
import ConditionSelector from "./components/ConditionSelector";
import { useState } from "react";

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'exercises' | 'setup'>('setup');

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground font-sans">
        <MainLayout onNavigate={setCurrentPage} currentPage={currentPage}>
          {currentPage === 'setup' && <ConditionSelector onComplete={() => setCurrentPage('exercises')} />}
          {currentPage === 'exercises' && <ExerciseList />}
          {currentPage === 'dashboard' && <Dashboard />}
        </MainLayout>
        <Toaster />
      </div>
    </LanguageProvider>
  );
}

export default App;
