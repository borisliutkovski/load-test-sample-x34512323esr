import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    { duration: "1s", target: 500 }, // simulate ramp-up of traffic from 1 to 100 users over 1 second.
    { duration: "10s", target: 500 }, // stay at 100 users for 10 seconds
    { duration: "1s", target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ["p(99)<1500"], // 99% of requests must complete below 1.5s
  },
};

export default function () {
    const res = http.get("http://api:8001/slow");
    check(res, { "200res": (res) => res.status == 200 });
    sleep(1);
}
