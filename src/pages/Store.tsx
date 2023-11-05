import { Root, Content } from "../assets/css/MainStructure";
import Header from "../components/Header";
import StoreInfo from "../components/StoreInfo/StorePageTable";
import StoreMap from "../components/Map/StoreMap";

function Store() {
  return (
    <Root>
      <Header />
      <Content>
        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", marginTop: "20px" }}>
          <StoreInfo />
          <StoreMap />
        </div>
      </Content>
    </Root>
  );
}

export default Store;
