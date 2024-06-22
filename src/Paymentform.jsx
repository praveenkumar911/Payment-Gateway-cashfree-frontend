import React, { useEffect } from 'react';

const PaymentPage = () => {
  useEffect(() => {
    // Get the session ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const paymentSessionId = urlParams.get('payment_session_id');

    if (paymentSessionId) {
      // Initialize the payment options using Cashfree
      const script = document.createElement('script');
      script.src = 'https://sdk.cashfree.com/js/v1/cashfree.min.js';
      script.onload = () => {
        // Configure and display the payment options
        window.Cashfree.init({
          layout: {
            mode: 'fullscreen', // 'page' or 'fullscreen'
            container: 'payment-container', // The ID of the container where the payment options will be rendered
            theme: {
              backgroundColor: '#ffffff',
              color: '#000000'
            }
          },
          paymentSessionId: paymentSessionId,
          onSuccess: (data) => {
            console.log('Payment Successful:', data);
            // Redirect or show success message
          },
          onFailure: (data) => {
            console.log('Payment Failed:', data);
            // Show error message
          }
        });
      };
      document.body.appendChild(script);
    } else {
      console.error('Payment session ID is missing in the URL');
    }
  }, []);

  return (
    <div>
      <h1>Payment Page</h1>
      <div id="payment-container"></div> {/* This div will contain the payment options */}
    </div>
  );
};

export default PaymentPage;
