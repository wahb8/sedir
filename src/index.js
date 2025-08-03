// Import React and ReactDOM for rendering the app
import React from 'react';
import ReactDOM from 'react-dom/client';
// Import global styles
import './index.css';
// Import the main App component (handles routing and main UI)
import App from './App';
// Import web vitals reporting utility (optional performance monitoring)
import reportWebVitals from './reportWebVitals';

// Create the root element for the React app and render the App component inside it
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // StrictMode helps find potential problems in the app
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Call reportWebVitals to measure app performance (optional, can log or send to analytics)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
