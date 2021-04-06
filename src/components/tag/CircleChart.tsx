import { ITag } from "~/interfaces";
import React, { useCallback } from "react";
import { Pie } from "react-chartjs-2";
import styled from "styled-components";

import ChartDataHandler from "./ChartDataHandler";

const ChartBoxStyled = styled.div`
  cursor: pointer;
`;

type Props = {
  tags: ITag[];
};

const handler = new ChartDataHandler();

const CircleChart = (props: Props) => {
  const { tags } = props;

  // Get chart component.
  const chart = useCallback(() => {
    // undefined, null, empty check.
    if (tags == null || tags.length === 0) {
      return <div></div>;
    }

    // Build chart data and return chart component.
    handler.build(tags);

    return (
      <Pie
        data={handler.getData()}
        width={100}
        height={480}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    );
  }, [tags]);

  return <ChartBoxStyled>{chart()}</ChartBoxStyled>;
};

export default CircleChart;
