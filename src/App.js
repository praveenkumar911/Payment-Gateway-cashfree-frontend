// import logo from './logo.svg';
// import './App.css';
// import PaymentForm from './Paymentform';

// function App() {
//   return (
//     <div className="App">
//      <PaymentForm/>
//     </div>
//   );
// }

// export default App;


// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [orderId, setOrderId] = useState('');
  const [amount, setAmount] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [paymentUrl, setPaymentUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://payment-gateway-cashfree-backend.onrender.com/initiate_payment', {
        order_id: orderId,
        order_amount: amount,
        customer_id: customerId,
        customer_phone: customerPhone,
        customer_email: customerEmail
      });
      setPaymentUrl(response.data.payment_url);
    } catch (error) {
      console.error('Error initiating payment:', error.response ? error.response.data.details : error.message);
    }
  };

  return (
    <div className="App">
      <h1>Initiate Payment</h1>
      <form onSubmit={handleSubmit}>
        <label>Order ID: </label>
        <input type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)} required /><br />
        
        <label>Amount: </label>
        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} required /><br />
        
        <label>Customer ID: </label>
        <input type="text" value={customerId} onChange={(e) => setCustomerId(e.target.value)} required /><br />
        
        <label>Customer Phone: </label>
        <input type="text" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} required /><br />
        
        <label>Customer Email: </label>
        <input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} required /><br />
        
        <button type="submit">Pay Now</button>
      </form>
      {paymentUrl && (
        <div>
          <h2>Proceed to Payment</h2>
          <a href={paymentUrl} target="_blank" rel="noopener noreferrer">Click here to pay</a>
        </div>
      )}
    </div>
  );
};

export default App;
