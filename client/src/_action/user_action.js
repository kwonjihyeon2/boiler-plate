//state를 변경하기 위해 action type 지정
import axios from "axios";
import { LOGIN_ACTION } from "./types";

export function loginUser(dataToSubmit) {
  const result = axios
    .post("/api/user/login", dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_ACTION,
    payload: result,
  };
}
