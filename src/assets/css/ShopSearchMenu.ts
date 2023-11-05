import styled from "styled-components";

/* css */
export const ShopSearchBoby = styled.div`
  position: relative;
  width: 400px;
  height: calc(100vh - 80px);
  background-color: white;
`;

export const MenuHeadr = styled.div`
  width: 400px;
  height: 200px;
  background: #bb86fc;
`;

export const SearchBar = styled.div`
  position: relative;
  top: 50px;
  width: 90%;
  height: 40px;
  margin: 0 auto;
  background: white;
  border-radius: 3px;
  display: flex;
  align-items: center; /* 수직 가운데 정렬을 위한 설정 */
`;

export const SearchInput = styled.input`
  width: 90%;
  padding-left: 10px;
  height: 30px;
  background: white;
  outline: none;
  border: none;
`;

export const SearchBtn = styled.img`
  width: 10%;
  cursor: pointer;
`;

export const UserLocation = styled.div`
  width: 100%;
  height: 200px;
  border: 1px solid black;
`;

export const LocInfo = styled.div`
  border: 1px solid black;
  padding: 10px;
  height: 100px;
`;

export const SearchInfo = styled.div`
  padding: 13px;
  &:hover {
    background: #ffddff;
  }
  border-bottom: 1px solid silver;
`;

export const TypeInfoTable = styled.div`
  height: calc(100vh - 400px);
  overflow: scroll;
`;

export const TypeInfo = styled.div`
  padding: 13px;
  overflow: scroll;
  &:hover {
    background: #ffddff;
  }
  border-bottom: 1px solid silver;
`;

export const Name = styled.div`
  font-size: 35px;
  font-weight: 500;
`;

export const Adress = styled.div`
  font-size: 15px;
  font-weight: 400;
  margin-top: 10px;
`;
/* css */
