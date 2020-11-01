import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  margin: 0 0.2rem;
  height: 3.8rem;
  width: 60%;
  font-size: 2.5rem;
  border-radius: 5px;
  border: solid thin gray;
`;

type Props = {
  initValue?: string;
  onChangeHandler: (value: string) => void;
};

const Input = (props: Props) => {
  const { initValue, onChangeHandler } = props;
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

  return <StyledInput value={value} onChange={onChange} />;
};

export default Input;
