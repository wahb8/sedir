import React, { useState } from 'react';
// Example images (replace with your own how-to-play images)
import how1 from '../assets/bash.png';
import how2 from '../assets/walad.png';
import how3 from '../assets/sheikh.png';

// Slides for how to play (image + text)
const slides = [
  {
    image: how1,
    text: 'The goal is to control the center Sedir squares with at least 3 of your pieces while removing all opponent pieces from the Sedir.'
  },
  {
    image: how2,
    text: 'Each piece moves differently. Learn their moves and plan your strategy!'
  },
  {
    image: how3,
    text: 'Turns alternate. Use your time wisely and try to outmaneuver your opponent.'
  }
];

/**
 * HowToPlayModal - Modal popup with a carousel for how to play instructions
 * Shows an image and text for each slide
 * Backend integration and mobile optimization to be added later
 */
export default function HowToPlayModal({ onClose }) {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex(i => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setIndex(i => (i === slides.length - 1 ? 0 : i + 1));

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000
    }}>
      {/* Modal content container */}
      <div style={{
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 4px 18px rgba(0,0,0,0.13)',
        padding: 32,
        width: 360, // Fixed width for consistent modal size
        height: 420, // Fixed height for consistent modal size
        minWidth: 320,
        maxWidth: '90vw',
        minHeight: 340,
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'hidden' // Prevent content from overflowing
      }}>
        {/* Close button */}
        <button onClick={onClose} style={{
          position: 'absolute',
          top: 12,
          right: 12,
          background: '#eee',
          border: 'none',
          borderRadius: '50%',
          width: 28,
          height: 28,
          fontSize: 18,
          cursor: 'pointer',
          zIndex: 2
        }}>&times;</button>
        {/* Carousel navigation */}
        <button onClick={prev} aria-label="Previous" style={{
          position: 'absolute',
          left: 12,
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 16,
          background: '#eee',
          border: 'none',
          borderRadius: '50%',
          width: 28,
          height: 28,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 2
        }}>{'<'}</button>
        <button onClick={next} aria-label="Next" style={{
          position: 'absolute',
          right: 12,
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 16,
          background: '#eee',
          border: 'none',
          borderRadius: '50%',
          width: 28,
          height: 28,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 2
        }}>{'>'}</button>
        {/* Slide image */}
        <img src={slides[index].image} alt="How to play" style={{ width: 140, height: 140, objectFit: 'contain', marginBottom: 18, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', flexShrink: 0 }} />
        {/* Slide text - make sure it is always visible and scrollable if too long */}
        <div style={{ color: '#444', fontSize: 18, textAlign: 'center', marginBottom: 18, fontWeight: 500, maxHeight: 120, overflowY: 'auto', width: '100%', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{slides[index].text}</div>
        {/* Dots indicator */}
        <div style={{ position: 'absolute', bottom: 18, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6 }}>
          {slides.map((_, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i === index ? '#0288d1' : '#bbb' }} />
          ))}
        </div>
      </div>
    </div>
  );
} 