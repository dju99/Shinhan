import styled from "styled-components";

/* ButtonStyles.css */
export const Board = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 750px;
  background-color: white;
  border: 2px solid rgb(0, 0, 0, 0.1);
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1); /* 아래쪽 그림자 추가 */
`;

export const BoardHeader = styled.div`
  display: flex;
`;

export const SelectBoard = styled.div`
  font-size: 25px;
  margin: 30px 20px 0px;
  cursor: pointer;
  position: relative;
  padding-bottom: 20px;
  &::before {
    content: "";
    position: absolute;
    width: 0;
    height: 3px;
    background-color: #bb86fc;
    left: 0;
    bottom: 0;
    transition: width 0.3s; /* 애니메이션 효과를 추가합니다. */
  }

  &:hover::before {
    width: 100%;
  }
`;

export const Table = styled.div`
  display: flex; // 내용을 가로로 나열
  justify-content: space-between; // 컨텐츠 간 간격을 최대화
  width: 1200px;
  margin: 20px auto;
  margin-top: 0;
  text-align: center;
  border-bottom: 5px solid #ad46e0;
  padding: 10px 0;
`;

export const PostNum = styled.div`
  width: 20px;
`;

export const Title = styled.div`
  width: 750px;
  cursor: pointer;
`;

export const Date = styled.div`
  width: 150px;
`;

export const User = styled.div`
  width: 150px;
`;

export const Likes = styled.div`
  width: 100px;
`;

export const PostTitle = styled.div`
  width: 750px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const Content = styled.div`
  display: flex; // 내용을 가로로 나열
  justify-content: space-between; // 컨텐츠 간 간격을 최대화
  width: 1200px;
  margin: 20px auto;
  padding: 10px 0 10px 0;
  border-bottom: 1px solid silver;
  text-align: center;
`;

export const PaginationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: black;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #bb86fc;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: #8b00ff;
  }
`;
