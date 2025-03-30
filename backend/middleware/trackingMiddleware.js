const trackingMiddleware = (req, res, next) => {
  // Extract tracking parameters from request
  const { clickId, affiliateId } = req.query;
  
  if (clickId || affiliateId) {
    // Store tracking data in request object for later use
    req.trackingInfo = {
      clickId,
      affiliateId,
      timestamp: new Date(),
      userAgent: req.headers['user-agent'],
      referrer: req.headers.referer || '',
      ip: req.ip
    };
    
    console.log('Tracking info captured:', req.trackingInfo);
  }
  
  next();
};

module.exports = trackingMiddleware;