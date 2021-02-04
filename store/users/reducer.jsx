// Set initial state
const initialState = {
  mobileSignData: {},
  mobileSignLoading: false,
  emailSignData: {},
  emailSignLoading: false,
  mobileLoginData: {},
  mobileLoginLoading: false,
  emailLoginData: {},
  emailLoginLoading: false,
  otpData: {},
  resendOtpData: {}
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
    case 'SIGNUP_EMAIL_REQUEST': {
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
    //login
    case 'LOGIN_REQUEST': {
      return {
        ...state,
        mobileLoginLoading: true,
      };
    }
    case 'LOGIN': {
      return {
        ...state,
        mobileLoginLoading: false,
        mobileLoginData: action.data
      };
    }
    case 'LOGIN_EMAIL_REQUEST': {
      return {
        ...state,
        emailLoginLoading: true,
      };
    }
    case 'LOGINWITHEMAIL': {
      return {
        ...state,
        emailLoginLoading: false,
        emailLoginData: action.data
      };
    }
    case 'RESENT_OTP':{
      return {
        ...state,
        resendOtpData: action.data
      };
    }
    case 'RESET': {
      return {
        ...state,
        mobileSignLoading: false,
        mobileSignData: {},
        emailSignData: {},
        mobileLoginLoading: false,
        mobileLoginData: {},
        emailLoginData: {},
        resendOtpData: {},
        emailSignLoading: false,
        emailLoginLoading: false,
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
