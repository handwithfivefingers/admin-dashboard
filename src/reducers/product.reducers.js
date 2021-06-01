import { productsConstant } from '../actions/constants';

const initState = {
  products: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case productsConstant.GET_ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
      };
    default:
      return state;
  }
};
