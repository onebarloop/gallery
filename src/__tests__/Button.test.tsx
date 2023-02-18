import { render, screen } from '@testing-library/react';
import Button from '../components/Button';

test('Button is rendered', () => {
  render(<Button width={100} height={100} />);
  expect(screen.getByTestId('buttontest')).toBeInTheDocument();
});
