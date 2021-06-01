import { combineReducers } from 'redux';
import authReducer from './auth.reducers';
import userReducer from './user.reducers';
import categoryReducer from './category.reducer';
import orderReducer from './order.reducer';
import productReducer from './product.reducers';
import pageReducer from './page.reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  category: categoryReducer,
  order: orderReducer,
  product: productReducer,
  page: pageReducer,
});

export default rootReducer;
