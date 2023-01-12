/**
 * @author ShiYiChuang
 * @date 2023-1-11
 */
import { FC, forwardRef, useImperativeHandle, Ref, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

/**
 * @description 富文本编辑器返回Ref类型
 */
export type RichTextEditoruseImperativeHandleReturnType = {
  getRichText: () => string;
};

/**
 * @description 富文本编辑器
 */
const RichTextEditor = forwardRef((_, RichTexEditorRef: Ref<unknown>) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty()); //构建一个初始化的编辑器+内容

  /**
   * @description 状态改变时候调用的函数
   * @param {EditorState} editorState
   */
  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  /**
   * @description 获取富文本编辑器内容
   */
  const getRichText = () => {
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };

  useImperativeHandle(
    RichTexEditorRef,
    (): RichTextEditoruseImperativeHandleReturnType => {
      return {
        getRichText,
      };
    }
  );

  return (
    <Editor
      editorState={editorState}
      editorStyle={{
        border: "1px solid black",
        paddingLeft: "10px",
        lineHeight: "10px",
        minHeight: "200px",
      }}
      onEditorStateChange={onEditorStateChange}
    />
  );
});

export default RichTextEditor;
