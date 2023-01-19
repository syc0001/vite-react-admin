/**
 * @author ShiYiChuang
 * @date 2023-1-11
 */
import { FC, forwardRef, useImperativeHandle, Ref, useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

/**
 * @description 富文本编辑器返回Ref类型
 */
export type RichTextEditoruseImperativeHandleReturnType = {
  getRichText: () => string;
  setRichText: (html: string) => void;
};

/**
 * @description 富文本编辑器
 * @constructor
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

  /**
   * @description 设置富文本编辑器内容
   * @param {string} html 传入的html样式字符串
   */
  const setRichText = (html: string) => {
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  };

  useImperativeHandle(
    RichTexEditorRef,
    (): RichTextEditoruseImperativeHandleReturnType => {
      return {
        getRichText,
        setRichText,
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
