// Piece.js
import React from 'react';
import { useDrag } from 'react-dnd';
import { motion } from 'framer-motion';
import walad   from '../assets/walad.png';
import bash    from '../assets/bash.png';
import sheikh  from '../assets/sheikh.png';
import sheikha from '../assets/sheikha.png';
import wazeer  from '../assets/wazeer.png';
import waladBlack   from '../assets/walad-black.png';
import bashBlack    from '../assets/bash-black.png';
import sheikhBlack  from '../assets/sheikh-black.png';
import sheikhaBlack from '../assets/sheikha-black.png';
import wazeerBlack  from '../assets/wazeer-black.png';

const images = {
  walad: walad,
  bash: bash,
  sheikh: sheikh,
  sheikha: sheikha,
  wazeer: wazeer,
  'walad-black': waladBlack,
  'bash-black': bashBlack,
  'sheikh-black': sheikhBlack,
  'sheikha-black': sheikhaBlack,
  'wazeer-black': wazeerBlack,
};

export default function Piece({ piece, row, col }) {
  const [side, type] = piece.split('-');
  const isBlack = side === 'down';
  const imageKey = isBlack ? `${type}-black` : type;

  const [{ isDragging }, drag] = useDrag({
    type: 'piece',
    item: { fromRow: row, fromCol: col, side },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  return (
    <div 
      ref={drag}
      style={{
        width: '44px',
        height: '44px',
        cursor: 'grab',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <motion.img
        src={images[imageKey]}
        alt={type}
        animate={!isDragging ? { 
          scale: [1, 1.05, 1]
        } : {}}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          scale: {
            type: "tween",
            ease: "easeInOut"
          }
        }}
        style={{
          width: '100%',
          height: '100%',
          opacity: isDragging ? 0.5 : 1,
          pointerEvents: 'none',
          transformOrigin: 'center center'
        }}
        draggable="false"
      />
    </div>
  );
}
