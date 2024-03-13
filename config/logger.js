const winston = require('winston');
const helper = require("../src/utilities/helpersDate");

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.printf(({ level, message }) => {
      return `${level}: ${helper.getFullDateTime()} ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: 'app.log' })
  ]
});

module.exports = logger;