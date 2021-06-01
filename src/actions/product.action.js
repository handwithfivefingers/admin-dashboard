import axios from '../helpers/axios';
import { productConstant } from './constants';

export const getProductsBySlug = (slug) => {
  return async (dispatch) => {
    const res = await axios.get(`products/${slug}`);
    console.log(res);
    if (res.status === 200) {
      dispatch({
        type: productConstant.GET_PRODUCTS_BY_SLUG,
        payload: res.data,
      });
    } else {
      // dispatch({
      // })
    }
  };
};

export const getProductPage = (payload) => {
  return async (dispatch) => {
    try {
      const { cid, type } = payload.params;
      const res = await axios.get(`/page/${cid}/${type}`);
      console.log(res);
      dispatch({ type: productConstant.GET_PRODUCTS_PAGE_REQUEST });
      if (res.status === 200) {
        const { page } = res.data;
        dispatch({
          type: productConstant.GET_PRODUCTS_PAGE_SUCCESS,
          payload: { page },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: productConstant.GET_PRODUCTS_PAGE_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
