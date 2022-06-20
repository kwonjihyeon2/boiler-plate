//state와 action을 인자로 받는 reducer
import { LOGIN_ACTION } from "../_action/types";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_ACTION:
      return { ...state, loginSuccess: action.payload };

    default:
      return state;
  }
}
