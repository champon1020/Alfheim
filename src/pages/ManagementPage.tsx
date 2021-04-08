import RightIcon from "~/assets/images/icons/right.svg";
import Login from "~/components/auth/Login";
import Header from "~/components/common/header/Header";
import ErrorBoundary from "~/components/error/ErrorBoundary";
import Articles from "~/components/management/article/Articles";
import Editor from "~/components/management/editor/Editor";
import ErrorModal from "~/components/management/error/ErrorModal";
import Images from "~/components/management/image/Images";
import ManagementMode, {
  ManagementArticlesMode,
  ManagementDraftsMode,
  ManagementImagesMode,
  ManagementWriteMode,
} from "~/components/management/mode";
import ToolBar from "~/components/management/toolbar/ToolBar";
import { Error } from "~/error";
import { apiHandlerWithToken } from "~/util/api";
import { parseQueryParam } from "~/util/util";
import Cookie from "js-cookie";
import React, { useEffect, useMemo, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";

const StyledContainer = styled.div`
  max-height: 100vh;
  background-color: white;
`;

const StyledMenu = styled.div`
  position: absolute;
  z-index: 2;
  left: 1rem;
  top: 7rem;
  width: 3rem;
  height: 3rem;
  border-radius: 5rem;
  padding: 1rem;
  text-align: center;
  background-color: var(--base-color);
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

const StyledWrapper = styled.div`
  width: 80%;
  margin: 7rem auto 0 auto;
  @media (max-width: 1100px) {
    width: 98%;
  }
`;

type Props = RouteComponentProps<{ mode: ManagementMode }>;

const ManagementPage: React.FC<Props> = (props) => {
  const { mode } = props.match.params;

  const [err, setErr] = useState<Error>(null);
  const [doneVerify, setDoneVerify] = useState(false);

  const [isVerified, setVerified] = useState(false);

  const [isToolBar, setToolBar] = useState(false);

  const childContainer = useMemo(() => {
    if (mode === ManagementWriteMode) {
      return <Editor setErr={setErr} setVerified={setVerified} />;
    }
    if (mode === ManagementImagesMode) {
      return <Images setErr={setErr} setVerified={setVerified} />;
    }
    if (mode === ManagementArticlesMode || mode === ManagementDraftsMode) {
      return <Articles setErr={setErr} setVerified={setVerified} />;
    }
    return <div></div>;
  }, [mode]);

  const handleOnClickMenu = () => {
    setToolBar(!isToolBar);
  };

  const managementContainerView = useMemo(() => {
    if (isVerified) {
      return (
        <>
          <ToolBar mode={mode} isToolBar={isToolBar} setToolBar={setToolBar} />
          <StyledWrapper>{childContainer}</StyledWrapper>
        </>
      );
    }
    if (doneVerify) {
      Cookie.remove("alfheim_id_token");
      return <Login err={err} setErr={setErr} setVerified={setVerified} />;
    }
    return <div></div>;
  }, [childContainer, mode, err, isVerified, doneVerify, isToolBar]);

  useEffect(() => {
    apiHandlerWithToken()
      .apiV3PrivateVerifyPost()
      .then((res: any) => {
        setVerified(true);
      })
      .catch((err: Response) => {
        setDoneVerify(true);
      });
  }, []);

  return (
    <ErrorBoundary>
      <header>
        <Header />
      </header>
      <StyledContainer>{managementContainerView}</StyledContainer>
      <StyledMenu onClick={handleOnClickMenu}>
        <img src={RightIcon} alt="menu" />
      </StyledMenu>
      <ErrorModal hidden={err == null} err={err} setErr={setErr} />
    </ErrorBoundary>
  );
};

export default ManagementPage;
