import { useNavigate } from "react-router-dom";
import * as S from "../../assets/css/Board/S_Board";
import { useEffect, useState } from "react";
import axios from "axios";
import loading from "../../assets/img/loading.gif";

interface S_BoardProps {
  url: string;
  title: string;
  board: {
    first: string;
    second: string;
  };
}

interface Post {
  _id: string;
  postNum: string;
  title: string;
  board: string;
  date: string;
  user: string;
  like: number;
}

function S_Board(props: S_BoardProps) {
  const navigate = useNavigate();
  const [boardData, setBoardData] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get(`/main/${props.board.first}/${props.board.second}`)
      .then((response) => {
        // 병합할 배열에 대한 명시적인 형식을 지정
        const combinedPosts: Post[] = [...response.data.firstPost, ...response.data.secondPost].reverse();

        combinedPosts.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);

          // 내림차순으로 날짜 비교
          return dateB.getTime() - dateA.getTime();
        });

        const CombinedPosts = combinedPosts.slice(0, 5);
        setBoardData(CombinedPosts); // 수정: CombinedPosts로 상태 업데이트
      })
      .catch((error) => {
        console.error("데이터를 불러오는 중 오류 발생", error);
      });
  }, []);

  const toBoard = (url: string) => {
    navigate(url);
  };

  const getBoardName = (board: string) => {
    // board 값에 따라 반환할 이름을 매핑합니다.
    if (board === "buy") {
      return "구매";
    } else if (board === "sell") {
      return "판매";
    } else if (board === "free") return "자유";
    else return "동아리";
  };

  return (
    <S.Board>
      <S.Header onClick={() => toBoard(props.url)}>
        <S.BoardTitle>{props.title}</S.BoardTitle>
        <S.BoardLink>더보기+</S.BoardLink>
      </S.Header>
      {boardData.length > 0 ? (
        boardData.map((index) => (
          <div key={index._id} style={{ width: "600px", display: "flex", justifyContent: "space-between", padding: "7px" }}>
            <S.PostBoard>{getBoardName(index.board)}</S.PostBoard>
            <S.PostTitle onClick={() => navigate(`/post/${index.board}/${index.postNum}`)}>{index.title}</S.PostTitle>
          </div>
        ))
      ) : (
        <div style={{ height: "80%", textAlign: "center" }}>
          <img style={{ top: "50%", transform: "translateY(-50%)", width: "30%", height: "30%", position: "relative" }} src={loading} />
        </div>
      )}
    </S.Board>
  );
}

export default S_Board;
