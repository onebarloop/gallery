import { useEffect, useState } from 'react';
import type { Picture } from './utils/Types';
import Main from './components/Main';
import Header from './components/Header';
import fetchGallery from './utils/fetchGallery';

export default function App() {
  // Single pictures are stored in state as array
  const [gallery, setGallery] = useState<Picture[]>([]);

  // Upload window popup
  const [popup, setPopup] = useState<boolean>(false);

  // Tags for the upload and filter function
  const tags: string[] = ['happy', 'sad', 'angry', 'relaxed', 'cute'];

  // Updates the state of gallery array
  async function loadGallery(tag: string): Promise<void> {
    fetchGallery(tag, setGallery);
  }

  // 'loadgallery()' is called once after initial render
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
