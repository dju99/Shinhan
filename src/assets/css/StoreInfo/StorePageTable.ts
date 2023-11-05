import styled from "styled-components";
import { Likes } from "../Board/MainBoard";

export const Table = styled.div`
  background: white;
  position: relative;
  width: 60%;
  height: 480px;
  padding: 30px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); /* 아래쪽 그림자 추가 */
`;

export const LikesBtn = styled.img`
  position: absolute;
  right: 30px;
  top: 20px;
  height: 33px;
  cursor: pointer;

  /* 호버 상태일 때 다른 이미지 표시 */
  &:hover {
    content: url(${Likes}); /* 호버 시 Likes 이미지로 변경 */
  }
`;

export const StoreName = styled.div`
  font-size: 45px;
  font-weight: bold;
`;

export const Icon = styled.img`
  height: 25px;
  margin-right: 20px;
`;

export const StoreAddress = styled.div`
  width: 100%;
  margin: 20px 0 20px 0;
  font-size: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.3);
`;
