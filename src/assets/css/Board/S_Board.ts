import styled from "styled-components";

/* ButtonStyles.css */
export const Board = styled.div`
  width: 50%;
  height: 235px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  margin: 20px 5px 10px 5px;
  background-color: white;
`;

export const Header = styled.div`
  width: 98%;
  height: 35px;
  position: relative;
  background-color: #ad46e0;
  padding: 5px;
`;

export const BoardTitle = styled.div`
  position: relative;
  float: left;
  cursor: pointer;
  font-size: 20px;
  color: white;
  top: 50%;
  transform: translateY(-50%);
  padding-left: 12px;
`;

export const BoardLink = styled.div`
  position: relative;
  float: right;
  cursor: pointer;
  top: 50%;
  transform: translateY(-50%);
  padding-right: 6px;
  color: #ffaaff;
`;

export const PostBoard = styled.div`
  width: 8%;
  text-align: center;
  color: white;
  background-color: #ffaaff;
  border-radius: 5px;
`;

export const PostTitle = styled.div`
  width: 90%;
  text-align: left;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
