var _a;
import { writable } from 'svelte/store';
const fs = require("tns-core-modules/file-system");
let appDir = fs.knownFolders.currentApp();
let sessionsDir = appDir.getFolder('calog-sessions');
const sessionDataFile = sessionsDir.getFile('session_data.json');
if (sessionDataFile.readTextSync() == '') {
    sessionDataFile.writeTextSync('{}');
}
sessionDataFile.writeTextSync('{}');
const sessionIdFile = sessionsDir.getFile('session_id.json');
console.log('--------- SESSION FILE -----------\n' + (sessionsDir.getFile('session_data.json').readTextSync()));
export function printFile() {
    console.log('Current file content: ' + sessionDataFile.readTextSync());
}
export class SessionManager {
    static addSession(session) {
        let today = session.date.toLocaleDateString();
        sessionStore.update(x => {
            let sessions = x.get(today);
            session.id = this.getId();
            if (sessions) {
                sessions.push(session);
            }
            else {
                x.set(today, [session]);
            }
            saveSessions(x);
            return x;
        });
    }
    static deleteSession(session) {
        let key = session.date.toLocaleDateString ?
            session.date.toLocaleDateString() :
            new Date(session.date).toLocaleDateString();
        sessionStore.update(x => {
            let sessions = x.get(key);
            sessions = sessions?.filter(s => s.id != session.id);
            if (sessions) {
                x.set(key, sessions);
            }
            saveSessions(x);
            return x;
        });
    }
    static getId() {
        this.id++;
        sessionIdFile.writeTextSync(this.id + '');
        return this.id;
    }
}
_a = SessionManager;
(() => {
    let idFileData = sessionIdFile.readTextSync();
    if (idFileData == '') {
        sessionIdFile.writeTextSync('0');
        _a.id = 0;
    }
    else {
        _a.id = +idFileData;
    }
})();
/**
  * Saves a date-sessions map from a svelte store to a file as JSON
  */
function saveSessions(sessions) {
    let json = JSON.stringify(Object.fromEntries(sessions));
    sessionDataFile.writeTextSync(json);
}
/**
  * Loads a date-sessions map as JSON from a file to a svelte store
  */
export function loadSessions() {
    let text = sessionDataFile.readTextSync();
    if (!text) {
        throw 'loadSessions(): Error while reading a file: ' + sessionDataFile.path;
    }
    let sessionsFromFile = new Map(Object.entries(JSON.parse(text)));
    sessionStore.set(sessionsFromFile);
    return sessionsFromFile;
}
export const sessionStore = writable(new Map());
export const selectedSession = writable(-1);
//# sourceMappingURL=sessionStore.js.map