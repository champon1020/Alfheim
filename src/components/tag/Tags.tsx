import { apiHandler } from "~/App.tsx";
import { ITag } from "~/type";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import CircleChart from "./CircleChart";
import TagList from "./TagList";

const StyledTitle = styled.div`
  color: var(--base-color);
  font-size: 3.6rem;
  margin: 1% 7% 8% 7%;
  & h2 {
    display: inline-block;
    border-bottom: solid thin gray;
  }
  @media (max-width: 800px) {
    text-align: center;
    margin: 1% auto 8% auto;
  }
`;

const StyledTags = styled.div`
  margin-bottom: 10%;
`;

const Tags = () => {
  const [tags, setTags] = useState([] as ITag[]);

  // Fetch tags.
  useEffect(() => {
    apiHandler
      .apiV3GetTagsGet()
      .then((res) => {
        setTags(res.data.tags);
      })
      .catch((err) => {});
  }, []);

  return (
    <StyledTags>
      <StyledTitle>
        <h2>Tag List</h2>
      </StyledTitle>
      <CircleChart tags={tags} />
      <TagList tags={tags} />
    </StyledTags>
  );
};

export default Tags;
