import firebase from "firebase";
import {
  INITIALIZE,
  INITIALIZE_SUCCESS,
  INITIALIZE_ERROR,
  REQUEST_FIREBASE,
  RECIEVED_FIREBASE,
  RECIEVED_FIREBASE_ERROR,
  CLEAR_FIREBASE,
  ADD_EXERCISE,
  ADD_EXERCISE_SUCCESS,
  ADD_EXERCISE_ERROR,
  REQUEST_CREATE_ACCOUNT,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_FAILURE,
  REQUEST_SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  REQUEST_SIGN_OUT,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
  RESET_UPDATES
} from "./types";

var config = {
  apiKey: process.env.REACT_APP_FIREBASE_ID,
  authDomain: "swole-1190b.firebaseapp.com",
  databaseURL: "https://swole-1190b.firebaseio.com"
};

const initializeFirebase = () => {
  return dispatch => {
    dispatch({ type: INITIALIZE });
    firebase.initializeApp(config);
    firebase
      .database()
      .ref("/")
      .once("value")
      .then(snapshot => {
        dispatch({ type: INITIALIZE_SUCCESS, payload: snapshot.val() });
      })
      .catch(error => {
        dispatch({ type: INITIALIZE_ERROR, error });
      });
  };
};

const fetchFirebase = () => {
  return dispatch => {
    dispatch({ type: REQUEST_FIREBASE });
    firebase
      .database()
      .ref("/")
      .once("value")
      .then(snapshot => {
        dispatch({ type: RECIEVED_FIREBASE, payload: snapshot.val() });
      })
      .catch(error => {
        dispatch({ type: RECIEVED_FIREBASE_ERROR });
      });
  };
};

const clearFirebase = () => {
  return dispatch => {
    dispatch({ type: CLEAR_FIREBASE });
  };
};

const addExercise = data => {
  const filtered = data.filter(item => item);
  return dispatch => {
    dispatch({ type: ADD_EXERCISE });
    firebase
      .database()
      .ref("/")
      .set(filtered)
      .then(() => {
        dispatch({ type: ADD_EXERCISE_SUCCESS, payload: filtered });
      })
      .catch(error => {
        dispatch({ type: ADD_EXERCISE_ERROR });
      });
  };
};

const createAccount = (email, password, name) => {
  let myRes;
  return dispatch => {
    dispatch({ type: REQUEST_CREATE_ACCOUNT });
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        dispatch({ type: CREATE_ACCOUNT_SUCCESS });
        myRes = res;
        res.user
          .updateProfile({
            displayName: name
          })
          .then(() => {
            dispatch({ type: SIGN_IN_SUCCESS, payload: myRes });
          })
          .catch(error => {
            dispatch({ type: SIGN_IN_FAILURE, error });
          });
      })
      .catch(error => {
        dispatch({ type: CREATE_ACCOUNT_FAILURE, error });
      });
  };
};
const signin = (email, password) => {
  return dispatch => {
    dispatch({ type: REQUEST_SIGN_IN });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        dispatch({ type: SIGN_IN_SUCCESS, payload: res });
      })
      .catch(error => {
        dispatch({ type: SIGN_IN_FAILURE, error });
      });
  };
};

const signout = () => {
  return dispatch => {
    dispatch({ type: REQUEST_SIGN_OUT });
    firebase
      .auth()
      .signOut()
      .then(() => dispatch({ type: SIGN_OUT_SUCCESS }))
      .catch(error => {
        dispatch({ type: SIGN_OUT_FAILURE, error });
      });
  };
};

const resetUpdates = () => {
  return dispatch => {
    dispatch({ type: RESET_UPDATES });
  };
};

export {
  initializeFirebase,
  fetchFirebase,
  clearFirebase,
  addExercise,
  createAccount,
  signin,
  signout,
  resetUpdates
};
