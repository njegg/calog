export type Command<> = {
  name: string,
  exec: () => void,
  undo: (() => void) | undefined;
};

