import { DateHash } from '~/lib/util/date_hash';
import { Exercise, ExerciseCompact } from './exercise'

export interface Session {
  id?: string;
  dateHash: number;
  exercise: Exercise;
  reps: number;
  sets: number;
}

export interface SessionCompact {
  d: number,
  e: ExerciseCompact,
  r: number;
  s: number;
}

export namespace Session {
  export function of(
    date: Date,
    exercise: Exercise,
    reps: number,
    sets: number,
  ): Session {
    return {
      exercise,
      reps,
      sets,
      dateHash: DateHash.fromDate(date)
    };
  }

  export function fromCompact(s: SessionCompact): Session {
    return {
      dateHash: s.d,
      reps: s.r,
      sets: s.s,
      exercise: Exercise.fromCompact(s.e),
    }
  }
}

export namespace SessionCompact {
  export function of(session: Session): SessionCompact {
    return {
      d: session.dateHash,
      e: ExerciseCompact.of(session.exercise),
      r: session.reps,
      s: session.sets,
    };
  }
}
