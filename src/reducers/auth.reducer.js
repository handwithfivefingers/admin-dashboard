import { authConstants } from './../actions/constants';
const initState = {
  categories: [],
  loading: false,
  error: null,
};


export default (state = initState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
