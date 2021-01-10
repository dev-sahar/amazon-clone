import React from 'react';
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';

import CheckoutProduct from '../checkout-product/checkout-product.component';

import './order.styles.css';

const Order = ({ order }) => {
  return (
    <div className='order'>
      <div className='order__title'>
        <h2>Order</h2>
        <p className='order__id'>
          <small>{order.id}</small>
        </p>
        <p>{moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}</p>
      </div>

      <div className='order__details'>
        {order.data.basket?.map((item, index) => (
          <CheckoutProduct
            key={index}
            id={item.id}
            title={item.title}
            price={item.price}
            rating={item.rating}
            image={item.image}
            hideButton
          />
        ))}
      </div>

      <CurrencyFormat
        renderText={(value) => (
          <h3 className='order__total'>Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />
    </div>
  );
};

export default Order;
