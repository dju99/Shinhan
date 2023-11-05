import styled from "styled-components";

export const MapCard = styled.div`
  background: white;
  position: relative;
  width: 30%;
  float: right;
  height: 500px;
  border: 2px solid rgb(0, 0, 0, 0.2);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); /* 아래쪽 그림자 추가 */
  padding: 20px;
`;

export const Mark = styled.img`
  height: 35px;
  float: left;
  margin-right: 40px;
`;

export const LocaionBtn = styled.button`
  width: 43%;
  background-color: #bb86fc;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.4); /* 호버 시 그림자를 약간 진하게 */
  color: white;
  border: none;
  height: 50px;
  border-radius: 4px;
  font-size: 18px;

  cursor: pointer;
  transition: box-shadow 0.3s; /* 그림자 효과에 애니메이션을 추가 */

  &:hover {
    background-color: #6d14b8;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.4); /* 호버 시 그림자를 약간 진하게 */
  }
`;
