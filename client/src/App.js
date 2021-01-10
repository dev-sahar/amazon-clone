import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { PublicRoute, LoginRoute } from './HOC/routes.component';
import { auth } from './firebase/firebase';
import useStateValue from './consumer/state.consumer';

import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-poundary.component';

import './App.css';

const Home = lazy(() => import('./components/home/home.component'));
const Checkout = lazy(() => import('./components/checkout/checkout.component'));
const Login = lazy(() => import('./components/login/login.component'));
const Orders = lazy(() => import('./components/orders/orders.component'));
const StripePayment = lazy(() => import('./stripe'));

const App = () => {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      //console.log('THE USER IS >>> ', authUser);

      if (authUser) {
        // the user just logged in / the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className='app'>
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <LoginRoute exact path='/login' component={Login} />

              <PublicRoute exact path='/checkout' component={Checkout} />
              <PublicRoute exact path='/payment' component={StripePayment} />
              <PublicRoute exact path='/orders' component={Orders} />
              <PublicRoute exact path='/' component={Home} />
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
