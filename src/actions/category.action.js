import axios from '../helpers/axios';
import { categoryContstant } from './constants';

export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({
      type: categoryContstant.GET_ALL_CATEGORIES_REQUEST,
    });
    const res = await axios.get(`/category/getcategories`);
    if (res.status === 200) {
      const { categoryList } = res.data;
      dispatch({
        type: categoryContstant.GET_ALL_CATEGORIES_SUCCESS,
        payload: {
          categories: categoryList,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: categoryContstant.GET_ALL_CATEGORIES_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
      }
    }
  };
};
