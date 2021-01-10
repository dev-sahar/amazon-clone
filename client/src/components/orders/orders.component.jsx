import React, { useState, useEffect } from 'react';

import { db } from '../../firebase/firebase';
import useStateValue from '../../consumer/state.consumer';

import Order from '../order/order.component';

import './orders.styles.css';

const Orders = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (user) {
        db.collection('users')
          .doc(user?.uid)
          .collection('orders')
          .orderBy('created', 'desc')
          .onSnapshot((snapshot) =>
            setOrders(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            )
          );
      } else {
        setOrders([]);
      }
    }
    return () => {
      mounted = false;
    };
  }, [user]);

  return orders.length > 0 ? (
    <div className='orders'>
      <h1>Your Orders</h1>
      <div className='orders__order'>
        {orders?.map((order, index) => (
          <Order key={index} order={order} />
        ))}
      </div>
    </div>
  ) : (
    <div className='orders'>
      <h1>You have no orders yet.</h1>
    </div>
  );
};

export default Orders;
