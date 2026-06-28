import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useStorage } from '../hooks/use-storage';
import { exercises } from '../data/exercises';
import { Exercise } from '../types';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Slider } from './ui/slider';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { PlayCircle, CheckCircle, ChevronRight, Info } from 'lucide-react';
import { toast } from 'sonner';

const ExerciseList: React.FC = () => {
  const { t, language } = useLanguage();
  const { goal, addLog, logs } = useStorage();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  
  // Filtering exercises - if no goal, show all or MSK
  const condition = goal?.condition || 'musculoskeletal';
  const filteredExercises = exercises.filter(ex => ex.category === condition || ex.category === 'musculoskeletal');

  const isCompletedToday = (exerciseId: string) => {
    const today = new Date().toISOString().split('T')[0];
    return logs.some(log => log.exerciseId === exerciseId && log.date.startsWith(today) && log.completed);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t('exercises')}</h2>
        <div className="px-3 py-1 bg-primary/10 rounded-full text-[10px] font-bold text-primary uppercase tracking-wider">
          {t(condition.replace('_', ''))}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredExercises.length === 0 ? (
          <p className="text-center text-slate-500 py-12">{t('noExercises')}</p>
        ) : (
          filteredExercises.map(ex => (
            <Card key={ex.id} className="overflow-hidden border-slate-200 hover:border-primary/50 transition-colors cursor-pointer group active:scale-[0.99]" onClick={() => setSelectedExercise(ex)}>
              <div className="flex min-h-[100px]">
                <div className="w-28 h-full relative overflow-hidden flex-shrink-0">
                  <img 
                    src={ex.imageUrl} 
                    alt={ex.name[language]} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%23e2e8f0" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%2394a3b8" font-size="12"%3EExercise%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  {isCompletedToday(ex.id) && (
                    <div className="absolute inset-0 bg-primary/40 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-white drop-shadow-md" />
                    </div>
                  )}
                </div>
                <CardContent className="flex-1 p-4 flex items-center justify-between min-h-[80px]">
                  <div>
                    <h3 className="font-bold text-base text-slate-900 leading-tight">{ex.name[language]}</h3>
                    <p className="text-sm text-slate-500 line-clamp-2 mt-1">{ex.description[language]}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                </CardContent>
              </div>
            </Card>
          ))
        )}
      </div>

      {selectedExercise && (
        <ExerciseDetailModal 
          exercise={selectedExercise} 
          open={!!selectedExercise} 
          onClose={() => setSelectedExercise(null)}
          onLog={(pain, notes) => {
            addLog({
              date: new Date().toISOString(),
              exerciseId: selectedExercise.id,
              completed: true,
              painLevel: pain,
              notes
            });
            toast.success(t('completed'));
            setSelectedExercise(null);
          }}
        />
      )}
    </div>
  );
};

interface DetailProps {
  exercise: Exercise;
  open: boolean;
  onClose: () => void;
  onLog: (pain: number, notes: string) => void;
}

const ExerciseDetailModal = ({ exercise, open, onClose, onLog }: DetailProps) => {
  const { t, language } = useLanguage();
  const [step, setStep] = useState<'info' | 'log'>('info');
  const [pain, setPain] = useState([5]);
  const [notes, setNotes] = useState('');

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-[90vw] rounded-2xl p-0 overflow-hidden border-none sm:rounded-2xl">
        <div className="h-48 relative">
          <img 
            src={exercise.imageUrl} 
            alt={exercise.name[language]} 
            className="w-full h-full object-cover" 
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"%3E%3Crect fill="%23e2e8f0" width="400" height="200"/%3E%3Ctext x="200" y="100" text-anchor="middle" dy=".3em" fill="%2394a3b8" font-size="16"%3EExercise Image%3C/text%3E%3C/svg%3E';
            }}
          />
          <Button variant="secondary" size="icon" className="absolute top-2 right-2 rounded-full opacity-80" onClick={onClose}>
            <span className="sr-only">Close</span>
            ×
          </Button>
        </div>
        
        <div className="p-6">
          {step === 'info' ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold">{exercise.name[language]}</h3>
                <p className="text-slate-500 mt-2 text-sm">{exercise.description[language]}</p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-sm flex items-center gap-2">
                  <PlayCircle className="w-4 h-4 text-primary" />
                  {t('instructions')}
                </h4>
                <ol className="space-y-2 list-decimal list-inside text-sm text-slate-700">
                  {exercise.instructions[language].map((inst, i) => (
                    <li key={i} className="pl-1">{inst}</li>
                  ))}
                </ol>
              </div>

              <Button className="w-full h-14 text-lg font-bold" onClick={() => setStep('log')}>
                {t('markCompleted')}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-lg font-bold block text-center mb-6">{t('painLevel')}</Label>
                <div className="flex justify-between px-2 text-xs font-bold text-slate-400">
                  <span>0 ({t('none')})</span>
                  <span>10 ({t('severe')})</span>
                </div>
                <Slider 
                  value={pain} 
                  onValueChange={setPain} 
                  max={10} 
                  step={1} 
                  className="py-4"
                />
                <div className="text-center text-3xl font-black text-primary bg-primary/5 rounded-xl py-2">
                  {pain[0]}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-bold">{t('notes')}</Label>
                <Textarea 
                  placeholder={language === 'en' ? 'Feeling stiff, better today...' : 'Ina jin karkashi, gara yau...'} 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="resize-none"
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 h-12 text-base" onClick={() => setStep('info')}>
                  {t('back')}
                </Button>
                <Button className="flex-[2] h-12 font-bold text-base" onClick={() => onLog(pain[0], notes)}>
                  {t('saveLog')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExerciseList;
