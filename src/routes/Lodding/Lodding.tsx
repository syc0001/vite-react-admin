/**
 * @author ShiYiChuang
 * @date 2023-1-19
 */
import { FC } from "react";
import Modules from "./css/Lodding.module.less";

/**
 * @description 懒加载时候显示的组件
 * @constructor
 */
const Lodding: FC<unknown> = () => {
  return (
    <div className={Modules.wrapper}>
      <h1 className={Modules.lodding}>Lodding...</h1>
    </div>
  );
};

export default Lodding;
