import { useState } from 'react';
import { Upload } from './Types';

// Reason for this custom hook is to make the Upload Component cleaner

export default function useUpload({ setGallery, setPopup, gallery }: Upload) {
  // Stores the selected image
  const [selectedImage, setSelectedImage] = useState<Blob | undefined>(
    undefined
  );

  // Stores the selected tags as array
  const [uploadTags, setUploadTags] = useState<string[]>(['gallery']);

  // True while uploading
  const [loading, setLoading] = useState<boolean>(false);

  // Event handler submit button
  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    setLoading(true);
    if (selectedImage !== undefined) {
      // New formdata is created
      const data = new FormData();
      // Pictures is appended to formdata
      data.append('file', selectedImage);
      // Tag array is appended to formdata as string
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
  function handleChangeImage(event: React.ChangeEvent): void {
    setSelectedImage((event.target as HTMLInputElement).files![0]);
  }

  // Event handler for the checkbox input. Updates the state of "UploadTags"-array
  function handleCheckbox(event: React.ChangeEvent): void {
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

  return {
    loading,
    selectedImage,
    handleSubmit,
    handleCheckbox,
    handleChangeImage,
  };
}
