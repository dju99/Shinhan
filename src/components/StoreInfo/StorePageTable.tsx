import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Clock from "../../assets/img/ClockIcon.png";
import Number from "../../assets/img/NumberIcon.png";
import URL from "../../assets/img/UrlIcon.png";
import Tag from "../../assets/img/Tag.png";
import NonLikes from "../../assets/img/NonLikes.png";
import axios from "axios";
import * as S from "../../assets/css/StoreInfo/StorePageTable";

/* type */
interface Store {
  name: string;
  address: string;
  url: string;
  number: string;
  time: [];
  type: string[];
}
/* type */

function StoreInfo() {
  const { name } = useParams<{ name: string }>(); // URL 파라미터에서 선택한 매장 이름을 읽어옴
  const [store, setStore] = useState<Store | null>(null); // 선택한 매장 정보를 저장할 상태 추가

  useEffect(() => {
    // 서버에서 데이터를 가져오는 요청
    axios
      .get(`/store/${name}`) // 선택한 매장 이름을 URL에 포함
      .then((response) => {
        setStore(response.data); // 데이터를 React 상태(State)에 저장
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [name]); // name이 변경될 때마다 useEffect 실행

  return (
    <S.Table>
      <S.StoreName>{store?.name}</S.StoreName>
      <S.LikesBtn src={NonLikes} />
      <S.StoreAddress>{store?.address}</S.StoreAddress>
      <div style={{ margin: "0", display: "flex", alignItems: "center" }}>
        <S.Icon src={Tag} />
        <div style={{ fontSize: "30px", fontWeight: "bold" }}>{store?.type.join(", ")}</div>
      </div>
      <div style={{ margin: "0", display: "flex", alignItems: "center", marginTop: "25px" }}>
        <S.Icon src={Number} />
        <div style={{ fontSize: "20px" }}>{store?.number}</div>
      </div>
      <div style={{ margin: "0 0 30px 0", display: "flex", alignItems: "center" }}>
        <S.Icon src={Clock} />
        <div style={{ marginTop: "25px" }}>
          {store?.time.map((time, index) => (
            <div key={index} style={{ width: "300px", height: "30px" }}>
              <div style={{ fontSize: "20px", marginTop: "10px" }}>{time}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ margin: "20px 0", display: "flex", alignItems: "center" }}>
        <S.Icon src={URL} />
        <a href={store?.url} style={{ textDecoration: "none", color: "blue" }}>
          {store?.url}
        </a>
      </div>
    </S.Table>
  );
}

export default StoreInfo;
