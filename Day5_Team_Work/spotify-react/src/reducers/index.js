export default function (state = {}, action) {
  switch (action.type) {
    case "FETCH_ALBUMS":
      return {
        ...state,
        albums: action.payload,
        loading: {
          ...state.loading,
          albums: false,
          albumInfo: true,
          artistInfo: true,
        },
        albumInfo: null,
      };
    case "FETCH_ALBUM_INFO":
      return {
        ...state,
        albumInfo: action.payload,
        loading: {
          ...state.loading,
          albumInfo: false,
        },
      };
    default:
      return state;
  }
}
