import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

let defaultAlert = true;
function reducer2(state = defaultAlert, action) {
  if (action.type === "closeAlert") {
    state = false;
    return state;
  } else {
    return state;
  }
}

let defaultState = [
  { id: 10, name: "먼진신발", quan: 2 },
  { id: 11, name: "먼진발", quan: 23 },
  { id: 21, name: "먼신발", quan: 5 },
  { id: 31, name: "진신발", quan: 12 },
  { id: 41, name: "먼발", quan: 23 },
];

// reducer는 항상 state를 뱉어야함
function reducer(state = defaultState, action) {
  if (action.type === "항목추가") {
    let found = state.findIndex((a) => {
      return a.id === action.payload.id;
    });
    if (found >= 0) {
      let copy = [...state];
      copy[found].quan++;
      return copy;
    } else {
      let copy = [...state];
      copy.push(action.payload);
      return copy;
    }
  }
  if (action.type === "increase") {
    let found = state.findIndex((a) => {
      return a.id === action.payload;
    });
    let copy = [...state];
    copy[found].quan++;
    return copy;
  } else if (action.type === "decrease") {
    let found = state.findIndex((a) => {
      return a.id === action.payload;
    });
    let copy = [...state];
    if (copy[found].quan > 0) copy[found].quan--;
    return copy;
  } else {
    return state;
  }
}
let store = createStore(combineReducers({ reducer, reducer2 }));
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
