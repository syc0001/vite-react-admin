import { LoginStateType } from "../redux/reducers/login_reducer";

//All Type Base
interface BaseType {
  status: number;
  data: unknown;
  msg: string;
}

//Login
export interface LoginType extends BaseType {
  data: LoginStateType;
}

//Weather
export interface WeatherType {
  weather: string;
  temperature: number;
}

//Category
export interface CategoryObjType {
  parentId: string;
  _id: string;
  name: string;
  __v: number;
}

export interface NewCategoryObjType {
  categoryId: string;
  categoryName: string;
}

export interface CategoryListType extends BaseType {
  data: Array<CategoryObjType>;
}

export interface AddCategoryType extends BaseType {
  data: CategoryObjType;
}

export interface UpdateCategoryStatusType {
  status: number;
  msg: string;
}

//Product
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

interface PageDataType {
  pageNum: number;
  total: number;
  pages: number;
  pageSize: number;
  list: Array<ProductType>;
}

export interface ProductListType {
  status: number;
  data: PageDataType;
}

export interface UpdateProductStatusType {
  status: number;
}

export interface ProductByIdType {
  status: number;
  data: ProductType;
  msg: string;
}

export interface AddProductType {
  name: string;
  desc: string;
  price: number;
  categoryId: string;
  imgs?: string[];
  details?: string;
}

interface PhotoData {
  name: string;
  url: string;
}
export interface AddPhotoType {
  status: number;
  data: PhotoData;
}

export interface DeletePhotoType {
  status: number;
  msg?: string;
}
