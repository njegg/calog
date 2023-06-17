import { CouchBase, QueryLogicalOperator } from '@triniwiz/nativescript-couchbase'
import { Session } from './model/session';
import { Exercise, default_exercises } from './model/exercise'
import { DateHash } from '~/lib/util/date_hash';

type ListenerAction = () => void;
export type SessionData = {reps: number, sets: number, dateHash: number};

export class SessionRepo {
  private static dbName: string = 'sessions'
  private static db: CouchBase = new CouchBase(this.dbName); // TODO: never closing bad?

  private static listeners: ListenerAction[]  = [];

  static {
    this.createListener();
  };

  private static createListener() {
    this.db.addDatabaseChangeListener((_) => {
      this.listeners.forEach(l => l.call(l));
    });
  }

  static onChangeListener(action: ListenerAction) {
    this.listeners.push(action);
  }

  static all(): Session[] {
    return this.db.query({ select: [] });
  }

  static add(session: Session): boolean {
    session.dateHash = DateHash.fromDate(session.date);

    let id = this.db.createDocument(session);

    if (id) return true // any type ok
    else    return false
  }

  static del(id: string): boolean {
    return this.db.deleteDocument(id);
  }

  static allByDate(date: Date): Session[] {
    return this.db.query({
      select: [],
      where: [{property: 'dateHash', comparison: 'equalTo', value: DateHash.fromDate(date)}]
    });
  }

  static allBy(property: string, value: any) {
    return this.db.query({ select: [], where: [{property, comparison: 'equalTo', value}]});
  }

  static lastSessions(session: Session, amount: number): SessionData[] {
    return this.db.query({
      select: ['reps', 'sets', 'dateHash'],
      where: [
        {property: 'exercise.name', comparison: 'equalTo', value: session.exercise.name},
        {property: 'dateHash', comparison: 'notEqualTo', value: session.dateHash, logical: QueryLogicalOperator.AND},
      ],
      order: [{property: 'dateHash', direction: 'desc'}],
      limit: amount,
    });
  }

  static destroy() {
    this.db.removeDatabaseChangeListener(() => {});
    this.db.destroyDatabase();

    this.db = new CouchBase(this.dbName);
    this.createListener();
    let id = this.db.createDocument(Session.of(new Date(), {name: 'temp', type: 0}, 0, 0));
    this.del(id);
  }
}

// TODO: something better?
export class ExerciseRepo {
  private static dbName: string = 'exercises'

  static {
    let db = new CouchBase(this.dbName);

    // No exercises, load default to db
    if (!db.query({select: []}).length) {
      default_exercises.forEach(e => db.createDocument(e)); // TODO: Batch perhaps, didnt work before
    }

    db.close();
  }

  static all(): Exercise[] { // Not called often so open/close on call
    let db = new CouchBase(this.dbName);
    let exercises = db.query({ select: [] });

    db.close();
    return exercises;
  }
}

