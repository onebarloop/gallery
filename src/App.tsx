import { useEffect, useState } from 'react';
import type { picture } from './utils/Props';
import Main from './components/Main';
import Header from './components/Header';

export default function App() {
  const [gallery, setGallery] = useState<picture[]>([]);
  const [popup, setPopup] = useState<boolean>(false);

  async function loadGallery(tag: string) {
    const response = await fetch(
      `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/list/${tag}.json`,
      { method: 'GET' }
    );
    const data = await response.json();
    setGallery(data.resources);
  }

  useEffect(() => {
    loadGallery('gallery');
  }, []);

  return (
    <>
      <Header setPopup={setPopup} popup={popup} loadGallery={loadGallery} />
      <Main
        gallery={gallery}
        popup={popup}
        setPopup={setPopup}
        setGallery={setGallery}
      />
    </>
  );
}
