import appErrorHandler, { ErrorStatus, MyErrorStatus } from "~/error";
import React from "react";
import styled from "styled-components";

import Input from "./Input";
import Msg from "./Msg";

const StyledFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.2rem 0.2rem;
  height: 4rem;
`;

const StyledForm = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const StyledButton = styled.button`
  margin: 0 0.1rem;
  height: 4rem;
  width: 20%;
  cursor: pointer;
  border-radius: 5px;
  outline: none;
  background-color: lightsteelblue;
  border: solid thin gray;
  font-size: 1.6rem;
  &:hover {
    opacity: 0.6;
  }
  @media (max-width: 800px) {
    font-size: 0.8rem;
  }
`;

type Props = {
  imageUrl: string;
  onSubmit: () => void;
  onPreview: () => void;
  onChangeHandler: (value: string) => void;
  msg: string;
  err?: ErrorStatus;
};

const Footer = (props: Props) => {
  const { imageUrl, onSubmit, onPreview, onChangeHandler, msg, err } = props;

  return (
    <StyledFooter>
      <Msg err={err} msg={msg} />
      <StyledForm>
        <Input initValue={imageUrl} onChangeHandler={onChangeHandler} />
        <StyledButton onClick={onPreview}>{"Preview"}</StyledButton>
        <StyledButton onClick={onSubmit}>{"Submit"}</StyledButton>
      </StyledForm>
    </StyledFooter>
  );
};

export default Footer;
