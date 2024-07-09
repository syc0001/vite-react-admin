/**
 * @author ShiYiChuang
 * @date 2023-1-16
 */
import { FC, useEffect, useState } from "react";
import { Button, Card, Form, Input, message, Modal, Select, Table } from "antd";
import {
  ExclamationCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { ColumnsType } from "antd/lib/table";
import { PAGE_SIZE } from "../../config";
import {
  reqAddUser,
  reqDeleteUser,
  reqUpdateUser,
  reqUserList,
} from "../../api";
import {
  AddUserFormType,
  AddUserReturnType,
  DeleteUserReturnType,
  UpdateUserReturnType,
  UserListReturnType,
  UserType,
} from "../../type/User";
import { RoleType } from "../../type/Role";

const { Item, useForm } = Form;
const { Option } = Select;

/**
 * @description 用户管理
 * @constructor
 */
const User: FC<unknown> = () => {
  const [isShowModel, setIsShowModel] = useState(false);
  const [isShowDel, setIsShowDel] = useState(false);
  const [isNewAdd, setIsNewAdd] = useState(false);
  const [user, setUser] = useState<UserType>();
  const [userList, setUserList] = useState<UserType[]>([]);
  const [roleList, setRoleList] = useState<RoleType[]>([]);
  /**
   * 通过FormRef控制表单
   */
  const [FormRef] = useForm();

  /**
   * Table的行
   */
  const columns: ColumnsType<{}> = [
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "电话",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "注册时间",
      dataIndex: "create_time",
      key: "create_time",
      render: (time: string) => {
        if (time) {
          return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
        }
        return time;
      },
    },
    {
      title: "所属角色",
      dataIndex: "role_id",
      key: "role_id",
      render: (id: string) => {
        let result = roleList.find((item) => {
          return item._id === id;
        });
        if (result) {
          return result.name;
        }
      },
    },
    {
      title: "操作",
      key: "operator",
      render: (item: UserType) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                setUser(item);
                setIsShowModel(true);
                setIsNewAdd(false);
              }}
            >
              修改
            </Button>
            <Button
              type="link"
              onClick={() => {
                setUser(item);
                setIsShowDel(true);
              }}
            >
              删除
            </Button>
          </>
        );
      },
      width: "25%",
      align: "center",
    },
  ];

  /**
   * @description 组件挂载的时候获取用户列表
   */
  useEffect(() => {
    getUserList();
  }, []);

  useEffect(() => {
    FormRef.resetFields();
  }, [user]);

  /**
   * @description 获取用户列表
   */
  const getUserList = async () => {
    let result = (await reqUserList()) as unknown as UserListReturnType;
    const { status, data, msg } = result;
    if (status === 0) {
      setUserList(data.users.reverse());
      setRoleList(data.roles);
    } else {
      message.error(msg);
    }
  };

  const addAndUpdateUserOk = () => {
    if (isNewAdd) {
      // add
      FormRef.validateFields()
        .then(async (item: AddUserFormType) => {
          let result = (await reqAddUser(item)) as unknown as AddUserReturnType;
          const { status, data, msg } = result;
          if (status === 0) {
            message.success("添加用户成功");
            setUserList([data, ...userList]);
            FormRef.resetFields();
          } else {
            message.error(msg);
          }
          setIsShowModel(false);
        })
        .catch(() => {
          message.error("表单输入有误,请检查!", 1);
        });
    } else {
      // update
      let tmp_user = {
        _id: user!._id,
        username: user!.username,
        phone: user!.phone,
        email: user!.email,
        role_id: user!.role_id,
        create_time: user!.create_time,
        __v: user!.__v,
      } as UserType;
      FormRef.validateFields().then(async (item: UserType) => {
        const commonKeys = ["username", "phone", "email", "role_id"];
        if (item.password !== undefined) {
          tmp_user["password"] = item.password;
        }
        for (const key of commonKeys) {
          (tmp_user as any)[key] = (item as any)[key];
        }
        let result = (await reqUpdateUser(
          tmp_user
        )) as unknown as UpdateUserReturnType;
        const { status, msg } = result;
        if (status === 0) {
          message.success("修改成功");
        } else {
          message.error(msg);
        }
        setIsShowModel(false);
        getUserList();
      });
    }
  };

  const addAndUpdateUserCancel = () => {
    setIsShowModel(false);
  };

  /**
   * @description 删除用户确定的回调
   */
  const deleteUserOk = async () => {
    let result = (await reqDeleteUser(
      user!._id
    )) as unknown as DeleteUserReturnType;
    const { status } = result;
    if (status === 0) {
      message.success("删除成功", 2);
      getUserList();
    } else {
      message.error("删除失败", 2);
    }
    setIsShowDel(false);
  };

  /**
   * @description 删除用户取消的回调
   */
  const deleteUserCancel = () => {
    setIsShowDel(false);
  };

  return (
    <>
      <Card
        title={
          <Button
            type="primary"
            onClick={() => {
              setUser(undefined);
              setIsShowModel(true);
              setIsNewAdd(true);
            }}
          >
            <PlusCircleOutlined></PlusCircleOutlined>
            新增用户
          </Button>
        }
        style={{ width: "100%" }}
      >
        <Table
          dataSource={userList}
          columns={columns}
          bordered
          pagination={{
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
          }}
          rowKey="_id"
        />
      </Card>
      {/* 添加和修改角色模态框 */}
      <Modal
        forceRender
        title={isNewAdd ? "新增用户" : "修改用户"}
        open={isShowModel}
        onOk={addAndUpdateUserOk}
        onCancel={addAndUpdateUserCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form
          form={FormRef}
          labelCol={{ md: 4 }}
          wrapperCol={{ md: 18 }}
          initialValues={{
            username: user?.username,
            email: user?.email,
            phone: user?.phone,
            role_id: user?.role_id,
          }}
        >
          <Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入你的用户名" }]}
          >
            <Input autoComplete="off" placeholder="请输入用户名" />
          </Item>
          <Item
            label="密码"
            name="password"
            rules={[
              { required: isNewAdd, message: "请输入你的密码" },
              { min: 4, message: "密码必须大于等于4位" },
              { max: 12, message: "密码必须小于等于12位" },
              {
                pattern: /^\w+$/,
                message: "密码必须是字母、数字、下划线组成",
              },
            ]}
          >
            <Input
              type={"password"}
              autoComplete="off"
              placeholder={
                isNewAdd ? "请输入密码" : "如果不修改密码, 请保持为空"
              }
            />
          </Item>
          <Item label="邮箱" name="email">
            <Input autoComplete="off" placeholder="请输入邮箱" />
          </Item>
          <Item label="电话" name="phone">
            <Input autoComplete="off" placeholder="请输入电话" />
          </Item>
          <Item
            label="角色"
            name="role_id"
            rules={[{ required: true, message: "请选择一个角色" }]}
          >
            <Select allowClear placeholder={"请选择一个角色"}>
              {roleList.map((role) => (
                <Option key={role._id} value={role._id}>
                  {role.name}
                </Option>
              ))}
            </Select>
          </Item>
        </Form>
      </Modal>
      {/* 删除角色模态框 */}
      <Modal
        title={
          <>
            <ExclamationCircleOutlined /> &nbsp; 确认删除用户吗?
          </>
        }
        open={isShowDel}
        onOk={deleteUserOk}
        onCancel={deleteUserCancel}
        okText="确认"
        cancelText="取消"
      ></Modal>
    </>
  );
};

export default User;
