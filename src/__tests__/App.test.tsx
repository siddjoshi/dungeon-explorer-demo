import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

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
  expect(window.alert).toHaveBeenCalledWith('You win!');
});
