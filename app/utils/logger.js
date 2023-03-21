//logging 
const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const logger = winston.createLogger({
    level: 'info',
   // format: winston.format.json(), 
    format: format.combine(
      format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.printf((info) =>
          JSON.stringify({
              timestamp: info.timestamp,
              level: info.level,
              message: info.message,
          })
      )
  ),
    transports: [
        new winston.transports.File({
            filename: "logs/csye6225.log",
          }),
          new winston.transports.Console()
        ],
})

module.exports = logger;