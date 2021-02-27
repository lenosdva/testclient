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
  resendOtpData: {},
  needLogin: false,
  userLoading: false,
  user: {},
  orderLoading: false,
  orders: []
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQUIRED': {
      return {
        ...state,
        needLogin: true
      }
    }
    case 'LOGIN_RESET': {
      return {
        ...state,
        needLogin: false
      }
    }
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
    case 'GET_USER': {
      return {
        ...state,
        userLoading: true,
      };
    }
    case 'GOT_USER': {
      return {
        ...state,
        userLoading: false,
        user: action.data
      };
    }
    case 'GET_ORDER': {
      return {
        ...state,
        orderLoading: true,
      };
    }
    case 'GOT_ORDER': {
      return {
        ...state,
        orderLoading: false,
        orders: action.data
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
    case 'RESENT_OTP': {
      return {
        ...state,
        resendOtpData: action.data
      };
    }
    case 'RESET_LOG': {
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
