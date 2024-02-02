export enum ExerciseType {
  PUSH, PULL, LEG, CARDIO, CORE
}

export interface Exercise {
  id?: string;
  name: string;
  type: ExerciseType;
}

export interface ExerciseCompact {
  n: string,
  t: number,
}

export const default_exercises: Exercise[] = [
  { name: "Push Up", type: ExerciseType.PUSH },
  { name: "Handstand", type: ExerciseType.PUSH },
  { name: "Triceps Extension", type: ExerciseType.PUSH },

  { name: "Pull Up", type: ExerciseType.PULL },
  { name: "Chin Up", type: ExerciseType.PULL },
  { name: "Bicep Curls", type: ExerciseType.PULL },
  { name: "Muscle Up", type: ExerciseType.PULL },
  { name: "Front Lever", type: ExerciseType.PULL },

  { name: "Squat", type: ExerciseType.LEG },
  { name: "Pistol Squat", type: ExerciseType.LEG },
  { name: "Lunges", type: ExerciseType.LEG },
  { name: "Nordic Curls", type: ExerciseType.LEG },

  { name: "L-sit", type: ExerciseType.CORE },
];

export namespace ExerciseCompact {
  export function of(exercise: Exercise): ExerciseCompact {
    return { n: exercise.name, t: exercise.type.valueOf() };
  }
}
