import TabType from "~/components/management/article/tab";
import React, { MouseEvent, useCallback, useRef } from "react";
import styled from "styled-components";

const StyledTab = styled.ul`
  height: var(--management-articles-sidebar-tab-height);
  background-color: white;
  display: flex;
  justify-content: center;
`;

const StyledTabItem = styled.li<{ selected: boolean }>`
  color: ${({ selected }) => (selected ? "var(--hoverred-color)" : "white")};
  background-color: var(--base-color);
  border-right: solid thin var(--border-color);
  padding: 1rem;
  font-size: 2rem;
  text-align: center;
  width: 50%;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

type Props = {
  tab: TabType;
  setTab: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Tab = (props: Props) => {
  const { tab, setTab, setPage } = props;
  const articlesRef = useRef({} as HTMLLIElement);
  const draftsRef = useRef({} as HTMLLIElement);

  // On click listener of tab.
  // Toggle tab 'articles' or 'drafts'.
  const onClickTab = useCallback(
    (e: MouseEvent<HTMLLIElement>) => {
      if (e.currentTarget === articlesRef.current) {
        setTab("articles");
      }
      if (e.currentTarget === draftsRef.current) {
        setTab("drafts");
      }
      setPage(1);
    },
    [setTab, setPage]
  );

  return (
    <StyledTab>
      <StyledTabItem
        onClick={onClickTab}
        ref={articlesRef}
        selected={tab === "articles"}
      >
        {"articles"}
      </StyledTabItem>
      <StyledTabItem
        onClick={onClickTab}
        ref={draftsRef}
        selected={tab === "drafts"}
      >
        {"drafts"}
      </StyledTabItem>
    </StyledTab>
  );
};

export default Tab;
