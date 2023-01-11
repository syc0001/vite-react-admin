import { connect } from "react-redux";
import { reducersType } from "../../redux/reducers";
import { Navigate, Outlet } from "react-router-dom";
import { FC } from "react";
import { createDeleteUserInfoAction } from "../../redux/actions_creators/login_action";
import { Layout } from "antd";
import "./css/Admin.less";
import Header from "./Header/Header";
import LeftNav from "./LeftNav/LeftNav";

const { Footer, Sider, Content } = Layout;

const mapStateToProps = (state: reducersType) => ({
  userInfo: state.userInfo,
});
const mapDispatchToProps = { deleteUserInfo: createDeleteUserInfoAction };
type AdminProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const Admin: FC<AdminProps> = (props: AdminProps) => {
  const { isLogin } = props.userInfo;

  if (!isLogin) {
    return <Navigate to={"/"} />;
  }
  return (
    <Layout className="admin-container" style={{ height: "100%" }}>
      <Sider className="sider">
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
