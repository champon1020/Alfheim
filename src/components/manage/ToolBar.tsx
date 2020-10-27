import React, { MouseEvent, useCallback } from "react";
import styled from "styled-components";

const StyledToolBar = styled.div`
  height: 6rem;
  margin-bottom: 1rem;
  text-align: center;
  background-color: white;
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  list-style: none;
  padding-top: 0.3rem;
  @media (max-width: 500px) {
    padding-top: 1.1rem;
  }
`;

const StyledItem = styled.li<{ focused: boolean }>`
  background-color: ${({ focused }) =>
    focused ? "var(--manage-base-color)" : "white"};
  color: ${({ focused }) => (focused ? "white" : "var(--manage-base-color)")};
  font-size: 2.6rem;
  width: 10rem;
  padding: 1.3rem;
  border-radius: 1rem 1rem 0 0;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
  @media (max-width: 500px) {
    font-size: 2rem;
    padding: 1.3rem 0.5rem;
  }
`;

interface ParentProps {
  mode: string;
}

type Props = ParentProps;

const ToolBar: React.FC<Props> = (props) => {
  const handleOnClick = (e: MouseEvent<HTMLLIElement>) => {
    if (e.currentTarget.id === "create") {
      window.open("/manage/", "_self");
    }

    if (e.currentTarget.id === "images") {
      window.open("/manage/images", "_self");
    }

    if (e.currentTarget.id === "articles") {
      window.open("/manage/articles", "_self");
    }

    if (e.currentTarget.id === "settings") {
      window.open("/manage/settings", "_self");
    }
  };

  return (
    <StyledToolBar>
      <StyledList>
        <StyledItem
          id="create"
          focused={props.mode === undefined}
          onClick={handleOnClick}
        >
          {"create"}
        </StyledItem>
        <StyledItem
          id="images"
          focused={props.mode === "images"}
          onClick={handleOnClick}
        >
          {"images"}
        </StyledItem>
        <StyledItem
          id="articles"
          focused={props.mode === "articles"}
          onClick={handleOnClick}
        >
          {"articles"}
        </StyledItem>
        <StyledItem
          id="settings"
          focused={props.mode === "settings"}
          onClick={handleOnClick}
        >
          {"settings"}
        </StyledItem>
      </StyledList>
    </StyledToolBar>
  );
};

export default ToolBar;
