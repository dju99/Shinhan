import styled from "styled-components";

export const Storeinfo = styled.div`
  height: 400px;
  overflow: scroll; /* 스크롤바 항상 표시 */
  width: 50%;
  text-align: center;
  background: white;
  border: 2px solid #e5e7eb;
  margin: 10px 5px 10px 5px;
`;

export const StoreinfoHead = styled.div`
  display: flex;
  height: 30px;
  position: sticky;
  top: 0; /* 상단에 고정 */
  background-color: #ad46e0;
  padding: 5px;
  z-index: 1; /* 필요에 따라 z-index를 조절할 수 있습니다. */
`;

export const StoreinfoName = styled.div`
  position: relative;
  width: 30%;
  color: white;
  font-size: 20px;
  top: 50%;
  transform: translateY(-50%);
`;

export const StoreinfoAddress = styled.div`
  width: 70%;
  position: relative;
  color: white;
  font-size: 20px;
  top: 50%;
  transform: translateY(-50%);
`;

export const StoreinfoContent = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

export const StoreItem = styled.div`
  transition: background-color 0.1s;
  border-bottom: 1px solid silver;
  &:hover {
    background-color: #ffddff;
  }
  padding: 5px 0px 5px 0px;
`;
export const Name = styled.div`
  width: 30%;
  float: left;
  cursor: pointer;
`;

export const Address = styled.div`
  width: 70%;
  float: right;
  text-align: left;
  cursor: pointer;
`;
