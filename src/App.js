// Import React and routing components for navigation between pages
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// Import the main page components for routing
import LandingPage from './components/LandingPage';
import GamePage from './components/GamePage';
import LeaderboardPage from './components/LeaderboardPage';
import ProfilePage from './components/ProfilePage';

// Main App component that sets up all the routes for the application
function App() {
  // The Router wraps the entire app and enables navigation between pages
  return (
    <Router>
      {/* Routes define which component to show for each URL path */}
      <Routes>
        {/* Landing page route - main menu */}
        <Route path="/" element={<LandingPage />} />
        {/* Game page route - main game board */}
        <Route path="/game" element={<GamePage />} />
        {/* Leaderboard page route - shows top players */}
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        {/* Profile page route - shows user profile and history */}
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

// Export the App component so it can be used in index.js (the entry point)
export default App;
