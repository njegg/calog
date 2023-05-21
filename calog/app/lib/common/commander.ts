import { Command } from "../command/command";
import { fuzzyMatch } from "../search/fuzzyMatch";

export class FuzzyCommander {
  private commands: Command[];

  constructor(commands: Command[]) {
    this.commands = commands;
  }

  public update(searchTerm: string): Command[] {
    return searchTerm == '' ?
      this.commands :
      this.commands.filter(c => fuzzyMatch(searchTerm, c.name));
  }
}

