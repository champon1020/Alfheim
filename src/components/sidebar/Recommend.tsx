import React from "react";
import RecommendBox from "./RecommendBox";

const Recommend: React.FC = () => {
  return (
    <ul>
      <RecommendBox />
      <RecommendBox />
      <RecommendBox />
      <RecommendBox />
      <RecommendBox />
    </ul>
  );
};

export default Recommend;