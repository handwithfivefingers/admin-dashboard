import axios from '../helpers/axios';
import { categoryContstant } from './constants';

export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({
      type: categoryContstant.GET_ALL_CATEGORIES_REQUEST,
    });
    const res = await axios.get(`/category/getcategories`);
    console.log(res);
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

export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryContstant.ADD_NEW_CATEGORY_REQUEST });
    try {
      const res = await axios.post(`/category/create`, form);
      console.log(res);
      if (res.status === 201) {
        dispatch({
          type: categoryContstant.ADD_NEW_CATEGORY_SUCCESS,
          payload: {
            category: res.data.category,
          },
        });
      } else {
        if (res.status === 400) {
          dispatch({
            type: categoryContstant.ADD_NEW_CATEGORY_FAILURE,
            payload: res.data.error,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateCategories = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryContstant.UPDATE_CATEGORY_REQUEST });
    const res = await axios.post(`/category/update`, form);
    console.log(res);
    if (res.status === 201) {
      dispatch({ type:categoryContstant.UPDATE_CATEGORY_SUCCESS})
      dispatch(getAllCategory());
    } else {
      dispatch({
        type: categoryContstant.UPDATE_CATEGORY_FAILURE,
        payload :{
          error: res.data.error
        }
      })
    }
  };
};

export const deleteCategories = (ids) => {
  return async (dispatch) => {
    dispatch({type: categoryContstant.DELETE_CATEGORY_REQUEST})
    const res = await axios.post(`/category/delete`, {
      payload: {
        ids,
      },
    });
    if (res.status === 200) {
      dispatch({type:categoryContstant.DELETE_CATEGORY_SUCCESS})
      dispatch(getAllCategory());
    } else {
      dispatch({type:categoryContstant.DELETE_CATEGORY_FAILURE,
      payload: {
        error: res.data.error
      }})
    }
  };
};
