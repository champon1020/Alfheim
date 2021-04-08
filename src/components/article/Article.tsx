import { IArticle } from "~/interfaces";
import React from "react";
import styled from "styled-components";

import Content from "./Content";
import Footer from "./footer/Footer";
import Header from "./header/Header";

const StyledContainer = styled.div`
  background-color: ghostwhite;
  padding: 40px 10px;
  margin-bottom: 70px;
  box-shadow: 2px 2px 4px gray;
  @media (max-width: 500px) {
    box-shadow: none;
  }
`;

interface Props {
  article: IArticle;
}

const Article = (props: Props) => {
  const { article } = props;

  return (
    <StyledContainer>
      <Header article={article} />
      <Content content={article.content} />
      <Footer article={article} />
    </StyledContainer>
  );
};

export default Article;
