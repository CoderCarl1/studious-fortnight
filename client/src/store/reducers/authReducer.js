import Action from "../actions";
const initialState = {
  isAuth: false,
  hasRegistered: false,
  userInfo: {},
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Action.REGISTER_START:
      return {
        ...state,
        loading: true
      };
    case Action.REGISTER_OKAY:
      return {
        ...state,
        loading: false,
        hasRegistered: true
      };
    case Action.LOGIN_START:
      return {
        ...state,
        loading: true
      };
    case Action.LOGIN_OKAY:
      console.log(action.userInfo);
      return {
        ...state,
        isAuth: true,
        userInfo: {
          ...state.userInfo,
          ...action.userInfo
        },
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;