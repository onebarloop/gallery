import { useState } from 'react';
import styled from 'styled-components';
import { Player } from '@lottiefiles/react-lottie-player';
import Button from './Button';
import { UploadProps } from '../utils/Types';

export default function Upload({
  setGallery,
  gallery,
  setPopup,
  tags,
}: UploadProps) {
  // State stores the selected image
  const [selectedImage, setSelectedImage] = useState<Blob | undefined>(
    undefined
  );

  // Stores the selected tags as array
  const [uploadTags, setUploadTags] = useState<string[]>(['gallery']);

  // True while uploading
  const [loading, setLoading] = useState<boolean>(false);

  // Submit function
  async function handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault();
    setLoading(true);
    if (selectedImage !== undefined) {
      // New formdata is created
      const data = new FormData();
      // Pictures is appended to formdata
      data.append('file', selectedImage);
      // Tags are appended to formdata
      data.append('tags', uploadTags.toString());
      // Cloudinary upload preset is appended to frormdata. This is oblifatory for cloudinary uploads
      data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET!);
      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload`,
          { method: 'POST', body: data }
        );
        if (response.ok === true) {
          console.log('Submitted');
          const newPic = await response.json();
          setGallery([newPic, ...gallery]);
        } else {
          console.error('Submit failed');
        }
      } catch (error) {
        console.log('An error occured: ' + error);
      }
    }
    setLoading(false);
    setPopup(false);
  }

  // Event handler for the file input. Updates the state of "SelectedImage"
  function changeImage(event: React.SyntheticEvent): void {
    setSelectedImage((event.target as HTMLInputElement).files![0]);
  }

  // Event handler for the checkbox input. Updates the state of "UploadTags"-array
  function handleCheckbox(event: React.SyntheticEvent) {
    const target = event.target as typeof event.target & {
      value: string;
      checked: boolean;
    };
    if (target.checked === true) {
      // Add tag to the array if its not already selected, in which case...
      setUploadTags([...uploadTags, target.value]);
    } else {
      // ... it is removed from the array
      setUploadTags(
        uploadTags.filter((uploadTag) => uploadTag !== target.value)
      );
    }
  }
  return (
    <StyledPopup>
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
            onChange={changeImage}
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
  width: 45%;
  left: 52.5%;
  margin-left: -25vw;
  height: 90vh;
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
