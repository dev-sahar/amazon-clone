import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';

import CheckoutProduct from '../checkout-product/checkout-product.component';

import useStateValue from '../../consumer/state.consumer';
import { getBasketTotal } from '../../reducer/reducer';
import axios from 'axios';
import { db } from '../../firebase/firebase';

import './payment.styles.css';

axios.defaults.baseURL = 'http://localhost:5000/';

const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();

  const history = useHistory();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState('');
  const [succeeded, setSucceeded] = useState(false);

  const [location, setLocation] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getLocation = async () => {
      try {
        const {
          data: { city, country },
        } = await axios.get('https://extreme-ip-lookup.com/json/', {
          cancelToken: source.token,
        });

        const modifiedData = {
          city,
          country,
        };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const amount = getBasketTotal(basket) * 100;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      //console.log('token generated!', paymentMethod);

      try {
        const { id, created } = paymentMethod;

        const response = await axios({
          url: 'stripe/charge',
          method: 'post',
          data: {
            amount,
            id,
          },
        });

        db.collection('users').doc(user?.uid).collection('orders').doc(id).set({
          basket,
          amount: amount,
          created: created,
        });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: 'EMPTY_BASKET',
        });

        history.replace('/orders');

        //console.log('data', response.data.success);
        if (response.data.success) {
          alert('payment successful!');
        }
      } catch (error) {
        //console.log('error | ', error);
        alert('There was a problem with your payment!');
      }
    } else {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  };

  return (
    <div className='payment'>
      <div className='payment__container'>
        <h1>
          Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
        </h1>

        {/* Delivery Address */}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Delivery Address:</h3>
          </div>
          <div className='payment__address'>
            <p>{user?.email}</p>
            <p>{location.city}</p>
            <p>{location.country}</p>
          </div>
        </div>

        {/* Review Items */}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Review items:</h3>
          </div>
          <div className='payment__items'>
            {basket.map((item, index) => (
              <CheckoutProduct
                key={index}
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image}
              />
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Payment Method:</h3>
          </div>

          <div className='payment__details'>
            <form onSubmit={handleSubmit}>
              <CardElement
                className='payment__cardELement'
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
                onChange={handleChange}
              />

              <div className='payment__priceContainer'>
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />

                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                </button>
              </div>

              {error && <div className='payment__errorMsg'>{error}</div>}
            </form>
            <p className='payment__cardInfo'>
              ** Please use the following test credit card for payment ** <br />
              4242 4242 4242 4242 - Exp: 12/21 - CVV: 123 - ZIP: 12345
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
