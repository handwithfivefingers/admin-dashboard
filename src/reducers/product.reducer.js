import { productConstant } from '../actions/constants';

const initState = {
  products: [],
  productsByPrice: {
    under5m: [],
    under10m: [],
    under15m: [],
    under20m: [],
    under30m: [],
  },
  pageRequest: false,
  page: {},
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case productConstant.GET_PRODUCTS_BY_SLUG:
      return {
        ...state,
        products: action.payload.products,
        productsByPrice: action.payload.productsByPrice,
      };
    case productConstant.GET_PRODUCTS_PAGE_REQUEST:
      return {
        ...state,
        pageRequest: true,
      };
    case productConstant.GET_PRODUCTS_PAGE_SUCCESS:
      return {
        ...state,
        page: action.payload.page,
        pageRequest: false,
      };
    case productConstant.GET_PRODUCTS_PAGE_FAILURE:
      return {
        ...state,
        pageRequest: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
