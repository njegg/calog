// TODO: make everything optional with ?
export type Command<> = {
  name: string,
  exec: () => void,
  undo: (() => void) | undefined;
};

