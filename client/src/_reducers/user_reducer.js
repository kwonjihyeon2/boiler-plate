//state와 action을 인자로 받는 reducer
import { AUTH_ACTION, LOGIN_ACTION, REGISTER_ACTION } from "../_action/types";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_ACTION:
      return { ...state, loginSuccess: action.payload };
    //   break;
    case REGISTER_ACTION:
      return { ...state, register: action.payload };
    //   break;
    case AUTH_ACTION:
      //서버에서 유저정보를 클라이언트로 보내줄 것이기때문에 유저데이터라고 지정함.
      return { ...state, userData: action.payload };
    default:
      return state;
  }
}
