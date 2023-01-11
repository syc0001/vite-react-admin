import {useState, useImperativeHandle, forwardRef, Ref} from "react";
import { PlusOutlined } from "@ant-design/icons";
import { message, Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { BASE_URL } from "../../../../config";
import { AddPhotoType, DeletePhotoType } from "../../../../type/api";
import { reqDeletePhoto } from "../../../../api";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export type useImperativeHandleReturnType = {
  getImgArr: () => string[];
};

const PictureWall = forwardRef((_, PictureWallRef:Ref<unknown>) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

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

  const getImgArr = () => {
    let result: string[] = [];
    fileList.forEach((item) => {
      result.push(item.name);
    });
    return result;
  };

  useImperativeHandle(PictureWallRef, (): useImperativeHandleReturnType => {
    return {
      getImgArr,
    };
  });

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
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
        {fileList.length >= 4 ? null : uploadButton}
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
