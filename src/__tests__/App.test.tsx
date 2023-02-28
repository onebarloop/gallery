import { fireEvent, screen, within } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from '../app/test-utils';

const initialState = { value: false };

test('App renders Header', () => {
  renderWithProviders(<App />, { preloadedState: { popup: initialState } });
  expect(screen.getByText('Gallery')).toBeInTheDocument();
});

test('App renders Main', () => {
  renderWithProviders(<App />, { preloadedState: { popup: initialState } });
  expect(screen.getByTestId('maintest')).toBeInTheDocument();
});

test('Popup is only rendered when button is clicked', () => {
  renderWithProviders(<App />, { preloadedState: { popup: initialState } });
  const button = screen.getByText('NEW');
  const noPopup = screen.queryByText('Choose Picture');
  expect(noPopup).not.toBeInTheDocument();
  fireEvent.click(button);
  const popup = screen.getByText('Choose Picture');
  expect(popup).toBeInTheDocument();
});

test('Popup closes when "X" is clicked', () => {
  renderWithProviders(<App />, { preloadedState: { popup: initialState } });
  const button = screen.getByRole('button', { name: 'NEW' });
  fireEvent.click(button);
  const popup = screen.getByTestId('uploadtest');
  const close = within(popup).getByRole('button', { name: 'X' });
  fireEvent.click(close);
  expect(popup).not.toBeInTheDocument();
});

test('Checkbox gets checked when clicked', () => {
  renderWithProviders(<App />, { preloadedState: { popup: initialState } });
  const button = screen.getByText('NEW');
  fireEvent.click(button);
  const popup = screen.getByTestId('uploadtest');
  const checkbox = within(popup).getByDisplayValue('cute');
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});

test('Filter buttons change color when selected', () => {
  renderWithProviders(<App />, { preloadedState: { popup: initialState } });
  const button = screen.getByRole('button', { name: 'happy' });
  expect(button).toHaveStyle('background-color: transparent');
  fireEvent.click(button);
  expect(button).toHaveStyle('background-color: #9f1515');
});
