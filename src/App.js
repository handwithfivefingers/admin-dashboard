import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Products from './containers/Products';
import Orders from './containers/Orders';
import Category from './containers/Category';

import Signin from './containers/Signin';
import Signup from './containers/Singup';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, getInitialData } from './actions';
import NewPage from './containers/NewPage';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  React.useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if (auth.authenticate) {
      dispatch(getInitialData());
    }
  }, [auth.authenticate]);

  return (
    <>
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/page" component={NewPage} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/orders" component={Orders} />
        <PrivateRoute path="/category" component={Category} />

        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </>
  );
}

export default App;
