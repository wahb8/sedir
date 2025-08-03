import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import bg from '../assets/bg.png';
import logo from '../assets/Logo.png';
import './LandingPage.css';
import HowToPlayModal from './HowToPlayModal';

export default function LandingPage() {
  // State to control visibility of the How to Play modal
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  // State to control visibility of the Play Mode modal
  const [showModeModal, setShowModeModal] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  // Handler for Play button: navigates to the game page
  const handlePlayClick = () => {
    setShowModeModal(true);
  };

  // Handler for Leaderboard button: navigates to the leaderboard page
  const handleLeaderboardClick = () => {
    navigate('/leaderboard');
  };

  // Handler for selecting a mode (for now, both go to /game)
  const handleSelectMode = (mode) => {
    setShowModeModal(false);
    // In the future, pass mode as state or param
    navigate('/game');
  };

  // Handler for Profile button: navigates to the profile page
  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div 
      className="landing-page"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <img src={logo} alt="Sedir Game Logo" className="logo" />
      <div className="button-container">
        <button className="leaderboard-button" onClick={handleLeaderboardClick}>
          Leaderboard
        </button>
        <button
          className="play-button"
          onClick={handlePlayClick} // Open mode selection modal
        >
          Play!
        </button>
        {/* Show How to Play modal on click */}
        <button className="how-to-play-button" onClick={() => setShowHowToPlay(true)}>
          How to Play
        </button>
      </div>
      {/* Add a Log In button in the upper right corner for user authentication (backend integration to be added later) */}
      <div className="login-button-container">
        <button className="login-button">Log In</button>
        {/* Add a Profile button next to Log In for user profile management (backend integration to be added later) */}
        <button className="login-button" style={{ marginLeft: '8px' }} onClick={handleProfileClick}>Profile</button>
      </div>
      {/* How to Play Modal Popup */}
      {showHowToPlay && (
        <HowToPlayModal onClose={() => setShowHowToPlay(false)} />
      )}
      {/* Play Mode Selection Modal */}
      {showModeModal && (
        <div className="how-to-play-modal-overlay" style={{ zIndex: 3000 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 36, minWidth: 320, boxShadow: '0 4px 24px rgba(0,0,0,0.18)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ marginBottom: 24, color: '#222' }}>Select mode</h2>
            <div style={{ display: 'flex', gap: 24 }}>
              <button
                className="play-button"
                style={{ fontSize: '1.1rem', padding: '14px 28px', minWidth: 120 }}
                onClick={() => handleSelectMode('bot')}
              >
                Play against bot
              </button>
              <button
                className="play-button"
                style={{ fontSize: '1.1rem', padding: '14px 28px', minWidth: 120, backgroundColor: '#43a047' }}
                onClick={() => handleSelectMode('online')}
              >
                Play online
              </button>
            </div>
            <button
              className="how-to-play-button"
              style={{ marginTop: 28 }}
              onClick={() => setShowModeModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 