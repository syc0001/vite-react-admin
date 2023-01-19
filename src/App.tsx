/**
 * @author ShiYiChuang
 * @date 2023-1-11
 */
import { FC } from "react";
import { useRoutes } from "react-router-dom";
import routers from "./routes/";
import "./App.less";

/**
 * @description 整体页面
 * @constructor
 */
const App: FC<unknown> = () => {
  /**
   * @description 获取路由表元素
   */
  const RouteElement = useRoutes(routers);
  return <>{RouteElement}</>;
};

export default App;
