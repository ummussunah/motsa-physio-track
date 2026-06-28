import React, { useMemo, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useStorage } from '../hooks/use-storage';
import { exercises } from '../data/exercises';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { format, subDays, isSameDay, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { TrendingDown, Activity, Calendar, Award } from 'lucide-react';
import { toast } from 'sonner';

const Dashboard: React.FC = () => {
  const { t, language } = useLanguage();
  const { logs, goal } = useStorage();

  const last7Days = useMemo(() => {
    return eachDayOfInterval({
      start: subDays(new Date(), 6),
      end: new Date()
    });
  }, []);

  const chartData = useMemo(() => {
    return last7Days.map(day => {
      const dayLogs = logs.filter(log => isSameDay(new Date(log.date), day));
      const avgPain = dayLogs.length > 0 
        ? dayLogs.reduce((acc, curr) => acc + curr.painLevel, 0) / dayLogs.length 
        : null;
      
      return {
        name: format(day, 'EEE'),
        date: format(day, 'MMM dd'),
        pain: avgPain,
        completed: dayLogs.filter(l => l.completed).length,
      };
    });
  }, [logs, last7Days]);

  const stats = useMemo(() => {
    const todayLogs = logs.filter(log => isSameDay(new Date(log.date), new Date()));
    const completedToday = todayLogs.filter(l => l.completed).length;
    const target = goal?.targetExercisesPerWeek || 3;
    const dailyTarget = Math.ceil(target / 7);
    
    return {
      completedToday,
      dailyTarget,
      avgPainWeek: chartData.filter(d => d.pain !== null).reduce((acc, curr) => acc + (curr.pain || 0), 0) / (chartData.filter(d => d.pain !== null).length || 1)
    };
  }, [logs, goal, chartData]);

  useEffect(() => {
    const lastReminder = localStorage.getItem('last_reminder');
    const today = new Date().toDateString();
    
    if (lastReminder !== today) {
      setTimeout(() => {
        toast(t('dailyReminder'), {
          description: t('reminderDescription'),
        });
        localStorage.setItem('last_reminder', today);
      }, 2000);
    }
  }, [t, language]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">{t('dashboard')}</h2>
        <p className="text-slate-500 text-sm">{format(new Date(), 'EEEE, MMMM do')}</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-primary/5 border-primary/10">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-1">
            <Award className="w-8 h-8 text-primary mb-1" />
            <span className="text-2xl font-black text-primary">{stats.completedToday}</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{t('todaySummary')}</span>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 border-orange-100">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-1">
            <TrendingDown className="w-8 h-8 text-orange-500 mb-1" />
            <span className="text-2xl font-black text-orange-600">{stats.avgPainWeek.toFixed(1)}</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{t('averagePain')}</span>
          </CardContent>
        </Card>
      </div>

      {/* Pain Level Chart */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            {t('averagePain')}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-4 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94a3b8' }} 
              />
              <YAxis 
                hide 
                domain={[0, 10]} 
              />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                labelStyle={{ fontWeight: 'bold' }}
              />
              <Line 
                type="monotone" 
                dataKey="pain" 
                stroke="oklch(0.205 0 0)" 
                strokeWidth={3} 
                dot={{ r: 4, fill: 'oklch(0.205 0 0)' }}
                activeDot={{ r: 6 }}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Adherence Chart */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            {t('adherence')}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-4 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94a3b8' }} 
              />
              <YAxis hide />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="completed" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.completed > 0 ? 'oklch(0.205 0 0)' : '#e2e8f0'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">{t('recentActivity')}</h3>
        <div className="space-y-2">
          {logs.slice(0, 3).map((log) => {
            const exercise = exercises.find(ex => ex.id === log.exerciseId);
            return (
              <div key={log.id} className="bg-white border border-slate-100 p-3 rounded-xl flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center font-bold text-primary">
                    {log.painLevel}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold leading-tight">{exercise?.name[language]}</h4>
                    <p className="text-[10px] text-slate-400">{format(new Date(log.date), 'MMM dd, HH:mm')}</p>
                  </div>
                </div>
                {log.notes && (
                  <div className="text-[10px] text-slate-500 italic max-w-[100px] truncate">
                    "{log.notes}"
                  </div>
                )}
              </div>
            );
          })}
          {logs.length === 0 && (
            <p className="text-center text-slate-400 text-xs py-4 italic">{t('noActivity')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
