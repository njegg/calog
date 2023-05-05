import { File } from "@nativescript/core";
import { Folder } from "tns-core-modules";
import { Session } from "./session";
import { Writable, writable } from 'svelte/store'

const fs = require("tns-core-modules/file-system");

let dir: Folder = fs.knownFolders.documents();
dir = dir.getFolder('calog-sessions');
const file: File = <File>dir.getFile('session_data.json');

file.writeText('');

export function addSession(date: Date, session: Session) {
  let key = date.toLocaleDateString();

  sessionStore.update(x => {
    if (x.has(key)) {
      x.get(key)?.push(session);
    } else {
      x.set(key, [session]);
    }

    return x;
  });
}

function save(sessions: Map<string, Session[]>) {
  file.writeText(JSON.stringify(Object.fromEntries(sessions)))
}

function load(): Map<string, Session[]> {
  let sessionsFromFile: Map<string, Session[]> = new Map<string, Session[]>();

  file
    .readText()
    .then(json => {
      sessionsFromFile = new Map(Object.entries(JSON.parse(json)));
      sessionStore.set(JSON.parse(json))
    })

  return sessionsFromFile;
}

export const sessionStore: Writable<Map<string, Session[]>> = writable(load());
sessionStore.subscribe((x) => save(x))

