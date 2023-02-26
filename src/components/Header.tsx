import styled from 'styled-components';
import type { HeaderProps } from '../utils/Types';
import Button from './Button';
import { useState } from 'react';

export default function Header({
  setPopup,
  popup,
  loadGallery,
  tags,
}: HeaderProps) {
  const [activeFilter, setActiveFilter] = useState<string>();

  function handleClick(tag: string) {
    setActiveFilter(tag);
    loadGallery(tag);
  }

  const unusedVar = 'testing linter';

  return (
    <StyledHeader data-testid='headertest'>
      <h1>Gallery</h1>
      <div>
        {tags.map((tag) => (
          <Button
            key={tag}
            width={120}
            height={30}
            onClick={() => handleClick(tag)}
            name={tag}
            activeFilter={activeFilter}
          />
        ))}
        <Button
          width={30}
          height={30}
          onClick={() => handleClick('gallery')}
          name='X'
          primary
        />
      </div>
      <Button
        name={'NEW'}
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

  h1 {
    font-size: 2.5em;
  }
  div {
    display: flex;
    align-items: center;
    gap: 0.5em;
    border: 1px dotted white;
    padding: 5px 10px;
  }
`;
