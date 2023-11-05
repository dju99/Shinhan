import axios from "axios";

const KAKAO_API_KEY = "91c3fe64de1f3476bcc61e04a96ac676";

export function toLatlng(address: string) {
  return new Promise(async (resolve, reject) => {
    try {
      // Kakao 주소-좌표 변환 API 엔드포인트
      const apiUrl = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`;

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`,
        },
      });

      const data = response.data;

      // 주소를 좌표로 변환하는 데 성공한 경우
      if (data.documents && data.documents.length > 0) {
        const firstResult = data.documents[0];
        const latitude = firstResult.y;
        const longitude = firstResult.x;
        resolve({ latitude, longitude });
      } else {
        reject("주소를 좌표로 변환할 수 없습니다.");
      }
    } catch (error) {
      reject(error);
    }
  });
}
