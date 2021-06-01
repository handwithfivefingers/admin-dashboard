import React from 'react';
import Header from '../Header';
import { NavLink } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

import './style.scss';
/**
 *
 * @author
 * @function Layout
 */

// Path Config
const path = [
  {
    pathto: '/',
    name: 'Home',
    exact: true,
  },
  {
    pathto: '/page',
    name: 'Page',
    exact: false,
  },
  {
    pathto: '/products',
    name: 'Products',
    exact: false,
  },
  {
    pathto: '/orders',
    name: 'Orders',
    exact: false,
  },
  {
    pathto: '/category',
    name: 'Category',
    exact: false,
  },
];
const Layout = (props) => {
  return (
    <>
      <Header />
      {props.sidebar ? (
        <Container>
          <Row>
            <Col md={2} className="sidebar">
              <ul>
                {path.map((item, index) => {
                  return (
                    <li style={{ '--offset': index }} key={index}>
                      <NavLink exact={item.exact} to={item.pathto}>
                        {item.name}
                      </NavLink>
                    </li>
                  );
                })}
                {/* <li style={{ '--offset': 1 }}>
                  <NavLink exact to={'/'}>
                    Home
                  </NavLink>
                </li>
                <li style={{ '--offset': 1 }}>
                  <NavLink exact to={'/'}>
                    Home
                  </NavLink>
                </li>
                <li style={{ '--offset': 2 }}>
                  <NavLink to={'/products'}> Products </NavLink>
                </li>
                <li style={{ '--offset': 3 }}>
                  <NavLink to={'/orders'}> Orders </NavLink>
                </li>
                <li style={{ '--offset': 4 }}>
                  <NavLink to={'/category'}> Categories </NavLink>
                </li> */}
              </ul>
            </Col>
            <Col md={10} style={{ marginLeft: 'auto' }}>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
    </>
  );
};

export default Layout;
