import { defaultApi } from "~/api/entry";
import { IArticle } from "~/type";
import React, { useCallback, useEffect, useState } from "react";
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

  const newArticleList = useCallback(() => {
    if (
      newArticles === undefined ||
      newArticles === null ||
      newArticles.length === 0
    ) {
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
    const fetchNewArticles = async () => {
      try {
        const res = await defaultApi.apiFindArticleListGet(1, newArticlesNum);
        setNewArticles(res.data.articles);
      } catch (err) {
        // handle error
      }
    };

    fetchNewArticles();
  }, []);

  return <ul>{newArticleList()}</ul>;
};

export default Recommend;
