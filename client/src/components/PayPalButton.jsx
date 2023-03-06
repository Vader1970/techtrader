// **Coded by Daniel Wilkey** //

// This imports the PayPalScriptProvider and PayPalButtons components from the @paypal/react-paypal-js library, which provides a simple way to integrate PayPal payment functionality into a React application. These components will be used later in the code to render the PayPal payment buttons.
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// This imports the PAYPAL_CLIENT_ID value from a separate client_id.js file located in the parent directory. This value is used to specify the client ID for the PayPal API, which is necessary for communicating with PayPal servers and processing payments.
import PAYPAL_CLIENT_ID from "../client_id";

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
