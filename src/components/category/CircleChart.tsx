import React, { useMemo, useState } from "react";
import { Pie } from "react-chartjs-2";
import styled from "styled-components";
import { CategoryType } from "src/type";
import ChartDataHandler from "./ChartDataHandler";

const ChartBoxStyled = styled.div`
  cursor: pointer;
`;

type Props = {
  categories: CategoryType[];
}

const handler = new ChartDataHandler();

const CircleChart = (props: Props) => {
  const { categories } = props;
  const [height, setHeight] = useState(50);

  const data = useMemo(
    () => {
      handler.build(categories);
      return handler.getData();
    },
    [categories],
  );

  window.onresize = () => {
    if(window.innerWidth < 500) {
      setHeight(100);
      return;
    }
    if(window.innerWidth < 800) {
      setHeight(100);
      return;
    }
    setHeight(50);
  };

  return (
    <ChartBoxStyled>
      <Pie 
        data={data}
        width={100}
        height={height}
      />
    </ChartBoxStyled>
  );
};

export default CircleChart;