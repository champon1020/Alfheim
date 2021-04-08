import Config from "~/config";
import { Error, HttpError } from "~/error";
import { apiHandlerWithToken } from "~/util/api";
import Cookie from "js-cookie";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const ButtonElement = styled.div`
  display: inline-block;
`;

type Props = {
  err: Error;
  setErr: (err: Error) => void;
  setVerified: (value: boolean) => void;
};

const jumpToHome = () => {
  window.location.href = Config.origin;
};

const SignInButton = (props: Props) => {
  const { err, setErr, setVerified } = props;

  const [auth2, setAuth2] = useState({} as gapi.auth2.GoogleAuth);

  const onSuccess = async (user: gapi.auth2.GoogleUser) => {
    apiHandlerWithToken(user.getAuthResponse().id_token)
      .apiV3PrivateVerifyPost()
      .then((res: any) => {
        Cookie.set("alfheim_id_token", user.getAuthResponse().id_token);
        setVerified(true);
      })
      .catch((err: Response) => {
        setErr(
          new HttpError(
            err.status,
            "Error was occurred. Jump to home after 3 sec automatically"
          )
        );
        setTimeout(() => {
          jumpToHome();
        }, 3000);
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
