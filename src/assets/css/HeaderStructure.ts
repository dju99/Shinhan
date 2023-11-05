import styled from "styled-components";

export const Root = styled.div`
  position: relative;
  background-color: white;
  font-weight: 700;
  width: 100vw;
  min-width: 1280px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgb(0, 0, 0, 0.1);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1); /* 아래쪽 그림자 추가 */
  font-family: "Noto Sans KR", sans-serif;
`;

export const Content = styled.div`
  position: relative;
  width: 1280px;
`;
