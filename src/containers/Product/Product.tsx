import { ChangeEvent, FC, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Input, message, Select, Table } from "antd";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
  reqProductList,
  reqSearchProductList,
  reqUpdateProductList,
} from "../../api";
import { PAGE_SIZE } from "../../config";
import { reducersType } from "../../redux/reducers";
import { createSaveProductListAction } from "../../redux/actions_creators/product_action";
import {
  ProductListType,
  ProductType,
  UpdateProductStatusType,
} from "../../type/api";
import { ColumnsType } from "antd/es/table";

const { Option } = Select;

const mapStateToProps = (state: reducersType) => ({});

const mapDispatchToProps = {
  saveProduct: createSaveProductListAction,
};

type ProductProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

let isSearch = false;
const Product: FC<ProductProps> = (props: ProductProps) => {
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(0);
  const [searchKey, setSearchKey] = useState("");
  const [searchType, setSearchType] = useState("productName");
  const pathName = useLocation().pathname.split("/");
  const navigate = useNavigate();

  const columns: ColumnsType<{}> = [
    {
      title: "商品名称",
      dataIndex: "name",
      key: "name",
      width: "15%",
    },
    {
      title: "商品描述",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "价格",
      dataIndex: "price",
      key: "price",
      width: "10%",
      align: "center",
      render: (price: string) => {
        return "$" + price;
      },
    },
    {
      title: "状态",
      key: "status",
      width: "10%",
      align: "center",
      render: (item: ProductType) => {
        const { status } = item;
        return (
          <div>
            <Button
              danger={status === 1}
              type="primary"
              onClick={() => {
                updateProdStatus(item);
              }}
            >
              {status === 1 ? "下架" : "上架"}
            </Button>
            <br />
            <span>{status === 1 ? "在售" : "停售"}</span>
          </div>
        );
      },
    },
    {
      title: "操作",
      key: "operator",
      width: "10%",
      align: "center",
      render: (item: ProductType) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                navigate(`detail/${item._id}`, { replace: false });
              }}
            >
              详情
            </Button>
            <br />
            <Button
              type="link"
              onClick={() => {
                navigate(`addupdate/${item._id}`, { replace: false });
              }}
            >
              修改
            </Button>
          </>
        );
      },
    },
  ];

  const getProductList = async (page: number = 1) => {
    let result: ProductListType;
    if (isSearch) {
      result = await reqSearchProductList(
        page,
        PAGE_SIZE,
        searchType,
        searchKey
      );
    } else {
      result = (await reqProductList(
        page,
        PAGE_SIZE
      )) as unknown as ProductListType;
    }
    const { status, data } = result;
    if (status === 0) {
      setProductList(data.list);
      setTotal(data.total);
      setCurrent(data.pageNum);
      props.saveProduct(data.list);
    } else {
      message.error("获取商品列表失败", 1);
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  const updateProdStatus = async ({ _id, status } = { _id: "", status: 0 }) => {
    if (status === 1) {
      status = 2;
    } else {
      status = 1;
    }
    let result = (await reqUpdateProductList(
      _id,
      status
    )) as unknown as UpdateProductStatusType;
    console.log("updateProdStatus", result);
    const { status: newState } = result;
    if (newState === 0) {
      message.success("更新商品状态成功", 1);
      let newProductList = [...productList];
      newProductList = newProductList.map((item) => {
        if (item._id === _id) {
          item.status = status;
        }
        return item;
      });
      setProductList(newProductList);
    } else {
      message.error("更新商品状态失败", 1);
    }
  };

  const search = async () => {
    if (searchKey === "") {
      isSearch = false;
    } else {
      isSearch = true;
    }
    getProductList();
  };

  if (pathName.includes("addupdate") || pathName.includes("detail")) {
    return <Outlet />;
  }
  return (
    <Card
      title={
        <>
          <Select
            defaultValue={"productName"}
            onChange={(value) => {
              setSearchType(value);
            }}
          >
            <Option value="productName">按名称搜索</Option>
            <Option value="productDesc">按描述搜索</Option>
          </Select>
          <Input
            placeholder={
              searchType === "productName" ? "按名称搜索" : "按描述搜索"
            }
            style={{ margin: "0px 10px", width: "20%" }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setSearchKey(event.target.value);
            }}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                search();
              }
            }}
          />
          <Button type="primary" onClick={search}>
            <SearchOutlined></SearchOutlined>
            搜索
          </Button>
        </>
      }
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate("addupdate", { replace: false });
          }}
        >
          <PlusCircleOutlined></PlusCircleOutlined> 添加
        </Button>
      }
    >
      <Table
        rowKey={"_id"}
        dataSource={productList}
        columns={columns}
        bordered
        pagination={{
          total: total,
          current: current,
          pageSize: PAGE_SIZE,
          onChange: getProductList,
        }}
      />
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
