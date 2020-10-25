import { ErrorStatus, MyErrorStatus } from "~/error";
import React, { useEffect, useState } from "react";
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
  onChangeHandler: (value: string) => void;
  initValue?: string;
  placeholder?: string;
};

const Input = (props: Props) => {
  const { onChangeHandler, initValue, placeholder } = props;

  const [value, setValue] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChangeHandler(e.target.value);
  };

  useEffect(() => {
    if (initValue != null) {
      setValue(initValue);
    }
  }, [initValue]);

  return (
    <StyledContainer>
      <StyledInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </StyledContainer>
  );
};

export default Input;
