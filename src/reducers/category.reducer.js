import { categoryContstant } from './../actions/constants';
const initState = {
  categories: [],
  loading: false,
  error: null,
};

const buildNewCategories = (parentId, categories, category) => {
  let myCategories = [];

  if(parentId == undefined) {
return [
  ...categories,
  {
    _id: category._id,
    name: category.name,
    slug: category.slug,
    children: []
  }
]

  }

  for (let cat of categories) {
    if (cat._id == parentId) {
      myCategories.push({
        ...cat,
        children:
          cat.children && cat.children.length > 0
            ? buildNewCategories(
                parentId,
                [
                  ...cat.children,
                  {
                    _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: category.children,
                  },
                ],
                category,
              )
            : [],
      });
    } else {
      myCategories.push({
        ...cat,
        children:
          cat.children > 0
            ? buildNewCategories(parentId, cat.children, category)
            : [],
      });
    }
  }
  return myCategories;
};

export default (state = initState, action) => {
  switch (action.type) {
    case categoryContstant.GET_ALL_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case categoryContstant.GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload.categories,
        loading: false,
      };
    case categoryContstant.GET_ALL_CATEGORIES_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    case categoryContstant.ADD_NEW_CATEGORY_REQURES:
      return {
        ...state,
        loading: true,
      };
    case categoryContstant.ADD_NEW_CATEGORY_SUCCESS:
      const category = action.payload.category;
      const updateCategories = buildNewCategories(
        category.parentId,
        state.categories,
        category,
      );
      return {
        ...state,
        categories: updateCategories,
        loading: false,
      };
    case categoryContstant.ADD_NEW_CATEGORY_FAILURE:
      return {
        ...initState,
      };
    default:
      return state;
  }
};
