import { ITag } from "~/type";
import React, { useMemo } from "react";
import styled from "styled-components";

const StyledTags = styled.ul`
  margin-top: 3%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  & li {
    margin-right: 7px;
    font-size: 1.6rem;
    padding: 1px 5px;
    color: brown;
    border: solid 1px brown;
    @media (max-width: 500px) {
      font-size: 1.4rem;
    }
  }
`;

interface Props {
  tags: ITag[];
}

const Tags = (props: Props) => {
  const { tags } = props;

  const tagList = useMemo(() => {
    const list = [] as JSX.Element[];
    if (tags == undefined) {
      return list;
    }

    tags.forEach((v, i) => {
      list.push(<li key={i}>{v.name}</li>);
    });

    return list;
  }, [tags]);

  return <StyledTags>{tagList}</StyledTags>;
};

export default Tags;
