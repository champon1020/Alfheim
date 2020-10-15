import React, { useState, useCallback } from "react";
import Header from "~/components/common/Header";
import styled from "styled-components";
import ErrorImage from "~/assets/images/base_error.jpg";
import Footer from "~/components/common/Footer";

const Container = styled.div`
  min-height: 95vh;
  height: 100%;
`;

const Content = styled.div`
  background-color: white;
  margin: 10rem auto 0 auto;
  text-align: center;
  height: calc(100vh - 6rem - 10rem - 13vh);
  color: brown;
`;

const Image = styled.img<{width: number}>`
  width: ${({width}) => `${Math.min(100, 123.65 - 0.0473 * width) + "%"}`};
`;

const Title = styled.h1`
  margin-top: -5%;
  font-size: 4rem;
  @media (max-width: 1400px){
    margin-top: -10%;
    font-size: 4rem;
  }
  @media (max-width: 650px){
    font-size: 3rem;
  }
  @media (max-width: 500px){
    font-size: 2rem;
  }
`;

const Desc = styled.h2<{top: number; fontSize: number}>`
  margin-top: ${({top}) => top+"%"};
  font-size: ${({fontSize}) => fontSize+"rem"};
  @media (max-width: 800px){
    font-size: 3rem;
  }
  @media (max-width: 650px){
    font-size: 2rem;
  }
`;

const Info = styled.div`
  margin: 2% auto 0 auto;
  color: gray;
  display: block;
  width: fit-content;
  font-size: 1.2rem;
  @media (max-width: 650px){
    font-size: 1rem;
  }
  & a {
    color: gray;
  }
`;

const ErrorPage = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleOnResize = useCallback(
    () => {
      setWidth(window.innerWidth);
    },
    [],
  );

  return (
    <Container>
      <header>
        <Header 
          onResizeHandler={handleOnResize} />
      </header>
      <Content>
        <Image 
          src={ErrorImage} 
          width={width}/>
        <Title>{"I'm sorry, this page is no available now."}</Title>
        <Desc
          top={2}
          fontSize={3.5}>
          {"Please try again later."}
        </Desc>
        <Info>
          {"The picture is by "}
          <a href="https://pixabay.com/ja/users/steinchen-21981/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=261888">
            {"Gaby Stein"}
          </a>{" from "}
          <a href="https://pixabay.com/ja/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=261888">
            {" Pixabay"}
          </a>
        </Info>
      </Content>
      <footer>
        <Footer />
      </footer>
    </Container>
  );
};

export default ErrorPage;
