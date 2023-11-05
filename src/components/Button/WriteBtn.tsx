import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

/* css */
const Button = styled.button`
  background-color: white;
  padding: 10px;
  border: 1px solid silver;
  margin: 0 20px 20px 0;
  float: right;
  cursor: pointer;

  /* hover 시 배경색 변경 */
  &:hover {
    background-color: #e0e0e0;
  }
`;
/* css */

function WriteBtn() {
  const navigate = useNavigate();
  const onWrite = () => {
    navigate("/post/write/");
  };

  return <Button onClick={onWrite}>글쓰기</Button>;
}

export default WriteBtn;
