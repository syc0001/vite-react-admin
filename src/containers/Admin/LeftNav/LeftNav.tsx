import { useState, FC } from "react";
import {
  ContainerOutlined,
  HomeOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  UserOutlined,
  ToolOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { SelectInfo } from "rc-menu/lib/interface";
import logo from "../../../static/images/logo.png";
import "./css/LeftNav.less";
import { useLocation, useNavigate } from "react-router-dom";
import { reducersType } from "../../../redux/reducers";
import { createSaveTitleAction } from "../../../redux/actions_creators/menu_action";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("首页", "home", <HomeOutlined />),
  getItem("商品", "prud_about", <AppstoreOutlined />, [
    getItem("商品分类管理", "category", <UnorderedListOutlined />),
    getItem("商品管理", "product", <ToolOutlined />),
  ]),
  getItem("用户管理", "user", <UserOutlined />),
  getItem("角色管理", "role", <SafetyOutlined />),
  getItem("图形图表", "echats", <ContainerOutlined />, [
    getItem("柱形图", "bar"),
    getItem("折线图", "line"),
    getItem("饼图", "pie"),
  ]),
];

const mapStateToProps = (state: reducersType) => ({});

const mapDispatchToProps = { saveTitle: createSaveTitleAction };

type LeftNavProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const LeftNav: FC<LeftNavProps> = (props: LeftNavProps) => {
  const [collapsed] = useState(false);
  const navigate = useNavigate();
  const locationArr = useLocation().pathname.split("/").slice(1).reverse();

  const chooseRouteAndSave = (params: SelectInfo) => {
    const pathName = params.keyPath.reverse().join("/");
    props.saveTitle(params.key);
    navigate(`/admin/${pathName}`, { replace: false });
  };

  return (
    <div style={{ width: "100%" }}>
      <header className="nav-header">
        <img src={logo} alt="" />
        <h1>商品管理系统</h1>
      </header>
      <Menu
        selectedKeys={[
          locationArr.includes("product") ? "product" : locationArr[0],
        ]}
        defaultOpenKeys={locationArr}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        onSelect={chooseRouteAndSave}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftNav);
