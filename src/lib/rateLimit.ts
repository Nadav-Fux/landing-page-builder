import { RateLimiterMemory } from 'rate-limiter-flexible';

const defaultLimiter = new RateLimiterMemory({
  points: 100,
  duration: 60,
});

const authLimiter = new RateLimiterMemory({
  points: 10,
  duration: 60,
});

const strictAuthLimiter = new RateLimiterMemory({
  points: 5,
  duration: 60,
});

export async function rateLimit(req: Request, limiterInstance: RateLimiterMemory = defaultLimiter) {
  const forwardedFor = req.headers.get('x-forwarded-for')
  const realIp = req.headers.get('x-real-ip')
  const ip = forwardedFor?.split(',')[0]?.trim() || realIp || 'unknown'

  try {
    await limiterInstance.consume(ip);
    return null;
  } catch (ratelimit) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Too Many Requests',
      message: 'Rate limit exceeded. Please try again later.'
    }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export { authLimiter, strictAuthLimiter }
