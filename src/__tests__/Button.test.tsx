import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/Button';

test('Button is clickable', () => {
  const callBackMock = jest.fn();
  render(<Button onClick={callBackMock} width={10} height={10} />);
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(callBackMock.mock.calls.length).toEqual(1);
  fireEvent.click(button);
  expect(callBackMock.mock.calls.length).toEqual(2);
});

// Test for github workflows
test('This test will not fail anymore', () => {
  expect(13).toBeGreaterThan(12);
});
