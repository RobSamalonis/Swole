import { combineReducers } from "redux";

import auth from "./auth.reducer";
import firebase from "./firebase.reducer";
import router from "./router.reducer";

const rootReducer = combineReducers({ firebase, auth, router });

export default rootReducer;
