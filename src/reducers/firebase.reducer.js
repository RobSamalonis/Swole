import {
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
  RESET_UPDATES,
  REQUEST_VERIFY_USER,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_NOONE_LOGGED_IN
} from "../actions/types";

const initialState = { isFetching: false, addExerciseSuccess: "initial" };

export default function articles(state = initialState, action) {
  switch (action.type) {
    case REQUEST_FIREBASE: {
      return Object.assign({}, state, {
        isFetching: true
      });
    }
    case RECIEVED_FIREBASE: {
      return Object.assign({}, state, {
        isFetching: false,
        db: Object.values(action.payload)
      });
    }
    case RECIEVED_FIREBASE_ERROR: {
      return Object.assign({}, state, {
        isFetching: false
      });
    }
    case CLEAR_FIREBASE: {
      return Object.assign({}, state, {
        isFetching: false,
        db: null
      });
    }
    case ADD_EXERCISE: {
      return Object.assign({}, state, {
        isFetching: true
      });
    }
    case ADD_EXERCISE_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        record: action.payload,
        addExerciseSuccess: true
      });
    }
    case ADD_EXERCISE_ERROR: {
      return Object.assign({}, state, {
        isFetching: false,
        addExerciseSuccess: false
      });
    }
    case REQUEST_CREATE_ACCOUNT: {
      return Object.assign({}, state, {
        isFetching: true
      });
    }
    case CREATE_ACCOUNT_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        createAccountSuccess: true
      });
    }
    case CREATE_ACCOUNT_FAILURE: {
      return Object.assign({}, state, {
        isFetching: false,
        createAccountSuccess: false
      });
    }
    case REQUEST_SIGN_OUT: {
      return Object.assign({}, state, {
        isFetching: true
      });
    }
    case SIGN_OUT_SUCCESS: {
      return Object.assign({}, state, {
        user: null,
        isFetching: false
      });
    }
    case SIGN_OUT_FAILURE: {
      return Object.assign({}, state, {
        isFetching: false
      });
    }
    case REQUEST_SIGN_IN: {
      return Object.assign({}, state, {
        isFetching: true
      });
    }
    case SIGN_IN_SUCCESS: {
      return Object.assign({}, state, {
        user: action.payload.user,
        isFetching: false
      });
    }
    case SIGN_IN_FAILURE: {
      return Object.assign({}, state, {
        isFetching: false
      });
    }
    case RESET_UPDATES: {
      return Object.assign({}, state, {
        isFetching: false,
        addExerciseSuccess: "initial"
      });
    }
    case REQUEST_VERIFY_USER: {
      return Object.assign({}, state, {
        isFetching: true,
        verifyingUser: true
      });
    }
    case VERIFY_USER_SUCCESS: {
      let workouts = [];
      if (action.payload.record && action.payload.record.exercises) {
        workouts = action.payload.record.exercises;
      }
      return Object.assign({}, state, {
        isFetching: false,
        verifyingUser: false,
        user: action.payload.user,
        record: workouts
      });
    }
    case VERIFY_USER_NOONE_LOGGED_IN: {
      return Object.assign({}, state, {
        isFetching: false,
        user: null,
        verifyingUser: false
      });
    }
    default:
      return state;
  }
}
