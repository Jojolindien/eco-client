//POUR RAPPEL : le dispatch du module login : le payload est ainsi :
//dispatch({
//   type: "LOGGED_IN_USER",
//   payload: {
//     name: res.data.name,
//     email: res.data.email,
//     token: idTokenResult.token,
//     role: res.data.role,
//     _id: res.data._id,
//   },
// });
export function userReducer(state = null, action) {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return action.payload;
    case "LOGOUT":
      return action.payload;
    default:
      return state;
  }
}
