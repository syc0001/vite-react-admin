/**
 * @author ShiYiChuang
 * @date 2023-1-16
 */
import { FC, Key, useEffect, useState } from "react";
import { Button, Card, Form, Input, message, Modal, Table, Tree } from "antd";
import {
  ExclamationCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { ColumnsType } from "antd/lib/table";
import {
  AddRoleReturnType,
  RoleReturnType,
  RoleType,
  AuthRoleReturnType,
  AuthRoleType,
  DeleteRoleReturnType,
} from "../../type/Role";
import { reqAddRole, reqAuthRole, reqDeleteRole, reqRoleList } from "../../api";
import { PAGE_SIZE } from "../../config";
import menuConfig from "../../config/menuConfig";
import { connect } from "react-redux";
import { reducersType } from "../../redux/reducers";

const { Item } = Form;

const sourceMenuList = [
  { title: "平台功能", key: "top", children: menuConfig },
];

// redux状态 start ========================================================================
const mapStateToProps = (state: reducersType) => ({
  username: state.userInfo.user.username,
});
const mapDispatchToProps = {};
type RoleProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
// redux状态 end ========================================================================

/**
 * @description 角色管理
 * @param {RoleProps} props redux传入的参数
 * @constructor
 */
const Role: FC<RoleProps> = (props) => {
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isShowDel, setIsShowDel] = useState(false);
  const [isShowAuth, setIsShowAuth] = useState(false);
  const [user, setUser] = useState<RoleType>();
  const [roleList, setRoleList] = useState<RoleType[]>([]);
  const [currentId, setCurrentId] = useState("");
  const [total, setTotal] = useState(1);
  const [curPage, setCurPage] = useState(1);

  /**
   * 设置选中复选框的树节点
   */
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  /**
   * 菜单列表
   */
  const [menuList] = useState(sourceMenuList);
  /**
   * 通过FormRef控制表单
   */
  const [FormRef] = Form.useForm();

  /**
   * @description 表格列的配置数据
   */
  const columns: ColumnsType<{}> = [
    {
      title: "角色名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "创建时间",
      dataIndex: "create_time",
      key: "create_time",
      render: (time: string) => {
        return dayjs(time).format("YYYY年 MM月DD日 HH:mm:ss");
      },
    },
    {
      title: "授权时间",
      dataIndex: "auth_time",
      key: "auth_time",
      render: (time: string) => {
        return time ? dayjs(time).format("YYYY年 MM月DD日 HH:mm:ss") : "";
      },
    },
    {
      title: "授权人",
      dataIndex: "auth_name",
      key: "auth_name",
    },
    {
      title: "操作",
      key: "option",
      render: (item: RoleType) => (
        <>
          <Button
            type="link"
            onClick={() => {
              let result = roleList.find((role) => role._id == item._id);
              if (result) {
                setCheckedKeys(result.menus);
              }
              setCurrentId(item._id);
              setIsShowAuth(true);
            }}
          >
            设置权限
          </Button>
          <Button
            type="link"
            onClick={() => {
              console.log(item);
              setUser(item);
              setIsShowDel(true);
            }}
          >
            删除
          </Button>
        </>
      ),
    },
  ];

  /**
   * @description 组件挂载时获取角色列表
   */
  useEffect(() => {
    getRoleList();
  }, []);

  /**
   * @description 获取角色列表
   */
  const getRoleList = async (
    pageNum: number = 1,
    pageSize: number = PAGE_SIZE
  ) => {
    let result = (await reqRoleList(
      pageNum,
      pageSize
    )) as unknown as RoleReturnType;
    const { status, data, msg } = result;
    if (status === 0) {
      setRoleList(data.list);
      setTotal(data.total);
    } else {
      message.error(msg);
    }
  };

  /**
   * @description 新增角色确定的回调
   */
  const handleOk = () => {
    FormRef.validateFields()
      .then(async (values: { roleName: string }) => {
        let result = (await reqAddRole(
          values.roleName
        )) as unknown as AddRoleReturnType;
        const { status, msg } = result;
        if (status === 0) {
          message.success("新增角色成功");
          getRoleList();
          setIsShowAdd(false);
        } else {
          message.error(msg);
        }
      })
      .catch(() => {
        message.error("表单输入有误,请检查", 1);
      });
  };

  /**
   * @description 新增角色取消的回调
   */
  const handleCancel = () => {
    setIsShowAdd(false);
  };

  /**
   * @description 权限提示框确定的回调
   */
  const handleAuthOkModal = async () => {
    let roleObj: AuthRoleType = {
      _id: currentId,
      menus: checkedKeys,
      auth_name: props.username,
      auth_time: Date.now(),
    };
    let result = (await reqAuthRole(roleObj)) as unknown as AuthRoleReturnType;
    const { status, msg } = result;
    if (status === 0) {
      message.success("授权成功", 1);
      getRoleList(curPage);
    } else {
      message.error(msg);
    }
    setIsShowAuth(false);
  };

  /**
   * @description 权限提示框取消的回调
   */
  const handleAuthCancelModal = () => {
    setIsShowAuth(false);
  };

  /**
   * @description 点击复选框触发的回调
   * @param {Key[] | { checked: Key[]; halfChecked: Key[] }} checkedKeysValue
   */
  const onCheck = (
    checkedKeysValue: Key[] | { checked: Key[]; halfChecked: Key[] }
  ) => {
    setCheckedKeys(checkedKeysValue as string[]);
  };

  const deleteRoleOk = async () => {
    let result = (await reqDeleteRole(
      user!
    )) as unknown as DeleteRoleReturnType;
    const { status, msg } = result;
    console.log(result);
    if (status === 0) {
      message.success("删除角色成功", 2);
    } else {
      message.error(msg, 2);
    }
    getRoleList(curPage);
    setIsShowDel(false);
  };

  const deleteRoleCancel = () => {
    setIsShowDel(false);
  };

  return (
    <>
      <Card
        title={
          <Button
            type="primary"
            onClick={() => {
              FormRef.resetFields();
              setIsShowAdd(true);
            }}
          >
            <PlusCircleOutlined></PlusCircleOutlined>
            新增角色
          </Button>
        }
        style={{ width: "100% " }}
      >
        <Table
          dataSource={roleList}
          columns={columns}
          bordered
          pagination={{
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
            total: total,
            onChange: (page) => {
              setCurPage(page);
              getRoleList(page);
            },
          }}
          rowKey="_id"
        />
      </Card>
      {/* 添加角色模态框 */}
      <Modal
        title="新增角色"
        open={isShowAdd}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form
          onFinish={handleOk}
          onFinishFailed={() => {
            message.error("表单输入有误,请检查", 1);
          }}
          form={FormRef}
        >
          <Item
            name="roleName"
            initialValue=""
            rules={[{ required: true, message: "角色名必须输入" }]}
          >
            <Input placeholder="请输入角色名" />
          </Item>
        </Form>
      </Modal>
      {/* 分配角色模态框 */}
      <Modal
        title="分配权限"
        open={isShowAuth}
        onOk={handleAuthOkModal}
        onCancel={handleAuthCancelModal}
        okText="确认"
        cancelText="取消"
      >
        <Form>
          <Tree
            checkable //是否支持选中
            defaultExpandAll //展开所有节点
            treeData={menuList}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
          />
        </Form>
      </Modal>
      {/* 删除角色模态框 */}
      <Modal
        title={
          <>
            <ExclamationCircleOutlined /> &nbsp; 确认删除角色吗?
          </>
        }
        open={isShowDel}
        onOk={deleteRoleOk}
        onCancel={deleteRoleCancel}
        okText="确定"
        cancelText="取消"
      ></Modal>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Role);
