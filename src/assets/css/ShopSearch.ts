import styled from "styled-components";
import loc from "../img/ID.png";

export const Root = styled.div`
  display: flex;
  width: 100vw;
  height: calc(100vh - 80px);
`;

export const Menu = styled.div`
  width: 380px;
  min-width: 380px;
  height: 100%;
  background: white;
  border-right: 1px solid silver;
`;

export const Map = styled.div`
  width: 100%;
  height: 100%;
`;

export const Info = styled.div`
  width: 100%;
  height: 110px;
  border-bottom: 1px solid silver;
  padding: 20px 0 20px 0;
`;

export const InfoBtn = styled.div`
  width: 120px;
  position: relative;
  left: 20px;
  padding: 7px;
  margin-top: 10px;
  border-radius: 10px;
  background: #bb86fc;
  color: white;
  font-weight: bold;

  cursor: pointer;
  &:hover {
    background: #ffddff;
    color: black;
    font-weight: normal;
  }
`;

export const InfoLabel = styled.div`
  position: relative;
  width: 70%;
  left: 27px;
  font-size: 20px;
  font-weight: bold;
`;

export const Header = styled.div`
  width: 100%;
  height: 130px;
  background: #bb86fc;
`;

export const InfoResult = styled.div`
  color: #ad46e0;
  font-weight: bold;
`;

export const HomeBtn = styled.div`
  cursor: pointer;
  width: 60px;
  height: 30px;
  position: relative;
  top: 30px;
  left: 30px;
`;

export const Content = styled.div`
  width: 380px;
  height: calc(100% - 370px);
  overflow: scroll;
`;

export const ContentTable = styled.div`
  &:hover {
    background: #ffddff;
  }
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid silver;
`;

export const ContentName = styled.div`
  font-size: 25px;
  font-weight: bold;
`;

export const ContentAddress = styled.div`
  margin-top: 5px;
  font-size: 13px;
`;

export const ContentType = styled.div`
  margin-top: 15px;
  font-size: 18px;
`;

export const ContentLink = styled.div`
  margin: 10px 0 0 0;
`;

export const ContentBtn = styled.div`
  margin-top: 10px;
  width: 65px;
  height: 30px;
  text-align: center;
  border: 1px solid silver;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
`;

export const SearchTextBox = styled.form`
  background: white;
  display: flex;
  justify-content: space-between;
  width: 90%;
  height: 60px;
  position: relative;
  top: 40px;
  margin: 0 auto;
`;

export const SearchBoxInput = styled.input`
  width: 80%;
  padding-left: 7px;
  border: none;
  font-size: 15px;
  outline: none;
  font-weight: bold;
`;

export const SearchBoxBtn = styled.button`
  width: 15%;
  border: none;
  background: white;
  cursor: pointer;
`;

export const SearchTypeBox = styled.div`
  width: 100%;
  margin: 0 auto;
  z-index: 0;
  background: #bb86fc;
  padding: 30px 0 20px 0;
`;

export const TypeBtn = styled.div`
  border-radius: 5px;
  width: 80px;
  height: 30px;
  text-align: center;
  cursor: pointer;
  background: #bb86fc;
  &:hover {
    background: #a668e3;
  }
  color: white;
  font-size: 17px;
  font-weight: bold;
`;

export const DropDownBox = styled.div`
  z-index: 1;
  position: relative;
  width: 90%;
  height: auto;
  max-height: 200px;
  top: 40px;
  overflow: scroll;
  margin: 0 auto;
  background: white;
  box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
`;

export const DropDownList = styled.div`
  padding-left: 10px;
  margin: 0px 5px 10px 5px;
  &:hover {
    background: #ffddff;
  }
  cursor: pointer;
`;
export const DropDown = styled.div`
  padding-left: 10px;
  margin: 0px 5px 10px 5px;
  color: silver;
`;
