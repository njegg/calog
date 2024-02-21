import { CouchBase, QueryLogicalOperator } from '@triniwiz/nativescript-couchbase'
import { Session, SessionCompact } from './model/session';
import { Exercise, default_exercises } from './model/exercise'
import { DateHash } from '~/lib/util/date_hash';

type ListenerAction = () => void;

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

  static allCompact(): SessionCompact[] {
    return SessionRepo.all().map(SessionCompact.of)
  }

  static add(session: Session): boolean {
    let id = this.db.createDocument(session);

    if (id) return true // any type ok
    else    return false
  }

  static addAll(sessions: Session[]): void {
    this.db.inBatch(() => {
      for (let s of sessions) {
        this.db.createDocument(s);
      }
    });
  }

  static del(id: string): boolean {
    return this.db.deleteDocument(id);
  }

  static update(id: string, session: Session): boolean {
    return this.db.updateDocument(id, {...session});
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

  static lastSessions(session: Session, amount: number): Session[] {
    return this.db.query({
      select: [],
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
    let id = this.db.createDocument(Session.of(new Date(), {name: 'temp', tags: []}, 0, 0));
    this.del(id);
  }
}

// TODO: something better?
export class ExerciseRepo {
  private static dbName: string = 'exercises'
  private static db: CouchBase = new CouchBase(this.dbName);

  static {
    if (!this.db.query({select: []}).length) {
      default_exercises.forEach(e => this.db.createDocument(e)) // TODO: Batch perhaps, didnt work before
    }
  }

  static all(): Exercise[] {
    let exercises = this.db.query({ select: [] });
    return exercises;
  }

  static add(exercise: Exercise): boolean {
    let id = this.db.createDocument(exercise);

    if (id) return true // any type ok
    else    return false
  }

  static shitAss(): void {
    this.db.destroyDatabase();
  }

  static del(id: string): boolean {
    return this.db.deleteDocument(id);
  }
}
