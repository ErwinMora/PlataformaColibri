import logs from "../utils/logs.js";

// Middleware para loggear cada request
function logger(req, res, next) {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;

        logs.http(
            `HTTP Request`, // Mensaje Principal
            {
                method: req.method,
                url: req.originalUrl,
                statusCode: res.statusCode,
                duration: `${duration}ms`,
                timestamp: new Date().toISOString()
            }
        );
    });

    next();
}

export default logger;
