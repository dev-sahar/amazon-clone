import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

import useStateValue from '../../consumer/state.consumer';
import { auth } from '../../firebase/firebase';

import axios from 'axios';

import './header.styles.css';

const Header = () => {
  const [{ basket, user }] = useStateValue();

  const [location, setLocation] = useState('');

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getLocation = async () => {
      try {
        const {
          data: { country },
        } = await axios.get('https://extreme-ip-lookup.com/json/', {
          cancelToken: source.token,
        });

        const modifiedData = country;

        setLocation(modifiedData);
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          throw error;
        }
      }
    };

    getLocation();

    return () => {
      source.cancel();
    };
  }, []);

  const handleAuthentication = () => {
    user && auth.signOut();
  };

  return (
    <div className='header'>
      {/* Amazon Logo */}
      <Link to='/'>
        <img
          className='header__logo'
          src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'
          alt='Header Logo'
        />
      </Link>

      {/* Country Location */}
      <div className='header__country'>
        <LocationOnOutlinedIcon className='header__countryIcon' />
        <div className='header__countryInfo'>
          <small>Deliver to</small>
          <strong>{location}</strong>
        </div>
      </div>

      {/* Search Input */}
      <div className='header__search'>
        <input className='header__searchInput' type='text' />
        <SearchIcon className='header__searchIcon' />
      </div>

      {/* Navigation Bar */}
      <div className='header__nav'>
        <Link to={!user && '/login'}>
          <div
            className='header__option header__SignInOut'
            onClick={handleAuthentication}
          >
            <span className='header__optionLineOne'>
              Hello, {!user ? 'Guest' : user.email}
            </span>
            <span className='header__optionLineTwo'>
              {user ? 'Sign Out' : 'Sign In'}
            </span>
          </div>
        </Link>

        <Link to='/orders'>
          <div className='header__option'>
            <span className='header__optionLineOne'>Returns </span>
            <span className='header__optionLineTwo'>& Orders</span>
          </div>
        </Link>

        <div className='header__option'>
          <span className='header__optionLineOne'>Your </span>
          <span className='header__optionLineTwo'>Prime</span>
        </div>

        <Link to='/checkout'>
          <div className='header__optionBasket'>
            <ShoppingBasketIcon />
            <span className='header__optionLineTwo header__basketCount'>
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
