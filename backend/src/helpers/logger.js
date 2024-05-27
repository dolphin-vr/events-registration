import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf } = format;


const { LOG_LEVEL = 'error' } = process.env;

// Створюємо власний формат для логів
const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
  level: LOG_LEVEL, // Встановлюємо рівень логування, можна змінити на 'debug' або інший рівень
  format: combine(timestamp(), customFormat),
  transports: [
    new transports.Console(), // Транспорт для виводу логів в консоль
  ],
});

export default logger;
