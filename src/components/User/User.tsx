/**
 * @author ShiYiChuang
 * @date 2023-1-16
 */
import { FC, useEffect, useState } from "react";
import { Button, Card, Form, Input, message, Modal, Select, Table } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { ColumnsType } from "antd/lib/table";
import { PAGE_SIZE } from "../../config";
import { reqAddUser, reqUserList } from "../../api";
import {
  AddUserFormType,
  AddUserReturnType,
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
  const [isShowAdd, setIsShowAdd] = useState(false);
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
            <Button type="link">修改</Button>
            <Button
              type="link"
              onClick={() => {
                deleteUser(item);
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

  /**
   * @description 删除用户
   * @param item
   */
  const deleteUser = (item: UserType) => {
    console.log(item);
  };

  /**
   * @description 新增用户确定的回调
   */
  const handleOk = () => {
    FormRef.validateFields()
      .then(async (item: AddUserFormType) => {
        let result = (await reqAddUser(item)) as unknown as AddUserReturnType;
        const { status, data, msg } = result;
        if (status === 0) {
          message.success("添加用户成功");
          setUserList([data, ...userList]);
          FormRef.resetFields();
          setIsShowAdd(false);
        } else {
          message.error(msg);
        }
      })
      .catch(() => {
        message.error("表单输入有误,请检查!", 1);
      });
  };

  /**
   * @description 新增用户取消的回调
   */
  const handleCancel = () => {
    FormRef.resetFields();
    setIsShowAdd(false);
  };

  return (
    <>
      <Card
        title={
          <Button
            type="primary"
            onClick={() => {
              setIsShowAdd(true);
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
      {/* 添加角色模态框 */}
      <Modal
        title="新增用户"
        open={isShowAdd}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form form={FormRef} labelCol={{ md: 4 }} wrapperCol={{ md: 18 }}>
          <Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: "请输入你的用户名" },
              { min: 4, message: "用户名必须大于等于4位" },
              { max: 12, message: "用户名必须小于等于12位" },
              {
                pattern: /^\w+$/,
                message: "用户名必须是字母、数字、下划线组成",
              },
            ]}
          >
            <Input autoComplete="off" placeholder="请输入商品名称" />
          </Item>
          <Item
            label="密码"
            name="password"
            rules={[
              { required: true, message: "请输入你的密码" },
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
              placeholder="请输入商品描述"
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
    </>
  );
};

export default User;
