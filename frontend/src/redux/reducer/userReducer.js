import {
  SIGNUP_USER,
  LOGIN_USER,
  SET_CURRENT_USER,
  LOGOUT_USER,
} from "../action/userType";
const initialState = {
  isLoggedIn: false,
  username: "",
  user_id: "",
  profileImage: "",
  email: "",
  password: "",
  confirmpassword: "",
  action: "SIGNUP",
  msg: "",
  userDetails: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_USER:
      return {
        ...state,
        msg: action.payload,
      };
    case LOGIN_USER:
      return {
        ...state,
        msg: action.payload,
        isLoggedIn: action.isLoggedIn,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        userDetails: action.payload,
        isLoggedIn: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

export default userReducer;
