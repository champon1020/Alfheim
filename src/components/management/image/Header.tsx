import { AppError, Error, HttpError } from "~/error";
import { apiHandlerWithToken } from "~/util/api";
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
  background-color: var(--base-color);
  cursor: pointer;
  border: none;
  padding: 1rem 2rem;
  &:hover {
    opacity: 0.6;
  }
`;

type Props = {
  setErr: (err: Error) => void;
  setVerified: (value: boolean) => void;
};

const Header = (props: Props) => {
  const { setVerified, setErr } = props;
  const imageRef = useRef({} as HTMLInputElement);

  const onPostImage = () => {
    if (imageRef.current.files == null || imageRef.current.files.length == 0) {
      setErr(new AppError("no image is choosed"));
      return;
    }

    apiHandlerWithToken()
      .apiV3PrivatePostImagePost({ image: imageRef.current.files.item(0) })
      .then(() => {
        window.location.reload();
      })
      .catch((err: Response) => {
        if (err.status == 403) {
          setVerified(false);
        } else {
          setErr(new HttpError(err.status, "failed to post image"));
        }
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
