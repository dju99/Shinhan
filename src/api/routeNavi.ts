import axios from "axios";

interface LatLng {
  originlat: string;
  originlng: string;
  destinationlat: string;
  destinationlng: string;
}

interface RouteData {
  data: { lng: number; lat: number }[];
  distance: number;
}

export async function RouteNavi(props: LatLng): Promise<RouteData> {
  try {
    const REST_API_KEY = "77053facdeb7604f0c200de620820a1e";
    const apiUrl = "https://apis-navi.kakaomobility.com/v1/directions";

    const params = {
      origin: `${props.originlat},${props.originlng}`,
      destination: `${props.destinationlat},${props.destinationlng}`,
      waypoints: "",
      priority: "RECOMMEND",
      car_fuel: "GASOLINE",
      car_hipass: false,
      alternatives: false,
      road_details: false,
    };

    const response = await axios.get(apiUrl, {
      params,
      headers: {
        Authorization: `KakaoAK ${REST_API_KEY}`,
      },
    });

    const roads = response.data.routes[0].sections[0].roads;
    const distance = response.data.routes[0].sections[0].distance;

    const allVertexes = [].concat(...roads.map((location: { vertexes: any }) => location.vertexes));
    const oddVertexes: number[] = allVertexes.filter((_, index) => index % 2 === 0);
    const evenVertexes: number[] = allVertexes.filter((_, index) => index % 2 === 1);

    const latLngs: { lng: number; lat: number }[] = [];
    for (let i = 0; i < oddVertexes.length; i++) {
      latLngs.push({
        lat: evenVertexes[i],
        lng: oddVertexes[i],
      });
    }

    return { data: latLngs, distance };
  } catch (error) {
    console.error("오류:", error);
    return Promise.reject(error);
  }
}
