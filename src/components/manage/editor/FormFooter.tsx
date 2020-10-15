import appErrorHandler, {
  ErrorStatus,
  MyErrorStatus,
} from "~/components/error/ErrorHandler";
import React, { ChangeEvent, useCallback, useMemo } from "react";
import styled from "styled-components";

const ContainerStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.2rem 0.2rem;
  height: 4rem;
`;

const MessageBox = styled.div`
  width: 40%;
`;

const Msg = styled.h3<{ color: string }>`
  color: ${({ color }) => color};
  padding-left: 2rem;
  font-size: 1.6rem;
  margin-top: 0.8em;
  @media (max-width: 1000px) {
    font-size: 1.2rem;
  }
`;

const RightSideBox = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const InputForm = styled.input`
  margin: 0 0.2rem;
  height: 3.8rem;
  width: 60%;
  font-size: 2.5rem;
  border-radius: 5px;
  border: solid thin gray;
`;

const ButtonStyled = styled.button`
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

const FormFooter = (props: Props) => {
  const { imageHash, onSubmit, onPreview, setter, msg, err } = props;

  // On change listner of input form.
  // Execute callback and set error or not.
  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    },
    [setter]
  );

  // Return message component.
  const message = useMemo(() => {
    if (err !== MyErrorStatus.NONE) {
      //appErrorHandler.print(err);
      return <Msg color="red">{appErrorHandler.message(err)}</Msg>;
    }
    return <Msg color="blue">{msg}</Msg>;
  }, [msg, err]);

  return (
    <ContainerStyled>
      <MessageBox>{message}</MessageBox>
      <RightSideBox>
        <InputForm value={imageHash} onChange={onChangeHandler} />
        <ButtonStyled onClick={onPreview}>Preview</ButtonStyled>
        <ButtonStyled onClick={onSubmit}>Submit</ButtonStyled>
      </RightSideBox>
    </ContainerStyled>
  );
};

export default FormFooter;
