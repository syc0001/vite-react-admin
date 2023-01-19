/**
 * @author ShiYiChuang
 * @date 2023-1-11
 */

/**
 * @description 照片类型
 */
interface PhotoData {
  name: string;
  url: string;
}

/**
 * @description 添加照片
 */
export interface AddPhotoType {
  status: number;
  data: PhotoData;
}

/**
 * @description 删除照片
 */
export interface DeletePhotoType {
  status: number;
  msg?: string;
}