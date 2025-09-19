// **Coded by Daniel Wilkey** //

// This imports the PayPalScriptProvider and PayPalButtons components from the @paypal/react-paypal-js library, which provides a simple way to integrate PayPal payment functionality into a React application. These components will be used later in the code to render the PayPal payment buttons.
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// PayPal Client ID - using environment variable for production
const PAYPAL_CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID || "AdcOCGNERbESm-TFUT3oQzvissHyWTRYLStuxIe-3Rc7304-q5wNAjKEumBF9-6OkLEEixF_5v7JqAWQ";

// Define a functional component named PayPalButton
const PayPalButton = ({ total, onPaymentSuccess, onPaymentError, disabled }) => {
  // Return a JSX element that represents a PayPal button wrapped by PayPalScriptProvider
  return (
    <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID }}>
      <PayPalButtons
        disabled={disabled}
        forceReRender={[total()]}
        createOrder={(data, actions) => {
          // Create a PayPal order with the purchase unit amount specified by the total prop
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: total(),
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          // Capture the PayPal order on approval and call onPaymentSuccess callback with the order data
          return actions.order.capture().then((details) => {
            onPaymentSuccess(data);
          });
        }}
        onError={(err) => {
          // Call onPaymentError callback on error
          onPaymentError();
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
