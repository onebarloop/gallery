import { useState } from 'react';
import { Upload } from './Types';

export default function useUpload({ setGallery, setPopup, gallery }: Upload) {
  const [selectedImage, setSelectedImage] = useState<Blob | undefined>(
    undefined
  );

  const [uploadTags, setUploadTags] = useState<string[]>(['gallery']);

  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    const preset = process.env.REACT_APP_CLOUDINARY_PRESET;
    setLoading(true);
    if (selectedImage !== undefined && preset !== undefined) {
      const data = new FormData();
      data.append('file', selectedImage);
      data.append('tags', uploadTags.toString());
      data.append('upload_preset', preset);
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
    } else if (preset === undefined) {
      console.error('ERROR: No cloudinary upload-preset defined');
    }
    setLoading(false);
    setPopup(false);
  }

  function handleChangeImage(event: React.ChangeEvent): void {
    setSelectedImage(
      (event.target as HTMLInputElement & { files: Blob[] }).files[0]
    );
  }

  function handleCheckbox(event: React.ChangeEvent): void {
    const target = event.target as typeof event.target & {
      value: string;
      checked: boolean;
    };

    if (target.checked === true) {
      setUploadTags([...uploadTags, target.value]);
    } else {
      setUploadTags(
        uploadTags.filter((uploadTag) => uploadTag !== target.value)
      );
    }
  }

  return {
    loading,
    selectedImage,
    handleSubmit,
    handleCheckbox,
    handleChangeImage,
  };
}
