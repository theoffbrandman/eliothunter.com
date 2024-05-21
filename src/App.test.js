import { render, screen } from '@testing-library/react';
import App from './App';

test('renders contact link', () => {
  render(<App />);
  const linkElement = screen.getByRole('link', { name: /contact us/i });
  expect(linkElement).toBeInTheDocument();
});

test('renders home link', () => {
  render(<App />);
  // Check for the specific link by using its aria-label attribute
  const homeLink = screen.getByRole('link', { name: /home text link/i });
  expect(homeLink).toBeInTheDocument();
});