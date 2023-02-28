type Picture = {
  public_id: string;
  width: number;
  height: number;
};

type Upload = {
  setGallery: React.Dispatch<React.SetStateAction<Picture[]>>;
  gallery: Picture[];
};

type UploadPopupProps = Upload & { tags: string[] };

type MainProps = UploadPopupProps;

type HeaderProps = {
  loadGallery: (tag: string) => Promise<void>;
  tags: string[];
};

type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  name?: string;
  disabled?: boolean;
  width: number;
  height: number;
  primary?: boolean;
  activeFilter?: string;
};

export type {
  Picture,
  Upload,
  UploadPopupProps,
  MainProps,
  HeaderProps,
  ButtonProps,
};
