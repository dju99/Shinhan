import { Root, Content } from "../assets/css/MainStructure";
import Header from "../components/Header";
import MainBoard from "../components/Board/MainBoard";

function Market() {
  return (
    <Root>
      <Header />
      <Content>
        <MainBoard url={{ first: "/market/sell", second: "/market/buy" }} boardTitle={{ first: "판매", second: "구매" }} />
      </Content>
    </Root>
  );
}

export default Market;
