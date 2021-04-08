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
  msg: string;
};

const Msg = (props: Props) => {
  const { msg } = props;

  return (
    <StyledBox>
      <StyledMsg color="blue">{msg}</StyledMsg>;
    </StyledBox>
  );
};

export default Msg;
