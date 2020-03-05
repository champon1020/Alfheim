import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { ArticleType } from "src/type";
import { checkIsDraft } from "./util";

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
  article: ArticleType;
  draftContent?: string;
}

type Props = ParentProps;

const ArticleContent = (props: Props) => {
  const { article, draftContent } = props;
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
      // set draft content
      if(checkIsDraft() && draftContent !== undefined) {
        setContent(draftContent);
        return;
      }

      // call api
      axios.get(article.contentUrl)
        .then(res => {
          setContent(res.data);
        });
    },[article, draftContent]
  );

  useEffect(() => {
    parseArticleContent();
  }, [parseArticleContent]);

  return(
    <ArticleContentStyled ref={contentRef}></ArticleContentStyled>
  );
};

export default ArticleContent;