import React from 'react';

import useStateValue from '../../consumer/state.consumer';

import CheckoutProduct from '../checkout-product/checkout-product.component';
import Subtotal from '../subtotal/subtotal.component';

import './checkout.styles.css';

const Checkout = () => {
  const [{ basket, user }] = useStateValue();

  return (
    <div className='checkout'>
      <div className='checkout__left'>
        <img
          className='checkout__ad'
          src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'
          alt='Ad'
        />
        <div>
          <h3 className='checkout__hello'>
            Hello, {!user ? 'Guest' : user.email}
          </h3>
          <h3 className='checkout__title'>Your Shopping Basket</h3>

          {basket?.length > 0 ? (
            basket.map((item, index) => (
              <CheckoutProduct
                key={index}
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image}
              />
            ))
          ) : (
            <h3 className='checkout__noItems'>You Shopping Basket is Empty.</h3>
          )}
        </div>
      </div>
      <div className='checkout__right'>
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
