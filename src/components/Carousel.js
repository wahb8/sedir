import React, { useState } from 'react';
import bash from '../assets/bash.png';
import walad from '../assets/walad.png';
import sheikh from '../assets/sheikh.png';
import sheikha from '../assets/sheikha.png';
import wazeer from '../assets/wazeer.png';

const slides = [
  {
    image: bash,
    title: 'Bash',
    description: 'The Bash is a powerful piece that moves horizontally and vertically.'
  },
  {
    image: walad,
    title: 'Walad',
    description: 'The Walad moves forward and captures diagonally, similar to a pawn.'
  },
  {
    image: sheikh,
    title: 'Sheikh',
    description: 'The Sheikh moves in all directions, like a king.'
  },
  {
    image: sheikha,
    title: 'Sheikha',
    description: 'The Sheikha moves diagonally, like a bishop.'
  },
  {
    image: wazeer,
    title: 'Wazeer',
    description: 'The Wazeer moves in an L-shape, like a knight.'
  },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex(i => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setIndex(i => (i === slides.length - 1 ? 0 : i + 1));

  return (
    <div style={{
      width: 260,
      background: 'rgba(255,255,255,0.97)',
      borderRadius: 18,
      boxShadow: '0 4px 18px rgba(0,0,0,0.13)',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      minHeight: 340
    }}>
      {/* Left navigation button */}
      <button
        onClick={prev}
        aria-label="Previous"
        style={{
          position: 'absolute',
          left: 6,
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
        }}
      >
        {'<'}
      </button>
      {/* Right navigation button */}
      <button
        onClick={next}
        aria-label="Next"
        style={{
          position: 'absolute',
          right: 6,
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
        }}
      >
        {'>'}
      </button>
      <img src={slides[index].image} alt={slides[index].title} style={{ width: 120, height: 120, objectFit: 'contain', marginBottom: 18, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
      <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 8 }}>{slides[index].title}</div>
      <div style={{ color: '#444', fontSize: 16, textAlign: 'center', marginBottom: 18 }}>{slides[index].description}</div>
      <div style={{ position: 'absolute', bottom: 12, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6 }}>
        {slides.map((_, i) => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i === index ? '#0288d1' : '#bbb' }} />
        ))}
      </div>
    </div>
  );
} 