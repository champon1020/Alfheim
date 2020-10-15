import React, { ChangeEvent, useCallback } from "react";
import styled from "styled-components";
import { ErrorStatus, MyErrorStatus } from "~/components/error/ErrorHandler";

const ContainerStyled = styled.div`
  text-align: center;
  margin: 2px 0;
`;

const InputStyled = styled.input`
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
  msgSetter: React.Dispatch<React.SetStateAction<string>>;
  errSetter: React.Dispatch<React.SetStateAction<ErrorStatus>>;
  placeholder?: string;
}

const InputForm = (props: Props) => {
  const { 
    value, 
    setter, 
    msgSetter, 
    errSetter, 
    placeholder 
  } = props;

  // On change listner of input form.
  // Execute callback and set error or not.
  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      msgSetter("");
      errSetter(MyErrorStatus.NONE);
    },
    [setter, msgSetter, errSetter],
  );
  
  return (
    <ContainerStyled>
      <InputStyled
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder} />
    </ContainerStyled>
  );
};

export default InputForm;
