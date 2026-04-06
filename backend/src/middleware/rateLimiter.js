const rateLimitCache = new Map();

const rateLimiter = (options = { windowMs: 60000, max: 100 }) => {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const currentTime = Date.now();
    
    if (!rateLimitCache.has(ip)) {
      rateLimitCache.set(ip, { count: 1, startTime: currentTime });
      return next();
    }
    
    const record = rateLimitCache.get(ip);
    
    // Check if the window has expired
    if (currentTime - record.startTime > options.windowMs) {
      rateLimitCache.set(ip, { count: 1, startTime: currentTime });
      return next();
    }
    
    // Check if max request limit is reached
    if (record.count >= options.max) {
      return res.status(429).json({
        error: 'Too many requests, please try again later.'
      });
    }
    
    // Increment count
    record.count += 1;
    rateLimitCache.set(ip, record);
    next();
  };
};

module.exports = rateLimiter;
