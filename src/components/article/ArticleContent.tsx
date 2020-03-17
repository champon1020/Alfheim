import React, { useCallback } from "react";
import styled from "styled-components";
import { ArticleType } from "src/type";

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

  const contentRef = useCallback(
    (node: HTMLElement) => {
      if(node !== null){
        node.insertAdjacentHTML("afterbegin", content);
      }
    },
    [content],
  );

  return(
    <ArticleContentStyled ref={contentRef} />
  );
};

export default ArticleContent;