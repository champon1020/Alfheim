import MDEditor from "@uiw/react-md-editor";
import { ErrorStatus, MyErrorStatus } from "~/error";
import { convertRefFromFunc } from "~/func";
import hljs from "highlight.js";
import React, { forwardRef, useEffect, useMemo } from "react";
import styled from "styled-components";

const StyledMdEditor = styled.div`
  font-size: 1.6rem;
`;

// Duration of saving article on real time.
const onlineSaveDuration = 3000;

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const MarkdownEditor = (props: Props) => {
  const { value, onChange } = props;

  // Initialize highlight.js
  useEffect(() => {
    hljs.initHighlightingOnLoad();
  }, []);

  return (
    <StyledMdEditor>
      <MDEditor value={value} onChange={onChange} height={748} />
    </StyledMdEditor>
  );
};

export default MarkdownEditor;
