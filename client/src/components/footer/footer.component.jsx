import React from 'react';

import './footer.styles.css';

const Footer = () => {
  return (
    <div className='footer'>
      <button
        onClick={() =>
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
          })
        }
      >
        Back To Top
      </button>

      <div className='footer__container'>
        <div className='footer__columns'>
          <div className='footer__column'>
            <h3>Get to Know Us</h3>
            <p>Careers</p>
            <p>Blog</p>
            <p>About Amazon</p>
            <p>Investor Relations</p>
          </div>

          <div className='footer__column'>
            <h3>Sell products on Amazon</h3>
            <p>Sell apps on Amazon</p>
            <p>Become an Affiliate</p>
            <p>Advertise Your Products</p>
            <p>Self-Publish with Us</p>
          </div>

          <div className='footer__column'>
            <h3>Amazon Payment Products</h3>
            <p>Amazon Business Card</p>
            <p>Shop with Points</p>
            <p>Reload Your Balance</p>
          </div>

          <div className='footer__column'>
            <h3>Let Us Help You</h3>
            <p>Amazon and COVID-19</p>
            <p>Your Account</p>
            <p>Your Orders</p>
            <p>Shipping Rates & Policies</p>
            <p>Returns & Replacements</p>
            <p>Manage Your Content and Devices</p>
            <p>Amazon Assistant Help</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
