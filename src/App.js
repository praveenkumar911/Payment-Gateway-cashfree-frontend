import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {
    orderAmount: '',
    orderId: '',
    customerId: '',
    customerPhone: '',
    customerEmail: '',
    paymentUrl: ''
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const serverUrl = 'https://payment-gateway-cashfree-backend.onrender.com/initiate_payment';

      const response = await axios.post(serverUrl, {
        order_amount: this.state.orderAmount,
        order_id: this.state.orderId,
        customer_id: this.state.customerId,
        customer_phone: this.state.customerPhone,
        customer_email: this.state.customerEmail
      });

      const { payment_session_id } = response.data;
      const paymentUrl = `https://payment-gateway-cashfree-frontend.vercel.app/payment_page?payment_session_id=${payment_session_id}`;
      window.location.href = paymentUrl; // Redirect to Cashfree payment page
    } catch (error) {
      console.error('Error:', error);
      // Handle error as needed
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Cashfree Payment Gateway Integration</h1>
        </header>
        <main className="App-main">
          <div>
            <h2>Payment Form</h2>
            <form onSubmit={this.handleSubmit}>
              <label>
                Order Amount:
                <input
                  type="text"
                  name="orderAmount"
                  value={this.state.orderAmount}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <label>
                Order ID:
                <input
                  type="text"
                  name="orderId"
                  value={this.state.orderId}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <label>
                Customer ID:
                <input
                  type="text"
                  name="customerId"
                  value={this.state.customerId}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <label>
                Customer Phone:
                <input
                  type="text"
                  name="customerPhone"
                  value={this.state.customerPhone}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <label>
                Customer Email:
                <input
                  type="text"
                  name="customerEmail"
                  value={this.state.customerEmail}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <button type="submit">Pay with Cashfree</button>
            </form>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
