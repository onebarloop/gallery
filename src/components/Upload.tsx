import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { Player } from "@lottiefiles/react-lottie-player";
import Button from "./Button";

type Props = {
  onLoadGallery: () => Promise<void>;
  onSetPopup: Dispatch<SetStateAction<boolean>>;
};

export default function Upload({ onLoadGallery, onSetPopup }: Props) {
  const [selectedImage, setSelectedImage] = useState<Blob | undefined>(
    undefined
  );

  const [tags, setTags] = useState<string[]>(["gallery"]);

  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault();
    setLoading(true);
    if (selectedImage !== undefined) {
      const data = new FormData();
      data.append("file", selectedImage);
      data.append("tags", tags.toString());
      data.append("upload_preset", "gallery_preset");
      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dt7yjhfbb/image/upload",
          { method: "POST", body: data }
        );
        if (response.ok === true) {
          console.log("Submitted");
        } else {
          console.error("Submit failed");
        }
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
    onLoadGallery();
    onSetPopup(false);
  }

  function changeImage(event: React.SyntheticEvent): void {
    setSelectedImage((event.target as HTMLInputElement).files![0]);
  }

  function handleCheckbox(event: React.SyntheticEvent) {
    const target = event.target as typeof event.target & {
      value: string;
      checked: boolean;
    };
    if (target.checked === true) {
      setTags([...tags, target.value]);
    } else {
      setTags(tags.filter((tag) => tag !== target.value));
    }
  }
  return (
    <StyledPopup>
      {selectedImage !== undefined ? (
        <StyledWrapper>
          {loading ? (
            <Player
              src="https://assets3.lottiefiles.com/packages/lf20_mrcseu1q.json"
              className="player"
              loop
              autoplay
              style={{ width: "300px", height: "300px" }}
            />
          ) : (
            <img alt="pic" src={URL.createObjectURL(selectedImage)} />
          )}
        </StyledWrapper>
      ) : (
        <StyledWrapper></StyledWrapper>
      )}
      <form onSubmit={handleSubmit}>
        <StyledImgInput>
          Choose Picture
          <input
            onChange={changeImage}
            name="pic"
            type="file"
            accept="image/png, image/jpeg"
            required
          />
        </StyledImgInput>

        <fieldset>
          <legend>Categorys</legend>
          <section>
            <label>
              <input
                onChange={handleCheckbox}
                type="checkbox"
                name="tags"
                value="woman"
              />
              Woman
            </label>
            <label>
              <input
                type="checkbox"
                name="tags"
                value="happy"
                onChange={handleCheckbox}
              />
              Happy
            </label>
            <label>
              <input
                type="checkbox"
                name="tags"
                value="man"
                onChange={handleCheckbox}
              />
              Man
            </label>
            <label>
              <input
                type="checkbox"
                name="tags"
                value="student"
                onChange={handleCheckbox}
              />
              Student
            </label>
          </section>
        </fieldset>

        <Button
          name={loading ? "upload..." : "Submit"}
          width={100}
          height={30}
          disabled={loading ? true : false}
        />
      </form>
    </StyledPopup>
  );
}

const StyledPopup = styled.article`
  position: absolute;
  background-color: #1f1e1e;
  padding-top: 15px;
  width: 50%;
  left: 50%;
  margin-left: -25vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
    margin: 10px 0;
  }

  input[type="file"] {
    display: none;
  }
`;

const StyledImgInput = styled.label`
  background-color: none;
  border: 1px solid white;
  padding: 5px;
  cursor: pointer;
`;

const StyledWrapper = styled.div`
  border: 5px solid black;
  width: 90%;
  height: 90%;
  background-color: black;
  overflow: hidden;
  padding: auto;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
