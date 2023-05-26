import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 3000,
  duration: "60s",
  // stages: [
  //   { duration: "30s", target: 10 },
  //   { duration: "1m30s", target: 500 },
  //   { duration: "20s", target: 0 },
  // ],
};

export default function () {
  const about = http.get("http://localhost:3005/api/about/1");
  const amenities = http.get("http://localhost:3005/api/amenities/1");
  const tenAmenities = http.get("http://localhost:3005/api/amenities/ten/1");
  const gallery = http.get("http://localhost:3005/api/gallery/photo_url/1");
  const users = http.get("http://localhost:3005/api/users/1");
  const host = http.get("http://localhost:3005/api/hosts/about/1");
  const reviewsHost = http.get("http://localhost:3005/api/reviews");
  const hostPhoto = http.get("http://localhost:3005/api/hosts/photo/1");
  const location = http.get("http://localhost:3005/api/location/1");
  const users2 = http.get("http://localhost:3005/api/users/1");
  const title = http.get("http://localhost:3005/api/title/1");
  const reviews = http.get("http://localhost:3005/api/reviews/1");
  sleep(1);
}
