import { Root, Content } from "../assets/css/MainStructure";
import Header from "../components/Header";
import StoreInfoTable from "../components/StoreInfo/MainStoreTable";
import MainMap from "../components/Map/MainMap";
import Carousel from "../components/Carousel";
import S_Board from "../components/Board/S_Board";
import styled from "styled-components";

const Board = styled.div`
  width: 1280px;
  display: flex;
  justify-content: space-between; /* 요소들을 양쪽으로 분배 */
`;

function Main() {
  return (
    <Root>
      <Header />
      <Content>
        <Carousel />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "20px",
            justifyContent: "space-between",
          }}
        >
          <MainMap />
          <StoreInfoTable />
        </div>
        <Board>
          <S_Board url="/market/sell" title="중고악기" board={{ first: "sell", second: "buy" }} />
          <S_Board url="/community/free" title="자유게시판" board={{ first: "free", second: "club" }} />
        </Board>
      </Content>
    </Root>
  );
}

export default Main;
