import MDEditor from "@uiw/react-md-editor";
import { renderers } from "~/components/management/editor/renderer";
import { IArticle } from "~/interfaces";
import React, { useEffect, useMemo } from "react";
import styled from "styled-components";

const StyledContent = styled.div`
  overflow-y: scroll;
  height: calc(
    var(--management-articles-container-height) -
      var(--management-articles-preview-header-height) -
      var(--management-articles-preview-footer-height)
  );
`;

const StyledViewer = styled.div`
  margin: 1% 2%;
`;

type Props = {
  focusedArticle?: IArticle;
};

const Content = (props: Props) => {
  const { focusedArticle } = props;

  if (focusedArticle == null) {
    return <StyledContent />;
  }

  return (
    <StyledContent>
      <StyledViewer>
        <MDEditor.Markdown
          source={focusedArticle.content}
          renderers={renderers}
        />
      </StyledViewer>
    </StyledContent>
  );
};

export default Content;
