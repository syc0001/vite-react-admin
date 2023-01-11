import { FC } from "react";
import { useRoutes } from "react-router-dom";
import routers from "./routes/";
import "./App.less";

const App: FC<unknown> = () => {
  const RouteElement = useRoutes(routers);
  return <>{RouteElement}</>;
};

export default App;
