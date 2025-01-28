import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import HUD from './HUD';

const initialDungeon = [
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ['#', 'P', '.', '.', 'T', '.', '.', 'E', 'T', '#'],
  ['#', '.', '#', '#', '#', '.', '#', '#', '.', '#'],
  ['#', '.', '.', 'T', '.', '.', '.', '.', '.', '#'],
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
];

const App: React.FC = () => {
  const [dungeon, setDungeon] = useState(initialDungeon);
  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });
  const [health, setHealth] = useState(100);
  const [score, setScore] = useState(0);
  const [remainingTreasures, setRemainingTreasures] = useState(3);

  useEffect(() => {
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
  }, [playerPosition]);

  const movePlayer = (newX: number, newY: number) => {
    if (dungeon[newY][newX] === '#') return;

    const newDungeon = dungeon.map((row, y) =>
      row.map((cell, x) => {
        if (x === playerPosition.x && y === playerPosition.y) return '.';
        if (x === newX && y === newY) return 'P';
        return cell;
      })
    );

    setPlayerPosition({ x: newX, y: newY });
    setDungeon(newDungeon);

    if (dungeon[newY][newX] === 'T') {
      setScore(score + 10);
      setRemainingTreasures(remainingTreasures - 1);
    } else if (dungeon[newY][newX] === 'E') {
      alert('You win!');
    }
  };

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
