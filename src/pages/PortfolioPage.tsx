import GithubIcon from "~/assets/images/accounts/github.png";
import LinkedinIcon from "~/assets/images/accounts/linkedin.png";
import TwitterIcon from "~/assets/images/accounts/twitter.svg";
import ProfileIcon from "~/assets/images/profile.jpg";
import DockerIcon from "~/assets/images/skills/docker.png";
import EmacsIcon from "~/assets/images/skills/emacs.png";
import GcpIcon from "~/assets/images/skills/gcp.svg";
import GoIcon from "~/assets/images/skills/go.svg";
import PythonIcon from "~/assets/images/skills/python.svg";
import PytorchIcon from "~/assets/images/skills/pytorch.svg";
import ReactIcon from "~/assets/images/skills/react.svg";
import TypescriptIcon from "~/assets/images/skills/typescript.svg";
import Footer from "~/components/common/Footer";
import Header from "~/components/common/header/Header";
import Config from "~/config";
import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

const AnimRotate = keyframes`
  0% {
    transform: translatex(100%) rotate(0deg);
  }
  100% {
    transform: translatex(0) rotate(-360deg);
  }
`;

const AnimFall = keyframes`
  0% {
    transform: translatey(-700%);
    color: white;
  }
  85% {
    color: white;
  }
  100% {
    transform: translatey(0);
    color: black;
  }
`;

const AnimSlide = keyframes`
  0% {
    transform: translatex(100%);
    color: white;
  }
  85% {
    color: white;
  }
  100% {
    transform: translatex(0);
    color: black;
  }
`;

const AnimDisplay = keyframes`
  0% {
    opacity: 0;
  }
  85% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const StyledWhole = styled.div`
  animation: ${fadeIn} 1s ease 0s;
`;

const StyledContainer = styled.div`
  text-align: center;
  font-family: serif;
  margin: 10rem 10rem 0;
  overflow-x: hidden;
`;

const StyledIcon = styled.div`
  position: relative;
  text-align: center;
  img {
    border-radius: 50rem;
    width: 40rem;
    height: 40rem;
  }
  z-index: 2;
  animation: ${AnimRotate} 1.3s ease-out;
`;

const StyledName = styled.h1`
  position: relative;
  margin-top: 3rem;
  font-size: 4rem;
  font-family: serif;
  font-weight: bold;
  z-index: 1;
  animation: ${AnimFall} 1.5s ease-out;
`;

const StyledOrg = styled.h2<{ marginTop: string; fontSize: string }>`
  margin-top: ${({ marginTop }) => marginTop};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: bold;
  animation: ${AnimFall} 1.6s ease-out;
`;

const StyledTitle = styled.div`
  margin-top: 5rem;
  border-bottom: solid thin gray;
  h3 {
    font-size: 3.5rem;
    font-weight: bold;
    text-align: left;
    animation: ${AnimSlide} 2s ease-out;
  }
`;

const StyledSkillList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  animation: ${AnimDisplay} 2.5s ease-out;
`;

const StyledSkillIcon = styled.li<{ width?: string }>`
  margin: auto;
  img {
    width: ${({ width }) => (width == null ? "10rem" : width)};
  }
`;

const StyledList = styled.ul<{ marginBottom?: string }>`
  font-size: 2.5rem;
  margin-bottom: ${({ marginBottom }) =>
    marginBottom == null ? "unset" : marginBottom};
  animation: ${AnimDisplay} 2.5s ease-out;
`;

const StyledItem = styled.li`
  margin-top: 2rem;
  text-align: left;
  h3 {
    font-size: 2.5rem;
    font-weight: bold;
  }
  p {
    margin-top: 1rem;
    font-size: 2rem;
    color: #555555;
  }
`;

const StyledLinkList = styled.ul`
  display: flex;
  margin-top: 2rem;
  animation: ${AnimDisplay} 2.5s ease-out;
`;

const StyledLink = styled.li`
  margin: 0 1rem;
  cursor: pointer;
  &:hover {
    opacity: var(--hoverred-opacity);
  }
  img {
    width: 9rem;
    border-radius: 5rem;
  }
`;

