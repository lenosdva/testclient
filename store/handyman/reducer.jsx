// Set initial state
const initialState = {
  hyndymanLoading: false,
  hyndyman: {},
  uploadDocLoading: false,
  uploadDoc: {},
  gigLoading: false,
  gig: {},
  addGigLoading: false,
  addGigData: {}
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
    case 'ADD_GIG': {
      return {
        ...state,
        addGigLoading: true
      }
    }
    case 'ADDED_GIG': {
      return {
        ...state,
        addGigLoading: true,
        addGigData: action.data
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
    case 'GET_GIG': {
      return {
        ...state,
        gigLoading: true
      }
    }
    case 'GOT_GIG': {
      return {
        ...state,
        gigLoading: false,
        gig: action.data
      }
    }
    
        default:
      return state;
  }
}
