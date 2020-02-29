import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { ArticleType } from "src/type";

const ArticleContentStyled = styled.article`
  width: 86%;
  margin: 90px auto 50px auto;
  font-size: 16px;
`;

type ParentProps = {
  article: ArticleType;
}

type Props = ParentProps;

const ArticleContent = (props: Props) => {
  const { article } = props;
  const [content, setContent] = useState("");

  const contentRef = useCallback(
    (node: HTMLElement) => {
      if(node !== null){
        node.insertAdjacentHTML("afterbegin", content);
      }
    },
    [content],
  );

  const parseArticleContent = useCallback(
    () => {
      axios.get(article.contentUrl)
        .then(res => {
          setContent(res.data);
        });
    },[article]
  );

  useEffect(() => {
    parseArticleContent();
  }, [parseArticleContent]);

  return(
    <ArticleContentStyled ref={contentRef}></ArticleContentStyled>
  );
};

export default ArticleContent;