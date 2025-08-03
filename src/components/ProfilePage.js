import React from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/bg.png';
import './LandingPage.css'; // Reuse landing page styles for background and layout
import profileImg from '../assets/Logo.png'; // Use Logo.png as a placeholder profile image

// Dummy user and games data (to be replaced with backend data in the future)
const dummyUser = {
  name: 'John Doe',
  level: 1234,
  profileImage: profileImg,
};

const dummyGames = [
  { id: 1, player1: 'John Doe', player2: 'Alice', winner: 'John Doe' },
  { id: 2, player1: 'John Doe', player2: 'Bob', winner: 'Bob' },
  { id: 3, player1: 'John Doe', player2: 'Charlie', winner: 'John Doe' },
  { id: 4, player1: 'John Doe', player2: 'Diana', winner: 'Diana' },
];

export default function ProfilePage() {
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
      {/* Profile info section */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 60, marginBottom: 40 }}>
        {/* Profile image on the left */}
        <img
          src={dummyUser.profileImage}
          alt="Profile"
          style={{ width: 120, height: 120, borderRadius: 12, objectFit: 'cover', boxShadow: '0 4px 16px rgba(0,0,0,0.18)', marginRight: 40 }} // Square image with rounded corners
        />
        {/* User name and level */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#222' }}>{dummyUser.name}</span> {/* Bolder, no white shadow */}
          <span style={{ fontSize: '1.2rem', color: '#555', marginTop: 2 }}>level: {dummyUser.level}</span>
        </div>
      </div>
      {/* Previous games table */}
      <div style={{ background: 'rgba(255,255,255,0.92)', borderRadius: 12, padding: 32, boxShadow: '0 4px 24px rgba(0,0,0,0.18)', minWidth: 340, maxWidth: 600, margin: '0 auto' }}>
        <h2 style={{ color: '#222', marginBottom: 18 }}>Previous Games</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1.1rem' }}>
          <thead>
            <tr style={{ background: '#0288d1', color: '#fff' }}>
              <th style={{ padding: '10px 14px', borderRadius: '8px 0 0 0' }}>Player 1</th>
              <th style={{ padding: '10px 14px' }}>Player 2</th>
              <th style={{ padding: '10px 14px', borderRadius: '0 8px 0 0' }}>Winner</th>
            </tr>
          </thead>
          <tbody>
            {dummyGames.map((game, idx) => (
              <tr key={game.id} style={{ background: idx % 2 === 0 ? '#e3f2fd' : '#fff' }}>
                <td style={{ padding: '8px 14px', fontWeight: 600 }}>{game.player1}</td>
                <td style={{ padding: '8px 14px', fontWeight: 600 }}>{game.player2}</td>
                <td style={{ padding: '8px 14px', color: game.winner === dummyUser.name ? '#43a047' : '#d32f2f', fontWeight: 700 }}>{game.winner}</td>
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
      {/* Future: Fetch and display real profile and games data from backend */}
    </div>
  );
} 