import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";

import Input from "./Input";
import Label from "./Label";

const StyledSearchBox = styled.div`
  position: relative;
`;

const Search = () => {
  const [isFocused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>();

  const onFocus = () => {
    setFocused(true);
  };

  return (
    <StyledSearchBox>
      <Label onFocus={onFocus} isFocused={isFocused} />
      <Input onFocus={onFocus} setFocused={setFocused} ref={inputRef} />
    </StyledSearchBox>
  );
};

export default Search;
