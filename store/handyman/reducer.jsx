// Set initial state
const initialState = {
  hyndymanLoading: false,
  hyndyman: {},
  uploadDocLoading: false,
  uploadDoc: {},
  gigLoading: false,
  gig: {},
  addGigLoading: false,
  addGigData: {},
  serviceLoading: true,
  service: [],
  deleteLoading: true,
  delete: [],
  pauseLoading: true,
  pause: [],
  continueLoading: true,
  continue: [],
  updateLoading: true,
  update: {}
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
    case 'RESET_GIG': {
      return {
        ...state,
        addGigData: {},
        update: {}
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
        uploadDoc: action.data.data
      }
    }
    case 'RESET_HANDYMAN': {
      return {
        ...state,
        uploadDoc: {},
        hyndyman: {}
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
    case 'GET_SERVICES': {
      return {
        ...state,
        serviceLoading: true,
      };
    }

    case 'GOT_SERVICES': {
      return {
        ...state,
        serviceLoading: false,
        service: action.data
      };
    }
    case 'DELETE_REQUEST': {
      return {
        ...state,
        deleteLoading: true,
        delete: action.data
      }
    };

    case 'DELETED_REQUEST': {
      return {
        ...state,
        deleteLoading: false,

      }
    };
    case 'UPDATE_REQUEST': {
      return {
        ...state,
        updateLoading: true,
      }
    };

    case 'UPDATED_REQUEST': {
      return {
        ...state,
        updateLoading: false,
        update: action.data
      }
    };
    case 'PAUSE_REQUEST': {
      return {
        ...state,
        pauseLoading: false,
        pause: action.data
      }
    };

    case 'PAUSED_REQUEST': {
      return {
        ...state,
        pauseLoading: false,

      }
    };
    case 'CONTINUE_REQUEST': {
      return {
        ...state,
        continueLoading: true,
        conitnue: action.data
      }
    };

    case 'CONTINUED_REQUEST': {
      return {
        ...state,
        continueLoading: false,

      }
    };

    default:
      return state;
  }
}
