import { ErrorStatus, MyErrorStatus } from "~/error";
import React, { ChangeEvent, useCallback } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  text-align: center;
  margin: 2px 0;
`;

const StyledInput = styled.input`
  height: 34px;
  width: 99%;
  border: solid thin gray;
  border-radius: 5px;
  font-size: 24px;
  padding-left: 0.3rem;
`;

type Props = {
  value: string;
  setter: (value: string) => void;
  setMsg: React.Dispatch<React.SetStateAction<string>>;
  setErr: React.Dispatch<React.SetStateAction<ErrorStatus>>;
  placeholder?: string;
};

const InputForm = (props: Props) => {
  const { value, setter, setMsg, setErr, placeholder } = props;

  // On change listner of input form.
  // Execute callback and set error or not.
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    setMsg("");
    setErr(MyErrorStatus.NONE);
  };

  return (
    <StyledContainer>
      <StyledInput
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder}
      />
    </StyledContainer>
  );
};

export default InputForm;
