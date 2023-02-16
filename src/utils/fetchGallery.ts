import type { Picture } from './Types';

export default async function fetchGallery(
  tag: string,
  callback: React.Dispatch<React.SetStateAction<Picture[]>>
) {
  try {
    const response = await fetch(
      `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/list/${tag}.json`,
      { method: 'GET' }
    );
    const data = await response.json();
    if (response.ok) {
      callback(data.resources);
    } else {
      console.log('Bad response');
    }
  } catch (error) {
    console.log('The following error occurred: ' + error);
  }
}
