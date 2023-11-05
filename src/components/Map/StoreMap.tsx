import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import LocationMark from "../../assets/img/LocaionMark.png";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getLocation } from "../../api/getLocation";

/* CSS 스타일 */
const UserLocationMarker = styled.div`
  background-color: #ffaaff;
  width: 60px;
  height: 60px;
  text-align: center;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #ff44ff;
  }
`;

const MapCard = styled.div`
  background: white;
  position: relative;
  width: 30%;
  float: right;
  height: 500px;
  border: 2px solid rgb(0, 0, 0, 0.2);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  padding: 20px;
`;

const Mark = styled.img`
  height: 35px;
  float: left;
  margin-right: 40px;
`;

const LocationBtn = styled.button`
  width: 43%;
  background-color: #bb86fc;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.4);
  color: white;
  border: none;
  height: 50px;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  transition: box-shadow 0.3s;

  &:hover {
    background-color: #6d14b8;
  }
`;

/* CSS 스타일 */

declare global {
  interface Window {
    kakao: any;
  }
}

type LocationData = {
  latitude: number;
  longitude: number;
};

function StoreMap() {
  const { name } = useParams<{ name: string }>();
  const [center, setCenter] = useState<LocationData>({ latitude: 33.566657, longitude: 126.978359 });
  const [storeLocation, setStoreLocation] = useState<LocationData>({ latitude: 33.566657, longitude: 126.978359 }); // 매장 좌표
  const [userLocation, setUserLocation] = useState<LocationData>({ latitude: 33.566657, longitude: 126.978359 }); // 현재 위치 & 초기 좌표: 서울시청

  useEffect(() => {
    // 현재 위치
    getLocation()
      .then((location) => {
        const data = location as LocationData;
        setUserLocation(data);
      })
      .catch((error) => {
        console.error("Error getting user location:", error);
      });
    axios
      .get(`http://localhost:8080/store/${name}`)
      .then((response) => {
        setCenter({ latitude: response.data.latlng.latitude, longitude: response.data.latlng.longitude });
        setStoreLocation({ latitude: response.data.latlng.latitude, longitude: response.data.latlng.longitude });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [name]);

  useEffect(() => {}, []);

  const toUser = () => {
    setCenter(userLocation);
  };

  const toStore = () => {
    setCenter(storeLocation);
  };

  return (
    <MapCard>
      <div style={{ display: "flex", alignItems: "center", paddingBottom: "10px", margin: "20px 0px 20px 0px" }}>
        <Mark src={LocationMark} />
        <h1 style={{ margin: "0px" }}>Location</h1>
      </div>
      <Map center={{ lat: center.latitude, lng: center.longitude }} style={{ width: "100%", height: "300px" }}>
        <CustomOverlayMap position={{ lat: userLocation?.latitude || 0, lng: userLocation?.longitude || 0 }}>
          <UserLocationMarker>현위치</UserLocationMarker>
        </CustomOverlayMap>
        <MapMarker position={{ lat: storeLocation.latitude, lng: storeLocation.longitude }}></MapMarker>
      </Map>
      <div style={{ width: "100%", height: "100px", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
        <LocationBtn onClick={toUser}>내 위치</LocationBtn>
        <LocationBtn onClick={toStore}>매장 위치</LocationBtn>
      </div>
    </MapCard>
  );
}

export default StoreMap;
