import axios from '../helpers/axios';
import {
  categoryContstant,
  initialDataConstant,
  productsConstant,
} from './constants';

export const getInitialData = () => {
  return async (dispatch) => {
    dispatch({ type: initialDataConstant.GET_ALL_INITIAL_DATA_REQUREST });
    const res = await axios.post('/initialdata');

    if (res.status === 200) {
      const { categories, products } = res.data;
      dispatch({
        type: categoryContstant.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories },
      });
      dispatch({
        type: productsConstant.GET_ALL_PRODUCT_SUCCESS,
        payload: { products },
      });
    }
  };
};
