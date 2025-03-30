/**
 * Parse and extract tracking parameters from URL
 * @param {string} url - The URL to parse
 * @returns {object} - Tracking parameters
 */
export const parseTrackingParams = (url) => {
  const parsedUrl = new URL(url);
  const params = new URLSearchParams(parsedUrl.search);
  
  return {
    clickId: params.get('clickId') || null,
    affiliateId: params.get('affiliateId') || null,
    campaignId: params.get('campaignId') || null,
    source: params.get('source') || null
  };
};

/**
 * Append tracking information to a URL
 * @param {string} baseUrl - The base URL
 * @param {object} trackingInfo - Tracking information object
 * @returns {string} - URL with tracking parameters
 */
export const appendTrackingParams = (baseUrl, trackingInfo) => {
  if (!trackingInfo) return baseUrl;
  
  const url = new URL(baseUrl);
  const params = new URLSearchParams(url.search);
  
  if (trackingInfo.clickId) params.set('clickId', trackingInfo.clickId);
  if (trackingInfo.affiliateId) params.set('affiliateId', trackingInfo.affiliateId);
  if (trackingInfo.campaignId) params.set('campaignId', trackingInfo.campaignId);
  if (trackingInfo.source) params.set('source', trackingInfo.source);
  
  url.search = params.toString();
  return url.toString();
};