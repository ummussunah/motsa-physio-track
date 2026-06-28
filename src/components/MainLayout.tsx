import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { LayoutDashboard, Dumbbell, User, Languages } from 'lucide-react';
import { cn } from '../lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
  onNavigate: (page: 'dashboard' | 'exercises' | 'setup') => void;
  currentPage: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, onNavigate, currentPage }) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-slate-50 border-x border-slate-200 shadow-sm relative">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary" onClick={() => onNavigate('dashboard')}>{t('appName')}</h1>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setLanguage(language === 'en' ? 'ha' : 'en')}
          className="flex items-center gap-2"
        >
          <Languages className="w-4 h-4" />
          <span className="text-xs uppercase font-medium">{language === 'en' ? 'Hausa' : 'English'}</span>
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-28 p-4 overflow-y-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 px-6 py-3 flex items-center justify-between z-10">
        <NavButton 
          icon={<LayoutDashboard />} 
          label={t('dashboard')} 
          active={currentPage === 'dashboard'} 
          onClick={() => onNavigate('dashboard')} 
        />
        <NavButton 
          icon={<Dumbbell />} 
          label={t('exercises')} 
          active={currentPage === 'exercises'} 
          onClick={() => onNavigate('exercises')} 
        />
        <NavButton 
          icon={<User />} 
          label={t('profile')} 
          active={currentPage === 'setup'} 
          onClick={() => onNavigate('setup')} 
        />
      </nav>
    </div>
  );
};

const NavButton = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex flex-col items-center gap-1.5 transition-colors min-w-[64px] min-h-[48px] justify-center rounded-lg",
      active ? "text-primary font-semibold" : "text-slate-400 hover:text-slate-600"
    )}
  >
    {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<any>, { className: "w-6 h-6" })}
    <span className="text-xs">{label}</span>
  </button>
);

export default MainLayout;
