/**
 * @author ShiYiChuang
 * @date 2023-1-19
 */
import { FC } from "react";
import ReactEchats from "echarts-for-react";

/**
 * @description 折线图
 * @constructor
 */
const Line: FC<unknown> = () => {
  const getOption = () => {
    return {
      grid: {
        x: "50",
        y: "50",
        x2: "50",
        y2: "50",
        show: true,
        borderWidth: 1,
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
          showBackground: true,
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)",
          },
        },
      ],
    };
  };

  return (
    <>
      <ReactEchats option={getOption()}></ReactEchats>
    </>
  );
};

export default Line;
