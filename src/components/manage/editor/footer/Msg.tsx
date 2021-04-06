import appErrorHandler, { ErrorStatus, MyErrorStatus } from "~/error";
import React, { useMemo } from "react";
import styled from "styled-components";

const StyledBox = styled.div`
  width: 40%;
`;

const StyledMsg = styled.h3<{ color: string }>`
  color: ${({ color }) => color};
  padding-left: 2rem;
  font-size: 1.6rem;
  margin-top: 0.8em;
  @media (max-width: 1000px) {
    font-size: 1.2rem;
  }
`;

type Props = {
  err: ErrorStatus;
  msg: string;
};

const Msg = (props: Props) => {
  const { err, msg } = props;

  const message = useMemo(() => {
    if (err !== MyErrorStatus.NONE) {
      return <StyledMsg color="red">{appErrorHandler.message(err)}</StyledMsg>;
    }
    return <StyledMsg color="blue">{msg}</StyledMsg>;
  }, [msg, err]);

  return <StyledBox>{message}</StyledBox>;
};

export default Msg;
