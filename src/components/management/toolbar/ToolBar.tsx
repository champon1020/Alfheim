import ArticleFocusedIcon from "~/assets/images/icons/article_yellow.svg";
import ArticleIcon from "~/assets/images/icons/article.svg";
import ImageFocusedIcon from "~/assets/images/icons/image_yellow.svg";
import ImageIcon from "~/assets/images/icons/image.svg";
import LeftIcon from "~/assets/images/icons/left.svg";
import WriteFocusedIcon from "~/assets/images/icons/write_yellow.svg";
import WriteIcon from "~/assets/images/icons/write.svg";
import ManagementMode, {
  ManagementArticlesMode,
  ManagementImagesMode,
  ManagementWriteMode,
} from "~/components/management/mode";
import React, { MouseEvent, useCallback } from "react";
import styled from "styled-components";

import ToolBarItem from "./ToolBarItem";

const StyledToolBar = styled.div<{ hidden: boolean }>`
  display: ${({ hidden }) => (hidden ? "hidden" : "")};
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  text-align: center;
  background-color: var(--base-color);
  z-index: 999;
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  list-style: none;
  @media (max-width: 500px) {
    padding-top: 1.1rem;
  }
`;

const StyledHidenButton = styled.div`
  height: 6rem;
  width: 6rem;
  padding: 1rem 2rem;
  cursor: pointer;
  img {
    width: 6rem;
    height: 6rem;
  }
`;

type Props = {
  mode: ManagementMode;
  isMenu: boolean;
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const ToolBar: React.FC<Props> = (props) => {
  const { mode, isMenu, setMenu } = props;

  const handleOnClick = (e: MouseEvent<HTMLLIElement>) => {
    if (e.currentTarget.id === ManagementWriteMode) {
      window.open(`/management/${ManagementWriteMode}`, "_self");
    }
    if (e.currentTarget.id === ManagementImagesMode) {
      window.open(`/management/${ManagementImagesMode}`, "_self");
    }
    if (e.currentTarget.id === ManagementArticlesMode) {
      window.open(`/management/${ManagementArticlesMode}`, "_self");
    }
  };

  const handleOnClickMenu = () => {
    setMenu(!isMenu);
  };

  return (
    <StyledToolBar hidden={!isMenu}>
      <StyledHidenButton onClick={handleOnClickMenu}>
        <img src={LeftIcon} alt="hide" />
      </StyledHidenButton>
      <StyledList>
        <ToolBarItem
          mode={ManagementWriteMode}
          icon={WriteIcon}
          focused={mode === ManagementWriteMode}
          focusedIcon={WriteFocusedIcon}
          onClick={handleOnClick}
        />
        <ToolBarItem
          mode={ManagementImagesMode}
          icon={ImageIcon}
          focused={mode === ManagementImagesMode}
          focusedIcon={ImageFocusedIcon}
          onClick={handleOnClick}
        />
        <ToolBarItem
          mode={ManagementArticlesMode}
          icon={ArticleIcon}
          focused={mode === ManagementArticlesMode}
          focusedIcon={ArticleFocusedIcon}
          onClick={handleOnClick}
        />
      </StyledList>
    </StyledToolBar>
  );
};

export default ToolBar;
