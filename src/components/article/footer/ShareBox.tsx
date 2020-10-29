import { IArticle } from "~/type";
import React from "react";
import styled from "styled-components";

import { Facebook, Linkedin, Twitter } from "./ShareButtons";

const StyledShareList = styled.ul`
  margin-bottom: 50px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  width: 86%;
  margin: 0 auto;
`;

type Props = {
  article: IArticle;
};

const ShareBox = (props: Props) => {
  const { article } = props;

  return (
    <>
      <StyledShareList>
        <Twitter
          id={article.id}
          title={article.title}
          categories={article.categories}
        />
        <Facebook id={article.id} title={article.title} />
        <Linkedin id={article.id} title={article.title} />
      </StyledShareList>
    </>
  );
};

export default ShareBox;
