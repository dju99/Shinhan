// 현재 위치 좌표
export function getLocation() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ longitude, latitude });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject("Geolocation is not supported by your browser.");
    }
  });
}
