// components/PaymentPage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentPage = ({ match }) => {
  const [loading, setLoading] = useState(true);
  const [paymentSessionId, setPaymentSessionId] = useState(null);

  useEffect(() => {
    const fetchPaymentSessionId = async () => {
      try {
        // Replace with your backend URL
        const response = await axios.post('http://localhost:5000/initiate_payment', {
          order_amount: 100, // Example: Replace with actual order amount logic
          order_id: match.params.orderId, // Example: Get order ID from URL params
          customer_id: '123', // Example: Replace with actual customer ID logic
          customer_phone: '9876543210', // Example: Replace with actual customer phone logic
          customer_email: 'customer@example.com' // Example: Replace with actual customer email logic
        });
        setPaymentSessionId(response.data.payment_session_id);
        setLoading(false);
      } catch (error) {
        console.error('Error initiating payment:', error);
        setLoading(false);
      }
    };

    fetchPaymentSessionId();
  }, [match.params.orderId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!paymentSessionId) {
    return <p>Error initiating payment</p>;
  }

  return (
    <div>
      <h2>Payment Page</h2>
      {/* Display payment interface based on paymentSessionId */}
      <p>Payment Session ID: {paymentSessionId}</p>
      {/* Example: Display QR code based on paymentSessionId */}
      <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${paymentSessionId}&size=200x200`} alt="QR Code" />
    </div>
  );
};

export default PaymentPage;
