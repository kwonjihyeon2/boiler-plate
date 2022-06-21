//state를 변경하기 위해 action type 지정
import axios from "axios";
import { AUTH_ACTION, LOGIN_ACTION, REGISTER_ACTION } from "./types";

export function loginUser(dataToSubmit) {
  const result = axios
    .post("/api/user/login", dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_ACTION,
    payload: result,
  };
}

export function registerUser(dataToSubmit) {
  const result = axios
    .post("/api/user/register", dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_ACTION,
    payload: result,
  };
}

export function auth() {
  //인증 정보를 받아오는 상황이기떄문에 get 메서드
  const result = axios.get("/api/users/auth").then((response) => response.data);

  return {
    type: AUTH_ACTION,
    payload: result,
  };
}
