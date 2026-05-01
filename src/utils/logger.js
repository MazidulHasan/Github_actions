// @ts-check

const LEVELS = { debug: 10, info: 20, warn: 30, error: 40, silent: 99 };
const currentLevel = LEVELS[process.env.LOG_LEVEL?.toLowerCase()] ?? LEVELS.info;

function ts() {
  return new Date().toISOString();
}

function format(level, msg) {
  return `[${ts()}] [${level.toUpperCase()}] ${msg}`;
}

const logger = {
  debug(msg) {
    if (currentLevel <= LEVELS.debug) console.log(format('debug', msg));
  },
  info(msg) {
    if (currentLevel <= LEVELS.info) console.log(format('info', msg));
  },
  warn(msg) {
    if (currentLevel <= LEVELS.warn) console.warn(format('warn', msg));
  },
  error(msg) {
    if (currentLevel <= LEVELS.error) console.error(format('error', msg));
  },
};

module.exports = { logger };
