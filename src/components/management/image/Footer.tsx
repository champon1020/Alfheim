import { apiHandlerWithToken } from "~/util/api";
import React, { useCallback } from "react";
import styled from "styled-components";

const StyledFooter = styled.div`
  text-align: right;
  padding: 1% 1%;
`;

const StyledButton = styled.button`
  font-size: 1.4rem;
  color: white;
  background-color: red;
  border: none;
  padding: 1rem 2rem;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

type Props = {
  selected: string[];
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
};

const Footer = (props: Props) => {
  const { selected, setVerify } = props;

  // Call api of deleting image.
  const deleteImages = async (names: string[]) => {
    const deleteImagesRequestBody = { imageUrls: names };
    apiHandlerWithToken()
      .apiV3PrivateDeleteImagesDelete({ deleteImagesRequestBody })
      .catch((err: any) => {
        // handle error
        if (err.response.status == 403) {
          setVerify(false);
        }
      });
  };

  // On click listener of deleting image.
  // Call api with the array of selected images.
  // Reload this window.
  const onClickDelete = () => {
    deleteImages(selected);
    window.location.reload();
  };

  return (
    <StyledFooter>
      <StyledButton onClick={onClickDelete}>{"Delete"}</StyledButton>
    </StyledFooter>
  );
};

export default Footer;
