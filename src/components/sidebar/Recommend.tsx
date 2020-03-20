import React, { useCallback, useState, useEffect } from "react";
import RecommendBox from "./RecommendBox";
import { defaultApi } from "src/App";
import { ArticleType } from "src/type";

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
    (): JSX.Element[] => {
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