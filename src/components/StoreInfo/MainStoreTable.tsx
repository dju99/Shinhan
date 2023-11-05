import React, { useState, useEffect } from "react";
import * as M from "../../assets/css/StoreInfo/MainStoreTable";
import axios from "axios";
import loading from "../../assets/img/loading.gif";
import { useNavigate } from "react-router-dom";

interface Store {
  name: string;
  address: string;
  url: string;
}

function StoreInfo() {
  const [data, setData] = useState<Store[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 서버에서 데이터를 가져오는 요청
    axios
      .get("/store")
      .then((response) => {
        setData(response.data); // 데이터를 React 상태(State)에 저장
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <M.Storeinfo>
      <M.StoreinfoHead>
        <M.StoreinfoName>이름</M.StoreinfoName>
        <M.StoreinfoAddress>주소</M.StoreinfoAddress>
      </M.StoreinfoHead>
      <M.StoreinfoContent>
        {data.length > 0 ? (
          data.map((store, index) => (
            <M.StoreItem key={index}>
              <M.Name onClick={() => navigate(`/store/${store.name}`)}>{store.name}</M.Name>
              <M.Address onClick={() => navigate(`/store/${store.name}`)}>{store.address}</M.Address>
            </M.StoreItem>
          ))
        ) : (
          <div style={{ height: "360px" }}>
            <img style={{ top: "50%", transform: "translateY(-50%)", width: "30%", height: "30%", position: "relative" }} src={loading} />
          </div>
        )}
      </M.StoreinfoContent>
    </M.Storeinfo>
  );
}

export default StoreInfo;
