import { Exercise } from "~/persistance/model/exercise";

export class Session {
  id: number;
  exercise: Exercise;
  sets: number;
  reps: number;
  date: Date;

  constructor(exercise: Exercise, sets: number, reps: number, date: Date) {
    this.exercise = exercise;
    this.sets = sets;
    this.reps = reps;
    this.date = date;
    this.id = -1;
  } 
}

