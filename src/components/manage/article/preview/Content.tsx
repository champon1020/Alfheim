import MDEditor from "@uiw/react-md-editor";
import { renderers } from "~/misc/editor";
import React, { useEffect, useMemo } from "react";
import styled from "styled-components";

const StyledContent = styled.div`
  overflow-y: scroll;
  height: calc(
    var(--articles-container-height) - var(--header-height) - 2.3rem
  );
`;

const StyledViewer = styled.div`
  margin: 1% 2%;
`;
type Props = {
  content: string;
};

const Content = (props: Props) => {
  const { content } = props;

  return (
    <StyledContent>
      <StyledViewer>
        <MDEditor.Markdown source={content} renderers={renderers} />
      </StyledViewer>
    </StyledContent>
  );
};

export default Content;
