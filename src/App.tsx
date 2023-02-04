import { useEffect, useState } from 'react';
import type { picture } from './utils/Props';
import Main from './components/Main';
import Header from './components/Header';
import fetchGallery from './utils/fetchGallery';

export default function App() {
  const [gallery, setGallery] = useState<picture[]>([]);
  const [popup, setPopup] = useState<boolean>(false);
  const tags: string[] = [
    'happy',
    'sad',
    'thoughtful',
    'relieved',
    'depressed',
  ];

  async function loadGallery(tag: string) {
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
