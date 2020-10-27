import { convertRefFromFunc } from "~/misc/misc";
import React, { FocusEvent, KeyboardEvent, forwardRef } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  font-size: 2rem;
  height: 2.5rem;
  width: 90%;
  margin: 2rem 0 2rem 0;
  border: solid thin var(--base-color);
`;

type Props = {
  onFocus: () => void;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
};

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { onFocus, setFocused } = props;
  const inputRef = convertRefFromFunc(ref);

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length === 0) {
      setFocused(false);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || inputRef.current.value === "") {
      return;
    }
    window.open("/home/title/" + inputRef.current.value, "_self");
  };

  return (
    <StyledInput
      ref={inputRef}
      autoComplete="off"
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
});

export default Input;
