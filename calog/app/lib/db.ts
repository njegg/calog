import { CouchBase, ConcurrencyMode } from '@triniwiz/nativescript-couchbase';


const database = new CouchBase('my-database');
let id;

console.log('################################## DB');

export function dbTest() {
  const results = database.query({
    select: [], // Leave empty to query for all
    from: 'my-database', // Omit or set null to use current db
    limit: 10,
  });
  
  results.forEach(p => {
    console.log(p);
  })
}

database.close();
