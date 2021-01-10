import React from 'react';
import Rating from '@material-ui/lab/Rating';

import './checkout-product.styles.css';

import useStateValue from '../../consumer/state.consumer';

const CheckoutProduct = ({ id, title, price, rating, image, hideButton }) => {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id,
    });
  };

  return (
    <div className='checkoutProduct'>
      <img className='checkoutProduct__image' src={image} alt='Product' />
      <div className='checkoutProduct__info'>
        <p className='checkoutProduct__title'>{title}</p>
        <p className='checkoutProduct__price'>
          <strong>${price}</strong>
        </p>
        <div className='checkoutProduct__rating'>
          <Rating name='read-only' value={rating} readOnly />
        </div>
        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from Basket</button>
        )}
      </div>
    </div>
  );
};

export default CheckoutProduct;
