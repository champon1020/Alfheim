import * as React from "react";
import { useState, useEffect } from "react";
import ax from "axios";
import styled from "styled-components";

const ArticleContentStyled = styled.article`
  width: 86%;
  margin: 90px auto 50px auto;
  font-size: 20px;
`;

const BASE_URL = "https://blog.champon.xyz/articles/";

const ArticleContent = () => {
  const [content, setContent] = useState("");
  const par = document.querySelector("#article-content");

  par?.insertAdjacentHTML("afterbegin", content);

  useEffect(() => {
    parseArticleContent();
    console.log(content);
  });

  const parseArticleContent = () => {
    const axios = ax.create();
    const url = BASE_URL + "/article1.html";
    axios.get(url)
      .then(res => {
        setContent(res.data);
      });
  };

  return(
    <ArticleContentStyled id="article-content"></ArticleContentStyled>
  );
};

export default ArticleContent;