import colors from 'colors/safe';
import { Command } from 'commander';

export default function requiredCommandOption(cmd: Command, option: string, format: string | undefined = undefined) {
  const code = `--${option.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`)}`;

  if (!cmd[option]) {
    console.log(colors.red(`Option '${code}' is required.\n`));
    cmd.help();
  }

  if (format && !cmd[option].match(format)) {
    console.log(colors.red(`Option '${code}' value '${cmd[option]}' is in invalid format: should be ${format.toString()}.\n`));
    cmd.help();
  }
};
