import { apiHandler } from "~/App";
import { IArticle } from "~/interfaces";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import Box from "./Box";

const StyledEmptyMsg = styled.h3`
  font-size: 2rem;
  color: gray;
  margin: 5% auto 5% auto;
`;

const newArticlesNum = 5;

const Recommend: React.FC = () => {
  const [newArticles, setNewArticles] = useState([] as IArticle[]);

  const newArticleList = useMemo(() => {
    if (newArticles == undefined || newArticles.length === 0) {
      return <StyledEmptyMsg>{"No Articles"}</StyledEmptyMsg>;
    }

    const list = [] as JSX.Element[];
    newArticles.forEach((v, i) => {
      list.push(<Box article={v} key={i} />);
    });

    return list;
  }, [newArticles]);

  // Fetch new articles.
  useEffect(() => {
    apiHandler
      .apiV3GetArticlesGet({ p: 1 })
      .then((res) => {
        setNewArticles(res.articles);
      })
      .catch((err) => {
        // handle error
      });
  }, []);

  return <ul>{newArticleList}</ul>;
};

export default Recommend;
