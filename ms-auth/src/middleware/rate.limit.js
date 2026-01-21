import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 150,
    msg: "No puedes realizar mas peticiones en este momento."
});

export default limiter;