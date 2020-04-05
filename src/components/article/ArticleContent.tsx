import React, { useCallback } from "react";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import styled from "styled-components";

const ArticleContentStyled = styled.article`
  width: 86%;
  margin: 10% auto 50px auto;
  font-size: 1.6rem;
  @media (max-width: 500px) {
    font-size: 1.2rem;
    width: 95%;
  }
`;

type ParentProps = {
  content: string;
}

type Props = ParentProps;

const ArticleContent = (props: Props) => {
  const { content } = props;

  const viewer = useCallback(
    () => {
      if(content === undefined) return <div></div>;
      return (
        <Viewer
          initialValue={content}
        />
      );
    },
    [content],
  );

  return(
    <ArticleContentStyled>
      {viewer()}
    </ArticleContentStyled>
  );
};

export default ArticleContent;