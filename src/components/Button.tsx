import styled from "styled-components";

type Props = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  name?: string;
  disabled?: boolean;
  width: number;
  height: number;
};

export default function Button({
  onClick,
  name,
  disabled,
  width,
  height,
}: Props) {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      width={width}
      height={height}
    >
      {name}
    </StyledButton>
  );
}

const StyledButton = styled.button<Props>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: transparent;
  border: ${(props) =>
    props.disabled ? "#c9c5c5 1px solid" : "white 1px solid"};
  color: ${(props) => (props.disabled ? "#c9c5c5" : "white ")};
  font-size: 1em;
  cursor: pointer;
`;
