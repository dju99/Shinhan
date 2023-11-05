import { Root, Content } from "../assets/css/MainStructure";
import Header from "../components/Header";
import MainBoard from "../components/Board/MainBoard";

function Coummunity() {
  return (
    <Root>
      <Header />
      <Content>
        <MainBoard url={{ first: "/community/free", second: "/community/club" }} boardTitle={{ first: "자유게시판", second: "동아리" }} />
      </Content>
    </Root>
  );
}

export default Coummunity;
