import MDEditor, { commands } from "@uiw/react-md-editor";
import { ErrorStatus, MyErrorStatus } from "~/error";
import React from "react";
import styled from "styled-components";

import { renderers } from "./renderer";

const StyledMdEditor = styled.div`
  height: var(--management-write-editor-height);
  font-size: 1.6rem;

  .w-md-editor {
    height: var(--management-write-editor-height) !important;
  }
  .w-md-editor-content {
    height: calc(var(--management-write-editor-height) - 29px) !important;
  }
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
        height={200}
        previewOptions={{ renderers: renderers }}
        commands={[
          commands.bold,
          commands.italic,
          commands.quote,
          commands.link,
          commands.strikethrough,
          commands.title,
          commands.hr,
          commands.divider,
          commands.unorderedListCommand,
          commands.orderedListCommand,
          commands.checkedListCommand,
        ]}
      />
    </StyledMdEditor>
  );
};

export default MarkdownEditor;
