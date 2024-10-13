import { render, screen } from '@testing-library/react';
import App from './App';

test('renders My Account heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/My Account/i);
  expect(headingElement).toBeInTheDocument();
});