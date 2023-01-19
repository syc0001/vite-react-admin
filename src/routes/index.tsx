/**
 * @author ShiYiChuang
 * @date 2023-1-11
 */
import { lazy, Suspense } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import Lodding from "./Lodding/Lodding";

// import Bar from "../components/Bar/Bar";
// import Category from "../containers/Category/Category";
// import Home from "../components/Home/Home";
// import Line from "../components/Line/Line";
// import Pie from "../components/Pie/Pie";
// import AddUpdate from "../containers/Product/AddUpdate/AddUpdate";
// import Detail from "../containers/Product/Detail/Detail";
// import Product from "../containers/Product/Product";
// import Role from "../containers/Role/Role";
// import User from "../components/User/User";
// import Admin from "../containers/Admin/Admin";
// import Login from "../containers/Login/Login";

const Bar = lazy(() => import("../components/Bar/Bar"));
const Category = lazy(() => import("../containers/Category/Category"));
const Home = lazy(() => import("../components/Home/Home"));
const Line = lazy(() => import("../components/Line/Line"));
const Pie = lazy(() => import("../components/Pie/Pie"));
const AddUpdate = lazy(
  () => import("../containers/Product/AddUpdate/AddUpdate")
);
const Detail = lazy(() => import("../containers/Product/Detail/Detail"));
const Product = lazy(() => import("../containers/Product/Product"));
const Role = lazy(() => import("../containers/Role/Role"));
const User = lazy(() => import("../components/User/User"));
const Admin = lazy(() => import("../containers/Admin/Admin"));
const Login = lazy(() => import("../containers/Login/Login"));

/**
 * @description 路由表
 */
const routers: RouteObject[] = [
  {
    path: "/login",
    element: (
      <Suspense fallback={<Lodding />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={<Lodding />}>
        <Admin />
      </Suspense>
    ),
    children: [
      {
        path: "home",
        element: (
          <Suspense fallback={<Lodding />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "prud_about",
        children: [
          {
            path: "category",
            element: (
              <Suspense fallback={<Lodding />}>
                <Category />
              </Suspense>
            ),
          },
          {
            path: "product",
            element: (
              <Suspense fallback={<Lodding />}>
                <Product />
              </Suspense>
            ),
            children: [
              {
                path: "detail/:id",
                element: (
                  <Suspense fallback={<Lodding />}>
                    <Detail />
                  </Suspense>
                ),
              },
            ],
          },
          /**
           * 此处不放入product的子组件的原因:
           * 需要在添加和更新产品信息之后,回来重新获取产品列表,子组件做不到这一点
           */
          {
            path: "product/addupdate",
            element: (
              <Suspense fallback={<Lodding />}>
                <AddUpdate />
              </Suspense>
            ),
          },
          {
            path: "product/addupdate/:id",
            element: (
              <Suspense fallback={<Lodding />}>
                <AddUpdate />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "user",
        element: (
          <Suspense fallback={<Lodding />}>
            <User />
          </Suspense>
        ),
      },
      {
        path: "role",
        element: (
          <Suspense fallback={<Lodding />}>
            <Role />
          </Suspense>
        ),
      },
      {
        path: "echats",
        children: [
          {
            path: "bar",
            element: (
              <Suspense fallback={<Lodding />}>
                <Bar />
              </Suspense>
            ),
          },
          {
            path: "line",
            element: (
              <Suspense fallback={<Lodding />}>
                <Line />
              </Suspense>
            ),
          },
          {
            path: "pie",
            element: (
              <Suspense fallback={<Lodding />}>
                <Pie />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
];

export default routers;
