export const createRateLimiter = (maxReq, windowMs) => {
  const requestCounts = new Map();

  return (req, res, next) => {
    const user = req.user.id;

    const userRecord = requestCounts.get(user);

    if (!userRecord) {
      const resetAt = Date.now() + windowMs;
      requestCounts.set(user, {count: 1, resetAt});
      return next();
    }

    if (Date.now() >= userRecord.resetAt) {
      requestCounts.set(user, {count: 1, resetAt: Date.now() + windowMs});
      return next();
    }

    if (userRecord.count >= maxReq) {
      return res.status(429).json({error: "Too many requests. Please try again"});
    }

    userRecord.count++;
    return next();
  }
}