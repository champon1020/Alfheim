import React from "react";
import styled from "styled-components";
import SignInButton from "./SignInButton";

const LoginContainer = styled.div`
  text-align: center;
`;

const Login = () => {
  return (
    <LoginContainer>
      <SignInButton />
    </LoginContainer>
  );
};

export default Login;