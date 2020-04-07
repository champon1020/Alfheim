import React, { useEffect, useCallback, useState, useRef } from "react";
import Cat from "../../assets/images/header/cat.jpg";
import Space from "../../assets/images/header/space.jpg";
import Landscape from "../../assets/images/header/landscape.jpg";
import Processor from "../../assets/images/header/processor.jpg";
import Flower from "../../assets/images/header/flower.jpg";
import Book from "../../assets/images/header/book.jpg";
import Penguin from "../../assets/images/header/penguin.jpg";
import Gtr from "../../assets/images/header/gtr.jpg";
import Delta from "../../assets/images/header/delta.jpg";
import Goku from "../../assets/images/header/goku.jpg";
import styled, { keyframes } from "styled-components";

const ImageHeaderStyled = styled.div`
  text-align: center;
  height: 40rem;
  position: relative;
`;

const fadeOut = keyframes`
  from {
    opacity: 1.0;
  }
  to {
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1.0;
  }
`;

const ImageStyled = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  &.active {
    animation: ${fadeIn} 2s ease 0s;
  }
  &.inactive {
    animation: ${fadeOut} .7s ease 0s;
  }
`;

const AuthorStyled = styled.div`
  position: relative;
  font-size: 1.1rem;
  color: lightgray;
  top: -2.5rem;
  left: 1rem;
  display: inline-block;
  & a {
    color: white;
    &:hover {
      opacity: 0.6;
    }
  }
`;

const imageList = [
  Cat,
  Space,
  Landscape,
  Processor,
  Flower,
  Book,
  Penguin,
  Gtr,
  Delta,
  Goku,
];

type Author = {
  name: string;
  id: string;
}

const authorList: Author[] = [
  {name: "Quang Nguyen Vieh",id: "quangpraha"},
  {name: "skeeze",id: "skeeze"},
  {name: "enriquelopezgarre",id: "enriquelopezgarre"},
  {name: "Monoar Rahman Rony",id: "monoar_cgi_artis"},
  {name: "Selling of my photos with StockAgencies is not permitted", id: "DreamyArt"},
  {name: "Jess Watters", id: "PlushDesignStudio"},
  {name: "Capri23auto", id: "Capri23auto"},
  {name: "Toby Parsons", id: "Toby_Parsons"},
  {name: "WikiImages", id: "WikiImages"},
  {name: "fernando zhiminaicela", id: "fernandozhiminaicela"}
];

const duration = 12000;

const ImageHeader = () => {
  const initCur = Math.round(Math.random()*(authorList.length-1));

  const [img, setImg] = useState(imageList[initCur]);
  const [author, setAuthor] = useState(authorList[initCur]);
  const imageRef = useRef({} as HTMLImageElement);

  const updateImage = useCallback(
    (num: number) => {
      if(imageRef === null) return;
      setTimeout(() => {
        imageRef.current.classList.remove("inactive");
        imageRef.current.classList.add("active");
        const cur = num % imageList.length;
        setImg(imageList[cur]);
        setAuthor(authorList[cur]);
        updateImage(num+1);
      }, duration);

      setTimeout(() => {
        imageRef.current.classList.remove("active");
        imageRef.current.classList.add("inactive");
      }, duration-600);
    },
    [],
  );

  useEffect(() => {
    updateImage(1);
    // eslint-disable-next-line
  }, []);

  return(
    <ImageHeaderStyled>
      <ImageStyled 
        src={img}
        ref={imageRef}
        alt="header"/>
      <AuthorStyled>
        <a href={"https://pixabay.com/ja/users/" + author.id}>
          {author.name}
        </a>
        {" による "}
        <a href="https://pixabay.com/ja/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image">
          {"Pixabay"}
        </a>
        {" からの画像 "}
      </AuthorStyled>
    </ImageHeaderStyled>
  );
};

export default ImageHeader;