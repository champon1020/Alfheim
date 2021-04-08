import { Error, HttpError } from "~/error";
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
  selectedImages: string[];
  setVerified: (value: boolean) => void;
  setErr: (err: Error) => void;
};

const Footer = (props: Props) => {
  const { selectedImages, setVerified, setErr } = props;

  const deleteImages = useCallback(() => {
    const deleteImagesRequestBody = { imageUrls: selectedImages };
    apiHandlerWithToken()
      .apiV3PrivateDeleteImagesDelete({ deleteImagesRequestBody })
      .then(() => {
        window.location.reload();
      })
      .catch((err: Response) => {
        if (err.status == 403) {
          setVerified(false);
        } else {
          setErr(new HttpError(err.status, "failed to delete images"));
        }
      });
  }, [selectedImages]);

  return (
    <StyledFooter>
      <StyledButton onClick={deleteImages}>{"Delete"}</StyledButton>
    </StyledFooter>
  );
};

export default Footer;
