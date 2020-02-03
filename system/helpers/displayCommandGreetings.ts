import colors from 'colors';
import { Command } from 'commander';

export default function displayCommandGreetings(cmd: Command) {
  console.log(`[${colors.blue(cmd.name())}] ${cmd.description()}`);
};
