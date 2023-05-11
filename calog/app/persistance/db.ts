import { CouchBase } from '@triniwiz/nativescript-couchbase'
import { Session } from './model/session';
import { Exercise, default_exercises } from './model/exercise'

type ListenerAction = () => void;

export class SessionRepo {
  private static dbName: string = 'sessions'
  private static db: CouchBase = new CouchBase(this.dbName); // TODO: never closing bad?

  private static listeners: ListenerAction[]  = [];

  static {
    this.db.addDatabaseChangeListener((_) => {
      this.listeners.forEach(l => l.call(l));
    });
  };

  static onChangeListener(action: ListenerAction) {
    this.listeners.push(action);
  }

  static all(): Session[] {
    return this.db.query({ select: [] });
  }

  static add(session: Session): boolean {
    session.dateHash = this.dateHash(session.date);

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
      where: [{property: 'dateHash', comparison: 'equalTo', value: this.dateHash(date)}]
    });
  }

  static allBy(property: string, value: any) {
    return this.db.query({ select: [], where: [{property, comparison: 'equalTo', value}]});
  }

  static dateHash(date: Date): number {
    let day = date.getDay() * 1_000000;
    let month = date.getMonth() * 1_0000;
    let year = date.getFullYear();

    return year + day + month;
  }
}

// TODO: something better?
export class ExerciseRepo {
  private static dbName: string = 'exercises'

  static {
    let db = new CouchBase(this.dbName);

    // No exercises, load default to db
    if (!db.query({select: []}).length) {
      default_exercises.forEach(e => db.createDocument(e)) // TODO: Batch perhaps, didnt work before
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

