export enum ExerciseType {
  Push,
  Pull,
  Leg
}

export class Exercise {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class Card {
  exercise: Exercise;
  selected: boolean = false;
  index: number;

  constructor(exercise: Exercise, index: number) {
    this.exercise = exercise;
    this.index = index;
  }
}


export const exercises: Exercise[] = [
    new Exercise(1, "Push Up"),
    // new Exercise(2, "Pull Up"),
    new Exercise(3, "L-sit"),
    // new Exercise(4, "Handstand"),

    // new Exercise(5, "Epik"),
    // new Exercise(6, "Muscle Up"),
    // new Exercise(7, "Yeet"),
    // new Exercise(8, "Squat"),
    // new Exercise(9, "Pistol Squat"),
    // new Exercise(10, "Triceps Extension"),
];

