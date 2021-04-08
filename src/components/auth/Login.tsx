import { Error } from "~/error";
import React from "react";
import styled from "styled-components";

import SignInButton from "./SignInButton";

const LoginContainer = styled.div`
  text-align: center;
`;

type Props = {
  err: Error;
  setErr: (err: Error) => void;
  setVerified: (value: boolean) => void;
};

const Login = (props: Props) => {
  const { err, setErr, setVerified } = props;

  return (
    <LoginContainer>
      <SignInButton err={err} setErr={setErr} setVerified={setVerified} />
    </LoginContainer>
  );
};

export default Login;
