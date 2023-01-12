/**
 * @description 商品类型
 */
export interface ProductType {
  status: number;
  imgs: Array<string>;
  _id: string;
  categoryId: string;
  name: string;
  desc: string;
  detail: string;
  price: number;
  __v: number;
}

/**
 * @description 单页商品类型
 */
interface PageDataType {
  pageNum: number;
  total: number;
  pages: number;
  pageSize: number;
  list: Array<ProductType>;
}

/**
 * @description 获取商品列表
 */
export interface ProductListType {
  status: number;
  data: PageDataType;
}

/**
 * @description 更新商品
 */
export interface UpdateProductType {
  status: number;
}

/**
 * @description 根据Id查找商品
 */
export interface ProductByIdType {
  status: number;
  data: ProductType;
  msg: string;
}

/**
 * @description 添加商品
 */
export interface AddProductType {
  name: string;
  desc: string;
  price: number;
  categoryId: string;
  imgs?: string[];
  details?: string;
}


/**
 * @description 添加商品返回类型
 */
export interface AddProductReturnType {
  status: number;
  data: ProductType;
  msg?: string;
}
