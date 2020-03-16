import React, { useCallback } from "react";
import styled from "styled-components";
import { ArticleType } from "src/type";
import { parseDateToString } from "src/components/services/parser";
import Button from "./Button";
import { Config } from "src/App";

const ArticleBoxStyled = styled.li`
  --box-height: 80px;
  --box-padding-v: 5px;

  height: var(--box-height);
  padding: var(--box-padding-v) 5px;
  background-color: white;
  display: flex;
  flex-direction: row;
  border: solid thin lightgray;
  cursor: pointer;
  &:focus, &:hover {
    opacity: 0.9;
  }
`;

const ImageBoxStyled = styled.div`
  order: 1;
  width: 30%;
  text-align: left;
  & img {
    height: calc(var(--box-height));
    width: calc(var(--box-height));
  }
`;

const TitleDateStyled = styled.div`
  order: 2;
  width: 50%;
  text-align: left;
  display: flex;
  flex-direction: column;
  & h2 {
    font-size: 1.5rem;
  }
  & h3 {
    margin-top: 4%;
    font-size: 1.2rem;
  }
`;

const ButtonStyled = styled.div`
  order: 3;
  width: 20%;
  display: flex;
  flex-direction: column;
  & button {
    margin: 5% 0;
  }
`;

type Props = {
  article: ArticleType;
  setFocusedArticle: React.Dispatch<React.SetStateAction<ArticleType>>;
}

const ArticleListBox = (props: Props) => {
  const { article, setFocusedArticle } = props;

  const handleOnClick = useCallback(() => setFocusedArticle(article), [article, setFocusedArticle]);

  const handleGoToClick = useCallback(
    () => {
      window.open(Config.host + "/article/" + article.id.toString());
    },
    [article],
  );

  const handlePublicClick = useCallback(
    () => {
      // process of making article public  
    },
    [],
  );

  return(
    <ArticleBoxStyled onClick={handleOnClick}>
      <ImageBoxStyled>
        <img src={require("../../../assets/images/space.jpg")} alt="img" />
      </ImageBoxStyled>
      <TitleDateStyled>
        <h2>{article.title}</h2>
        <h3>{parseDateToString(article.createDate)}</h3>
      </TitleDateStyled>
      <ButtonStyled>
        <Button 
          text={"Public"}
          width={"100"}
          height={"40"}
          handleOnClick={handlePublicClick} />
        <Button 
          text={"Go to"}
          width={"100"}
          height={"40"}
          handleOnClick={handleGoToClick} />
      </ButtonStyled>
    </ArticleBoxStyled>
  );
};

export default ArticleListBox;