// src/components/PaymentSuccess.js

import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('order_id');

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Your order ID is: {orderId}</p>
    </div>
  );
};

export default PaymentSuccess;
