import React, { useMemo } from "react";
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
  const data = useMemo(
    () => {
      handler.build(categories);
      return handler.getData();
    },
    [categories],
  );

  return (
    <ChartBoxStyled>
      <Pie data={data} />
    </ChartBoxStyled>
  );
};

export default CircleChart;