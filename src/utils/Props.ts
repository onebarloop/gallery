import { Dispatch, SetStateAction } from "react";

type picture = {
  public_id: string;
  width: number;
  height: number;
};

type Props = {
  setPopup: Dispatch<SetStateAction<boolean>>;
  setGallery: React.Dispatch<React.SetStateAction<picture[]>>;
  gallery: picture[];
};

type HeaderProps = {
  setPopup: Dispatch<SetStateAction<boolean>>;
  popup: boolean;
  loadGallery: (tag: string) => Promise<void>;
};

type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  name?: string;
  disabled?: boolean;
  width: number;
  height: number;
  primary?: boolean;
};

export type { Props, HeaderProps, ButtonProps, picture };
