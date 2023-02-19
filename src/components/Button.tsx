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
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: ${(props) =>
    props.activeFilter === props.name ? '#9f1515' : 'transparent'};
  border: ${(props) =>
    props.disabled ? '#c9c5c5 1px solid' : 'white 1px solid'};
  color: ${(props) => (props.disabled ? '#c9c5c5' : 'white ')};
  font-family: inherit;
  font-size: ${(props) => (props.primary ? '1.5em' : '1em')};
  font-weight: ${(props) => (props.primary ? 'bold' : 'normal')};
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: white;
    color: black;
  }
`;
