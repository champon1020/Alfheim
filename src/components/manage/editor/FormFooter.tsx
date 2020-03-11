import React, { useMemo } from "react";
import styled from "styled-components";
import appErrorHandler, { ErrorStatus, MyErrorStatus } from "src/components/services/ErrorHandler";

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
  outline: none;
`;

type Props = {
  onSubmit: () => void;
  onPreview: () => void;
  err?: ErrorStatus;
}

const FormFooter = (props: Props) => {
  const { onSubmit, onPreview, err } = props;

  const errMsg = useMemo(() => {
    if(err !== MyErrorStatus.NONE){
      appErrorHandler.print(err);
      return appErrorHandler.message(err);
    }
    return "";
  }, [err]);

  return (
    <ContainerStyled>
      <ErrorMsg>
        {errMsg}
      </ErrorMsg>
      <div>
        <ButtonStyled onClick={onPreview}>
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