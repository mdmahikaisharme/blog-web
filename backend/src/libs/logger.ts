import chalk from "chalk";

/**
 * logger
 * -------------
 *
 */
export default class logger {
  static log(...message: string[]) {
    this.info(...message);
  }
  static info(...message: string[]) {
    console.log(chalk.blueBright("info"), ...message);
  }
  static success(...message: string[]) {
    console.log(chalk.greenBright("success"), ...message);
  }
  static warn(...message: string[]) {
    console.log(chalk.yellowBright("warn"), ...message);
  }
  static error(...message: string[]) {
    console.log(chalk.redBright("error"), ...message);
  }
}
