import { File } from "@nativescript/core";
import { Folder } from "tns-core-modules";
import { Session } from "./session";
import { Writable, writable } from 'svelte/store'

const fs = require("tns-core-modules/file-system");

let dir: Folder = fs.knownFolders.currentApp();
dir = dir.getFolder('files');
const file: File = <File>dir.getFile('session_data.json');


function save(sessions: Session[]) {
  file
    .writeText(JSON.stringify(sessions))
    .catch((e) => console.log(e));
}

function load(): Session[] {
  let sessionsFromFile: Session[] = [];

  file
    .readText()
    .then(json => {
      sessionsFromFile = JSON.parse(json);

      console.info('loaded sessions from a file');
      sessionsFromFile.forEach(s => console.info(s.exercise.name))
      
      sessionStore.set(sessionsFromFile);
    })
    .catch(e => console.error(e));

    return sessionsFromFile;
}

export const sessionStore: Writable<Session[]> = writable(load());
sessionStore.subscribe((x: Session[]) => save(x))

