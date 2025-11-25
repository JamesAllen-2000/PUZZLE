import React, { useState, useEffect, useCallback } from 'react';
import PuzzleBoard from './components/PuzzleBoard';
import puzzleImage from './assets/puzzle.png';

function App() {
  // 10 pieces, initially all false (hidden/unrevealed)
  const [revealedPieces, setRevealedPieces] = useState(Array(10).fill(false));

  const togglePiece = useCallback((index) => {
    setRevealedPieces(prev => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  }, []);

  const revealNext = useCallback(() => {
    setRevealedPieces(prev => {
      const nextIndex = prev.findIndex(isRevealed => !isRevealed);
      if (nextIndex !== -1) {
        const newState = [...prev];
        newState[nextIndex] = true;
        return newState;
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault(); // Prevent scrolling
        revealNext();
      } else if (e.key >= '1' && e.key <= '9') {
        const index = parseInt(e.key) - 1;
        togglePiece(index);
      } else if (e.key === '0') {
        togglePiece(9);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [revealNext, togglePiece]);

  return (
    <div className="app-container">
      <PuzzleBoard
        revealedPieces={revealedPieces}
        imageSrc={puzzleImage}
      />
    </div>
  );
}

export default App;
