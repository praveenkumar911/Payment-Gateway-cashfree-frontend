import React from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import './App.css';

class App extends React.Component {
  state = {
    orderAmount: '',
    orderId: '',
    customerId: '',
    customerPhone: '',
    customerEmail: '',
    paymentSessionId: '',
    openDialog: false // State to control dialog visibility
  };

  handleOpenDialog = () => {
    this.setState({ openDialog: true });
  };

  handleCloseDialog = () => {
    this.setState({ openDialog: false });
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
      this.setState({ paymentSessionId: payment_session_id });
      this.handleOpenDialog(); // Open dialog after receiving payment session ID
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
              <TextField
                label="Order Amount"
                type="text"
                name="orderAmount"
                value={this.state.orderAmount}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                label="Order ID"
                type="text"
                name="orderId"
                value={this.state.orderId}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                label="Customer ID"
                type="text"
                name="customerId"
                value={this.state.customerId}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                label="Customer Phone"
                type="text"
                name="customerPhone"
                value={this.state.customerPhone}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                label="Customer Email"
                type="text"
                name="customerEmail"
                value={this.state.customerEmail}
                onChange={this.handleChange}
                fullWidth
              />
              <Button type="submit" variant="contained" color="primary">Pay with Cashfree</Button>
            </form>
          </div>

          <Dialog open={this.state.openDialog} onClose={this.handleCloseDialog} fullWidth maxWidth="sm">
            <DialogTitle>Payment Gateway</DialogTitle>
            <DialogContent>
              <iframe
                title="Cashfree Payment Gateway"
                src={`https://payment-gateway-cashfree-frontend.vercel.app/payment_page?payment_session_id=${this.state.paymentSessionId}`}
                width="100%"
                height="600px"
                frameBorder="0"
              ></iframe>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseDialog} color="primary">Close</Button>
            </DialogActions>
          </Dialog>
        </main>
      </div>
    );
  }
}

export default App;
