import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import Payment from './components/payment/payment.component';

const promise = loadStripe('pk_test_tcG2hlV6osqeht3IdTGuqwxe00RJK7BmrU');

const StripePayment = () => {
  return (
    <Elements stripe={promise}>
      <Payment />
    </Elements>
  );
};

export default StripePayment;
