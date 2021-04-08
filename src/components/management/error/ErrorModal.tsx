import { Error } from "~/error";
import React from "react";
import styled from "styled-components";

const StyledOutside = styled.div<{ hidden: boolean }>`
  display: ${({ hidden }) => (hidden ? "none" : "")};
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 998;
  background-color: rgba(0, 0, 0, 0.2);
`;

const StyledModal = styled.div<{ hidden: boolean }>`
  display: ${({ hidden }) => (hidden ? "none" : "")};
  position: absolute;
  background-color: white;
  border: solid thin var(--border-color);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 999;
  width: 60rem;
  height: 35rem;
  max-width: 100vw;
`;

const StyledMsg = styled.p`
  text-align: center;
  font-size: 2rem;
  color: red;
`;

const StyledButton = styled.div`
  height: 3rem;
  width: 7rem;
  cursor: pointer;
  border-radius: 0.4rem;
  text-align: center;
  line-height: 3rem;
  background-color: var(--base-color);
  color: white;
  font-size: 2rem;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 2rem;
  margin: 0 auto;
  &:hover {
    opacity: var(--hoverred-opacity);
  }
`;

type Props = {
  hidden: boolean;
  err: Error;
  setErr: (err: Error) => void;
};

const ErrorModal = (props: Props) => {
  const { hidden, err, setErr } = props;

  if (err == null) {
    return <></>;
  }

  const onClickWithSetModalFalse = () => {
    setErr(null);
  };

  return (
    <StyledOutside hidden={hidden} onClick={onClickWithSetModalFalse}>
      <StyledModal hidden={hidden}>
        <StyledMsg>{err.error()}</StyledMsg>
        <StyledButton onClick={onClickWithSetModalFalse}>
          {"Close"}
        </StyledButton>
      </StyledModal>
    </StyledOutside>
  );
};

export default ErrorModal;
