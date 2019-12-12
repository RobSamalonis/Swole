import { CHANGE_ROUTE } from "./types";

const changeRoute = route => {
  return dispatch => dispatch({ type: CHANGE_ROUTE, payload: route });
};

export { changeRoute };
