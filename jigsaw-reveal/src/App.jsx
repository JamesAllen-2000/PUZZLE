import React, { useState, useEffect, useCallback, useRef } from 'react';
import PuzzleBoard from './components/PuzzleBoard';
import puzzleImage from './assets/puzzle.png';
import puzzleVideo from './assets/PUZZLE.mp4';
import './App.css';

function App() {
  // Game status: 'idle' | 'playing_video' | 'revealing'
  const [gameStatus, setGameStatus] = useState('idle');
  const [revealedPieces, setRevealedPieces] = useState(Array(10).fill(false));
  const videoRef = useRef(null);

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
    if (gameStatus !== 'revealing') return;

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
  }, [gameStatus, revealNext, togglePiece]);

  const handlePlayClick = () => {
    setGameStatus('playing_video');
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= 10) {
      videoRef.current.pause();
      setGameStatus('revealing');
    }
  };

  return (
    <div className="app-container">
      <video
        ref={videoRef}
        className={`video-background ${gameStatus === 'revealing' ? 'blurred' : ''}`}
        src={puzzleVideo}
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
      />

      {gameStatus === 'idle' && (
        <button className="play-button" onClick={handlePlayClick}>
          Play
        </button>
      )}

      {gameStatus === 'revealing' && (
        <div className="game-layer">
          <PuzzleBoard
            revealedPieces={revealedPieces}
            imageSrc={puzzleImage}
          />
        </div>
      )}
    </div>
  );
}

export default App;
