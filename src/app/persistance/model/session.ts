import { DateHash } from '~/lib/util/date_hash';
import { Exercise, ExerciseCompact } from './exercise'

export interface Session {
  id?: string;
  dateHash: number;
  exercise: Exercise;
  reps: number;
  sets: number;
  note: string;
}

export interface SessionCompact {
  d: number,
  e: ExerciseCompact,
  r: number;
  s: number;
  n: string;
}

export namespace Session {
  export function of(
    date: Date,
    exercise: Exercise,
    reps: number,
    sets: number,
    note: string = ""
  ): Session {
    return {
      exercise,
      reps,
      sets,
      note,
      dateHash: DateHash.fromDate(date)
    };
  }
}

export namespace SessionCompact {
  export function of(session: Session): SessionCompact {
    return {
      d: session.dateHash,
      e: ExerciseCompact.of(session.exercise),
      r: session.reps,
      s: session.sets,
      n: session.note
    };
  }
}
