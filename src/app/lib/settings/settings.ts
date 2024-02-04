import { ExerciseRepo, SessionRepo } from "~/persistance/db";
import { generate } from "~/persistance/test/test_data_generation";
import { Theme, themeStore, updateTheme } from "../common/theme";
import { pickAndImportUserData, writeToPickedFile } from "../util/file_access";
import { UserData } from "../util/user_data";

let theme: Theme;
themeStore.subscribe(t => theme = t.type);

export interface SettingsCommand {
  name: string,
  exec: () => void,
}

let devCommands: SettingsCommand[] = [];

if (__DEV__) {
  devCommands = [
    { name: "Generate Test Data", exec: generateTestData },
    { name: "Destroy Database", exec: destroyDatabase },
    { name: "Test Command", exec: testCommand },
  ]
}

export const settingsCommands: SettingsCommand[] = [
  ...devCommands,
  { name: "Backup data", exec: backupData },
  { name: "Import data", exec: importDataFromFile },
  { name: Theme.getName(Theme.ROSE_PINE_DARK), exec: () => updateTheme(Theme.ROSE_PINE_DARK) },
  { name: Theme.getName(Theme.ROSE_PINE_LIGHT), exec: () => updateTheme(Theme.ROSE_PINE_LIGHT) },
]

function backupData(): void {
  let userData: UserData = {
    theme,
    sessions: SessionRepo.allCompact(),
  };

  writeToPickedFile(`calog_data-${new Date().toISOString()}.json`, userData);
}

function importDataFromFile(): void {
  pickAndImportUserData();
}

function generateTestData(): void {
  let monthInMs = 1000 * 60 * 60 * 24 * 30;

  let today = new Date();
  let start = new Date();
  start.setTime(today.getTime() - monthInMs);

  let generatedData = generate(start, today, 2, ExerciseRepo.all()[0]);

  let added = generatedData.map(s => SessionRepo.add(s));

  if (!added.every(e => e)) {
    console.error('Something went wrong:');
    console.error(generatedData.filter((_, i) => !added[i]));
  }
}

function destroyDatabase(): void {
  SessionRepo.destroy();
}

function testCommand() {
  console.log('test butt');
}