const PortfolioPage = () => {
  const jumpToLink = (url: string) => {
    return () => {
      window.open(url, "_blank");
    };
  };

  return (
    <StyledWhole>
      <header>
        <Header />
      </header>
      <StyledContainer>
        <StyledIcon>
          <img src={ProfileIcon} alt="profile_icon" />
        </StyledIcon>
        <StyledName>{"Yoshiki Nagasaki"}</StyledName>
        <StyledOrg marginTop="3rem" fontSize="3rem">
          {"Keio University M1"}
        </StyledOrg>
        <StyledOrg marginTop="0" fontSize="3rem">
          {"Aoki Laboratory"}
        </StyledOrg>

        <StyledTitle>
          <h3> {"Skills"} </h3>
        </StyledTitle>
        <StyledSkillList>
          <StyledSkillIcon>
            <img src={GoIcon} />
          </StyledSkillIcon>
          <StyledSkillIcon>
            <img src={PythonIcon} />
          </StyledSkillIcon>
          <StyledSkillIcon width="5rem">
            <img src={TypescriptIcon} />
          </StyledSkillIcon>
          <StyledSkillIcon width="12rem">
            <img src={GcpIcon} />
          </StyledSkillIcon>
          <StyledSkillIcon>
            <img src={PytorchIcon} />
          </StyledSkillIcon>
          <StyledSkillIcon>
            <img src={DockerIcon} />
          </StyledSkillIcon>
          <StyledSkillIcon>
            <img src={ReactIcon} />
          </StyledSkillIcon>
          <StyledSkillIcon width="7rem">
            <img src={EmacsIcon} />
          </StyledSkillIcon>
        </StyledSkillList>

        <StyledTitle>
          <h3> {"Experiences"}</h3>{" "}
        </StyledTitle>
        <StyledList>
          <StyledItem>
            <h3>
              Nojima Infotech Internship &nbsp;&nbsp;[March 2019 - September
              2019]
            </h3>
            <p>Java</p>
          </StyledItem>
          <StyledItem>
            <h3>
              TeamLab Summer Internship &nbsp;&nbsp;[September 2019 (2 weeks)]
            </h3>
            <p>Vue, Typescript, Web</p>
          </StyledItem>
          <StyledItem>
            <h3>
              Online Summer Internship for Gophers 2020 by Mercari
              &nbsp;&nbsp;[September 2020 (5 days)]
            </h3>
            <p>Go, Static Analysis</p>
          </StyledItem>
          <StyledItem>
            <h3>
              National Institute of Advanced Industrial Science and Technology
              Research Assistant &nbsp;&nbsp;[May 2021 -]
            </h3>
            <p>Machine Learning, Computer Vision</p>
          </StyledItem>
        </StyledList>

        <StyledTitle>
          {" "}
          <h3>{"Activities"} </h3>
        </StyledTitle>
        <StyledList>
          <StyledItem>
            <h3>
              CA Tech Challenge 2222 Hackathon &nbsp;&nbsp;[February 2020 (2
              weeks)]
            </h3>
            <p>Hackathon, Typescript, React, Node</p>
          </StyledItem>
          <StyledItem>
            <h3>PG BATTLE 2020 &nbsp;&nbsp;[October 31 2020]</h3>
            <p>Programing Contest, 65th place</p>
          </StyledItem>
          <StyledItem>
            <h3>
              ICPC 2020 Asia Yokohama Regional &nbsp;&nbsp;[November 6 2020]
            </h3>
            <p>Programing Contest, 89th place</p>
          </StyledItem>
          <StyledItem>
            <h3>OpenHack U 2021 Vol.4 &nbsp;&nbsp;[March 2021 (2 weeks)]</h3>
            <p>Hackathon, Outstanding Performance Award (2nd place)</p>
          </StyledItem>
          <StyledItem>
            <h3>Abema Growth Tech ONLINE &nbsp;&nbsp;[March 13-14 2021]</h3>
            <p>Workshop</p>
          </StyledItem>
        </StyledList>

        <StyledTitle>
          {" "}
          <h3>{"Links"} </h3>
        </StyledTitle>
        <StyledLinkList>
          <StyledLink onClick={jumpToLink(Config.githubAccountLink)}>
            <img src={GithubIcon} alt="github" />
          </StyledLink>
          <StyledLink onClick={jumpToLink(Config.twitterAccountLink)}>
            <img src={TwitterIcon} alt="twitter" />
          </StyledLink>
          <StyledLink onClick={jumpToLink(Config.linkedinAccountLink)}>
            <img src={LinkedinIcon} alt="linkedin" />
          </StyledLink>
        </StyledLinkList>

        <StyledTitle>
          <h3> {"Others"} </h3>
        </StyledTitle>
        <StyledList marginBottom="10rem">
          <StyledItem>
            <h3>AtCoder</h3>
            <p>Rate: 1169</p>
          </StyledItem>
          <StyledItem>
            <h3>Codeforces</h3>
            <p>Rate: 1679</p>
          </StyledItem>
        </StyledList>
      </StyledContainer>
      <footer>
        <Footer />
      </footer>
    </StyledWhole>
  );
};

export default PortfolioPage;
