/**
 * @author ShiYiChuang
 * @date 2023-1-13
 */
import { FC, useEffect, useRef, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { Button, Card, Form, Input, message, Select } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { reducersType } from "../../../redux/reducers";
import {
  reqAddProduct,
  reqCategoryList,
  reqProdById,
  reqUpdateProduct,
} from "../../../api";
import { CategoryListType, CategoryObjType } from "../../../type/Category";
import {
  AddOrUpdateProductReturnType,
  AddOrUpdateProductType,
  ProductByIdType,
  ProductType,
} from "../../../type/Product";
import PictureWall, {
  PictualWalluseImperativeHandleReturnType,
} from "./Picture_Wall/PictureWall";
import RichTextEditor, {
  RichTextEditoruseImperativeHandleReturnType,
} from "./RichTextEditor/RichTextEditor";

const { Item, useForm } = Form;
const { Option } = Select;

// redux状态 start ========================================================================
const mapStateToProps = (state: reducersType) => ({
  categoryList: state.categoryList,
  productList: state.productList,
});
const mapDispatchToProps = {};
type AddUpdateProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;
// redux状态 end ==========================================================================

/**
 * @description 添加商品页面
 * @param {AddUpdateProps} props redux传入的类型
 * @constructor
 */
const AddUpdate: FC<AddUpdateProps> = (props: AddUpdateProps) => {
  const [categoryList, setCategoryList] = useState<CategoryObjType[]>([]);
  const [productObj, setProductObj] = useState<ProductType>();
  const [operator, setOperator] = useState("add");
  const match = useMatch("/admin/prud_about/product/addupdate/:id");
  const [form] = useForm();
  const navigate = useNavigate();

  /**
   * @description 照片墙和富文本的Ref
   */
  const PictureWallRef = useRef<PictualWalluseImperativeHandleReturnType>(null);
  const RichTextEditorRef =
    useRef<RichTextEditoruseImperativeHandleReturnType>(null);

  /**
   * @description 组件挂载的时候获取分类列表
   */
  useEffect(() => {
    // 获取商品列表
    if (props.categoryList.length) {
      setCategoryList(props.categoryList);
    } else {
      getCategoryList();
    }

    //当用户点击修改的时候进入此逻辑
    if (match?.params.id) {
      setOperator("update");
      if (props.productList.length) {
        let result = props.productList.find((item) => {
          return item._id == match.params.id;
        });
        if (result) {
          setProductObj(result);
          PictureWallRef.current?.setImgArr(result.imgs);
          RichTextEditorRef.current?.setRichText(result.detail);
        }
      } else {
        getProductList(match.params.id);
      }
    }
  }, []);

  /**
   * @description productObj更新的时候重置表单
   */
  useEffect(() => {
    form.resetFields();
  }, [productObj]);

  /**
   * @description 获取商品列表
   */
  const getCategoryList = async () => {
    let result = (await reqCategoryList()) as unknown as CategoryListType;
    const { status, data, msg } = result;
    if (status === 0) {
      setCategoryList(data);
    } else {
      message.error(msg);
    }
  };

  /**
   * @description 获取商品列表
   * @param {string} id
   */
  const getProductList = async (id: string) => {
    let result = (await reqProdById(id)) as unknown as ProductByIdType;
    const { status, data, msg } = result;
    if (status === 0) {
      setProductObj(data);
      PictureWallRef.current?.setImgArr(data.imgs);
      RichTextEditorRef.current?.setRichText(data.detail);
    } else {
      message.error(msg);
    }
  };

  /**
   * @description 表单验证成功的回调
   * @param {AddOrUpdateProductType} values 表单数据,由Form表单传入
   */
  const onFinish = async (values: AddOrUpdateProductType) => {
    //从pictureWall中获取图片数组
    let imgs = PictureWallRef.current?.getImgArr();
    //从富文本编辑器中获取转换为富文本的字符串
    let detail = RichTextEditorRef.current?.getRichText() as string;
    values = { ...values, imgs, detail };
    console.log("发请求了", values);
    let result;
    if (operator === "add") {
      result = (await reqAddProduct(
        values
      )) as unknown as AddOrUpdateProductReturnType;
    } else {
      result = (await reqUpdateProduct({
        ...values,
        _id: productObj?._id,
      })) as unknown as AddOrUpdateProductReturnType;
    }
    const { status, msg } = result;
    if (status === 0) {
      message.success(operator === "add" ? "添加商品成功" : "修改商品成功");
      navigate("/admin/prud_about/product", { replace: true });
    } else {
      message.error(msg);
    }
  };

  /**
   * @description 表单验证失败的回调
   */
  const onFinishFailed = () => {
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
          <span>{operator == "add" ? "商品添加" : "商品修改"}</span>
        </>
      }
    >
      <Form
        labelCol={{ md: 2 }}
        wrapperCol={{ md: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <Item
          label="商品名称"
          name="name"
          initialValue={productObj?.name || ""}
          rules={[{ required: true, message: "请输入商品名称" }]}
        >
          <Input placeholder="请输入商品名称" />
        </Item>
        <Item
          label="商品描述"
          name="desc"
          initialValue={productObj?.desc || ""}
          rules={[{ required: true, message: "请输入商品描述" }]}
        >
          <Input placeholder="请输入商品描述" />
        </Item>
        <Item
          label="商品价格"
          name="price"
          initialValue={productObj?.price || ""}
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
          initialValue={productObj?.categoryId || ""}
          rules={[{ required: true, message: "请输入商品分类" }]}
        >
          <Select allowClear placeholder={"请选择商品分类"}>
            {categoryList != null ? (
              categoryList.map((item) => {
                return (
                  <Option key={item._id} value={item._id}>
                    {item.name}
                  </Option>
                );
              })
            ) : (
              <Option key="default" value="default">
                default
              </Option>
            )}
          </Select>
        </Item>
        <Item label="商品图片">
          <PictureWall ref={PictureWallRef} />
        </Item>
        <Item label="商品详情">
          <RichTextEditor ref={RichTextEditorRef} />
        </Item>
        <Item wrapperCol={{ offset: 10 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Item>
      </Form>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUpdate);
