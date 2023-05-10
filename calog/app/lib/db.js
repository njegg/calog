import { CouchBase } from '@triniwiz/nativescript-couchbase';
const database = new CouchBase('my-database');
let id;
console.log('################################## DB');
export function dbTest() {
    const results = database.query({
        select: [],
        from: 'my-database',
        limit: 10,
    });
    results.forEach(p => {
        console.log(p);
    });
}
database.close();
//# sourceMappingURL=db.js.map