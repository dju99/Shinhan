import { Map, MapMarker, ZoomControl, MapTypeControl, CustomOverlayMap, MapInfoWindow } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getLocation } from "../../api/getLocation";

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

declare global {
  interface Window {
    kakao: any;
  }
}

interface Store {
  _id: string;
  name: string;
  address: string;
  latlng: { latitude: string; longitude: string };
  url: string;
  number: string;
  time: [];
  type: [];
}
interface InfoWindow {
  name: string;
  latlng: {
    lat: number;
    lng: number;
  };
  type: string[];
}

type LocationData = {
  latitude: number;
  longitude: number;
};

const Mainmap = () => {
  const [location, setLocation] = useState<LocationData>({ latitude: 0, longitude: 0 });
  const [storeData, setStoreData] = useState<Store[]>([]);
  const [markStoreData, setMarkStoreData] = useState<Store[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<InfoWindow | null>(null);
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 현재 위치
    getLocation()
      .then((location) => {
        const data = location as LocationData;
        setUserLocation(data);
        setLocation(data);
      })
      .catch((error) => {
        console.error("Error getting user location:", error);
      });
    axios
      .get("/store")
      .then((response) => {
        setMarkStoreData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const onMapClick = () => {
    setSelectedMarker(null);
  };

  const onMarkerClick = (props: Store) => {
    setSelectedMarker({
      name: props.name,
      latlng: { lat: parseFloat(props.latlng.latitude), lng: parseFloat(props.latlng.longitude) },
      type: props.type,
    });
  };

  return (
    <Map
      center={{ lat: location.latitude, lng: location.longitude }}
      style={{ width: "50%", height: "400px", margin: "20px 5px 10px 5px" }}
      level={3}
      onClick={onMapClick}
    >
      {markStoreData.map((store, index) => {
        const latitude = parseFloat(store.latlng?.latitude);
        const longitude = parseFloat(store.latlng?.longitude);
        if (!isNaN(latitude) && !isNaN(longitude)) {
          return <MapMarker key={`${store._id}-${index}`} position={{ lat: latitude, lng: longitude }} onClick={() => onMarkerClick(store)} />;
        }
      })}
      {selectedMarker && (
        <MapInfoWindow position={selectedMarker.latlng}>
          <div onClick={() => navigate(`/store/${selectedMarker.name}`)} style={{ cursor: "pointer", display: "flex" }}>
            <div>{selectedMarker.name}</div>
          </div>
        </MapInfoWindow>
      )}
      <MapTypeControl position={"TOPRIGHT"} />
      <ZoomControl position={"RIGHT"} />
      <CustomOverlayMap position={{ lat: userLocation?.latitude || 0, lng: userLocation?.longitude || 0 }}>
        <UserLocationMarker>현위치</UserLocationMarker>
      </CustomOverlayMap>
    </Map>
  );
};

export default Mainmap;
