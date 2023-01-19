/**
 * @author ShiYiChuang
 * @date 2023-1-13
 */

import { FC, useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { Button, Card, List, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { reducersType } from "../../../redux/reducers";
import { reqCategoryList, reqProdById } from "../../../api";
import { BASE_URL } from "../../../config";
import { ProductByIdType, ProductType } from "../../../type/Product";
import { CategoryListType } from "../../../type/Category";
import Modules from "./css/Detail.module.less";

const { Item } = List;

// redux状态 start ========================================================================
const mapStateToProps = (state: reducersType) => ({
  productList: state.productList,
  categoryList: state.categoryList,
});
const mapDispatchToProps = {};
type DetailProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;
// redux状态 end ==========================================================================

const Detail: FC<DetailProps> = (props: DetailProps) => {
  const [productData, setProductData] = useState<ProductType>({
    __v: 0,
    _id: "",
    categoryId: "",
    desc: "",
    detail: "",
    imgs: [],
    name: "",
    price: 0,
    status: 1,
  });
  const [productName, setproductName] = useState("");
  const [isLoading, setLoading] = useState(true);
  const match = useMatch("/admin/prud_about/product/detail/:id");
  const navigate = useNavigate();

  /**
   * @description 通过id获取商品
   * @param {string} id 传入的id
   */
  const getProductById = async (id: string) => {
    let result = (await reqProdById(id)) as unknown as ProductByIdType;
    const { status, data, msg } = result;
    if (status === 0) {
      setProductData(data);
    } else {
      message.error(msg);
    }
  };

  /**
   * @description 获取分类列表
   */
  const getCategoryList = async () => {
    let result = (await reqCategoryList()) as unknown as CategoryListType;
    const { status, data, msg } = result;
    if (status === 0) {
      let findObj = data.find((item) => {
        return item._id === productData.categoryId;
      });
      if (findObj) {
        setproductName(findObj.name);
        setLoading(false);
      }
    } else {
      message.error(msg);
    }
  };

  useEffect(() => {
    const { id }: any = match?.params;
    const reduxList = props.productList;
    if (reduxList.length) {
      let result = reduxList.find((item) => {
        return item._id === id;
      });
      if (result) {
        setProductData(result);
      }
    } else {
      getProductById(id);
    }
  }, []);

  /**
   * productData更新完成后获取分类列表
   */
  useEffect(() => {
    if (Object.values(productData).length) {
      const reduxCategoryList = props.categoryList;
      if (reduxCategoryList.length) {
        let result = reduxCategoryList.find((item) => {
          return item._id === productData.categoryId;
        });
        if (result) {
          setproductName(result.name);
          setLoading(false);
        }
      } else {
        getCategoryList();
      }
    }
  }, [productData]);

  return (
    <Card
      title={
        <div className={Modules.leftTop}>
          <Button
            type="link"
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowLeftOutlined style={{ fontSize: "20px" }}></ArrowLeftOutlined>
          </Button>
          <span>商品详情</span>
        </div>
      }
      loading={isLoading}
    >
      <List>
        <Item>
          <span className={Modules.prod}>商品名称: </span>
          <span>{productData.name}</span>
        </Item>
        <Item>
          <span className={Modules.prod}>商品描述: </span>
          <span>{productData.desc}</span>
        </Item>
        <Item>
          <span className={Modules.prod}>商品价格: </span>
          <span>{productData.price}</span>
        </Item>
        <Item>
          <span className={Modules.prod}>所属分类: </span>
          <span>{productName}</span>
        </Item>
        <Item>
          <span className={Modules.prod}>商品图片: </span>
          {productData.imgs == null
            ? ""
            : productData.imgs.map((item: unknown, index: number) => {
                return (
                  <img
                    key={index}
                    src={`${BASE_URL}/upload/${item}`}
                    alt="商品图片"
                  />
                );
              })}
        </Item>
        <Item>
          <span className={Modules.prodDetail}>商品详情: </span>
          <span dangerouslySetInnerHTML={{ __html: productData.detail }}></span>
        </Item>
      </List>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
