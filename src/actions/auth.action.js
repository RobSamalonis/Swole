import { LOGOUT, LOGIN } from "./types";

const login = user => {
  return dispatch => dispatch({ type: LOGIN, payload: user });
};

const logout = () => {
  return dispatch => dispatch({ type: LOGOUT });
};

export { logout, login };
