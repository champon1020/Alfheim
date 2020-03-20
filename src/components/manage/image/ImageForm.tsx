import React, { useRef } from "react";
import styled from "styled-components";
import { Config } from "src/App";

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

const ImageForm = () => {
  const imageRef = useRef({} as HTMLInputElement);
  
  return (
    <FormContainer>
      <form 
        action={Config.apiHost + "/api/register/image"}
        encType="multipart/form-data" 
        method="post">
        <FileInput
          type="file"
          name="images"
          ref={imageRef}
          accept="image/*"/>
        <SubmitButton 
          type="submit"
          value="Upload" />
      </form>
    </FormContainer>
  );
};

export default ImageForm;