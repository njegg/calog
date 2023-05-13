import { Session }  from '../model/session'
import { Exercise }  from '../model/exercise'

const dayInMS = 24 * 60 * 60 * 1000;

export function generate(from: Date, to: Date, step: number, exercise: Exercise): Session[] {
  let timeDif = to.getTime() - from.getTime();
  let days = timeDif / (1000 * 3600 * 24) | 0;

  let time = from.getTime();
  let reps = 8;

  let sessions: Session[] = [];

  for (let i = 0; i < days; i += step) {
    sessions.push(Session.of(new Date(time), exercise, reps, 3));

    if (Math.random() < 0.66) reps++;
    time += dayInMS * step;
  }

  return sessions;
}

