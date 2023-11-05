import { useEffect, useState } from "react";
import searchIcon from "../assets/img/Search.png";
import * as M from "../assets/css/ShopSearch";
import { CustomOverlayMap, Map, MapInfoWindow, MapMarker, MapTypeControl, MarkerClusterer, Polyline, ZoomControl } from "react-kakao-maps-sdk";
import { getLocation } from "../api/getLocation";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RouteNavi } from "../api/routeNavi";
import axios from "axios";
import { toAddress } from "../api/toAddress";

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

type LocationData = {
  latitude: number;
  longitude: number;
};

interface Store {
  _id: string;
  name: string;
  address: string;
  latlng: { latitude: string; longitude: string };
  url: string;
  number: string;
  time: string[];
  type: string[];
  key: string[];
}

interface SearchProps {
  searchText: string;
}

interface PolyLine {
  lat: number;
  lng: number;
}

interface infoWindow {
  name: string;
  latlng: {
    lat: number;
    lng: number;
  };
  type: string[];
}

function ShopSearchContent() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<SearchProps>();
  const [storeData, setStoreData] = useState<Store[]>([]); // 모든 매장 정보
  const [searchStoreData, setSearchStoreData] = useState<Store[]>([]); // 검색 매장 정보
  const [mapLevel, setMapLevel] = useState(3);
  const [location, setLocation] = useState<LocationData>({ latitude: 33.566657, longitude: 126.978359 }); // 센터 위치 & 초기 좌표: 서울시청
  const [userLocation, setUserLocation] = useState<LocationData>({ latitude: 33.566657, longitude: 126.978359 }); // 현재 위치 & 초기 좌표: 서울시청
  const [userAddress, serUserAddress] = useState("");
  const [polylinePath, setPolylinePath] = useState<PolyLine[] | PolyLine[][] | null>(null); // 경로 표시
  const [selectedMarker, setSelectedMarker] = useState<infoWindow | null>(null);

  const [array, setArray] = useState<string[]>([]); // 자동완성 DB
  const [inputValue, setInputVlaue] = useState("");
  const [inputValue2, setInputVlaue2] = useState("");
  const [isHaveInput, setIsHaveInput] = useState(false);
  const [dropDownList, setDropDownList] = useState<string[]>([]);

  useEffect(() => {
    // 현재 위치
    getLocation()
      .then((location) => {
        const data = location as LocationData;
        setLocation(data);
        setUserLocation(data);

        toAddress(data.latitude, data.longitude).then((location) => {
          serUserAddress(location);
        });
      })
      .catch((error) => {
        console.error("Error getting user location:", error);
      });
    axios
      .get("http://localhost:8080/store")
      .then((response) => {
        setStoreData(response.data);
        setArray(response.data.map((store: { name: string }) => store.name));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // 매장/시/군/구 검색
  const onSubmit = () => {
    setPolylinePath(null);
    setInputVlaue2("");

    // store.name에 입력값이 포함되어 있는 경우
    const matchStoreByName = storeData.filter((store) => store.name.includes(inputValue));

    // store.address에 입력값이 포함되어 있는 경우
    const matchStoreByAddress = storeData.filter((store) => store.address.includes(inputValue));

    // 중복된 매장을 제외하고 두 검색 결과를 합칩니다
    const combinedResults = [...matchStoreByName, ...matchStoreByAddress].filter((store, index, self) => index === self.findIndex((s) => s._id === store._id));

    setSearchStoreData(combinedResults);

    reset();
    setIsHaveInput(false);
    setInputVlaue2(inputValue);
    setInputVlaue("");
    setDropDownList([]);
  };

  // 기타, 베이스, 피아노, 드럼 버튼 클릭
  const typeSearch = (type: string) => {
    setPolylinePath(null);

    // storeData 배열에서 type과 일치하는 store 객체를 찾습니다.
    const matchingStores = storeData.filter((store) => {
      if (Array.isArray(store.type)) {
        return store.type.some((storeType) => storeType === type);
      } else {
        return store.type === type;
      }
    });
    setInputVlaue2("");
    setSearchStoreData(matchingStores);
  };

  // 경로 찾기
  const toRoute = (lat: string, lng: string) => {
    RouteNavi({
      originlat: userLocation.longitude.toString(),
      originlng: userLocation.latitude.toString(),
      destinationlat: lng,
      destinationlng: lat,
    })
      .then((data) => {
        setPolylinePath(data.data); // 라인 경로를 설정합니다.
        console.log(data.distance); // 거리를 출력합니다.
      })
      .catch((error: { response: { data: any } }) => {
        console.error("RouteNavi 오류:", error);

        if (error.response) {
          console.error("응답 데이터:", error.response.data);
        }
      });
  };

  // 마커 클릭
  const onMarkerClick = (props: Store) => {
    setSelectedMarker({
      name: props.name,
      latlng: {
        lat: parseFloat(props.latlng.latitude),
        lng: parseFloat(props.latlng.longitude),
      },
      type: props.type,
    });
    setSearchStoreData([props]);
  };

  const store2Center = (props: Store) => {
    setLocation({
      latitude: parseFloat(props.latlng.latitude),
      longitude: parseFloat(props.latlng.longitude),
    });
    setSelectedMarker({
      name: props.name,
      latlng: {
        lat: parseFloat(props.latlng.latitude),
        lng: parseFloat(props.latlng.longitude),
      },
      type: props.type,
    });
    setMapLevel(3);
  };

  const onMapClick = () => {
    setSelectedMarker(null);
    setIsHaveInput(false);
  };

  const onMapDragEnd = (map: { getCenter: () => any }) => {
    const newCenter = map.getCenter();
    setLocation({ latitude: newCenter.getLat(), longitude: newCenter.getLng() });
    setSelectedMarker(null);
    setIsHaveInput(false);
  };

  const onMapWheel = (e: React.WheelEvent) => {
    setIsHaveInput(false);
    if (e.deltaY > 0) {
      setMapLevel((prevLevel) => prevLevel - 1);
    } else {
      setMapLevel((prevLevel) => prevLevel + 1);
    }
  };

  const inputChange = (e: any) => {
    const text = e.target.value;
    setInputVlaue(text);
    setIsHaveInput(true);
    if (text === "") setIsHaveInput(false);
    else {
      setIsHaveInput(true);
      setDropDownList(array.filter((storeName) => storeName.includes(text)));
    }
  };

  const clickDropList = (text: string) => {
    setInputVlaue(text);
    setIsHaveInput(false);
  };

  const toUserLocation = () => {
    setLocation({ latitude: userLocation.latitude, longitude: userLocation.longitude });
  };

  return (
    <M.Root>
      <M.Menu>
        <M.Header>
          <M.HomeBtn onClick={() => navigate("/")}>HOME</M.HomeBtn>
          <M.SearchTextBox onSubmit={handleSubmit(onSubmit)}>
            <M.SearchBoxInput
              value={inputValue}
              {...register("searchText")}
              placeholder="매장/시/군/구"
              onChange={inputChange}
              onClick={() => setIsHaveInput(true)}
              onBlur={() => {
                setTimeout(() => {
                  setIsHaveInput(false);
                }, 100); // 100 밀리초 (0.1초) 후에 실행
              }}
              onFocus={() => setIsHaveInput(true)}
            />
            <M.SearchBoxBtn type="submit">
              <img src={searchIcon} style={{ width: "100%" }} alt="" />
            </M.SearchBoxBtn>
          </M.SearchTextBox>
          {isHaveInput && (
            <M.DropDownBox>
              {dropDownList.length === 0 && <M.DropDown style={{ color: "silver" }}>해당하는 단어가 없습니다</M.DropDown>}
              {dropDownList.map((item, index) => {
                return (
                  <M.DropDownList onClick={() => clickDropList(item)} key={index}>
                    {item}
                  </M.DropDownList>
                );
              })}
            </M.DropDownBox>
          )}
        </M.Header>
        <M.SearchTypeBox>
          <div style={{ width: "90%", margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
            <M.TypeBtn onClick={() => typeSearch("기타")}>기타</M.TypeBtn>
            <M.TypeBtn onClick={() => typeSearch("베이스")}>베이스</M.TypeBtn>
            <M.TypeBtn onClick={() => typeSearch("피아노")}>피아노</M.TypeBtn>
            <M.TypeBtn onClick={() => typeSearch("드럼")}>드럼</M.TypeBtn>
          </div>
        </M.SearchTypeBox>
        <M.Info>
          <M.InfoLabel>{userAddress}</M.InfoLabel>
          <M.InfoBtn onClick={toUserLocation}>현위치 바로가기</M.InfoBtn>
          {inputValue2 && (
            <div style={{ display: "flex", margin: "20px 0px 0px 20px", alignItems: "center" }}>
              <M.InfoResult>{inputValue2} </M.InfoResult>
              <div>&nbsp;검색결과&nbsp;</div>
              <div style={{ fontWeight: "bold" }}>{searchStoreData.length}</div>
            </div>
          )}
        </M.Info>
        <M.Content>
          {searchStoreData &&
            searchStoreData.map((store) => (
              <M.ContentTable key={store._id} onClick={() => store2Center(store)}>
                <M.ContentName>{store.name}</M.ContentName>
                <M.ContentAddress>{store.address}</M.ContentAddress>
                <M.ContentType>{store.type.join(", ")}</M.ContentType>
                <M.ContentLink>
                  <a href={`/store/${store.name}`} style={{ color: "blue" }}>
                    {store.url}
                  </a>
                </M.ContentLink>
                <M.ContentBtn onClick={() => toRoute(store.latlng.latitude, store.latlng.longitude)}>길찾기</M.ContentBtn>
              </M.ContentTable>
            ))}
        </M.Content>
      </M.Menu>
      <M.Map>
        <Map
          onWheel={onMapWheel}
          onClick={onMapClick}
          onDragEnd={onMapDragEnd}
          center={{ lat: location.latitude, lng: location.longitude }}
          style={{ width: "100%", height: `calc(100vh - 80px)` }}
          level={mapLevel}
        >
          <MapTypeControl position={"TOPRIGHT"} />
          <ZoomControl position={"RIGHT"} />
          <CustomOverlayMap position={{ lat: userLocation?.latitude || 0, lng: userLocation?.longitude || 0 }}>
            <UserLocationMarker>현위치</UserLocationMarker>
          </CustomOverlayMap>
          <MarkerClusterer averageCenter={true} minLevel={8}>
            {storeData.map((store) => (
              <div key={store._id}>
                {store.latlng && store.latlng.latitude && store.latlng.longitude && (
                  <MapMarker
                    onClick={() => onMarkerClick(store)}
                    position={{ lat: parseFloat(store.latlng.latitude), lng: parseFloat(store.latlng.longitude) }}
                  />
                )}
              </div>
            ))}
          </MarkerClusterer>
          {selectedMarker && selectedMarker.latlng && (
            <MapInfoWindow position={{ lat: selectedMarker.latlng.lat, lng: selectedMarker.latlng.lng }}>
              <div onClick={() => navigate(`/store/${selectedMarker.name}`)} style={{ cursor: "pointer", display: "flex" }}>
                <div>{selectedMarker.name}</div>
              </div>
            </MapInfoWindow>
          )}
          {polylinePath && <Polyline path={polylinePath} strokeColor="red" strokeOpacity={0.7} strokeWeight={5} />}
        </Map>
      </M.Map>
    </M.Root>
  );
}

export default ShopSearchContent;
