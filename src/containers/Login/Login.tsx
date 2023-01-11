import { FC } from "react";
import { Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { RuleObject } from "antd/lib/form";
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import logo from "../../static/images/logo.png";
import { reducersType } from "../../redux/reducers";
import { createSaveUserInfoAction } from "../../redux/actions_creators/login_action";
import { reqLogin } from "../../api";
import "./css/Login.less";
import { LoginType } from "../../type/api";

const { Item } = Form;

const mapStateToProps = (state: reducersType) => ({
  isLogin: state.userInfo.isLogin,
});
const mapDispatchToProps = { saveUserInfo: createSaveUserInfoAction };
type LoginProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const FormLogin: FC<LoginProps> = (props: LoginProps) => {
  const navigate = useNavigate();

  const onFinish = async (values: { username: string; password: string }) => {
    let result = (await reqLogin(
      values.username,
      values.password
    )) as unknown as LoginType;
    const { status, data, msg } = result;
    if (status === 0) {
      props.saveUserInfo(data);
      navigate("/admin/home", { replace: true });
    } else {
      message.warning(msg, 1);
    }
  };

  const onFinishFailed = (errorInfo: unknown) => {
    message.error("表单输入错误,请检查");
  };

  const pwdValidator = (
    rule: RuleObject,
    value: string
  ): Promise<void | unknown> | void => {
    if (!value) {
      return Promise.reject("密码必须输入");
    } else if (value.length > 12) {
      return Promise.reject("密码必须小于等于12位");
    } else if (value.length < 4) {
      return Promise.reject("密码必须大于等于4位");
    } else if (!/^\w+$/.test(value)) {
      return Promise.reject("密码必须是字母、数字、下划线组成");
    }
    return Promise.resolve();
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="Form"
    >
      <Item
        label="用户名"
        name="username"
        rules={[
          { required: true, message: "请输入你的用户名" },
          { min: 4, message: "用户名必须大于等于4位" },
          { max: 12, message: "用户名必须小于等于12位" },
          { pattern: /^\w+$/, message: "用户名必须是字母、数字、下划线组成" },
        ]}
      >
        <Input prefix={<UserOutlined />} />
      </Item>
      <Item label="密码" name="password" rules={[{ validator: pwdValidator }]}>
        <Input.Password prefix={<LockOutlined />} />
      </Item>

      <Item wrapperCol={{ offset: 0, span: 24 }}>
        <Button type="primary" htmlType="submit" className="Item_Login_Button">
          登录
        </Button>
      </Item>
    </Form>
  );
};

const Login: FC<LoginProps> = (props: LoginProps) => {
  if (props.isLogin) {
    return <Navigate to={"/admin/home"} />;
  }
  return (
    <div className="login">
      <header>
        <img src={logo} alt="" />
        <h1>商品管理系统</h1>
      </header>
      <section>
        <div className="wrapper">
          <h1>用户登录</h1>
          <FormLogin
            saveUserInfo={props.saveUserInfo}
            isLogin={props.isLogin}
          />
        </div>
      </section>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
