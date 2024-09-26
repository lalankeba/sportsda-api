import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
	limit: parseInt(process.env.REQUESTS_PER_INTERVAL || '100', 10),
  standardHeaders: 'draft-7',
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  message: { message: `Too many requests. Please try again later...` }
});

export default rateLimiter;