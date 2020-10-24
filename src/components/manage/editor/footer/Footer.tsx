import appErrorHandler, { ErrorStatus, MyErrorStatus } from "~/error";
import React, { ChangeEvent, useCallback } from "react";
import styled from "styled-components";

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

const StyledInput = styled.input`
  margin: 0 0.2rem;
  height: 3.8rem;
  width: 60%;
  font-size: 2.5rem;
  border-radius: 5px;
  border: solid thin gray;
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
    font-size: 1.2rem;
  }
`;

type Props = {
  imageHash: string;
  onSubmit: () => void;
  onPreview: () => void;
  setter: (i: string) => void;
  msg: string;
  err?: ErrorStatus;
};

const Footer = (props: Props) => {
  const { imageHash, onSubmit, onPreview, setter, msg, err } = props;

  // On change listner of input form.
  // Execute callback and set error or not.
  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    },
    [setter]
  );

  return (
    <StyledFooter>
      <Msg err={err} msg={msg} />
      <StyledForm>
        <StyledInput value={imageHash} onChange={onChangeHandler} />
        <StyledButton onClick={onPreview}>{"Preview"}</StyledButton>
        <StyledButton onClick={onSubmit}>{"Submit"}</StyledButton>
      </StyledForm>
    </StyledFooter>
  );
};

export default Footer;
