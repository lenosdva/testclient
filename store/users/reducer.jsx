// Set initial state
const initialState = {
  data: [],
  isLoading: false
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_USER': {
        return {
          ...state,
          isLoading: true,
        };
    }
    case 'USER': {
      return {
        ...state,
        isLoading: false,
        data: action.data
      };
    }
    default:
      return state;
  }
}
