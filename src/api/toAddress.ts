import axios from "axios";

const KAKAO_API_KEY = "5e62bc916b5d4c4a5461ccac36b434dd";

export function toAddress(latitude: number, longitude: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const apiUrl = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`;

    axios
      .get(apiUrl, {
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.documents && data.documents.length > 0) {
          const firstResult = data.documents[0];
          const address = firstResult.address.address_name;
          resolve(address);
        } else {
          reject("좌표를 주소로 변환할 수 없습니다.");
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
