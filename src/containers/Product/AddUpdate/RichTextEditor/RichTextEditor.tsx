import { FC, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

/**
 * 富文本编辑器
 */
const RichTextEditor: FC<unknown> = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty()); //构建一个初始化的编辑器+内容

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  return (
    <>
      <Editor
        editorState={editorState}
        editorStyle={{
          border: "1px solid black;",
          paddingLeft: "10px;",
          lineHeight: "10px;",
          minHeight: "200px;",
        }}
        onEditorStateChange={onEditorStateChange}
      />
      <textarea
        disabled
        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
      />
    </>
  );
};

export default RichTextEditor;
