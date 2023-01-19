/**
 * @author ShiYiChuang
 * @date 2023-1-19
 */
import { FC } from "react";
import ReactEchats from "echarts-for-react";

/**
 * @description 饼图
 * @constructor
 */
const Pie: FC<unknown> = () => {
  const getOption = () => {
    // return {
    //   width: "70%",
    //   height: "90%",
    //   title: {
    //     text: "Referer of a Website",
    //     subtext: "Fake Data",
    //     left: "center",
    //   },
    //   tooltip: {
    //     trigger: "item",
    //   },
    //   legend: {
    //     orient: "vertical",
    //     left: "20%",
    //   },
    //   series: [
    //     {
    //       name: "Access From",
    //       type: "pie",
    //       radius: "92%",
    //       center: ["50%", "65%"],
    //       data: [
    //         { value: 1048, name: "Search Engine" },
    //         { value: 735, name: "Direct" },
    //         { value: 580, name: "Email" },
    //         { value: 484, name: "Union Ads" },
    //         { value: 300, name: "Video Ads" },
    //       ],
    //       emphasis: {
    //         itemStyle: {
    //           shadowBlur: 10,
    //           shadowOffsetX: 0,
    //           shadowColor: "rgba(0, 0, 0, 0.5)",
    //         },
    //       },
    //     },
    //   ],
    // };

    return {
      title: {
        text: "Referer of a Website",
        subtext: "Fake Data",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "20%",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "75%",
          center: ["50%", "55%"],
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
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

export default Pie;
