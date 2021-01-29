// Set initial state
const initialState = {
  mobileSignData: {},
  mobileSignLoading: false
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SIGNUP_REQUEST': {
        return {
          ...state,
          mobileSignLoading: true,
        };
    }
    case 'REGISTER': {
      return {
        ...state,
        mobileSignLoading: false,
        mobileSignData: action.data
      };
    }
    case 'RESET': {
      return {
        ...state,
        mobileSignLoading: false,
        mobileSignData: {}
      };
    }
    default:
      return state;
  }
}
