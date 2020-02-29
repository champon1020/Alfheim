import React, { useState, useCallback, useRef } from "react";
import styled from "styled-components";

const SearchBoxStyled = styled.div`
  position: relative;
`;

const InputLabelStyled = styled.label<{isFocused: boolean}>`
  cursor: text;
  position: absolute;
  left: 1em;;
  top: ${({isFocused}) => (isFocused ? "0rem" : "2.5rem")};
  color: ${({isFocused}) => (isFocused ? "purple" : "var(--base-color)")};
  font-size: ${({isFocused}) => (isFocused ? "1.5rem" : "2rem")};
  transition:
    top .2s ease-in-out,
    left .2s ease-in-out,
    font-size .2s ease-in-out,
    color .2s ease-in-out;
`;

const InputStyled = styled.input`
  font-size: 2rem;
  height: 2.4rem;
  width: 90%;
  margin: 2rem 0 2rem 0;
`;

const Search = () => {
  const [isFocused, setFocused] = useState(false);
  const inputRef = useRef({} as HTMLInputElement);

  const handleOnFocus = useCallback(
    () => {
      setFocused(true);
      inputRef.current.focus();
    },
    [],
  );

  const handleOnBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if(e.currentTarget.value.length === 0) setFocused(false);
    },
    [],
  );

  return (
    <SearchBoxStyled>
      <InputLabelStyled
        onClick={handleOnFocus}
        isFocused={isFocused}>
        Search Title
      </InputLabelStyled>
      <InputStyled 
        ref={inputRef}
        autoComplete="off" 
        onFocus={handleOnFocus}
        onBlur={handleOnBlur} />
    </SearchBoxStyled>
  );
};

export default Search;