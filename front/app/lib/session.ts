import { Exercise } from "~/exercise";

export class Session {
  exercise: Exercise;
  sets: number;
  reps: number;

  constructor(exercise: Exercise, sets: number, reps: number) {
    this.exercise = exercise;
    this.sets = sets;
    this.reps = reps;
  }
}


