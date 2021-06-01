import { pageConstants } from '../actions/constants';

const initState = {
  error: null,
  page: {},
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case pageConstants.CREATE_PAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case pageConstants.CREATE_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        page: action.payload.page,
      };
    case pageConstants.CREATE_PAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
