import * as React from "react";
import styled from "styled-components";
import image from "../../assets/images/coming_soon.jpg";
import ArticleBoxCategory from "./ArticleBoxCategory";

const ArticleBoxStyled = styled.div`
  display: inline-block;
  position: relative;
  width: 700px;
  height: 420px;
  cursor: pointer;
  z-index: 1;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 2px 2px 4px gray;
  &:hover > img {
    transform: scale(1.1);
  }
`;

const ImageStyled = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: transform 1s ease-out;
`;

const DateBoxStyled = styled.div`
  position: absolute;
  top: 20px;
  right: 25px;
  color: brown;
  font-size: 20px;
  background-color: white;
  border-radius: 5px;
  & p {
    margin: 0;
    padding: 0 10px;
  }
`;

const CategoryBoxStyled = styled.div`
  position: absolute;
  bottom: 33%;
  left: 0;
  color: brown;
`;

const TitleBoxStyled = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  color: brown;
  font-size: 27px;
  background-color: white;
  width: 100%;
  opacity: 0.8;
  height: 30%;
  & h3 {
    margin: 10px;
    text-align: left;
    padding: 0 30px;
  }
`;

const LinkBoxStyled = styled.a`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const ArticleBox: React.FC = () => {
  return(
    <ArticleBoxStyled>
      <ImageStyled src={image} alt="article box" />
      <DateBoxStyled>
        <p>2020-01-26</p>
      </DateBoxStyled>
      <CategoryBoxStyled>
        <ArticleBoxCategory />
      </CategoryBoxStyled>
      <TitleBoxStyled>
        <h3>Article Box Title.Article Box Title.Article Box Title.Article Box Title.</h3>
      </TitleBoxStyled>

      {/* eslint-disable-next-line */}
        <LinkBoxStyled href="/article/1"></LinkBoxStyled>
    </ArticleBoxStyled>
  );
};

export default ArticleBox;