import type { picture } from './Props';

export default async function fetchGallery(
  tag: string,
  callback: React.Dispatch<React.SetStateAction<picture[]>>
) {
  const response = await fetch(
    `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/list/${tag}.json`,
    { method: 'GET' }
  );
  const data = await response.json();
  callback(data.resources);
}
