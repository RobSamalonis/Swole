import { LOGIN, LOGOUT } from "../actions/types";

const initialState = { isFetching: false, user: null };

export default function articles(state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      return Object.assign({}, state, {
        isFetching: false,
        user: action.payload
      });
    }
    case LOGOUT: {
      return Object.assign({}, state, {
        isFetching: false,
        user: null
      });
    }
    default:
      return state;
  }
}
