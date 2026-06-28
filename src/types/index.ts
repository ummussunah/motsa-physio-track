export type Language = 'en' | 'ha';

export interface Exercise {
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  instructions: Record<Language, string[]>;
  imageUrl: string;
  category: Condition;
}

export type Condition = 
  | 'low_back' 
  | 'womens_health' 
  | 'pelvic_floor' 
  | 'pregnancy' 
  | 'postpartum' 
  | 'musculoskeletal';

export interface UserLog {
  id: string;
  date: string;
  exerciseId: string;
  completed: boolean;
  painLevel: number; // 0-10
  notes: string;
}

export interface UserGoal {
  condition: Condition;
  targetExercisesPerWeek: number;
  startDate: string;
}
