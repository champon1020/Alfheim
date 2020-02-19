import * as React from "react";
import Category from "./Category";
import styled from "styled-components";

const ArticleHeaderStyled = styled.div`
  & p {
    margin: 0;
  }
`;

const DateContainerStyled = styled.div`
  display: inline-block;
  font-size: 24px;
  border-bottom: solid thin gray;
  margin-left: 40px;
  padding: 0 5px;
`;

const TitleContainerStyled = styled.div`
  text-align: center;
  font-size: 24px;
  width: 80%;
  margin: 0 auto 20px auto;
  & h2 {
    margin-bottom: 0;
    border-bottom: solid thin gray;
    display: inline-block;
  }
`;

const CategoryContainerStyled = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const ArticleHeader = () => {
  return(
    <ArticleHeaderStyled>
      <DateContainerStyled>
        <p>2020-01-26</p>
      </DateContainerStyled>
      <TitleContainerStyled>
        <h2>This is the sample title.</h2>
      </TitleContainerStyled>
      <CategoryContainerStyled>
        <Category />
      </CategoryContainerStyled>
    </ArticleHeaderStyled>
  );
};

export default ArticleHeader;