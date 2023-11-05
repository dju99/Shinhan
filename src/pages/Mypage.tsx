import { Root, Content } from "../assets/css/MainStructure";
import MyPage from "../components/Mypage/Mypage";
import styled from "styled-components";
import Header from "../components/Header";

function Mypage() {
  return (
    <Root>
      <Header />
      <Content>
        <MyPage />
      </Content>
    </Root>
  );
}

export default Mypage;
