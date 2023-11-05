import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

/* css */
const Post = styled.div`
  width: 100%;
  background-color: white;
  border: 2px solid rgb(0, 0, 0, 0.1);
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1); /* 아래쪽 그림자 추가 */
  margin: 20px;
  padding: 40px;
`;

const BoardType = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 17px;
  color: #bb86fc;
  cursor: pointer;
`;

const PostTitle = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 60px;
`;

const PostUser = styled.div`
  padding-top: 10px;
  font-size: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const PostDate = styled.div`
  font-size: 15px;
  color: #808080;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  padding-bottom: 20px;
  border-bottom: 1px solid silver;
`;

const PostContent = styled.div`
  height: auto;
  border-bottom: 1px solid silver;
  margin-bottom: 20px;
`;

const Btn = styled.div`
  position: relative;
  float: left;
  padding: 10px 20px;
  background-color: white;
  color: #bb86fc;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const NextPost = styled.button``;

const PrevPost = styled.button``;

const DeletePost = styled.button``;
/* css */

/* type */
interface Post {
  postNum: number;
  title: string;
  board: string;
  date: string;
  user: string;
  content: string;
}
/* type */

function PostBox() {
  const navigate = useNavigate();
  const { board, postNum } = useParams<{ board: string; postNum: string }>();
  const [posts, setPosts] = useState<Post | null>(null);
  const [boardType, setBoardType] = useState("");

  useEffect(() => {
    if (board === "buy") setBoardType("삽니다");
    else if (board === "sell") setBoardType("팝니다");
    else if (board === "free") setBoardType("자유게시판");
    else if (board === "club") setBoardType("동아리");

    // 초기 데이터를 불러오기 위해 useEffect를 사용
    axios
      .get(`/post/${board}/${postNum}`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {});
  }, [board, postNum]); // board와 postNum이 변경될 때 useEffect 실행

  const toBoard = () => {
    if (board === "buy" || board == "sell") navigate(`/market/${board}`);
    else navigate(`/community/${board}`);
  };

  const onNextPost = () => {
    if (posts?.postNum) {
      // 다음 글 불러오기
      axios
        .get(`/post/${board}/${posts.postNum + 1}`)
        .then((response) => {
          setPosts(response.data);
        })
        .catch(() => {
          alert("다음글이 없습니다.");
        });
    }
  };

  const onPrevPost = () => {
    if (posts?.postNum) {
      axios
        .get(`/post/${board}/${posts.postNum - 1}`)
        .then((response) => {
          setPosts(response.data);
        })
        .catch(() => {
          alert("이전글이 없습니다.");
        });
    }
  };

  const onDeletePost = () => {
    if (posts?.postNum) {
      axios
        .delete(`/post/${board}/${postNum}`)
        .then((response) => {
          alert("삭제 완료");
          navigate(-1);
        })
        .catch((error) => {});
    }
  };

  return (
    <Post>
      <BoardType onClick={toBoard}>{boardType} &gt;</BoardType>
      <PostTitle>{posts?.title}</PostTitle>
      <PostUser>{posts?.user}</PostUser>
      <PostDate>{posts?.date}</PostDate>
      {posts?.content ? <PostContent dangerouslySetInnerHTML={{ __html: posts.content }} /> : "Loading..."}
      <Btn onClick={toBoard}>게시판</Btn>
      <Btn onClick={onNextPost}>&lt; 다음글</Btn>
      <Btn onClick={onPrevPost}>이전글 &gt;</Btn>
      <Btn onClick={onDeletePost}>삭제</Btn>
    </Post>
  );
}

export default PostBox;
