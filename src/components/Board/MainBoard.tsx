import { useNavigate, useParams } from "react-router-dom";
import * as M from "../../assets/css/Board/MainBoard";
import Pagination from "react-js-pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import loading from "../../assets/img/loading.gif";
import WriteBtn from "../Button/WriteBtn";

interface MainBoardProps {
  url: {
    first: string;
    second: string;
  };
  boardTitle: {
    first: string;
    second: string;
  };
}

interface Post {
  _id: string;
  postNum: string;
  title: string;
  date: string;
  user: string;
  like: number;
}

function MainBoard(props: MainBoardProps) {
  const navigate = useNavigate();
  const [PageNum, setPageNum] = useState<number>(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const { board } = useParams<{ board: string }>();

  const [page, setPage] = useState(1);
  const items = 7;

  useEffect(() => {
    axios
      .get(`/post/${board}`)
      .then((response) => {
        setPageNum(response.data.num);
        setPosts(response.data.posts.reverse());
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [board]);

  const handlePageChange = (page: any) => {
    setPage(page);
  };

  const toBoard = (url: string) => {
    navigate(url);
  };

  return (
    <M.Board>
      <M.BoardHeader>
        <M.SelectBoard props={props.boardTitle.first} onClick={() => toBoard(props.url.first)}>
          {props.boardTitle.first}
        </M.SelectBoard>
        <M.SelectBoard props={props.boardTitle.second} onClick={() => toBoard(props.url.second)}>
          {props.boardTitle.second}
        </M.SelectBoard>
      </M.BoardHeader>
      <M.Table>
        <M.PostNum></M.PostNum>
        <M.Title style={{ cursor: "text", fontWeight: "600" }}>제목</M.Title>
        <M.Date style={{ fontWeight: "600" }}>작성일</M.Date>
        <M.User style={{ fontWeight: "600" }}>작성자</M.User>
        <M.Likes style={{ fontWeight: "600" }}>조회</M.Likes>
      </M.Table>
      {posts.length > 0 ? (
        posts.slice(items * (page - 1), items * page).map((post) => (
          <M.Content key={post._id}>
            <M.PostNum>{post.postNum}</M.PostNum>
            <M.PostTitle onClick={() => navigate(`/post/${board}/${post.postNum}`)}>{post.title}</M.PostTitle>
            <M.Date>{post.date}</M.Date>
            <M.User>{post.user}</M.User>
            <M.Likes>{post.like}</M.Likes>
          </M.Content>
        ))
      ) : (
        <div style={{ textAlign: "center", width: "80%", margin: "0 auto", height: "400px" }}>
          <img style={{ top: "50%", transform: "translateY(-50%)", width: "15%", height: "15%", position: "relative" }} src={loading} />
        </div>
      )}

      <M.PaginationBox>
        <Pagination totalItemsCount={PageNum} activePage={page} onChange={handlePageChange} itemsCountPerPage={items} />
      </M.PaginationBox>
      <WriteBtn />
    </M.Board>
  );
}

export default MainBoard;
