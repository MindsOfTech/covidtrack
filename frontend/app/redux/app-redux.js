import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

// Inital State

const initalState = {
  userName: "Shakeane",
};

// Reducers....

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case "setUserName":
      return { ...state, userName: action.value };

    default:
      return state;
  }
};

// Store ...

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export { store };

// Action Creators ...

const setUserName = (userName) => {
  return {
    type: "setUserName",
    value: userName,
  };
};

export { setUserName };
