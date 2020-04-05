import React, { useRef, useCallback } from "react";
import styled from "styled-components";
import { Config } from "src/App";
import axios from "axios";
import Cookie from "js-cookie";

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
}

const ImageForm = (props: Props) => {
  const { setVerify } = props;
  const imageRef = useRef({} as HTMLInputElement);

  const handleOnPost = useCallback(
    () => {
      if(imageRef.current.files === null) return;
      const formData = new FormData();
      formData.append("images", imageRef.current.files[0]);
      axios.post(`${Config.apiHost}/api/private/register/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookie.get("alfheim_id_token")}`
        }
      }).then(res => {
        setVerify(res.status === 200);
        if(res.status === 200) window.location.href = `${Config.host}/manage/images`;
      }).catch(() => {
        setVerify(false);
      });
    },
    [setVerify],
  );
  
  return (
    <FormContainer>
      <FileInput
        type="file"
        name="images"
        ref={imageRef}
        accept="image/*"/>
      <SubmitButton 
        type="submit"
        value="Upload"
        onClick={handleOnPost}/>
    </FormContainer>
  );
};

export default ImageForm;