import { apiHandler } from "~/App";
import Cookie from "js-cookie";
import React, { useRef } from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
  text-align: center;
  padding: 2% 0;
`;

const StyledInput = styled.input`
  font-size: 1.4rem;
`;

const StyledButton = styled.input`
  font-size: 1.4rem;
  margin-left: 2%;
  color: white;
  background-color: var(--manage-base-color);
  cursor: pointer;
  border: none;
  padding: 1rem 2rem;
  &:hover {
    opacity: 0.6;
  }
`;

type Props = {
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = (props: Props) => {
  const { setVerify } = props;
  const imageRef = useRef({} as HTMLInputElement);

  // On click listener of sending image.
  // Parse to multipart/form-data.
  // Call api.
  const onPostImage = () => {
    // null check
    if (imageRef.current.files == null || imageRef.current.files.length == 0) {
      return;
    }

    apiHandler
      .apiV3PrivatePostImagePost({ image: imageRef.current.files.item(0) })
      .catch((err: any) => {
        // handle error
      });
  };

  return (
    <StyledHeader>
      <StyledInput type="file" name="images" ref={imageRef} accept="image/*" />
      <StyledButton type="submit" value="Upload" onClick={onPostImage} />
    </StyledHeader>
  );
};

export default Header;
