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

    let failedAdds = sessions
      .map(s => SessionRepo.add(s))
      .reduce((fails, isAdded) => fails += +!isAdded, 0);

    if (failedAdds > 0) {
      throw new Error(`failed to import ${failedAdds}/${sessions.length} sessions`);
    }
  }

  if (userData.theme) {
    updateTheme(userData.theme);
  }
}

