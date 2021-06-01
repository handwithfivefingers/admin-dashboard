import React, { useState } from 'react';
import { Modal, MaterialInput, MaterialButton, DropdownMenu} from '../MaterialUI'
import './style.css';

const Header = (props) => {
  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="header">
      <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>Login</h2>
              <p>Get access to your Orders</p>
            </div>
            <div className="rightspace">
              <MaterialInput
                type="text"
                label="Email Email/Enter Mobile Number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MaterialInput
                type="text"
                label="Email Email/Enter Mobile Number"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <MaterialButton
              title="Login"
              bgColor="#fb641b"
              textColor="#fff"
              />

            </div>
          </div>
        </div>
      </Modal>
      <div className="subHeader">
        <div className="logo">
          <a href="">
            <img className="logoimage" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png" alt="..." />
          </a>
          <a style={{ marginTop:'-10px'}}>
            <span className="exploreText">Explore</span>
            <span className ="plusText">Plus</span>
            <img className="goldenStar" src='https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png' alt="..." />
          </a>
        </div>
        <div className="search" style={{ padding:'0 10px'}}>
          <div className="searchInputContainer">
            <input className="searchInput" placeholder={'search for products, brands and more'}/>
           
            <div className="searchIconContainer">
              {/* <IoIosSearch style={{ color:'#2874f0'}} /> */}
            </div>
          
          </div>
        </div>
        <div className="rightMenu">
          <DropdownMenu 
          menu={
          <a 
          className="loginButton" 
          onClick={() => setLoginModal(true)}
          > 
          Login
          </a>
          }
          menus={[
            {label: 'My Profile', href:'',icon: null},
            {label: 'Flipkart Plus Zone', href:'',icon: null},
            {label: 'Orders', href:'', icon: null},
            {label: 'Wishlist', href:'', icon: null},
            {label: 'Rewards', href:'', icon: null},
            {label: 'Gift Cards', href:'', icon: null},
          ]}
          firstMenu={
            <div className="firstmenu">
            <span>New customer ?</span>
            <a style={{ color:'#2874f0'}}>Sign up</a>
            </div>
          }
          />
          <DropdownMenu 
          menu={
            <a className="more">
              <span>More</span>
            </a>
          }
          menus={[
            {label: 'Notification Preference', href:'',icon: null},
            {label: 'Sell on flipkart', href:'',icon: null},
            {label: '24x7 Customer Care', href:'',icon: null},
            {label: 'Advertise', href:'',icon: null},
            {label: 'Download App', href:'',icon: null},
          ]}
          />
          <div>
            <a className="cart">
             {/* Cart icon here*/}
              <span style={{ margin: '0 10px'}}>Cart</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Header;
