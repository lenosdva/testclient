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
  updateGigLoading: false,
  updateGigData: {},
  serviceLoading: true,
  service: [],
  deleteLoading: true,
  delete: [],
  pauseLoading: true,
  pause: [],
  continueLoading: true,
  continue: [],
  updateHyndymanLoading: true,
  updateHyndyman: {},
  uploadLoading: false,
  uploadData: {},
  gigsLoading: false,
  gigs: {},
  deleteGigLoading: false,
  deleteGig: {},
  userGigsLoading: false,
  userGigs: {},
  servicesLoading: true,
  services: [],
  updateFreeStatusLoading: false,
  firmLoading: false,
  firm: false

}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'BECOME_HYNDYMAN': {
      return {
        ...state,
        hyndymanLoading: true
      }
    }
    case 'GET_HYNDYMAN': {
      return {
        ...state,
        hyndymanLoading: true,
      };
    }

    case 'GOT_HYNDYMAN': {
      return {
        ...state,
        hyndymanLoading: false,
        hyndyman: action.data
      }
    }

    case 'GET_FIRM': {
      return {
        ...state,
        firmLoading: true,
      };
    }

    case 'GOT_FIRM': {
      return {
        ...state,
        firmLoading: false,
        firm: action.data
      }
    }

    case 'UPDATE_HYNDYMAN': {
      return {
        ...state,
        updateHyndymanLoading: true
      }
    }

    case 'UPDATE_FREE_STATUS': {
      return {
        ...state,
        updateFreeStatusLoading: true
      }
    }

    case 'UPDATED_HYNDYMAN': {
      return {
        ...state,
        updateHyndymanLoading: false,
        updateFreeStatusLoading: false,
        updateHyndyman: action.data
     
      };
      
    }



    case 'RESET_HYNDYMAN': {
      return {
        ...state,
        hyndyman: {}
      };
    }

    case 'DELETE_HYNDYMAN': {
      return {
        ...state,
        hyndyman: {}
      };
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
        addGigLoading: false,
        addGigData: action.data
      }
    }

    case 'UPDATE_GIG': {
      return {
        ...state,
        updateGigLoading: true
      }
    }
    case 'UPDATED_GIG': {
      return {
        ...state,
        updateGigLoading: false,
        updateGigData: action.data
      }
    }

    case 'DELETE_GIG': {
      return {
        ...state,
        deleteGigLoading: true
      }
    }
    case 'DELETED_GIG': {
      return {
        ...state,
        deleteGigLoading: false,
        deleteGig: {}
      }
    }

    case 'RESET_GIG': {
      return {
        ...state,
        addGigData: {},
        update: {}
      }
    }
    case 'UPLOAD_REQUEST': {
      return {
        ...state,
        uploadDocLoading: true
      }
    }
    case 'UPLOADED_REQUEST': {
      return {
        ...state,
        uploadDocLoading: false,
        uploadDoc: action.data
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
    case 'GET_GIGS': {
      return {
        ...state,
        gigsLoading: true
      }
    }
    case 'GOT_GIGS': {
      return {
        ...state,
        gigsLoading: false,
        gigs: action.data
      }
    }
    case 'GET_USER_GIGS': {
      return {
        ...state,
        userGigsLoading: true
      }
    }
    case 'GOT_USER_GIGS': {
      return {
        ...state,
        userGigsLoading: false,
        userGigs: action.data
      }
    }
    case 'GET_SERVICES': {
      return {
        ...state,
        servicesLoading: true,
      };
    }

    case 'GOT_SERVICES': {
      return {
        ...state,
        servicesLoading: false,
        services: action.data
      };
    }
    case 'DELETE_REQUEST': {
      return {
        ...state,
        deleteLoading: true,
      }
    };

    case 'DELETED_REQUEST': {
      return {
        ...state,
        deleteLoading: false,
        delete: action.data
      }
    };

    case 'FILE_UPLOADED': {
      return {
        ...state,
        uploadLoading: false,
        uploadDocLoading: false,
        uploadData: action.data
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
