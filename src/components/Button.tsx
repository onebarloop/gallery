import styled from "styled-components";
import type { ButtonProps } from "../utils/Props";

export default function Button({
  onClick,
  name,
  disabled,
  width,
  height,
  primary,
}: ButtonProps) {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      width={width}
      height={height}
      primary={primary}
    >
      {name}
    </StyledButton>
  );
}

const StyledButton = styled.button<ButtonProps>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: transparent;
  border: ${(props) =>
    props.disabled ? "#c9c5c5 1px solid" : "white 1px solid"};
  color: ${(props) => (props.disabled ? "#c9c5c5" : "white ")};
  font-size: ${(props) => (props.primary ? "1.2em" : "1em")};
  font-weight: ${(props) => (props.primary ? "bold" : "normal")};
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: white;
    color: black;
  }
`;
