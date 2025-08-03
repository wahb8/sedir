// reportWebVitals is used to measure and report web performance metrics for the app
// It can log metrics or send them to an analytics endpoint
const reportWebVitals = onPerfEntry => {
  // If a callback function is provided, import web-vitals and run all metrics
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Export the function so it can be used in index.js
export default reportWebVitals;
