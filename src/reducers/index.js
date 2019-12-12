import { combineReducers } from "redux";

import firebase from "./firebase.reducer";
import router from "./router.reducer";

const rootReducer = combineReducers({ firebase, router });

export default rootReducer;
