import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ImageListModal from "./ImageListModal";

const StyledInput = styled.input`
  width: 60%;
  font-size: 1.5rem;
  border-radius: 0.5rem;
  border: solid thin gray;
  cursor: pointer;
`;

type Props = {
  initValue?: string;
  onChangeHandler: (value: string) => void;
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
};

const Input = (props: Props) => {
  const { initValue, onChangeHandler, setVerify } = props;

  const [value, setValue] = useState("");
  const [imageListModal, setImageListModal] = useState(false);

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    setImageListModal(!imageListModal);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChangeHandler(e.target.value);
  };

  useEffect(() => {
    if (initValue != null) {
      setValue(initValue);
    }
  }, [initValue]);

  return (
    <>
      <StyledInput
        readOnly
        id="image-url-input"
        value={value}
        onChange={onChange}
        onClick={onClick}
      />
      <ImageListModal
        hidden={!imageListModal}
        setValue={setValue}
        setVerify={setVerify}
        setModal={setImageListModal}
      />
    </>
  );
};

export default Input;
