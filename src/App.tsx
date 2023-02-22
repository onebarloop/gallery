import { useEffect, useState } from 'react';
import type { Picture } from './utils/Types';
import Main from './components/Main';
import Header from './components/Header';
import fetchGallery from './utils/fetchGallery';

export default function App() {
  const [gallery, setGallery] = useState<Picture[]>([]);

  const [popup, setPopup] = useState<boolean>(false);

  const tags: string[] = ['happy', 'sad', 'angry', 'relaxed', 'cute'];

  async function loadGallery(tag: string): Promise<void> {
    fetchGallery(tag, setGallery);
  }

  useEffect(() => {
    loadGallery('gallery');
  }, []);

  return (
    <>
      <Header
        setPopup={setPopup}
        popup={popup}
        loadGallery={loadGallery}
        tags={tags}
      />
      <Main
        gallery={gallery}
        popup={popup}
        setPopup={setPopup}
        setGallery={setGallery}
        tags={tags}
      />
    </>
  );
}
