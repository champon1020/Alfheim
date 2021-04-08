import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  text-align: center;
`;

const StyledInput = styled.input`
  height: calc(var(--management-write-input-height) - 0.2rem * 2);
  margin-bottom: 0.2rem;
  padding-left: 0.3rem;
  width: 99%;
  border: solid thin gray;
  border-radius: 0.5rem;
  font-size: 2.4rem;
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
