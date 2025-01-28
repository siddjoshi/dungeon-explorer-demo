import React from 'react';

interface HUDProps {
  health: number;
  score: number;
  remainingTreasures: number;
}

const HUD: React.FC<HUDProps> = ({ health, score, remainingTreasures }) => {
  return (
    <div className="hud">
      <div className="hud-item">Health: {health}</div>
      <div className="hud-item">Score: {score}</div>
      <div className="hud-item">Remaining Treasures: {remainingTreasures}</div>
    </div>
  );
};

export default HUD;
