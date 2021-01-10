import React from 'react';
import Rating from '@material-ui/lab/Rating';

import useStateValue from '../../consumer/state.consumer';

import './product.styles.css';

const Product = ({ id, title, price, rating, image }) => {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id,
        title,
        price,
        rating,
        image,
      },
    });
  };

  return (
    <div className='product'>
      <div className='product__info'>
        <p>{title}</p>
        <p className='product__price'>
          <strong>${price}</strong>
        </p>
        <div className='product__rating'>
          <Rating name='read-only' value={rating} readOnly />
        </div>
      </div>

      <img src={image} alt='Product' />

      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
};

export default Product;
