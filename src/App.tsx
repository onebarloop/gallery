import { useEffect, useState } from 'react';
import type { picture } from './utils/Props';
import Main from './components/Main';
import Header from './components/Header';
import fetchGallery from './utils/loadGallery';

export default function App() {
  const [gallery, setGallery] = useState<picture[]>([]);
  const [popup, setPopup] = useState<boolean>(false);

  async function loadGallery(tag: string) {
    fetchGallery(tag, setGallery);
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
