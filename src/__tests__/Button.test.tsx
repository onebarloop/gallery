import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/Button';

test('Button is clickable', () => {
  const mockCallBack = jest.fn();
  render(<Button onClick={mockCallBack} width={10} height={10} />);
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(mockCallBack.mock.calls.length).toEqual(1);
  fireEvent.click(button);
  expect(mockCallBack.mock.calls.length).toEqual(2);
});
