// Set initial state
const initialState = {
  searchLoading: false,
  searchData: []
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SEARCH_REQUEST': {
      return {
        ...state,
        searchLoading: true,
      };
    }
    case 'SEARCH_RESULT': {
      return {
        ...state,
        searchLoading: false,
        searchData: action.data
      };
    }
    case 'SEARCH_BY_ID': {
      return {
        ...state,
        searchByIdLoading: true,
      };
    }
    case 'GOT_SERVICE': {
      return {
        ...state,
        searchByIdLoading: false,
        searchByIdData: action.data
      };
    }
    case 'RESET': {
      return {
        ...state,
        searchLoading: false,
        searchData: []
      };
    }
    default:
      return state;
  }
}
