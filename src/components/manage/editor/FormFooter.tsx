import React, { useMemo } from "react";
import styled from "styled-components";

const ContainerStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ErrorMsg = styled.h3`
  color: red;
  padding-left: 2rem;
  font-size: 1.6rem;
  margin-top: 0.8em;
`;

const ButtonStyled = styled.button`
  height: 40px;
  width: 200px;
  cursor: pointer;
  border-radius: 5px;
`;

type Props = {
  onSubmit: () => void;
  err: string;
}

const FormFooter = (props: Props) => {
  const { onSubmit, err } = props;

  const errMsg = useMemo(() => {
    return err.length > 0 ? "Error: " + err : "";
  }, [err]);

  return (
    <ContainerStyled>
      <ErrorMsg>
        {errMsg}
      </ErrorMsg>
      <div>
        <ButtonStyled>
          Preview
        </ButtonStyled>
        <ButtonStyled onClick={onSubmit}>
          Submit
        </ButtonStyled>
      </div>
    </ContainerStyled>
  );
};

export default FormFooter;