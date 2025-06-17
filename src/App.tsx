import React, { useState, useEffect, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import HUD from './HUD.tsx';

const initialDungeon = [
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ['#', '.', '.', '.', 'T', '.', '.', 'E', 'T', '#'],
  ['#', '.', '#', '#', 'X', '.', '#', '#', '.', '#'],
  ['#', '.', 'X', 'T', 'X', '.', '.', 'X', '.', '#'],
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
];

const App: React.FC = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });
  const [health, setHealth] = useState(100);
  const [score, setScore] = useState(0);
  const [remainingTreasures, setRemainingTreasures] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [collectedTreasures, setCollectedTreasures] = useState<Set<string>>(new Set());
  
  // Create dungeon with player position
  const createDungeon = useCallback(() => {
    return initialDungeon.map((row, y) =>
      row.map((cell, x) => {
        // Place player at current position
        if (x === playerPosition.x && y === playerPosition.y) return 'P';
        
        // Handle collected treasures - replace with empty space
        if (cell === 'T' && collectedTreasures.has(`${x}-${y}`)) {
          return '.';
        }
        
        // Return original cell for all other positions
        return cell;
      })
    );
  }, [playerPosition, collectedTreasures]);
  
  // Initialize dungeon with player at starting position
  const [dungeon, setDungeon] = useState(() => {
    return initialDungeon.map((row, y) =>
      row.map((cell, x) => {
        if (x === 1 && y === 1) return 'P';
        return cell;
      })
    );
  });

  useEffect(() => {
    setDungeon(createDungeon());
  }, [createDungeon]);

  const restartGame = () => {
    setPlayerPosition({ x: 1, y: 1 });
    setHealth(100);
    setScore(0);
    setRemainingTreasures(3);
    setGameOver(false);
    setCollectedTreasures(new Set());
    // Reset dungeon will happen via useEffect
  };

  const movePlayer = useCallback((newX: number, newY: number) => {
    if (gameOver || initialDungeon[newY][newX] === '#') return;

    const cellType = initialDungeon[newY][newX];
    const treasureKey = `${newX}-${newY}`;
    
    setPlayerPosition({ x: newX, y: newY });

    if (cellType === 'T' && !collectedTreasures.has(treasureKey)) {
      setScore(score + 10);
      setRemainingTreasures(remainingTreasures - 1);
      setCollectedTreasures(prev => new Set(prev).add(treasureKey));
    } else if (cellType === 'E') {
      alert('You win!');
    } else if (cellType === 'X') {
      const newHealth = health - 20;
      setHealth(newHealth);
      if (newHealth <= 0) {
        setGameOver(true);
      }
    }
  }, [gameOver, collectedTreasures, score, remainingTreasures, health]);

  useEffect(() => {
    if (gameOver) return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          movePlayer(playerPosition.x, playerPosition.y - 1);
          break;
        case 'ArrowDown':
          movePlayer(playerPosition.x, playerPosition.y + 1);
          break;
        case 'ArrowLeft':
          movePlayer(playerPosition.x - 1, playerPosition.y);
          break;
        case 'ArrowRight':
          movePlayer(playerPosition.x + 1, playerPosition.y);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [playerPosition, gameOver, movePlayer]);

  if (gameOver) {
    return (
      <div className="App">
        <header className="App-header">
          <div className="game-over">
            <h2>Game Over!</h2>
            <p>Your health reached zero.</p>
            <p>Final Score: {score}</p>
            <button onClick={restartGame}>Restart Game</button>
          </div>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <HUD health={health} score={score} remainingTreasures={remainingTreasures} />
        <div className="dungeon">
          {dungeon.map((row, y) => (
            <div key={y} className="dungeon-row">
              {row.map((cell, x) => (
                <div key={x} className={`dungeon-cell ${cell}`}>
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      </header>
    </div>
  );
};

export default App;
