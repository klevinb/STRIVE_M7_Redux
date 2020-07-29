import { createStore } from "redux";
import mainReducer from "../reducers";

const initialState = {
  user: {
    username: "",
  },
  loggedin: false,
};

export default function configureStore() {
  return createStore(
    mainReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
