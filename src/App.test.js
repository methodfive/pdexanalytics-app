import { render, screen } from '@testing-library/react';
import App from './App';

test('renders test link', () => {
  render(<App />);
  const linkElement = screen.getByText(/test/i);
  expect(linkElement).toBeInTheDocument();
});
