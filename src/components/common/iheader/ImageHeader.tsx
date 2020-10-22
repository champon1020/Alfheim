import Book from "~/assets/images/header/book.jpg";
import Cat from "~/assets/images/header/cat.jpg";
import Delta from "~/assets/images/header/delta.jpg";
import Flower from "~/assets/images/header/flower.jpg";
import Goku from "~/assets/images/header/goku.jpg";
import Gtr from "~/assets/images/header/gtr.jpg";
import Landscape from "~/assets/images/header/landscape.jpg";
import Penguin from "~/assets/images/header/penguin.jpg";
import Processor from "~/assets/images/header/processor.jpg";
import Space from "~/assets/images/header/space.jpg";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import Author from "./Author";
import Image from "./Image";

const StyledImageHeader = styled.div`
  text-align: center;
  height: 40rem;
  position: relative;
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

const authorList: { name: string; id: string }[] = [
  { name: "Quang Nguyen Vieh", id: "quangpraha" },
  { name: "skeeze", id: "skeeze" },
  { name: "enriquelopezgarre", id: "enriquelopezgarre" },
  { name: "Monoar Rahman Rony", id: "monoar_cgi_artis" },
  {
    name: "Selling of my photos with StockAgencies is not permitted",
    id: "DreamyArt",
  },
  { name: "Jess Watters", id: "PlushDesignStudio" },
  { name: "Capri23auto", id: "Capri23auto" },
  { name: "Toby Parsons", id: "Toby_Parsons" },
  { name: "WikiImages", id: "WikiImages" },
  { name: "fernando zhiminaicela", id: "fernandozhiminaicela" },
];

const duration = 12000;

const ImageHeader = () => {
  const [cur, setCur] = useState(
    Math.round(Math.random() * (authorList.length - 1))
  );

  useEffect(() => {
    setTimeout(() => {
      const nextCur = (cur + 1) % imageList.length;
      setCur(nextCur);
    }, duration);
  }, [cur]);

  return (
    <StyledImageHeader>
      <Image src={imageList[cur]} />
      <Author id={authorList[cur].id} name={authorList[cur].name} />
    </StyledImageHeader>
  );
};

export default ImageHeader;
