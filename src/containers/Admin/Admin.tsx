/**
 * @author ShiYiChuang
 * @date 2023-1-11
 */
import { connect } from "react-redux";
import { reducersType } from "../../redux/reducers";
import { Navigate, Outlet } from "react-router-dom";
import { FC } from "react";
import { createDeleteUserInfoAction } from "../../redux/actions_creators/login_action";
import { Layout } from "antd";
import Header from "./Header/Header";
import LeftNav from "./LeftNav/LeftNav";
import Modules from './css/Admin.module.less'

const { Footer, Sider, Content } = Layout;

// redux状态 start ========================================================================
const mapStateToProps = (state: reducersType) => ({
  userInfo: state.userInfo,
});
const mapDispatchToProps = { deleteUserInfo: createDeleteUserInfoAction };
type AdminProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;
// redux状态 end ==========================================================================

/**
 * @description Admin布局
 * @param props redux传入的参数
 * @constructor
 */
const Admin: FC<AdminProps> = (props: AdminProps) => {
  const { isLogin } = props.userInfo;

  //如果没有登录,跳回登录页面
  if (!isLogin) {
    return <Navigate to={"/"} />;
  }
  return (
    <Layout className={Modules.adminContainer} style={{ height: "100%" }}>
      <Sider className={Modules.s}>
        <LeftNav />
      </Sider>
      <Layout>
        <Header />
        <Content className="content">
          <Outlet />
        </Content>
        <Footer className="footer">
          推荐使用Chrome浏览器,获得最佳用户体验
        </Footer>
      </Layout>
    </Layout>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
