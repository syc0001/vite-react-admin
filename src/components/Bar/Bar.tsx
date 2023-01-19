/**
 * @author ShiYiChuang
 * @date 2023-1-19
 */
import { FC } from "react";
import ReactEchats from "echarts-for-react";

/**
 * @description 柱形图
 * @constructor
 */
const Bar: FC<unknown> = () => {
  const getOption = () => {
    return {
      grid: {
        left:"10%",
        right:"10%",
        show:true,
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
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
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

export default Bar;
