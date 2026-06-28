import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useStorage } from '../hooks/use-storage';
import { Condition } from '../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { CheckCircle2 } from 'lucide-react';

const ConditionSelector: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { t } = useLanguage();
  const { goal, updateGoal } = useStorage();
  const [selectedCondition, setSelectedCondition] = useState<Condition>(goal?.condition || 'low_back');
  const [target, setTarget] = useState(goal?.targetExercisesPerWeek.toString() || '3');

  const conditions: { id: Condition; labelKey: string }[] = [
    { id: 'low_back', labelKey: 'lowBack' },
    { id: 'womens_health', labelKey: 'womensHealth' },
    { id: 'pelvic_floor', labelKey: 'pelvicFloor' },
    { id: 'pregnancy', labelKey: 'pregnancy' },
    { id: 'postpartum', labelKey: 'postpartum' },
    { id: 'musculoskeletal', labelKey: 'msk' },
  ];

  const handleSave = () => {
    updateGoal({
      condition: selectedCondition,
      targetExercisesPerWeek: parseInt(target) || 3,
      startDate: new Date().toISOString(),
    });
    onComplete();
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">{t('setGoals')}</h2>
        <p className="text-muted-foreground">{t('welcome')}</p>
      </div>

      <div className="grid gap-3">
        <Label className="text-base font-semibold">{t('selectCondition')}</Label>
        {conditions.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCondition(c.id)}
            className={`flex items-center justify-between p-5 min-h-[56px] rounded-xl border-2 transition-all active:scale-[0.98] ${
              selectedCondition === c.id 
                ? 'border-primary bg-primary/5 shadow-sm' 
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <span className={`font-medium ${selectedCondition === c.id ? 'text-primary' : 'text-slate-600'}`}>
              {t(c.labelKey)}
            </span>
            {selectedCondition === c.id && <CheckCircle2 className="w-6 h-6 text-primary fill-primary/10" />}
          </button>
        ))}
      </div>

      <Card className="border-slate-200">
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="target" className="text-base font-semibold">{t('targetPerWeek')}</Label>
            <Input 
              id="target" 
              type="number" 
              min="1" 
              max="21"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="text-lg h-12"
            />
          </div>
          <Button onClick={handleSave} className="w-full h-12 text-lg font-bold">
            {t('startProgram')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConditionSelector;
