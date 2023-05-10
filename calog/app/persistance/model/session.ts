import { Exercise } from './exercise'

export interface Session {
  id: number;
  exercise: Exercise;
  reps: number;
  sets: number;
}
