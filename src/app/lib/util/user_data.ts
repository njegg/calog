import { SessionRepo } from "~/persistance/db";
import { Session, SessionCompact } from "~/persistance/model/session";
import { Theme, updateTheme } from "../common/theme";

export interface UserData {
  sessions?: SessionCompact[],
  theme?: Theme,
}

export async function importUserData(userData: UserData): Promise<void> {
  if (userData.sessions) {
    let sessions = userData.sessions.map(Session.fromCompact)

    console.log(`importing ${sessions.length} sessions`);

    for (let s of sessions) {
      SessionRepo.add(s);
    }
  }

  if (userData.theme) {
    console.log(`setting theme to ${Theme.getName(userData.theme)}`);
    updateTheme(userData.theme);
  }
}

