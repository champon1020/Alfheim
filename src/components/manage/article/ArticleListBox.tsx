import * as React from "react";
import styled from "styled-components";

const ArticleBoxStyled = styled.div`
  height: 140px;
  background-color: white;
  border-radius: 10px;
  padding: 30px 30px;
  display: flex;
  flex-direction: row;
  position: relative;
  &:hover {
    opacity: 0.9;
  }
`;

const LinkStyled = styled.a`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  cursor: pointer;
  z-index: 0;
`;

const TitleStyled = styled.div`
  order: 1;
  width: 35%;
  & h2 {
    margin: 0 0 10px 0;
  }
  & .statement {
    font-size: 1.2rem;
    overflow: hidden;
    height: 100px;
    width: 90%;
    line-height: 20px;
  }
`;

const ImageBoxStyled = styled.div`
  order: 2;
  width: 20%;
  text-align: center;
  & img {
    height: 130px;
    width: 130px;
  }
`;

const DateBoxStyled = styled.div`
  order: 3;
  width: 20%;
  text-align: center;
  font-size: 2rem;
  & h3 {
    margin: 50px 0;
  }
`;

const ToggleButtonStyled = styled.div`
  order: 4;
  width: 35%;
  text-align: center;
  & button {
    width: 50%;
    height: 100%;
    font-size: 24px;
    cursor: pointer;
    position: relative;
    z-index: 1;
  }
  & button:hover {
    color: blue;
  }
`;

const ArticleListBox = () => {
  return(
    <ArticleBoxStyled>
      <TitleStyled>
        <h2>Sample Article</h2>
        <div className="statement"> 
            This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.
        </div>
      </TitleStyled>
      <ImageBoxStyled>
        <img src={require("../../../assets/images/space.jpg")} alt="img" />
      </ImageBoxStyled>
      <DateBoxStyled>
        <h3>2020-01-31</h3>
      </DateBoxStyled>
      <ToggleButtonStyled>
        <button>Display</button>
      </ToggleButtonStyled>
      
      {/* eslint-disable-next-line */}
      <LinkStyled href="##"></LinkStyled>
    </ArticleBoxStyled>
  );
};

export default ArticleListBox;