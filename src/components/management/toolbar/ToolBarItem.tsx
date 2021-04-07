import ManagementMode from "~/components/management/mode";
import React, { MouseEvent } from "react";
import styled from "styled-components";

const StyledToolBarItem = styled.li`
  display: flex;
  width: 20rem;
  padding: 2.5rem 5rem;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`;

const StyledIcon = styled.img`
  width: 30%;
  height: 5rem;
`;

const StyledItem = styled.div<{ focused: boolean }>`
  color: ${({ focused }) => (focused ? "yellow" : "white")};
  font-size: 3rem;
  width: 70%;
  line-height: 4.5rem;
  vertical-align: center;
`;

type Props = {
  mode: ManagementMode;
  icon: string;
  focused: boolean;
  focusedIcon: string;
  onClick: (e: MouseEvent<HTMLElement>) => void;
};

const ToolBarItem = (props: Props) => {
  const { mode, icon, focused, focusedIcon, onClick } = props;

  return (
    <StyledToolBarItem>
      {focused ? (
        <StyledIcon src={focusedIcon} alt="icon" />
      ) : (
        <StyledIcon src={icon} alt="icon" />
      )}
      <StyledItem id={mode} onClick={onClick} focused={focused}>
        {mode}
      </StyledItem>
    </StyledToolBarItem>
  );
};

export default ToolBarItem;
