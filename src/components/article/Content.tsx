import MDEditor from "@uiw/react-md-editor";
import { renderers } from "~/misc/editor";
import React from "react";
import styled from "styled-components";

const StyledContainer = styled.article`
  width: 90%;
  margin: 10% auto 50px auto;
  font-size: 1.6rem;
  @media (max-width: 500px) {
    font-size: 1.2rem;
    width: 95%;
  }
`;

type Props = {
  content: string;
};

const ArticleContent = (props: Props) => {
  const { content } = props;

  return (
    <StyledContainer>
      <MDEditor.Markdown source={content} renderers={renderers} />
    </StyledContainer>
  );
};

export default ArticleContent;
