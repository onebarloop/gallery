import { Cloudinary, CloudinaryImage } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill, scale, limitFit } from "@cloudinary/url-gen/actions/resize";
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

  console.log(gallery);

  useEffect(() => {
    async function loadGallery() {
      const response = await fetch(
        "https://res.cloudinary.com/dt7yjhfbb/image/list/gallery.json",
        { method: "GET" }
      );
      const data = await response.json();
      setGallery(data.resources);
    }
    loadGallery();
  }, []);

  return (
    <div>
      <Upload />
      <StyledGallery>
        {gallery.map(({ public_id }) => (
          <StyledWrapper>
            <StyledImage
              key={public_id}
              cldImg={cld
                .image(public_id)
                .resize(fill().width(400).height(400))}
            />
          </StyledWrapper>
        ))}
      </StyledGallery>
    </div>
  );
}

const StyledGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const StyledWrapper = styled.div`
  border: 5px solid black;
  width: 200px;
  height: 200px;
`;

const StyledImage = styled(AdvancedImage)`
  width: 200px;
  height: 200px;
`;
