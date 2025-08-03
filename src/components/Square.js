// Square.js
import React from 'react';
import { useDrop } from 'react-dnd';
import Piece from './Piece';

export default function Square({ row, col, piece, movePiece, onClick, highlight, turn, sedir, capture }) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'piece',
    canDrop: (item) => item.side === turn,
    drop: (item) => {
      movePiece(item.fromRow, item.fromCol, row, col);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  });

  const isDarkerSedir = sedir && (
    (row === 3 && col === 2) || // top left
    (row === 4 && col === 3) || // middle down
    (row === 3 && col === 4)    // top right
  );

  const isWhiteOnSedir = sedir && piece && piece.startsWith('up');
  const isBlackOnSedir = sedir && piece && piece.startsWith('down');

  const base = isWhiteOnSedir
    ? '#b3e5fc' // light blue for white on sedir
    : isBlackOnSedir
      ? '#f8bbd0' // light pink for black on sedir
      : sedir
        ? isDarkerSedir
          ? '#e6d5b8'  // darker shade for specific sedir squares
          : '#f5f5dc'  // regular sedir color
        : (row + col) % 2 === 0
          ? '#eee'
          : '#333';

  return (
    <div
      ref={drop}
      onClick={onClick}
      style={{
        width: '66px',
        height: '66px',
        backgroundColor: base,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: piece ? 'pointer' : 'default',
        opacity: isOver && !canDrop ? 0.5 : 1,
        position: 'relative'
      }}
    >
      {highlight && (
        <div
          style={{
            position: 'absolute',
            width: '17px',
            height: '17px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            pointerEvents: 'none'
          }}
        />
      )}
      {piece && <Piece piece={piece} row={row} col={col} />}
    </div>
  );
}
