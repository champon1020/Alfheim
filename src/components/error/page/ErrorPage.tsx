import ErrorImage from "~/assets/images/base_error.jpg";
import Footer from "~/components/common/Footer";
import Header from "~/components/common/header/Header";
import React, { useCallback, useState } from "react";
import styled from "styled-components";

import Description from "./Description";
import Info from "./Info";
import Title from "./Title";

const StyledContainer = styled.div`
  min-height: 95vh;
  height: 100%;
`;

const StyledContent = styled.div`
  background-color: white;
  margin: 10rem auto 0 auto;
  text-align: center;
  height: calc(100vh - 6rem - 10rem - 13vh);
  color: brown;
`;

const StyledImage = styled.img<{ width: number }>`
  width: ${({ width }) => `${Math.min(100, 123.65 - 0.0473 * width) + "%"}`};
`;

const StyledDescription = styled.h2<{ top: number; fontSize: number }>`
  margin-top: ${({ top }) => top + "%"};
  font-size: ${({ fontSize }) => fontSize + "rem"};
  @media (max-width: 800px) {
    font-size: 3rem;
  }
  @media (max-width: 650px) {
    font-size: 2rem;
  }
`;

type Props = {
  msg: string;
  status: number;
};

const ErrorPage = (props: Props) => {
  const { msg, status } = props;

  const [width, setWidth] = useState(window.innerWidth);

  const onResize = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <StyledContainer>
      <header>
        <Header onResizeHandler={onResize} />
      </header>
      <StyledContent>
        <StyledImage src={ErrorImage} width={width} />
        <Title title={"I'm sorry, this page is not available now."} />
        <Description desc={msg} />
        <Info />
      </StyledContent>
      <footer>
        <Footer />
      </footer>
    </StyledContainer>
  );
};

export default ErrorPage;
