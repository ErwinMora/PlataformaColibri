import winston, { format } from "winston";
import "winston-mongodb";
import dotenv from "dotenv";

dotenv.config();
const conn = process.env.MONGO_URI;
const collection = process.env.MONGO_COLLECTION;

const logs = winston.createLogger({
    level: "http", // Nivel minimo a guardar
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(({ timestamp, level, message, ...meta }) => {
                    return `[${timestamp}] ${level}: ${message} ${JSON.stringify(meta)}`;
                })
            )
        }),
        new winston.transports.File({
            filename: 'logs/app.log',
            format: winston.format.printf(({ timestamp, level, message, ...meta }) => {
                return `[${timestamp}] ${level}: ${message} ${JSON.stringify(meta)}`;
            })
        }),
        new winston.transports.MongoDB({
            db: conn,
            options: { useUnifiedTopology: true },
            level: "http",
            collection: collection,
            tryReconnect: true,
            format: winston.format.combine(
                winston.format.json()
            )
        })
    ]
});

export default logs;