import React from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/bg.png';
import './LandingPage.css'; // Reuse landing page styles for background and layout

// Dummy leaderboard data (to be replaced with backend data in the future)
const dummyLeaderboard = [
  { name: 'Alice', level: 12 },
  { name: 'Bob', level: 10 },
  { name: 'Charlie', level: 9 },
  { name: 'Diana', level: 8 },
  { name: 'Eve', level: 7 },
];

export default function LeaderboardPage() {
  const navigate = useNavigate();

  // Handler for returning to the landing page
  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div
      className="landing-page" // Reuse landing page class for background
      style={{ backgroundImage: `url(${bg})` }}
    >
      <h1 style={{ marginTop: 40, color: '#fff', textShadow: '0 2px 8px #000' }}>Leaderboard</h1>
      {/* Leaderboard table */}
      <div style={{ background: 'rgba(255,255,255,0.92)', borderRadius: 12, padding: 32, boxShadow: '0 4px 24px rgba(0,0,0,0.18)', minWidth: 320 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1.2rem' }}>
          <thead>
            <tr style={{ background: '#0288d1', color: '#fff' }}>
              <th style={{ padding: '12px 16px', borderRadius: '8px 0 0 0' }}>Player</th>
              <th style={{ padding: '12px 16px', borderRadius: '0 8px 0 0' }}>Level</th>
            </tr>
          </thead>
          <tbody>
            {dummyLeaderboard.map((player, idx) => (
              <tr key={player.name} style={{ background: idx % 2 === 0 ? '#e3f2fd' : '#fff' }}>
                <td style={{ padding: '10px 16px', fontWeight: 600 }}>{player.name}</td>
                <td style={{ padding: '10px 16px', textAlign: 'center' }}>{player.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Back to main menu button */}
      <button
        className="how-to-play-button"
        style={{ marginTop: 32, fontSize: '1.1rem', padding: '10px 28px' }}
        onClick={handleBackClick}
      >
        Back to Main Menu
      </button>
      {/* Future: Fetch and display real leaderboard data from backend */}
    </div>
  );
} 