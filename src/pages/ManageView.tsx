import { defaultApi } from "~/api/entry";
import Login from "~/components/auth/Login";
import Articles from "~/components/manage/article/Articles";
import Editor from "~/components/manage/editor/Editor";
import Images from "~/components/manage/image/Images";
import Settings from "~/components/manage/Settings";
import ToolBar from "~/components/manage/ToolBar";
import { parseQueryParam } from "~/func";
import Cookie from "js-cookie";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";

const ManageContainerStyled = styled.div`
  min-height: 100vh;
  background-color: var(--manage-base-color);
`;

const ManageWrapperStyled = styled.div`
  width: 80%;
  margin: auto;
  @media (max-width: 1100px) {
    width: 98%;
  }
`;

type Props = RouteComponentProps<{ mode: string }>;

const ManageView: React.FC<Props> = (props) => {
  const { mode } = props.match.params;

  // If the verification is done or not.
  const [doneVerify, setDoneVerify] = useState(false);

  // If the verification is success or not.
  const [isVerify, setVerify] = useState(false);

  const childContainer = useCallback(() => {
    if (mode === "images") {
      return <Images setVerify={setVerify} />;
    }

    if (mode === "settings") {
      return <Settings />;
    }

    if (mode === "articles" || mode === "drafts") {
      return <Articles setVerify={setVerify} />;
    }

    return <Editor setVerify={setVerify} />;
  }, [mode]);

  const manageContainerView = useMemo(() => {
    // If verification has been successed.
    if (isVerify) {
      return (
        <>
          <ToolBar mode={mode} />
          <ManageWrapperStyled>{childContainer()}</ManageWrapperStyled>
        </>
      );
    }

    // If the verification has been failed, mount the login page.
    if (doneVerify) {
      Cookie.remove("alfheim_id_token");
      return <Login setVerify={setVerify} />;
    }

    return <div></div>;
  }, [childContainer, mode, isVerify, doneVerify]);

  // Verify token from cookie.
  // If verify is success, update the state of verify to true.
  useEffect(() => {
    const verify = async () => {
      try {
        const res = await defaultApi.apiVerifyTokenPost({
          headers: {
            Authorization: `Bearer ${Cookie.get("alfheim_id_token")}`,
          },
        });

        if (res.status == 200) {
          setVerify(true);
        }
      } catch (err) {
        setVerify(false);
      }

      setDoneVerify(true);
    };

    verify();
  }, []);

  return <ManageContainerStyled>{manageContainerView}</ManageContainerStyled>;
};

export default ManageView;
