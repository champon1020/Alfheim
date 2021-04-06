import TagIcon from "~/assets/images/icons/tag.svg";
import React from "react";
import styled from "styled-components";

const StyledItem = styled.li`
  display: flex;
  justify-content: center;
  margin: 0 2rem;
  color: white;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  @media (max-width: 800px) {
    margin: 1rem 13%;
    border-bottom: solid thin white;
  }
`;

const StyledIcon = styled.img`
  width: 3rem;
  margin-right: 1rem;
`;

type Props = {
  text: string;
  icon: string;
  onClick: () => void;
};

const NavItem = (props: Props) => {
  const { text, icon, onClick } = props;

  return (
    <StyledItem onClick={onClick}>
      <StyledIcon src={icon} />
      {text}
    </StyledItem>
  );
};

const onClickCategory = () => {
  window.open("/tags", "_self");
};

const NavItems = () => {
  return (
    <>
      <NavItem text="Tags" onClick={onClickCategory} icon={TagIcon} />
    </>
  );
};

export default NavItems;
