import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [orderAmount, setOrderAmount] = useState('');
  const [orderId, setOrderId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi'); // Default payment method
  const [paymentSessionId, setPaymentSessionId] = useState(''); // State for payment session ID
  const [orderResponse, setOrderResponse] = useState(null);

  const createOrder = async () => {
    try {
      const response = await axios.post('http://localhost:5000/create_order', {
        order_amount: orderAmount,
        order_id: orderId,
        customer_id: customerId,
        customer_phone: customerPhone,
        payment_method: paymentMethod // Include selected payment method
      });
      setOrderResponse(response.data);
      setPaymentSessionId(response.data.payment_session_id); // Set the payment session ID
    } catch (error) {
      console.error('Error creating order:', error.response ? error.response.data : error.message);
    }
  };

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/pay_order', {
        payment_session_id: paymentSessionId, // Use the correct payment session ID
        payment_method: paymentMethod // Include selected payment method
      });
      console.log('Payment initiated successfully:', response.data);
      // Handle payment response as needed (e.g., redirect user to payment gateway)
    } catch (error) {
      console.error('Error initiating payment:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h2>Create Order & Payment</h2>
      <form onSubmit={(e) => { e.preventDefault(); createOrder(); }}>
        <label>
          Order Amount:
          <input type="number" value={orderAmount} onChange={(e) => setOrderAmount(e.target.value)} />
        </label>
        <br />
        <label>
          Order ID:
          <input type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
        </label>
        <br />
        <label>
          Customer ID:
          <input type="text" value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
        </label>
        <br />
        <label>
          Customer Phone:
          <input type="text" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
        </label>
        <br />
        <label>
          Payment Method:
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="upi">UPI</option>
            <option value="card">Card</option>
            {/* Add more options for other payment methods */}
          </select>
        </label>
        <br />
        <button type="submit">Create Order</button>
      </form>

      {orderResponse && (
        <div>
          <h3>Order Response</h3>
          <pre>{JSON.stringify(orderResponse, null, 2)}</pre>
          <button onClick={handlePayment}>Initiate Payment</button>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
