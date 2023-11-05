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
  height: 130px;
  border-bottom: 1px solid silver;
  padding: 20px 0 20px 0;
`;

export const InfoBtn = styled.div`
  width: 50px;
  position: relative;
  left: 20px;
  padding: 7px;
  margin: 10px 30px 0 0;
  border: 1px solid silver;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background: #e9e9e9;
  }
`;

export const InfoLabel = styled.div`
  position: relative;
  width: 70%;
  left: 27px;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
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
  height: calc(100% - 390px);
  overflow: scroll;
`;

export const ContentTable = styled.div`
  &:hover {
    background: rgb(255, 237, 246, 0.7);
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
  margin-top: 30px;
  width: 65px;
  height: 30px;
  text-align: center;
  border: 1px solid silver;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;

  cursor: pointer;
  &:hover {
    background: #e9e9e9;
  }
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
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
`;

export const SearchBoxInput = styled.input`
  width: 80%;
  padding-left: 10px;
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
  border-top: 2px solid #f7f7f8;
  position: relative;
  width: 90%;
  height: auto;
  max-height: 400px;
  top: 40px;
  overflow: scroll;
  margin: 0 auto;
  background: white;
  box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
`;

export const DropDownList = styled.div`
  padding: 10px;
  margin: 0px 0px 10px 0px;
  &:hover {
    background: #e0e0e0;
  }
  cursor: pointer;
`;
export const DropDown = styled.div`
  padding-left: 10px;
  margin: 0px 5px 10px 5px;
  color: silver;
`;

export const InfoWindow = styled.div`
  background: white;
  width: 300px;
  height: 200px;
  border: 1px solid rgba(0, 0, 0, 0.2); /* 회색 흐린 테두리 */
  box-shadow: 2px 2px 1px rgba(128, 128, 128, 0.1); /* 회색 그림자 */
  padding: 20px;
`;

export const InfoWindowHeader = styled.div`
  display: flex;
  align-items: center;
`;

export const InfoTitle = styled.div`
  width: auto;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 23px;
  font-weight: bold;
  margin-right: 5px;
  cursor: pointer;
  &:hover {
    border-bottom: 1px solid black;
  }
`;

export const InfoDetailBtn = styled.div`
  width: 24px;
  margin-right: auto;
  display: flex;
  align-items: center;
`;

export const InfoCancelBtn = styled.div`
  width: 5%;
  display: flex;
  align-items: center;
`;

export const Road = styled.div`
  min-width: 350px;
  background: white;
  border-right: 1px solid silver;
  height: 100%;
`;

export const RoadTitle = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 30px;
  font-weight: bold;
  margin-right: 10px;
`;

export const RoadTime = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 30px;
  font-weight: bold;
  margin-right: 10px;
`;

export const RoadDistance = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 20px;
  margin-right: auto;
`;

export const RoadPoly = styled.div`
  &:hover {
    background: rgb(255, 237, 246, 0.7);
  }
`;
