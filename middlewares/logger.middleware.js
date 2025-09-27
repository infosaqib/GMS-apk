const morgan = require('morgan');
const { createStream } = require('rotating-file-stream');
const path = require('path');
const fs = require('fs');

const logDirectory = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const pad = (num) => (num > 9 ? num : '0' + num);

const generator = (time) => {
  if (!time) {
    const now = new Date();
    return `logs-${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}.log`;
  }
  return `logs-${time.getFullYear()}-${pad(time.getMonth() + 1)}-${pad(time.getDate())}.log`;
};

const accessLogStream = createStream(generator, {
  interval: '1d',
  path: logDirectory,
  compress: 'gzip',
});

const format = ':remote-addr - [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms - ":referrer" - ":user-agent"';

const logger =  morgan(format, { stream: accessLogStream });

module.exports = logger;
