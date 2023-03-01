/**
 * @author ShiYiChuang
 * @date 2023-1-11
 */
import { useState, FC } from "react";
import {
  ContainerOutlined,
  HomeOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  UserOutlined,
  ToolOutlined,
  SafetyOutlined,
  PieChartOutlined,
  LineChartOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { SelectInfo } from "rc-menu/lib/interface";
import logo from "../../../static/images/logo.png";
import { reducersType } from "../../../redux/reducers";
import { createSaveTitleAction } from "../../../redux/actions_creators/menu_action";
import Modules from "./css/LeftNav.module.less";

type MyMenuItem = {
  label: React.ReactNode;
  key: string;
  icon?: React.ReactNode;
  children?: MyMenuItem[];
  type?: "group";
};

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MyMenuItem[],
  type?: "group"
): MyMenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MyMenuItem;
}

/**
 * 自定义Item映射
 */
const ItemsMap = {
  home: getItem("首页", "home", <HomeOutlined />),
  prud_about: getItem("商品", "prud_about", <AppstoreOutlined />, [
    getItem("分类管理", "category", <UnorderedListOutlined />),
    getItem("商品管理", "product", <ToolOutlined />),
  ]),
  user: getItem("用户管理", "user", <UserOutlined />),
  role: getItem("角色管理", "role", <SafetyOutlined />),
  echats: getItem("图形图表", "echats", <ContainerOutlined />, [
    getItem("柱形图", "bar", <BarChartOutlined />),
    getItem("折线图", "line", <LineChartOutlined />),
    getItem("饼图", "pie", <PieChartOutlined />),
  ]),
};

// let items: MyMenuItem[] = [];

// redux状态 start ========================================================================
const mapStateToProps = (state: reducersType) => ({ userInfo: state.userInfo });
const mapDispatchToProps = { saveTitle: createSaveTitleAction };
type LeftNavProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;
// redux状态 end ==========================================================================

/**
 * @description 左侧导航栏
 * @param {LeftNavProps} props redux传入的参数
 * @constructor
 */
const LeftNav: FC<LeftNavProps> = (props: LeftNavProps) => {
  const navigate = useNavigate();
  const locationArr = useLocation().pathname.split("/").slice(1).reverse();
  //是否是第一次加载
  const [isOne, setIsOne] = useState(true);
  const [items, setItems] = useState<MyMenuItem[]>([]);

  //如果用户是admin,遍历所有项加入到列表中,不是就按照允许的菜单遍历
  if (props.userInfo.user.username === "admin" && isOne) {
    let newItems: MyMenuItem[] = [];
    let key: keyof typeof ItemsMap;
    for (key in ItemsMap) {
      newItems.push(ItemsMap[key]);
    }
    setItems(newItems);
    setIsOne(false);
  } else if (props.userInfo.user.username !== "admin" && isOne) {
    const set = new Set([...props.userInfo.user.role.menus]);
    let newItems: MyMenuItem[] = [];
    let key: keyof typeof ItemsMap;
    for (key in ItemsMap) {
      if (ItemsMap[key].children) {
        let tmp = { ...ItemsMap[key] };
        tmp.children = ItemsMap[key].children?.filter((item) => {
          return set.has(item.key);
        });
        newItems.push(tmp);
      } else if (set.has(ItemsMap[key].key)) {
        newItems.push(ItemsMap[key]);
      }
    }
    setItems(newItems);
    setIsOne(false);
  }

  /**
   * @description 选择并且保存当前路径
   * @param {SelectInfo} route 当前路径
   */
  const chooseRouteAndSave = (route: SelectInfo) => {
    const pathName = route.keyPath.reverse().join("/");
    props.saveTitle(route.key);
    navigate(`/admin/${pathName}`, { replace: false });
  };
  console.log("locationArr:", locationArr);
  return (
    <div style={{ width: "100%" }}>
      <header className={Modules.navHeader}>
        <img src={logo} alt="" />
        <h1>商品管理系统</h1>
      </header>
      <Menu
        selectedKeys={[
          locationArr.includes("product") ? "product" : locationArr[0],
          //确保商品管理子界面中导航条是选中的状态
        ]} 
        defaultOpenKeys={locationArr}
        mode="inline"
        theme="dark"
        items={items}
        onSelect={chooseRouteAndSave}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftNav);
