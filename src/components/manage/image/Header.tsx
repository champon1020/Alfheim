import { ax } from "~/api/entry";
import { Config } from "~/config";
import Cookie from "js-cookie";
import React, { useCallback, useRef } from "react";
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
    if (imageRef.current.files == null) return;

    // Parse image from input form and add to formData.
    // This is the format of multipart/form-data.
    const formData = new FormData();
    formData.append("images", imageRef.current.files[0]);

    // Call api.
    ax.post(`${Config.apiUrl}/api/private/register/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${Cookie.get("alfheim_id_token")}`,
      },
      validateStatus: (status: number) => {
        return 200 <= status && status < 400;
      },
    })
      .then((res) => {
        setVerify(true);
        window.location.href = `${Config.url}/manage/images`;
      })
      .catch((err) => {
        setVerify(false);
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
