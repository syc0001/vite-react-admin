/**
 * @author ShiYiChuang
 * @date 2023-1-11
 */
import { lazy, Suspense } from "react";
import { Navigate, RouteObject } from "react-router-dom";

import Bar from "../components/Bar/Bar";
import Category from "../containers/Category/Category";
import Home from "../components/Home/Home";
import Line from "../components/Line/Line";
import Pie from "../components/Pie/Pie";
import AddUpdate from "../containers/Product/AddUpdate/AddUpdate";
import Detail from "../containers/Product/Detail/Detail";
import Product from "../containers/Product/Product";
import Role from "../components/Role/Role";
import User from "../components/User/User";
import Admin from "../containers/Admin/Admin";
import Login from "../containers/Login/Login";

// const Bar = lazy(() => import("../components/Bar/Bar"));
// const Category = lazy(() => import("../containers/Category/Category"));
// const Home = lazy(() => import("../components/Home/Home"));
// const Line = lazy(() => import("../components/Line/Line"));
// const Pie = lazy(() => import("../components/Pie/Pie"));
// const AddUpdate = lazy(
//   () => import("../containers/Product/AddUpdate/AddUpdate")
// );
// const Detail = lazy(() => import("../containers/Product/Detail/Detail"));
// const Product = lazy(() => import("../containers/Product/Product"));
// const Role = lazy(() => import("../components/Role/Role"));
// const User = lazy(() => import("../components/User/User"));
// const Admin = lazy(() => import("../containers/Admin/Admin"));
// const Login = lazy(() => import("../containers/Login/Login"));

/**
 * @description 路由表
 */
const routers: RouteObject[] = [
  {
    path: "/login",
    element: (
      // <Suspense fallback={<div>Loading</div>}>
      <Login />
      // </Suspense>
    ),
  },
  {
    path: "/admin",
    element: (
      // <Suspense fallback={<div>Loading</div>}>
      <Admin />
      // </Suspense>
    ),
    children: [
      {
        path: "home",
        element: (
          // <Suspense fallback={<div>Loading</div>}>
          <Home />
          // </Suspense>
        ),
      },
      {
        path: "prud_about",
        children: [
          {
            path: "category",
            element: (
              // <Suspense fallback={<div>Loading</div>}>
              <Category />
              // </Suspense>
            ),
          },
          {
            path: "product",
            element: (
              // <Suspense fallback={<div>Loading</div>}>
              <Product />
              // </Suspense>
            ),
            children: [
              {
                path: "addupdate",
                element: (
                  // <Suspense fallback={<div>Loading</div>}>
                  <AddUpdate />
                  // </Suspense>
                ),
              },
              {
                path: "addupdate/:id",
                element: (
                  // <Suspense fallback={<div>Loading</div>}>
                  <AddUpdate />
                  // </Suspense>
                ),
              },
              {
                path: "detail/:id",
                element: (
                  // <Suspense fallback={<div>Loading</div>}>
                  <Detail />
                  // </Suspense>
                ),
              },
            ],
          },
        ],
      },
      {
        path: "user",
        element: (
          // <Suspense fallback={<div>Loading</div>}>
          <User />
          // </Suspense>
        ),
      },
      {
        path: "role",
        element: (
          // <Suspense fallback={<div>Loading</div>}>
          <Role />
          // </Suspense>
        ),
      },
      {
        path: "echats",
        children: [
          {
            path: "bar",
            element: (
              // <Suspense fallback={<div>Loading</div>}>
              <Bar />
              // </Suspense>
            ),
          },
          {
            path: "line",
            element: (
              // <Suspense fallback={<div>Loading</div>}>
              <Line />
              // </Suspense>
            ),
          },
          {
            path: "pie",
            element: (
              // <Suspense fallback={<div>Loading</div>}>
              <Pie />
              // </Suspense>
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
