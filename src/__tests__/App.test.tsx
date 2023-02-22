import { fireEvent, render, screen, within } from '@testing-library/react';
import App from '../App';

test('App renders Header', () => {
  render(<App />);
  expect(screen.getByText('Gallery')).toBeInTheDocument();
});

test('App renders Main', () => {
  render(<App />);
  expect(screen.getByTestId('maintest')).toBeInTheDocument();
});

test('Popup is only rendered when button is clicked', () => {
  render(<App />);
  const button = screen.getByText('NEW');
  const noPopup = screen.queryByText('Choose Picture');
  expect(noPopup).not.toBeInTheDocument();
  fireEvent.click(button);
  const popup = screen.getByText('Choose Picture');
  expect(popup).toBeInTheDocument();
});

test('Popup closes when "X" is clicked', () => {
  render(<App />);
  const button = screen.getByRole('button', { name: 'NEW' });
  fireEvent.click(button);
  const popup = screen.getByTestId('uploadtest');
  const close = within(popup).getByRole('button', { name: 'X' });
  fireEvent.click(close);
  expect(popup).not.toBeInTheDocument();
});

test('Checkbox gets checked when clicked', () => {
  render(<App />);
  const button = screen.getByText('NEW');
  fireEvent.click(button);
  const popup = screen.getByTestId('uploadtest');
  const checkbox = within(popup).getByDisplayValue('cute');
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});

test('Filter buttons change color when selected', () => {
  render(<App />);
  const button = screen.getByRole('button', { name: 'happy' });
  expect(button).toHaveStyle('background-color: transparent');
  fireEvent.click(button);
  expect(button).toHaveStyle('background-color: #9f1515');
});
