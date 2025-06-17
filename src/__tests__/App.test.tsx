import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

// Mock window.alert
global.alert = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

test('renders HUD with initial values', () => {
  render(<App />);
  expect(screen.getByText(/Health: 100/i)).toBeInTheDocument();
  expect(screen.getByText(/Score: 0/i)).toBeInTheDocument();
  expect(screen.getByText(/Remaining Treasures: 3/i)).toBeInTheDocument();
});

test('player moves up', () => {
  render(<App />);
  fireEvent.keyDown(window, { key: 'ArrowUp' });
  expect(screen.getByText(/P/i)).toBeInTheDocument();
});

test('player moves down', () => {
  render(<App />);
  fireEvent.keyDown(window, { key: 'ArrowDown' });
  expect(screen.getByText(/P/i)).toBeInTheDocument();
});

test('player moves left', () => {
  render(<App />);
  fireEvent.keyDown(window, { key: 'ArrowLeft' });
  expect(screen.getByText(/P/i)).toBeInTheDocument();
});

test('player moves right', () => {
  render(<App />);
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  expect(screen.getByText(/P/i)).toBeInTheDocument();
});

test('player collects treasure', () => {
  render(<App />);
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  expect(screen.getByText(/Score: 1/i)).toBeInTheDocument();
});

test('player steps on trap', () => {
  render(<App />);
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  fireEvent.keyDown(window, { key: 'ArrowDown' });
  expect(screen.getByText(/Health: 80/i)).toBeInTheDocument();
});

test('player wins the game', () => {
  render(<App />);
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  expect(global.alert).toHaveBeenCalledWith('You win!');
});

test('game over when health reaches zero', () => {
  render(<App />);
  // Simple test: step on the same trap 5 times to reach 0 health
  // Move to treasure first (4,1) - this gives score and reduces remaining treasures  
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  
  // Move to trap at (4,2) to take 20 damage (health becomes 80)
  fireEvent.keyDown(window, { key: 'ArrowDown' });
  expect(screen.getByText(/Health: 80/i)).toBeInTheDocument();
  
  // Move away and back to same trap to take another 20 damage
  fireEvent.keyDown(window, { key: 'ArrowUp' });
  fireEvent.keyDown(window, { key: 'ArrowDown' });
  expect(screen.getByText(/Health: 60/i)).toBeInTheDocument();
  
  // Repeat to get to 40 health
  fireEvent.keyDown(window, { key: 'ArrowUp' });
  fireEvent.keyDown(window, { key: 'ArrowDown' });
  expect(screen.getByText(/Health: 40/i)).toBeInTheDocument();
  
  // Repeat to get to 20 health
  fireEvent.keyDown(window, { key: 'ArrowUp' });
  fireEvent.keyDown(window, { key: 'ArrowDown' });
  expect(screen.getByText(/Health: 20/i)).toBeInTheDocument();
  
  // Final hit to reach 0 health and trigger game over
  fireEvent.keyDown(window, { key: 'ArrowUp' });
  fireEvent.keyDown(window, { key: 'ArrowDown' });
  
  // Should show game over screen
  expect(screen.getByText(/Game Over!/i)).toBeInTheDocument();
  expect(screen.getByText(/Your health reached zero/i)).toBeInTheDocument();
});

test('restart game functionality', () => {
  render(<App />);
  // Cause game over by stepping on traps
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  fireEvent.keyDown(window, { key: 'ArrowDown' });
  
  // Damage player to game over by stepping on trap multiple times
  for (let i = 0; i < 4; i++) {
    fireEvent.keyDown(window, { key: 'ArrowUp' });
    fireEvent.keyDown(window, { key: 'ArrowDown' });
  }
  
  // Verify game over
  expect(screen.getByText(/Game Over!/i)).toBeInTheDocument();
  
  // Click restart
  const restartButton = screen.getByText('Restart Game');
  fireEvent.click(restartButton);
  
  // Should be back to initial state
  expect(screen.getByText(/Health: 100/i)).toBeInTheDocument();
  expect(screen.getByText(/Score: 0/i)).toBeInTheDocument();
  expect(screen.getByText(/Remaining Treasures: 3/i)).toBeInTheDocument();
});
