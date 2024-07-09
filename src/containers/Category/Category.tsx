/**
 * @author ShiYiChuang
 * @date 2023-1-11
 */
import { FC, useEffect, useState } from "react";
import { Button, Card, message, Modal, Table, Form, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { reqAddCategory, reqCategoryList, reqUpdateCategory } from "../../api";
import { PAGE_SIZE } from "../../config";
import { RuleObject } from "antd/lib/form";
import { reducersType } from "../../redux/reducers";
import { createSaveCategoryListAction } from "../../redux/actions_creators/category_action";
import {
  AddCategoryType,
  NewCategoryObjType,
  CategoryObjType,
  CategoryListType,
  UpdateCategoryType,
} from "../../type/Category";
import { ColumnsType } from "antd/es/table";

const { Item } = Form;

// redux状态 start ========================================================================
const mapStateToProps = (state: reducersType) => ({});
const mapDispatchToProps = { saveCategory: createSaveCategoryListAction };
type CategoryProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;
// redux状态 end ==========================================================================

// let initialTitle = "";

/**
 * @description 分类页面
 * @param {CategoryProps} props redux传入的参数
 * @constructor
 */
const Category: FC<CategoryProps> = (props: CategoryProps) => {
  const [categoryList, setCategoryList] = useState<CategoryObjType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [operType, setOperType] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [modalCurrentValue, setModalCurrentValue] = useState("");
  const [initialTitle, setInitialTitle] = useState("");
  /**
   * 用来控制表单的Ref
   */
  const [FormRef] = Form.useForm();

  /**
   * Table的行数据
   */
  const columns: ColumnsType<{}> = [
    {
      title: "分类名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "操作",
      key: "operator",
      render: (operatorData: CategoryObjType) => {
        return (
          <Button
            type="link"
            onClick={() => {
              setInitialTitle(operatorData.name);
              showModal("update", operatorData);
            }}
          >
            修改分类
          </Button>
        );
      },
      width: "25%",
      align: "center",
    },
  ];

  /**
   * @description 组件挂载时候获取商品列表
   */
  useEffect(() => {
    getCategoryList();
  }, []);

  /**
   * @description initialTitle更新的时候重置表单
   */
  useEffect(() => {
    FormRef.resetFields();
  }, [initialTitle]);

  /**
   * @description 获取商品列表
   */
  const getCategoryList = async () => {
    let result = (await reqCategoryList()) as unknown as CategoryListType;
    setLoading(false);
    const { status, data, msg } = result;
    if (status === 0) {
      setCategoryList([...data].reverse());
      props.saveCategory(data.reverse());
    } else {
      message.error(msg, 1);
    }
  };

  /**
   * @description 添加分类
   * @param {string} categoryName 当前新增商品名称
   */
  const toAdd = async (categoryName: string) => {
    console.log(categoryName);
    let result = (await reqAddCategory(
      categoryName
    )) as unknown as AddCategoryType;
    const { status, data, msg } = result;
    if (status === 0) {
      message.success("新增商品分类成功", 1);
      let newData = [data, ...categoryList];
      setCategoryList(newData);
      FormRef.resetFields();
      setIsModalOpen(false);
    } else if (status === 1) {
      message.error(msg, 1);
    }
  };

  /**
   * @description 更新分类
   * @param {NewCategoryObjType} categoryObj 当前更新的分类对象
   */
  const toUpdate = async (categoryObj: NewCategoryObjType) => {
    let result = (await reqUpdateCategory(
      categoryObj
    )) as unknown as UpdateCategoryType;
    const { status, msg } = result;
    if (status === 0) {
      message.success("更新分类名称成功", 1);
      getCategoryList();
      FormRef.resetFields();
      setIsModalOpen(false);
    } else if (status === 1) {
      message.error(msg, 1);
    }
  };

  /**
   * @description 模态框点击确认的回调
   */
  const handleOk = () => {
    FormRef
      .validateFields()
      .then((value: { categoryName: string }) => {
        if (operType === "add") {
          toAdd(value.categoryName);
        } else if (operType === "update") {
          const categoryId = modalCurrentValue;
          const categoryName = value.categoryName;
          const categoryObj: NewCategoryObjType = { categoryId, categoryName };
          toUpdate(categoryObj);
        }
      })
      .catch((err: string) => {
        message.error("表单输入有误,请检查", 1);
      });
  };

  /**
   * @description 模态框点击取消的回调
   */
  const handleCancel = () => {
    FormRef.resetFields();
    setIsModalOpen(false);
  };

  /**
   * @description 显示模态框
   * @param operator 操作状态
   * @param data 数据
   */
  const showModal = (operator: string, data: CategoryObjType | null = null) => {
    setOperType(operator);
    // setInitialTitle("");
    if (data !== null) {
      setModalCurrentValue(data._id);
    }
    setIsModalOpen(true);
  };

  /**
   * @description 输入框的验证函数
   * @param {RuleObject} rule
   * @param {string} value
   */
  const inputValidator = (
    rule: RuleObject,
    value: string
  ): Promise<void | unknown> | void => {
    value = value.replaceAll(" ", "");
    if (!value) {
      return Promise.reject("请输入商品分类名称");
    }
    return Promise.resolve();
  };

  return (
    <>
      <Card
        extra={
          <Button
            type="primary"
            onClick={() => {
              setInitialTitle("");
              showModal("add");
            }}
          >
            <PlusCircleOutlined></PlusCircleOutlined>添加
          </Button>
        }
        style={{ width: "100%" }}
      >
        <Table
          dataSource={categoryList}
          columns={columns}
          bordered
          rowKey={"_id"}
          pagination={{ pageSize: PAGE_SIZE, showQuickJumper: true }}
          loading={isLoading}
        />
      </Card>
      <Modal
        forceRender //设置强制渲染
        title={operType === "add" ? "新增商品" : "修改商品"}
        open={isModalOpen}
        okText="确定"
        cancelText="取消"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          initialValues={{ remember: false }}
          form={FormRef}
          onFinish={handleOk}
        >
          <Item
            name="categoryName"
            initialValue={initialTitle}
            rules={[{ validator: inputValidator }]}
          >
            <Input placeholder="请输入商品分类名称" />
          </Item>
        </Form>
      </Modal>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
