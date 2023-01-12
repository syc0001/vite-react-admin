/**
 * @author ShiYiChuang
 * @date 2023-1-11
 */
import { FC, useEffect, useRef, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { Button, Card, Form, Input, message, Select } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { reducersType } from "../../../redux/reducers";
import { reqAddProduct, reqCategoryList } from "../../../api";
import { CategoryListType, CategoryObjType } from "../../../type/Category";
import { AddProductReturnType, AddProductType } from "../../../type/Product";
import PictureWall, {
  PictualWalluseImperativeHandleReturnType,
} from "./Picture_Wall/PictureWall";
import RichTextEditor, {
  RichTextEditoruseImperativeHandleReturnType,
} from "./RichTextEditor/RichTextEditor";

const { Item } = Form;
const { Option } = Select;

const mapStateToProps = (state: reducersType) => ({
  categoryList: state.categoryList,
});

const mapDispatchToProps = {};

type AddUpdateProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

/**
 * @description 添加商品页面
 * @param {AddUpdateProps} props
 * @constructor
 */
const AddUpdate: FC<AddUpdateProps> = (props: AddUpdateProps) => {
  const [categoryList, setCategoryList] = useState<CategoryObjType[]>([]);
  const match = useMatch("/admin/prud_about/product/addupdate/:id");
  const navigate = useNavigate();

  /**
   * @description 照片墙和富文本的Ref
   */
  const PictureWallRef = useRef<PictualWalluseImperativeHandleReturnType>(null);
  const RichTextEditorRef =
    useRef<RichTextEditoruseImperativeHandleReturnType>(null);

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

  const onFinish = async (values: AddProductType) => {
    //从pictureWall中获取图片数组
    let imgs = PictureWallRef.current?.getImgArr();
    //从富文本编辑器中获取转换为富文本的字符串
    let details = RichTextEditorRef.current?.getRichText() as string;
    values = { ...values, imgs, details };
    console.log("发请求了");
    console.log(values);
    let result = (await reqAddProduct(
      values
    )) as unknown as AddProductReturnType;
    const { status, msg } = result;
    if (!status) {
      message.success("添加商品成功");
      setTimeout(() => {
        navigate("/admin/prud_about/product", { replace: true });
      }, 1000);
    } else {
      message.error(msg);
    }
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
          <PictureWall ref={PictureWallRef} />
        </Item>
        <Item label="商品详情">
          <RichTextEditor ref={RichTextEditorRef} />
        </Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUpdate);
