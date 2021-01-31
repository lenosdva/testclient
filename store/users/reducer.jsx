// Set initial state
const initialState = {
  mobileSignData: {},
  mobileSignLoading: false,
  emailSignData: {},
  emailSignLoading: false,
  otpData: {}
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
    case 'SIGNUP_Email_REQUEST': {
      return {
        ...state,
        emailSignLoading: true,
      };
    }
    case 'REGISTERWITHEMAIL': {
      return {
        ...state,
        emailSignLoading: false,
        emailSignData: action.data
      };
    }
    case 'RESET': {
      return {
        ...state,
        mobileSignLoading: false,
        mobileSignData: {},
        emailSignData: {},
        emailSignLoading: false,
        otpData: {}
      };
    }
    case 'VERIFYED_OTP': {
      return {
        ...state,
        otpData: action.data
      }
    }
    default:
      return state;
  }
}
