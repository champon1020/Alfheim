import { defaultApi } from "~/App";
import { ArticleType } from "~/type";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import RecommendBox from "./RecommendBox";

const EmptyMessage = styled.h3`
  font-size: 2rem;
  color: gray;
  margin: 5% auto 5% auto;
`;

const newArticlesNum = 5;

const Recommend: React.FC = () => {
  const [newArticles, setNewArticles] = useState([] as ArticleType[]);

  const NewArticlesList = useCallback(() => {
    if (
      newArticles === undefined ||
      newArticles === null ||
      newArticles.length === 0
    ) {
      return <EmptyMessage>{"No Articles"}</EmptyMessage>;
    }

    const list = [] as JSX.Element[];
    newArticles.forEach((v, i) => {
      list.push(<RecommendBox article={v} key={i} />);
    });

    return list;
  }, [newArticles]);

  // Fetch new articles.
  useEffect(() => {
    defaultApi.apiFindArticle(1, newArticlesNum).then((res) => {
      setNewArticles(res.data.articles);
    });
  }, []);

  return <ul>{NewArticleList()}</ul>;
};

export default Recommend;
