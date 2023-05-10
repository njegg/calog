import { File } from "@nativescript/core";
import { Folder } from "tns-core-modules";
import { Session } from "./session";
import { Writable, writable } from 'svelte/store'

const fs = require("tns-core-modules/file-system");

let appDir: Folder = fs.knownFolders.currentApp();
let sessionsDir: Folder = appDir.getFolder('calog-sessions');

const sessionDataFile: File = <File> sessionsDir.getFile('session_data.json');
if (sessionDataFile.readTextSync() == '') {
  sessionDataFile.writeTextSync('{}');
}
sessionDataFile.writeTextSync('{}');

const sessionIdFile: File = <File> sessionsDir.getFile('session_id.json');

console.log('--------- SESSION FILE -----------\n' + (sessionsDir.getFile('session_data.json').readTextSync()));

export function printFile() {
  console.log('Current file content: ' + sessionDataFile.readTextSync());
}

export class SessionManager {
  private static id: number;

  static {
    let idFileData = sessionIdFile.readTextSync();
    
    if (idFileData == '') {
      sessionIdFile.writeTextSync('0');
      this.id = 0;
    } else {
      this.id = +idFileData;
    }
  }

  public static addSession(session: Session) {
    let today = session.date.toLocaleDateString();

    sessionStore.update(x => {
      let sessions = x.get(today);

      session.id = this.getId();

      if (sessions) {
        sessions.push(session);
      } else {
        x.set(today, [session]);
      }

      saveSessions(x);

      return x;
    });
  }

  public static deleteSession(session: Session) {
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

  private static getId(): number {
    this.id++;
    sessionIdFile.writeTextSync(this.id + '');

    return this.id;
  }
}

/**
  * Saves a date-sessions map from a svelte store to a file as JSON
  */
function saveSessions(sessions: Map<string, Session[]>) {
  let json = JSON.stringify(Object.fromEntries(sessions));

  sessionDataFile.writeTextSync(json);
}

/**
  * Loads a date-sessions map as JSON from a file to a svelte store
  */
export function loadSessions(): Map<string, Session[]> {
  let text = sessionDataFile.readTextSync();

  if (!text) {
    throw 'loadSessions(): Error while reading a file: ' + sessionDataFile.path;
  }

  let sessionsFromFile = new Map<string, Session[]>(Object.entries(JSON.parse(text)));
  sessionStore.set(sessionsFromFile);
  return sessionsFromFile;
}

export const sessionStore: Writable<Map<string, Session[]>> = writable(new Map<string, Session[]>());
export const selectedSession = writable(-1);


