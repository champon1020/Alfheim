import React, { useCallback, useRef, MouseEvent } from "react";
import styled from "styled-components";

const TabContainer = styled.ul`
  background-color: white;
  display: flex;
  justify-content: center;
`;

const TabElement = styled.li<{selected: boolean}>`
  background-color: ${({selected}) => `${selected ? "var(--manage-base-color);" : ""}`};
  color: ${({selected}) => `${selected ? "white" : ""}`};
  border: solid thin lightgray;
  padding: 1rem;
  font-size: 2.0rem;
  text-align: center;
  width: 50%;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

type Props = {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}

const Tab = (props: Props) => {
  const { tab, setTab } = props;
  const articlesRef = useRef({} as HTMLLIElement);
  const draftsRef = useRef({} as HTMLLIElement);
  
  const handleOnClick = useCallback(
    (e: MouseEvent<HTMLLIElement>) => {
      if(e.currentTarget === articlesRef.current) setTab("articles");
      if(e.currentTarget === draftsRef.current) setTab("drafts");
    },
    [setTab],
  );

  return (
    <TabContainer>
      <TabElement
        onClick={handleOnClick}
        ref={articlesRef} 
        selected={tab === "articles"}>
        {"articles"}
      </TabElement>
      <TabElement 
        onClick={handleOnClick}
        ref={draftsRef}
        selected={tab === "drafts"}>
        {"drafts"}
      </TabElement>
    </TabContainer>
  );
};

export default Tab;