import { apiHandler } from "~/App";
import { Config } from "~/config";
import Cookie from "js-cookie";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const ButtonElement = styled.div`
  display: inline-block;
`;

type Props = {
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
};

const jumpToHome = () => {
  window.location.href = Config.url;
};

const SignInButton = (props: Props) => {
  const { setVerify } = props;
  const [auth2, setAuth2] = useState({} as gapi.auth2.GoogleAuth);

  const onSuccess = async (user: gapi.auth2.GoogleUser) => {
    apiHandler
      .apiV3VerifyPost()
      .then((res: any) => {
        if (res.status == 200) {
          Cookie.set("alfheim_id_token", user.getAuthResponse().id_token);
          setVerify(true);
          return;
        }
        jumpToHome();
      })
      .catch((err: any) => {
        jumpToHome();
      });
  };

  const onFailure = () => {
    jumpToHome();
  };

  useEffect(() => {
    gapi.load("auth2", function () {
      const auth = gapi.auth2.init({
        client_id: Config.clientId,
      });
      setAuth2(auth);
    });

    gapi.signin2.render("my-signin", {
      scope: "profile email",
      width: 240,
      height: 50,
      longtitle: true,
      theme: "dark",
      onsuccess: onSuccess,
      onfailure: onFailure,
    });
  }, []);

  return (
    <>
      <ButtonElement id="my-signin" />
    </>
  );
};

export default SignInButton;
