import { Exercise, ExerciseType, default_exercises } from '~/persistance/model/exercise'
import { CouchBase } from '@triniwiz/nativescript-couchbase';

export class ExerciseRepo {

  static all(): Exercise[] {
    let db = new CouchBase('exercises');
    db.destroyDatabase();
    db = new CouchBase('exercises');

    default_exercises.forEach(e => db.createDocument(e))

    let exercises = db.query({ select: [] });;
    db.close();
    return exercises;
  }

}

