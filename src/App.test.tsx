import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders HUD with initial values', () => {
  render(<App />);
  expect(screen.getByText(/Health: 100/i)).toBeInTheDocument();
  expect(screen.getByText(/Score: 0/i)).toBeInTheDocument();
  expect(screen.getByText(/Remaining Treasures: 3/i)).toBeInTheDocument();
});
