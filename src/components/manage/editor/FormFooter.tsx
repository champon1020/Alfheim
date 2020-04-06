import React, { useMemo } from "react";
import styled from "styled-components";
import appErrorHandler, { ErrorStatus, MyErrorStatus } from "src/components/error/ErrorHandler";

const ContainerStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.2rem 0.2rem;
`;

const Msg = styled.h3<{color: string}>`
  color: ${({color}) => color};
  padding-left: 2rem;
  font-size: 1.6rem;
  margin-top: 0.8em;
`;

const ButtonStyled = styled.button`
  margin: 0 0.1rem;
  height: 4rem;
  width: 20rem;
  cursor: pointer;
  border-radius: 5px;
  outline: none;
  background-color: lightsteelblue;
  border: solid thin gray;
  font-size: 1.6rem;
  &:hover {
    opacity: 0.6;
  }
`;

type Props = {
  onSubmit: () => void;
  onPreview: () => void;
  msg: string;
  err?: ErrorStatus;
}

const FormFooter = (props: Props) => {
  const { onSubmit, onPreview, msg, err } = props;

  const message = useMemo(() => {
    if(err !== MyErrorStatus.NONE){
      //appErrorHandler.print(err);
      return (
        <Msg color="red">
          {appErrorHandler.message(err)}
        </Msg>
      );
    }
    return (
      <Msg color="blue">
        {msg}
      </Msg>
    );
  }, [msg, err]);

  return (
    <ContainerStyled>
      <div>
        {message}
      </div>
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