import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import cartReducer from "../reducers/cart";
import userReducer from "../reducers/user";

import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  cart: {
    products: [],
  },
  user: {
    username: null,
  },
};

const bigReducer = combineReducers({ cart: cartReducer, user: userReducer });

export default function configureStore() {
  return createStore(
    bigReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
}
