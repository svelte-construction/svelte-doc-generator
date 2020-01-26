import colors from 'colors/safe';
import { Command } from 'commander';

export default function displayCommandStep(cmd: Command, message: string) {
  console.log(`[${colors.blue(cmd.name())}] ${message}`);
};
