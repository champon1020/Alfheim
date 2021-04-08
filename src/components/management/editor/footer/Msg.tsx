import appErrorHandler, { ErrorStatus, MyErrorStatus } from "~/error";
import React, { useMemo } from "react";
import styled from "styled-components";

const StyledBox = styled.div`
  min-height: var(--management-write-footer-msg-height);
`;

const StyledMsg = styled.h3<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 1.6rem;
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
