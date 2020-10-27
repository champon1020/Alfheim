import MDEditor from "@uiw/react-md-editor";
import { ErrorStatus, MyErrorStatus } from "~/error";
import { renderers } from "~/misc/editor";
import React from "react";
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

  return (
    <StyledMdEditor>
      <MDEditor
        value={value}
        onChange={onChange}
        height={748}
        previewOptions={{ renderers: renderers }}
      />
    </StyledMdEditor>
  );
};

export default MarkdownEditor;
