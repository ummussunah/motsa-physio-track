import { useState, useEffect } from 'react';
import { UserLog, UserGoal } from '../types';

export const useStorage = () => {
  const [logs, setLogs] = useState<UserLog[]>(() => {
    const saved = localStorage.getItem('physiotrack_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const [goal, setGoal] = useState<UserGoal | null>(() => {
    const saved = localStorage.getItem('physiotrack_goal');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('physiotrack_logs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem('physiotrack_goal', JSON.stringify(goal));
  }, [goal]);

  const addLog = (log: Omit<UserLog, 'id'>) => {
    const newLog = { ...log, id: crypto.randomUUID() };
    setLogs(prev => [newLog, ...prev]);
  };

  const updateGoal = (newGoal: UserGoal) => {
    setGoal(newGoal);
  };

  return { logs, addLog, goal, updateGoal };
};
