/**
 * @author ShiYiChuang
 * @date 2023-1-11
 */

/*
 * 导航菜单配置
 */
const menuList = [
  {
    title: "首页", //菜单标题名称
    key: "home", //展开的key
    path: "/admin/home", //对应的path
  },
  {
    title: "商品",
    key: "prud_about",
    path: "/admin/prud_about",
    children: [
      //子菜单列表
      {
        title: "商品分类管理",
        key: "category",
        path: "/admin/prud_about/category",
      },
      {
        title: "商品管理",
        key: "product",
        path: "/admin/prud_about/product",
      },
    ],
  },
  {
    title: "用户管理",
    key: "user",
    path: "/admin/user",
  },
  {
    title: "角色管理",
    key: "role",
    path: "/admin/role",
  },
  {
    title: "图形图表",
    key: "echats",
    path: "/admin/echats",
    children: [
      {
        title: "柱形图",
        key: "bar",
        path: "/admin/echats/bar",
      },
      {
        title: "折线图",
        key: "line",
        path: "/admin/echats/line",
      },
      {
        title: "饼图",
        key: "pie",
        path: "/admin/echats/pie",
      },
    ],
  },
];

export default menuList;
