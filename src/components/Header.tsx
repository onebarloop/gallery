import styled from "styled-components";
import type { HeaderProps } from "../utils/Props";
import Button from "./Button";

export default function Header({ setPopup, popup, loadGallery }: HeaderProps) {
  const filters = ["happy", "sad", "thoughtful", "relieved", "depressed"];

  return (
    <StyledHeader>
      <h1>Gallery</h1>

      <div>
        <p>Filters: </p>
        {filters.map((filter) => (
          <Button
            key={filter}
            width={100}
            height={30}
            onClick={() => loadGallery(filter)}
            name={filter}
          />
        ))}
        <Button
          width={30}
          height={30}
          onClick={() => loadGallery("gallery")}
          name="X"
        />
      </div>
      <Button
        name={"NEW"}
        width={100}
        height={60}
        onClick={() => setPopup(!popup)}
        primary
      />
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  height: 10vh;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  padding: 0 30px 0 15px;

  div {
    display: flex;
    align-items: center;
    gap: 0.5em;
    border: 1px dotted white;
    padding: 5px 10px;
  }
`;
