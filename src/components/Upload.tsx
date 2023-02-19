import styled from 'styled-components';
import { Player } from '@lottiefiles/react-lottie-player';
import Button from './Button';
import { UploadPopupProps } from '../utils/Types';
import useUpload from '../utils/useUpload';

export default function Upload({
  setGallery,
  gallery,
  setPopup,
  tags,
}: UploadPopupProps) {
  // Custom hook is called
  const {
    loading,
    selectedImage,
    handleSubmit,
    handleCheckbox,
    handleChangeImage,
  } = useUpload({ setGallery, setPopup, gallery });

  return (
    <StyledPopup data-testid='uploadtest'>
      <Button width={30} height={30} name='X' onClick={() => setPopup(false)} />
      {selectedImage !== undefined ? (
        <StyledWrapper>
          {loading ? (
            <Player
              src='https://assets3.lottiefiles.com/packages/lf20_mrcseu1q.json'
              className='player'
              loop
              autoplay
              style={{ width: '300px', height: '400px' }}
            />
          ) : (
            <img alt='pic' src={URL.createObjectURL(selectedImage)} />
          )}
        </StyledWrapper>
      ) : (
        <StyledWrapper></StyledWrapper>
      )}
      <form onSubmit={handleSubmit}>
        <StyledImgInput>
          Choose Picture
          <input
            onChange={handleChangeImage}
            name='pic'
            type='file'
            accept='image/png, image/jpeg'
            required
          />
        </StyledImgInput>

        <fieldset>
          <legend>Categorys</legend>
          <section>
            {tags.map((tag) => (
              <label key={tag}>
                <input
                  onChange={handleCheckbox}
                  type='checkbox'
                  name='tags'
                  value={tag}
                />
                {tag}
              </label>
            ))}
          </section>
        </fieldset>

        <Button
          name={loading ? 'upload...' : 'Submit'}
          width={100}
          height={30}
          disabled={loading ? true : false}
        />
      </form>
    </StyledPopup>
  );
}

const StyledPopup = styled.article`
  position: absolute;
  background-color: #1f1e1e;
  padding-top: 30px;
  top: 5vh;
  width: 600px;
  margin-left: 50%;
  left: -300px;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  box-shadow: 6px 6px 2px 1px rgba(19, 19, 20);
  border: 2px solid black;
  z-index: 1;
  button:first-child {
    position: absolute;
    right: 0;
    top: 0;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    margin: 10px 0;
  }

  input[type='file'] {
    display: none;
  }

  label {
    margin: 10px;
  }

  fieldset {
    margin-bottom: 15px;
  }
`;

const StyledImgInput = styled.label`
  background-color: none;
  border: 1px solid white;
  padding: 10px;
  font-size: 1.2em;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: white;
    color: black;
  }
`;

const StyledWrapper = styled.div`
  border: 5px solid black;
  width: 400px;
  height: 400px;
  background-color: black;
  padding: auto;

  border: none;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
