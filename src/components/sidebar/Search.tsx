import React, { KeyboardEvent, useCallback, useRef, useState } from "react";
import styled from "styled-components";

const SearchBoxStyled = styled.div`
  position: relative;
`;

const InputLabelStyled = styled.label<{ isFocused: boolean }>`
  cursor: text;
  position: absolute;
  left: 1em;
  top: ${({ isFocused }) => (isFocused ? "0rem" : "2.3rem")};
  color: ${({ isFocused }) => (isFocused ? "gray" : "var(--base-color)")};
  font-size: ${({ isFocused }) => (isFocused ? "1.5rem" : "2rem")};
  transition: top 0.2s ease-in-out, left 0.2s ease-in-out,
    font-size 0.2s ease-in-out, color 0.2s ease-in-out;
`;

const InputStyled = styled.input`
  font-size: 2rem;
  height: 2.5rem;
  width: 90%;
  margin: 2rem 0 2rem 0;
  border: solid thin var(--base-color);
`;

const Search = () => {
  const [isFocused, setFocused] = useState(false);
  const inputRef = useRef({} as HTMLInputElement);

  const handleOnFocus = useCallback(() => {
    setFocused(true);
    inputRef.current.focus();
  }, []);

  const handleOnBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length === 0) setFocused(false);
  }, []);

  const handleOnKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || inputRef.current.value === "") return;
    window.open("/home/title/" + inputRef.current.value, "_self");
  }, []);

  return (
    <SearchBoxStyled>
      <InputLabelStyled onClick={handleOnFocus} isFocused={isFocused}>
        Search Title
      </InputLabelStyled>
      <InputStyled
        ref={inputRef}
        autoComplete="off"
        onKeyDown={handleOnKeyDown}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    </SearchBoxStyled>
  );
};

export default Search;
