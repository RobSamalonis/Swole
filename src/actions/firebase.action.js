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
  ADD_EXERCISE_ERROR
} from "./types";

var config = {
  apiKey: "AIzaSyCctPILOFiuVRIJATTzUlDYeXWICabeGpg",
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
        dispatch({ type: INITIALIZE_ERROR });
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
        alert("Exercise Added!");
      })
      .catch(error => {
        dispatch({ type: ADD_EXERCISE_ERROR });
      });
  };
};

export { initializeFirebase, fetchFirebase, clearFirebase, addExercise };
