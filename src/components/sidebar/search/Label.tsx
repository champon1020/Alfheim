import React from "react";
import styled from "styled-components";

const StyledLabel = styled.label<{ isFocused: boolean }>`
  cursor: text;
  position: absolute;
  left: 1em;
  top: ${({ isFocused }) => (isFocused ? "0rem" : "2.3rem")};
  color: ${({ isFocused }) => (isFocused ? "gray" : "var(--base-color)")};
  font-size: ${({ isFocused }) => (isFocused ? "1.5rem" : "2rem")};
  transition: top 0.2s ease-in-out, left 0.2s ease-in-out,
    font-size 0.2s ease-in-out, color 0.2s ease-in-out;
`;

type Props = {
  onFocus: () => void;
  isFocused: boolean;
};

const Label = (props: Props) => {
  const { onFocus, isFocused } = props;

  return (
    <StyledLabel onClick={onFocus} isFocused={isFocused}>
      {"Search Title"}
    </StyledLabel>
  );
};

export default Label;
