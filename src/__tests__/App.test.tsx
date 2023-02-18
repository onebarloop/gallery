import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('App renders Header', () => {
  render(<App />);
  expect(screen.getByTestId('headertest')).toBeInTheDocument();
});

test('App renders Main', () => {
  render(<App />);
  expect(screen.getByTestId('maintest')).toBeInTheDocument();
});
