import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import styled from 'styled-components';
import Upload from './Upload';
import type { MainProps } from '../utils/Types';

export default function Main({
  popup,
  setPopup,
  gallery,
  setGallery,
  tags,
}: MainProps) {
  const cld: Cloudinary = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUDNAME,
    },
  });

  const unusedVar = 'testing linter';

  return (
    <StyledMain data-testid='maintest'>
      {popup && (
        <Upload
          tags={tags}
          setGallery={setGallery}
          setPopup={setPopup}
          gallery={gallery}
        />
      )}
      <StyledGallery popup={popup}>
        {gallery.map(({ public_id }) => (
          <StyledWrapper key={public_id} data-testid='picture'>
            <StyledImage cldImg={cld.image(public_id)} />
          </StyledWrapper>
        ))}
      </StyledGallery>
    </StyledMain>
  );
}

const StyledMain = styled.main`
  padding: 30px 0;
`;

const StyledGallery = styled.div<{ popup: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 30px;
  filter: ${({ popup }) => popup && 'blur(10px)'};
  transition: filter 0.4s;
`;

const StyledWrapper = styled.div`
  border: 5px solid black;
  width: 400px;
  height: 400px;
  background-color: black;
  box-shadow: 6px 6px 2px 1px rgba(19, 19, 20);
`;

const StyledImage = styled(AdvancedImage)`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: #1a1818;
`;
