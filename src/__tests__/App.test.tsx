import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

test('App renders Header', () => {
  render(<App />);
  expect(screen.getByTestId('headertest')).toBeInTheDocument();
});

test('App renders Main', () => {
  render(<App />);
  expect(screen.getByTestId('maintest')).toBeInTheDocument();
});

test('Popup is rendered when button is clicked', () => {
  render(<App />);
  const button = screen.getByText('NEW');
  const noPopup = screen.queryByTestId('uploadtest');
  expect(noPopup).not.toBeInTheDocument();
  fireEvent.click(button);
  const popup = screen.queryByTestId('uploadtest');
  expect(popup).toBeInTheDocument();
});
