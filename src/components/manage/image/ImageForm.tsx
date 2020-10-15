import { Config } from "~/App";
import axios from "axios";
import Cookie from "js-cookie";
import React, { useCallback, useRef } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  text-align: center;
  padding: 2% 0;
`;

const FileInput = styled.input`
  font-size: 1.4rem;
`;

const SubmitButton = styled.input`
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

const ImageForm = (props: Props) => {
  const { setVerify } = props;
  const imageRef = useRef({} as HTMLInputElement);

  // On click listener of sending image.
  // Parse to multipart/form-data.
  // Call api.
  const handleOnPost = useCallback(() => {
    // null check
    if (imageRef.current.files === null) return;

    // Parse image from input form and add to formData.
    // This is the format of multipart/form-data.
    const formData = new FormData();
    formData.append("images", imageRef.current.files[0]);

    // Call api.
    axios
      .post(`${Config.apiHost}/api/private/register/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookie.get("alfheim_id_token")}`,
        },
      })
      .then((res) => {
        setVerify(res.status === 200);
        if (res.status === 200)
          window.location.href = `${Config.host}/manage/images`;
      })
      .catch(() => {
        setVerify(false);
      });
  }, [setVerify]);

  return (
    <FormContainer>
      <FileInput type="file" name="images" ref={imageRef} accept="image/*" />
      <SubmitButton type="submit" value="Upload" onClick={handleOnPost} />
    </FormContainer>
  );
};

export default ImageForm;
