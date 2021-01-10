import React from 'react';
import { useHistory } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';

import useStateValue from '../../consumer/state.consumer';
import { getBasketTotal } from '../../reducer/reducer';

import './subtotal.styles.css';

const Subtotal = () => {
  const [{ basket }] = useStateValue();
  const history = useHistory();

  const proceedToCheckout = (e) => {
    basket?.length > 0
      ? history.push('/payment')
      : alert('You Basket is Empty.');
  };

  return (
    <div className='subtotal'>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket?.length || 0} items):{' '}
              <strong>{value || 0}</strong>
            </p>
            <small className='subtotal__gift'>
              <input type='checkbox' /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />

      <button onClick={proceedToCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default Subtotal;
