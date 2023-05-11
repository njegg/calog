import { Exercise } from './exercise'

export interface Session {
  id?: string;
  dateHash?: number;
  date: Date;
  exercise: Exercise;
  reps: number;
  sets: number;
}

export namespace Session {
  export function of(date: Date, exercise: Exercise, reps: number, sets: number): Session {
    return { date, exercise, reps, sets };
  }
}

