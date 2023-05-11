import { CouchBase } from '@triniwiz/nativescript-couchbase'
import { Session } from './model/session';
import { Exercise, default_exercises } from './model/exercise'

type ListenerAction = () => void;

export class SessionRepo {
  private static dbName: string = 'sessions'
  private static db: CouchBase = new CouchBase(this.dbName);

  private static listeners: ListenerAction[]  = [];

  static {
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

export class ExerciseRepo {
  private static dbName: string = 'exercises'

  // TODO: something better?
  static all(): Exercise[] {
    let db = new CouchBase(this.dbName);
    db.destroyDatabase();
    db = new CouchBase('exercises');

    default_exercises.forEach(e => db.createDocument(e))

    let exercises = db.query({ select: [] });;

    db.close();
    return exercises;
  }

}

