import firebase from "firebase";
import {
  CLEAR_FIREBASE,
  ADD_EXERCISE,
  ADD_EXERCISE_SUCCESS,
  REQUEST_CREATE_ACCOUNT,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_FAILURE,
  REQUEST_SIGN_IN,
  SIGN_IN_FAILURE,
  REQUEST_SIGN_OUT,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
  RESET_UPDATES,
  REQUEST_VERIFY_USER,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_NOONE_LOGGED_IN,
  SNACK_CLOSE,
  SNACK_OPEN
} from "./types";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_ID,
  authDomain: "swole-1190b.firebaseapp.com",
  databaseURL: "https://swole-1190b.firebaseio.com",
  projectId: "swole-1190b"
};

const app = firebase.initializeApp(config);
const db = firebase.firestore(app);

const initializeFirebase = (dispatch, user) => {
  const docRef = db.collection("users").doc(user.uid);

  const workouts = docRef
    .get()
    .then(doc => {
      if (doc.exists) {
        const record = doc.data();
        dispatch({ type: VERIFY_USER_SUCCESS, payload: { user, record } });
      } else {
        dispatch({ type: VERIFY_USER_SUCCESS, payload: { user } });
      }
    })
    .catch(error => {
      dispatch({ type: VERIFY_USER_NOONE_LOGGED_IN });
    });

  return workouts;
};

const clearFirebase = () => {
  return dispatch => {
    dispatch({ type: CLEAR_FIREBASE });
  };
};

const addExercise = (data, user) => {
  return dispatch => {
    dispatch({ type: ADD_EXERCISE });
    const usersRef = db.collection("users");
    const filtered = data.filter(item => item);
    usersRef.doc(user.uid).set({ exercises: filtered });
    dispatch({ type: ADD_EXERCISE_SUCCESS, payload: filtered });
  };
};

const createAccount = (email, password, name) => {
  return dispatch => {
    dispatch({ type: REQUEST_CREATE_ACCOUNT });
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        dispatch({ type: CREATE_ACCOUNT_SUCCESS });
        res.user.updateProfile({
          displayName: name
        });

        initializeFirebase(dispatch, res.user);
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
        initializeFirebase(dispatch, res);
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

const verifyUser = () => {
  return dispatch => {
    dispatch({ type: REQUEST_VERIFY_USER });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        initializeFirebase(dispatch, user);
      } else {
        dispatch({ type: VERIFY_USER_NOONE_LOGGED_IN });
      }
    });
  };
};

const resetUpdates = () => {
  return dispatch => {
    dispatch({ type: RESET_UPDATES });
  };
};

const openSnack = () => {
  return dispatch => {
    dispatch({ type: SNACK_OPEN });
  };
};

const closeSnack = () => {
  return dispatch => {
    dispatch({ type: SNACK_CLOSE });
  };
};

export {
  initializeFirebase,
  clearFirebase,
  addExercise,
  createAccount,
  signin,
  signout,
  resetUpdates,
  verifyUser,
  closeSnack,
  openSnack
};
