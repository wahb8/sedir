// GamePage.js
import React, { useState, useEffect, useCallback } from 'react';
import { DndProvider } from 'react-dnd'; //drag and drop provider
import { HTML5Backend } from 'react-dnd-html5-backend'; //conntects dnd logic to the browser native dnd features
import { motion, AnimatePresence } from 'framer-motion'; // does work for animations
import Square from './Square';
import bg from '../assets/bg.png';
import wazeerIcon from '../assets/wazeer.png';
import moveSound from '../assets/move.wav';
import moveSound1 from '../assets/move1.wav';
import endOfGameSound from '../assets/End of Game.wav';
import Carousel from './Carousel';
import './GamePage.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const INITIAL_TIME = 1 * 60; // 5 minutes in seconds

function formatTime(seconds) { // funtion that takes number of seconds as input
  const mins = Math.floor(seconds / 60); // calculates minutes
  const secs = seconds % 60; // calculates the seconds after we have taken the minutes
  return `${mins}:${secs.toString().padStart(2, '0')}`; //returns a string that has minutes and seconds as two digits
}

function GamePage() {
  const rows = 8;
  const cols = 7;

  const getInitialPieces = () => { //function that sets up the initial pieces on the board
    const saved = localStorage.getItem('sedir-pieces'); //checks if there are any saved pieces in local storage
    return saved //if there are saved pieces, it returns them
      ? JSON.parse(saved) //parses (converts) the saved string into an object
      : { //if there are no saved pieces, it sets up the initial pieces
          '0-0':'down-bash','0-1':'down-wazeer','0-2':'down-sheikha','0-3':'down-sheikh','0-4':'down-sheikha','0-5':'down-wazeer','0-6':'down-bash',
          '1-0':'down-walad-first','1-1':'down-walad-first','1-2':'down-walad-first','1-3':'down-walad-first','1-4':'down-walad-first','1-5':'down-walad-first','1-6':'down-walad-first',
          '6-0':'up-walad-first','6-1':'up-walad-first','6-2':'up-walad-first','6-3':'up-walad-first','6-4':'up-walad-first','6-5':'up-walad-first','6-6':'up-walad-first',
          '7-0':'up-bash','7-1':'up-wazeer','7-2':'up-sheikha','7-3':'up-sheikh','7-4':'up-sheikha','7-5':'up-wazeer','7-6':'up-bash',
        };
  };

  const [pieces, setPieces] = useState(getInitialPieces);// state variable that stores the pieces on the board
  // usestate(getinitialpieces) sets up the initial pieces/values of location on the board
  const [selected, setSelected] = useState(null); // state variable that stores the selected piece, at first it's null
  const [possibleMoves, setPossibleMoves] = useState([]); // state variable that stores the possible moves for the selected piece, at first it's an empty array
  const [turn, setTurn] = useState('up'); // state variable that stores the current turn, at first it's up
  const [winner, setWinner] = useState(null); // state variable that stores the winner, at first it's null
  const [upTime, setUpTime] = useState(INITIAL_TIME); // state variable that stores the time for the up player, at first it's 1 minute
  const [downTime, setDownTime] = useState(INITIAL_TIME); // state variable that stores the time for the down player, at first it's 1 minute
  const [gameStarted, setGameStarted] = useState(false); // state variable that stores if the game has started, at first it's false
  const navigate = useNavigate(); // Hook for navigation

  // Timer effect
  useEffect(() => {
    if (!winner && gameStarted) { // if there is no winner and the game has started
      const timer = setInterval(() => { // defines a timer that runs every second, setinterval is a function that calls a function after a certain amount of time
        if (turn === 'up') { // if the turn is up
          setUpTime(prev => { // updates the time for the up player
            if (prev <= 0) { // if the time is 0
              clearInterval(timer); // clears the timer
              setWinner('Down');
              return 0; // returns 0 so the function stops going down to negative numbers
            }
            return prev - 1; // subtracts 1 from the time for each interval the function runs
          });
        } else {
          setDownTime(prev => {
            if (prev <= 0) {
              clearInterval(timer);
              setWinner('Up');
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);

      return () => clearInterval(timer); // this means when the component unmounts, the timer stops, so it doesn't keep running in the background
    }
  }, [turn, winner, gameStarted]); // this means the timer logic will rerun whenever turn, winner, or gameStarted changes

  // saving the current state of game in local storage, and checking if win condition is met
  useEffect(() => {
    localStorage.setItem('sedir-pieces', JSON.stringify(pieces)); // saves the current state of the game in local storage
    if (!winner) { // if there is no winner
      const zone = []; // creates an empty array
      [3,4].forEach(r => [2,3,4].forEach(c => zone.push(`${r}-${c}`))); 
      
      
      
      let upCount = 0, downCount = 0; // creates two variables to count the number of pieces in the zone for each player
      zone.forEach(k => { // loops through the zone
        const p = pieces[k];
        if (p) {
          if (p.startsWith('up')) upCount++;
          else if (p.startsWith('down')) downCount++;
        }
      });
      if (upCount>=3 && downCount===0) { setWinner('Up'); }
      else if (downCount>=3 && upCount===0) { setWinner('Down'); }
    }
  }, [pieces, winner]);

  useEffect(() => {
    if (winner) {
      const audio = new window.Audio(endOfGameSound);
      audio.play();
    }
  }, [winner]);

  function computeMoves(fr, fc) {
    const key = `${fr}-${fc}`, raw = pieces[key];
    if (!raw) return [];
    const [side,type,first] = raw.split('-');
    const isFirst = first === 'first';
    const dir = side==='up'? -1 : +1;
    const moves = [];
    if (type==='walad') {
      const f1=`${fr+dir}-${fc}`;
      if (!pieces[f1]) moves.push(f1);
      const f2=`${fr+2*dir}-${fc}`;
      if (isFirst && !pieces[f1] && !pieces[f2]) moves.push(f2);
      [-1,1].forEach(dc=>{ const cap=`${fr+dir}-${fc+dc}`; if(pieces[cap]&&pieces[cap].split('-')[0]!==side) moves.push(cap); });
    }
    if (type==='bash') {
      [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dr,dc])=>{ let r=fr+dr,c=fc+dc; while(r>=0&&r<rows&&c>=0&&c<cols){ const k=`${r}-${c}`,d=pieces[k]; if(!d) moves.push(k); else{ if(d.split('-')[0]!==side) moves.push(k); break;} r+=dr;c+=dc; }});
    }
    if (type==='sheikh') {
      [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([dr,dc])=>{ let r=fr+dr,c=fc+dc; while(r>=0&&r<rows&&c>=0&&c<cols){ const k=`${r}-${c}`,d=pieces[k]; if(!d) moves.push(k); else{ if(d.split('-')[0]!==side) moves.push(k); break;} r+=dr;c+=dc; }});
    }
    if (type==='sheikha') {
      [[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([dr,dc])=>{ let r=fr+dr,c=fc+dc; while(r>=0&&r<rows&&c>=0&&c<cols){ const k=`${r}-${c}`,d=pieces[k]; if(!d) moves.push(k); else{ if(d.split('-')[0]!==side) moves.push(k); break;} r+=dr;c+=dc; }});
    }
    if (type==='wazeer') {
      [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]].forEach(([dr,dc])=>{ const r=fr+dr,c=fc+dc,k=`${r}-${c}`; if(r>=0&&r<rows&&c>=0&&c<cols) if(!pieces[k]||pieces[k].split('-')[0]!==side) moves.push(k); });
    }
    return moves;
  }

  const movePiece = (fr, fc, tr, tc) => {
    const sounds = [moveSound, moveSound1];
    const audio = new window.Audio(sounds[Math.floor(Math.random() * sounds.length)]);
    audio.play();
    const fromKey=`${fr}-${fc}`,toKey=`${tr}-${tc}`,raw=pieces[fromKey];
    if(!raw) return;
    const [side] = raw.split('-');
    const dest = pieces[toKey];
    if(!computeMoves(fr,fc).includes(toKey))return;
    setPieces(prev=>{const next={...prev};delete next[fromKey]; next[toKey]= (raw.split('-')[1]==='walad'&&raw.endsWith('-first'))?`${side}-walad`:raw;return next;});
    setSelected(null); setPossibleMoves([]);
    setTurn(t=>t==='up'?'down':'up');
    if (!gameStarted) setGameStarted(true);
  };

  const handleClick = (r,c) => {
    const key=`${r}-${c}`,raw=pieces[key],side=raw?raw.split('-')[0]:null;
    if(selected){ if(possibleMoves.includes(key)) movePiece(...selected,r,c); setSelected(null); setPossibleMoves([]); return;} 
    if(raw&&side===turn){ setSelected([r,c]); setPossibleMoves(computeMoves(r,c)); }
  };

  /**
   * Resets the game to its initial state
   * Clears localStorage and resets all game state variables
   */
  const resetGame = () => {
    localStorage.removeItem('sedir-pieces');
    setPieces(getInitialPieces());
    setSelected(null);
    setPossibleMoves([]);
    setTurn('up');
    setWinner(null);
    setUpTime(INITIAL_TIME);
    setDownTime(INITIAL_TIME);
    setGameStarted(false);
  };

  /**
   * Abandons the current game and returns to the landing page
   * First resets the game state, then navigates back to menu
   */
  const abandonGame = () => {
    resetGame();
    navigate('/'); // Navigate to landing page
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div 
        className="game-page"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* Winner modal overlay */}
        <AnimatePresence>
          {winner && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              className="winner-modal-overlay"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className={`winner-modal ${winner === 'Down' ? 'winner-down' : 'winner-up'}`}
              >
                <span>{winner === 'Down' ? 'Player Black won!' : 'Player White won!'}</span>
                <div className="winner-buttons">
                  <button
                    onClick={resetGame}
                    className={`winner-button ${winner === 'Down' ? 'restart-down' : 'restart-up'}`}
                  >
                    Restart
                  </button>
                  <button
                    onClick={abandonGame}
                    className="winner-button back-to-menu"
                  >
                    Back to Menu
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Game container */}
        <div className="game-container">
          <div className="timer-container">
            <div className={`timer-display ${turn === 'down' ? 'active' : 'inactive'}`}>
              Down: {formatTime(downTime)}
            </div>
            <motion.img
              src={wazeerIcon}
              alt="Turn"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className={`turn-indicator ${turn === 'up' ? 'up' : 'down'}`}
            />
            <div className={`timer-display ${turn === 'up' ? 'active' : 'inactive'}`}>
              Up: {formatTime(upTime)}
            </div>
          </div>
          
          <div className="game-controls">
            <button 
              onClick={resetGame}
              className="game-button reset"
            >
              Reset Game
            </button>
            <button 
              onClick={abandonGame}
              className="game-button abandon"
            >
              Abandon
            </button>
          </div>
          
          <div 
            className="game-board"
            style={{ gridTemplateColumns: `repeat(${cols}, 66px)` }}
          >
            {[...Array(rows)].flatMap((_,r)=>[...Array(cols)].map((_,c)=>{
              const isSedir=(r===3||r===4)&&c>=2&&c<=4;
              const key=`${r}-${c}`;
              return <Square 
                key={key} 
                row={r} 
                col={c} 
                piece={pieces[key]} 
                movePiece={movePiece} 
                onClick={()=>handleClick(r,c)} 
                highlight={possibleMoves.includes(key)} 
                turn={turn} 
                sedir={isSedir}
              />;
            }))}
          </div>
          
          {/* Carousel */}
          <div className="carousel-container">
            <Carousel />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default GamePage; 