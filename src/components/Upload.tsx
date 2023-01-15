import { FormEvent, useState } from "react";
import styled from "styled-components";

export default function Upload() {
  const [selectedImage, setSelectedImage] = useState<Blob | undefined>(
    undefined
  );

  const [tags, setTags] = useState<string[]>(["gallery"]);

  async function handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault();
    if (selectedImage !== undefined) {
      const data = new FormData();

      data.append("file", selectedImage);
      data.append("tags", tags.toString());
      data.append("upload_preset", "gallery_preset");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dt7yjhfbb/image/upload",
        { method: "POST", body: data }
      );
    }
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
      console.log(target.value);
      setTags([...tags, target.value]);
    } else {
      setTags(tags.filter((tag) => tag !== target.value));
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={changeImage}
        name="pic"
        type="file"
        accept="image/png, image/jpeg"
        required
      />
      {selectedImage !== undefined && (
        <StyledWrapper>
          <img alt="pic" src={URL.createObjectURL(selectedImage)} />
        </StyledWrapper>
      )}
      <fieldset>
        <section className="tags">
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

      <button type="submit">Submit</button>
    </form>
  );
}

const StyledWrapper = styled.div`
  border: 5px solid black;
  width: 100px;
  height: 100px;
  img {
    width: 100px;
    height: 100px;
  }
`;
