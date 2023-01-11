import { FC, useEffect, useRef, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { Button, Card, Form, Input, message, Select } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { reducersType } from "../../../redux/reducers";
import { reqCategoryList } from "../../../api";
import {
  AddProductType,
  CategoryListType,
  CategoryObjType,
} from "../../../type/api";
import PictureWall, {
  useImperativeHandleReturnType,
} from "./Picture_Wall/PictureWall";
import RichTextEditor from "./RichTextEditor/RichTextEditor";

const { Item } = Form;
const { Option } = Select;

const mapStateToProps = (state: reducersType) => ({
  categoryList: state.categoryList,
});

const mapDispatchToProps = {};

type AddUpdateProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const AddUpdate: FC<AddUpdateProps> = (props: AddUpdateProps) => {
  const [categoryList, setCategoryList] = useState<CategoryObjType[]>([]);
  const match = useMatch("/admin/prud_about/product/addupdate/:id");
  const pictureWallRef = useRef<useImperativeHandleReturnType>(null);
  const navigate = useNavigate();

  const getCategoryList = async () => {
    let result = (await reqCategoryList()) as unknown as CategoryListType;
    const { status, data, msg } = result;
    if (status === 0) {
      setCategoryList(data);
    } else {
      message.error(msg);
    }
  };

  useEffect(() => {
    if (props.categoryList.length) {
      setCategoryList(props.categoryList);
    } else {
      getCategoryList();
    }
  }, []);

  const onFinish = (values: AddProductType) => {
    let imgs = pictureWallRef.current?.getImgArr();
    values = { ...values, imgs };
    console.log("发请求了");
    console.log(values);
  };

  const onFinishFailed = (errorInfo: unknown) => {
    message.error("表单输入错误,请检查");
  };

  return (
    <Card
      title={
        <>
          <Button
            type="link"
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowLeftOutlined></ArrowLeftOutlined>
          </Button>
          <span>商品添加</span>
        </>
      }
    >
      <Form
        labelCol={{ md: 2 }}
        wrapperCol={{ md: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Item
          label="商品名称"
          name="name"
          initialValue={""}
          rules={[{ required: true, message: "请输入商品名称" }]}
        >
          <Input placeholder="请输入商品名称" />
        </Item>
        <Item
          label="商品描述"
          name="desc"
          initialValue={""}
          rules={[{ required: true, message: "请输入商品描述" }]}
        >
          <Input placeholder="请输入商品描述" />
        </Item>
        <Item
          label="商品价格"
          name="price"
          initialValue={""}
          rules={[{ required: true, message: "请输入商品价格" }]}
        >
          <Input
            type="number"
            placeholder="请输入商品价格,必须是数值"
            addonBefore="$"
            addonAfter="元"
          />
        </Item>
        <Item
          label="商品分类"
          name="categoryId"
          rules={[{ required: true, message: "请输入商品分类" }]}
        >
          <Select allowClear placeholder={"请选择商品分类"}>
            {categoryList.map((item) => {
              return (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </Item>
        <Item label="商品图片">
          <PictureWall ref={pictureWallRef} />
        </Item>
        <Item label="商品详情">
          <RichTextEditor />
          <h1>Test</h1>
        </Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUpdate);
