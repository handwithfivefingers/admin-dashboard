import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import MenuHeader from '../Menuheader';
import './style.css'
const Layout = (props) => {
  return (
    <>
      <Header />
      <MenuHeader />
      <div class="content">{props.children}</div>
    </>
  );
};

Layout.propTypes = {};

export default Layout;
