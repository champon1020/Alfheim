import React from "react";
import { Pie } from "react-chartjs-2";
import styled from "styled-components";

const ChartBoxStyled = styled.div`
  cursor: pointer;
`;

const data = {
  labels: [
    "Red",
    "Blue",
    "Yellow"
  ],
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: [
      "#FF6384",
      "#36A2EB",
      "#FFCE56"
    ],
    hoverBackgroundColor: [
      "#FFA5B8",
      "#79BAE7",
      "#FFE39F"
    ]
  }]
};

const CircleChart = () => {
  return (
    <ChartBoxStyled>
      <Pie data={data} />
    </ChartBoxStyled>
  );
};

export default CircleChart;