export const callGoogleAnalytics = (...args) => window.ga &&  (
  window.location.href.includes('localhost')
    ? console.warn('Google Analytics called with', ...args)
    : window.ga(...args)
)