export enum ExerciseType {
  PUSH, PULL, LEG, CARDIO, CORE
}

export interface Exercise {
  id?: string;
  name: string;
  tags: string[];
}


export interface ExerciseCompact {
  n: string,
  t: string[],
}

export const default_exercises: Exercise[] = [
  { name: "Push Up", tags: []},
  { name: "Handstand", tags: []},
  { name: "Triceps Extension", tags: []},

  { name: "Pull Up", tags: []},
  { name: "Chin Up", tags: []},
  { name: "Bicep Curls", tags: []},
  { name: "Muscle Up", tags: []},
  { name: "Front Lever", tags: []},

  { name: "Squat", tags: []},
  { name: "Pistol Squat", tags: []},
  { name: "Lunges", tags: []},
  { name: "Nordic Curls", tags: []},

  { name: "L-sit", tags: []},
];

export namespace ExerciseCompact {
  export function of(exercise: Exercise): ExerciseCompact {
    return { n: exercise.name, t: exercise.tags };
  }
}

export namespace Exercise {
  export function fromCompact(e: ExerciseCompact): Exercise {
    return {
      name: e.n,
      tags: e.t,
    }
  }
}
