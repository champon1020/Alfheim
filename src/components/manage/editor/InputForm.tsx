import React, { useCallback } from "react";
import styled from "styled-components";
import { validateTitle, validateCategory } from "./validattions";

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
  setter: React.Dispatch<React.SetStateAction<string>>;
  errSetter: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
}

const InputForm = (props: Props) => {
  const { setter, errSetter, placeholder } = props;

  const handleOnClick = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      if(placeholder === "title") validateTitle(e.target.value, errSetter);
      if(placeholder === "category") validateCategory(e.target.value, errSetter);
    },
    [setter, errSetter, placeholder],
  );
  
  return (
    <ContainerStyled>
      <InputStyled 
        onChange={handleOnClick}
        placeholder={placeholder} />
    </ContainerStyled>
  );
};

export default InputForm;