import styled from 'styled-components';
import type { ButtonProps } from '../utils/Types';

export default function Button({
  onClick,
  name,
  disabled,
  width,
  height,
  primary,
  activeFilter,
}: ButtonProps) {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      width={width}
      height={height}
      primary={primary}
      activeFilter={activeFilter}
      name={name}
    >
      {name}
    </StyledButton>
  );
}

const StyledButton = styled.button<ButtonProps>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: ${({ activeFilter, name }) =>
    activeFilter === name ? '#9f1515' : 'transparent'};
  border: ${({ disabled }) =>
    disabled ? '#c9c5c5 1px solid' : 'white 1px solid'};
  color: ${({ disabled }) => (disabled ? '#c9c5c5' : 'white ')};
  font-family: inherit;
  font-size: ${({ primary }) => (primary ? '1.5em' : '1em')};
  font-weight: ${({ primary }) => (primary ? 'bold' : 'normal')};
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: white;
    color: black;
  }

  &:active {
    padding-top: 6px;
    transition: 0.1s;
  }
`;
