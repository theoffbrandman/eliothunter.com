import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders contact link', () => {
  render(<App />);
  const linkElement = screen.getByText(/contact/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders home link', () => {
  render(<App />);
  const linkElement = screen.getByText(/home/i);
  expect(linkElement).toBeInTheDocument();
});