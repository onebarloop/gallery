import { Cloudinary, CloudinaryImage } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import {
  fill,
  scale,
  limitFit,
  crop,
} from "@cloudinary/url-gen/actions/resize";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Upload from "./components/Upload";

export default function App() {
  const cld: Cloudinary = new Cloudinary({
    cloud: {
      cloudName: "dt7yjhfbb",
    },
  });

  type picture = {
    public_id: string;
    width: number;
    height: number;
  };

  const [gallery, setGallery] = useState<picture[]>([]);
  const [popup, setPopup] = useState<boolean>(false);
  console.log(popup);

  console.log(gallery);

  async function loadGallery() {
    const response = await fetch(
      "https://res.cloudinary.com/dt7yjhfbb/image/list/gallery.json",
      { method: "GET" }
    );
    const data = await response.json();
    setGallery(data.resources);
  }

  useEffect(() => {
    loadGallery();
  }, []);

  return (
    <StyledMain>
      <button onClick={() => setPopup(!popup)}>Add New Picture</button>
      {popup && <Upload onLoadGallery={loadGallery} onSetPopup={setPopup} />}
      <StyledGallery>
        {gallery.map(({ public_id }) => (
          <StyledWrapper>
            <StyledImage key={public_id} cldImg={cld.image(public_id)} />
          </StyledWrapper>
        ))}
      </StyledGallery>
    </StyledMain>
  );
}

const StyledMain = styled.main`
  background-color: #2d2b2b;
  height: 100vh;
`;

const StyledGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const StyledWrapper = styled.div`
  border: 5px solid black;
  width: 200px;
  height: 200px;
  background-color: black;
`;

const StyledImage = styled(AdvancedImage)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
