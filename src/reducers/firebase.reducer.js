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
  LOGIN,
  LOGOUT,
  CHANGE_ROUTE
} from "../actions/types";

const initialState = { isFetching: false };

const getUsers = db => [
  ...new Set(db.map(item => item.Person).filter(item => !!item))
];

export default function articles(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE: {
      return Object.assign({}, state, {
        isFetching: true
      });
    }
    case INITIALIZE_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        users: getUsers(action.payload),
        db: action.payload
      });
    }
    case INITIALIZE_ERROR: {
      return Object.assign({}, state, {
        isFetching: false
      });
    }
    case REQUEST_FIREBASE: {
      return Object.assign({}, state, {
        isFetching: true
      });
    }
    case RECIEVED_FIREBASE: {
      return Object.assign({}, state, {
        isFetching: false,
        db: action.payload
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
        db: action.payload
      });
    }
    case ADD_EXERCISE_ERROR: {
      return Object.assign({}, state, {
        isFetching: false
      });
    }
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
    case CHANGE_ROUTE: {
      return Object.assign({}, state, {
        isFetching: false,
        route: action.payload
      });
    }
    default:
      return state;
  }
}
