import appErrorHandler, { ErrorStatus, MyErrorStatus } from "~/error";
import React, { useState } from "react";
import styled from "styled-components";

import Input from "./Input";
import Msg from "./Msg";

const StyledFooter = styled.div`
  --management-write-footer-msg-height: 2rem;
  --management-write-footer-form-height: 3rem;

  height: calc(var(--management-write-footer-height) - 1rem * 2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  @media (max-width: 750px) {
    padding: 1rem 0;
  }
`;

const StyledForm = styled.div`
  margin-top: 0.5rem;
  height: var(--management-write-footer-form-height);
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const StyledButton = styled.button`
  margin: 0 0.1rem;
  width: 20%;
  cursor: pointer;
  border-radius: 5px;
  color: white;
  background-color: var(--base-color);
  font-size: 1.6rem;
  &:hover {
    opacity: 0.6;
  }
`;

type Props = {
  imageUrl: string;
  onSubmit: () => void;
  onPreview: () => void;
  onChangeHandler: (value: string) => void;
  msg: string;
  err?: ErrorStatus;
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
};

const Footer = (props: Props) => {
  const {
    imageUrl,
    onSubmit,
    onPreview,
    onChangeHandler,
    msg,
    err,
    setVerify,
  } = props;

  return (
    <StyledFooter>
      <Msg err={err} msg={msg} />
      <StyledForm>
        <Input
          initValue={imageUrl}
          onChangeHandler={onChangeHandler}
          setVerify={setVerify}
        />
        <StyledButton onClick={onPreview}>{"Preview"}</StyledButton>
        <StyledButton onClick={onSubmit}>{"Submit"}</StyledButton>
      </StyledForm>
    </StyledFooter>
  );
};

export default Footer;
