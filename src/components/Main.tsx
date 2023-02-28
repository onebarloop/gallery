import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import styled from 'styled-components';
import Upload from './Upload';
import type { MainProps } from '../utils/Types';
import { useAppSelector } from '../app/hooks';

export default function Main({ gallery, setGallery, tags }: MainProps) {
  const cld: Cloudinary = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUDNAME,
    },
  });

  const reduxPopup = useAppSelector((state) => state.popup.value);

  return (
    <StyledMain data-testid='maintest'>
      {reduxPopup && (
        <Upload tags={tags} setGallery={setGallery} gallery={gallery} />
      )}
      <StyledGallery reduxPopup={reduxPopup}>
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

const StyledGallery = styled.div<{ reduxPopup: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 30px;
  filter: ${({ reduxPopup }) => reduxPopup && 'blur(10px)'};
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
