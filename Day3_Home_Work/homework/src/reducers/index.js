export default function (state = [], action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: {
          ...state.user,
          username: action.payload,
        },
        loggedin: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: {
          ...state.user,
          username: "",
        },
        loggedin: false,
      };
    default:
      return state;
  }
}
