export class Shortcut {
  keyCode: number;
  command: Function;
  args?: any;
  withShift: boolean;

  constructor(keyCode: number, command: Function, args?: any[], withShift?: boolean) {
    this.keyCode = keyCode;
    this.command = command;
    this.withShift = withShift || false;
    if (args) {
      this.args = args;
    }
  }
}
