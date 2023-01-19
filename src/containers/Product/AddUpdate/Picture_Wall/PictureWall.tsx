/**
 * @author ShiYiChuang
 * @date 2023-1-11
 */
import { useState, useImperativeHandle, forwardRef, Ref } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { message, Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { BASE_URL } from "../../../../config";
import { AddPhotoType, DeletePhotoType } from "../../../../type/Photo";
import { reqDeletePhoto } from "../../../../api";

/**
 * @description 得到文件的Base64编码
 * @param {RcFile} file
 * @return {Promise<string>}
 */
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

/**
 * @description 照片墙Ref返回类型
 */
export type PictualWalluseImperativeHandleReturnType = {
  getImgArr: () => string[];
  setImgArr: (imgArr: string[]) => void;
};

/**
 * @description 照片墙
 * @constructor
 */
const PictureWall = forwardRef((_, PictureWallRef: Ref<unknown>) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  /**
   * @description 点击文件链接或预览图标时的回调
   * @param {UploadFile} file
   */
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  /**
   * @description UpLoad上传文件状态改变时的回调
   * @param {UploadFile} file 当前文件
   * @param {UploadFile[]} fileList 所有文件
   */
  const handleChange: UploadProps["onChange"] = async ({ file, fileList }) => {
    if (file.status === "done") {
      file.url = (file.response as AddPhotoType).data.url;
      file.name = (file.response as AddPhotoType).data.name;
    }
    if (file.status === "removed") {
      let result = (await reqDeletePhoto(
        file.name
      )) as unknown as DeletePhotoType;
      const { status, msg } = result;
      if (status === 0) {
        message.success("删除图片成功");
      } else {
        message.error(msg);
      }
    }
    setFileList(fileList);
  };

  /**
   * @description 点击遮罩层或右上角叉或取消按钮的回调
   */
  const handleCancel = () => setPreviewOpen(false);

  /**
   * @description 从fileList中获取商品对应的图片名字,构建一个数组,供新增商品使用
   */
  const getImgArr = () => {
    let result: string[] = [];
    fileList.forEach((item) => {
      result.push(item.name);
    });
    return result;
  };

  /**
   * @description 设置图片列表
   * @param {string[]} imgArr 照片数组
   */
  const setImgArr = (imgArr: string[]) => {
    let result: UploadFile[] = [];
    imgArr.forEach((item, index) => {
      result.push({
        uid: index.toString(),
        name: item,
        url: `${BASE_URL}/upload/${item}`,
      });
    });
    setFileList(result);
  };

  /**
   * @description 自定义返回Ref类型
   * @return PictualWalluseImperativeHandleReturnType
   */
  useImperativeHandle(
    PictureWallRef,
    (): PictualWalluseImperativeHandleReturnType => {
      return {
        getImgArr,
        setImgArr,
      };
    }
  );

  return (
    <>
      <Upload
        action={`${BASE_URL}/manage/img/upload`}
        method={"post"}
        name={"image"}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 4 ? null : (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
});

export default PictureWall;
