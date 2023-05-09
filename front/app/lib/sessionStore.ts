import { File } from "@nativescript/core";
import { Folder } from "tns-core-modules";
import { Session } from "./session";
import { Writable, writable } from 'svelte/store'

const fs = require("tns-core-modules/file-system");

let appDir: Folder = fs.knownFolders.currentApp();
let sessionsDir: Folder = appDir.getFolder('calog-sessions');

console.log('SESSION DATA ON LOAD: ' + (sessionsDir.getFile('session_data.json').readTextSync()));

export function printFile() {
  const file: File = <File> sessionsDir.getFile('session_data.json');
  console.log('Current file content: ' + file.readTextSync());
}

export function addSession(date: Date, session: Session) {
  let key = date.toLocaleDateString();

  sessionStore.update(x => {
    if (x.has(key)) {
      x.get(key)?.push(session);
    } else {
      x.set(key, [session]);
    }

    saveSessions(x);
    return x;
  });
}

/**
  * Saves a date-sessions map from a svelte store to a file as JSON
  */
function saveSessions(sessions: Map<string, Session[]>) {
  const file: File = <File> sessionsDir.getFile('session_data.json');

  let json = JSON.stringify(Object.fromEntries(sessions));

  file.writeTextSync(json);
}

/**
  * Loads a date-sessions map as JSON from a file to a svelte store
  */
export function loadSessions(): Map<string, Session[]> {
  const file: File = <File> sessionsDir.getFile('session_data.json');
  let text = file.readTextSync();

  if (!text) {
    throw 'loadSessions(): Error while reading a file: ' + file.path;
  }

  let sessionsFromFile = new Map<string, Session[]>(Object.entries(JSON.parse(text)));
  sessionStore.set(sessionsFromFile);
  return sessionsFromFile;
}

export const sessionStore: Writable<Map<string, Session[]>> = writable(new Map<string, Session[]>());

