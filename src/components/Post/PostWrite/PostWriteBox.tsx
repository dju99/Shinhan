import styled from "styled-components";
import ReactQuill from "react-quill";
import Quill from "quill";
import ImageResize from "quill-image-resize";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

Quill.register("modules/imageResize", ImageResize); // 모듈 이름을 수정

/* css */
const Form = styled.form`
  position: relative;
  width: 100%;
  background-color: white;
  padding: 20px;
  margin: 20px;
  border: 2px solid rgb(0, 0, 0, 0.1);
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
`;

const PostTitle = styled.input`
  width: 500px;
  border: 1px solid silver;
  height: 30px;
  padding: 10px;
  margin: 10px auto;
  outline: none;
`;

const PostBoard = styled.select`
  width: 522px;
  border: 1px solid silver;
  height: 52px;
  padding: 10px;
  margin: 10px auto;
  outline: none;
`;

const FormButton = styled.input`
  position: relative;
  width: 10%;
  background-color: #a653ec;
  color: white;
  border: none;
  height: 60px;
  border-radius: 4px;
  font-size: 18px;
  margin: 10px 0;

  cursor: pointer;

  &:hover {
    background-color: #6d14b8;
  }
`;
/* css */

/* type */
interface PostProps {
  title: string;
  board: string;
  user: string;
}
/* type */

function PostWriteBox() {
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const user = localStorage.getItem("login-token");
  const toolbarOptions = [
    ["image"],
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
  ];

  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
    imageResize: {
      module: "imageResize",
      parchment: Quill.import("parchment"),
    },
  };

  const { handleSubmit, register } = useForm<PostProps>();

  const onSubmit = async (postData: PostProps) => {
    try {
      await fetch("http://localhost:8080/postupload", {
        method: "POST",
        body: JSON.stringify({
          title: postData.title,
          board: postData.board,
          user: user,
          content: content,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("등록 완료");
      navigate(-1);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  const handleBoardChange = () => {};

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1>게시판 글쓰기</h1>
      <PostBoard {...register("board")} placeholder="게시판 선택..." onChange={handleBoardChange}>
        <option value="sell">판매</option>
        <option value="buy">구매</option>
        <option value="free">자유게시판</option>
        <option value="club">동아리</option>
      </PostBoard>
      <br />
      <PostTitle {...register("title")} placeholder="제목..." />
      <ReactQuill style={{ width: "80%", height: "600px", marginBottom: "50px" }} modules={modules} onChange={setContent} />
      <FormButton type="submit" value={"등록"} />
    </Form>
  );
}

export default PostWriteBox;
