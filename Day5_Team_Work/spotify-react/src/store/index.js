import { createStore, compose, applyMiddleware } from "redux";
import mainReducer from "../reducers";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialStore = {
  albums: null,
  loading: {
    albums: true,
    albumInfo: true,
    artistInfo: true,
  },
  albumInfo: null,
  selectedSong:
    "https://cdns-preview-e.dzcdn.net/stream/c-eb54f4257d17cd6d4085c7060699370b-12.mp3",
};

export default function configureStore() {
  return createStore(
    mainReducer,
    initialStore,
    composeEnhancers(applyMiddleware(thunk))
  );
}
