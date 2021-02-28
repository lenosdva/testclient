// Set initial state
const initialState = {
  hyndymanLoading: false,
  hyndyman: {},
  uploadDocLoading: false,
  uploadDoc: {}
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'BECOME_HYNDYMAN': {
      return {
        ...state,
        hyndymanLoading: true
      }
    }
    case 'HYNDYMAN': {
      return {
        ...state,
        hyndymanLoading: false,
        hyndyman: action.data
      }
    }
    case 'UPLOAD': {
      return {
        ...state,
        uploadDocLoading: true
      }
    }
    case 'UPLOADED': {
      return {
        ...state,
        uploadDocLoading: true,
        uploadDoc: action.data
      }
    }
    
        default:
      return state;
  }
}
