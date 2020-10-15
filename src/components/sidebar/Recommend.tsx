import React, { useCallback, useState, useEffect } from "react";
import RecommendBox from "./RecommendBox";
import { defaultApi } from "~/App";
import { ArticleType } from "~/type";
import styled from "styled-components";

const EmptyMessage = styled.h3`
  font-size: 2rem;
  color: gray;
  margin: 5% auto 5% auto;
`;

const Recommend: React.FC = () => {
  const [pickupArticles, setPickupArticles] = useState([] as ArticleType[]);
  
  const fetchArticles = useCallback(
    async () => {
      const res = await defaultApi.apiFindArticlePickupGet();
      setPickupArticles(res.data.articles);
    },
    [],
  );

  const PickupList = useCallback(
    () => {
      if(pickupArticles === undefined 
        || pickupArticles === null
        || pickupArticles.length === 0){
        return (
          <EmptyMessage>
            {"No Articles"}
          </EmptyMessage>
        );
      }
      const list = [] as JSX.Element[];
      pickupArticles.forEach((v, i) => {
        list.push(
          <RecommendBox 
            article={v}
            key={i}/>
        );
      });
      return list;
    },
    [pickupArticles],
  );

  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line
  }, [])

  return (
    <ul>
      {PickupList()}
    </ul>
  );
};

export default Recommend;
