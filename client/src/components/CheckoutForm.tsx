import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: any) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:5173",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement
        options={{
          layout: {
            type: "tabs",
            defaultCollapsed: false,
          },
        }}
      />
      <AddressElement options={{ mode: "shipping" }} />
      <button
        disabled={!stripe}
        style={{
          marginTop: "15px",
          padding: "10px",
          fontSize: "18px",
          border: "none",
          borderRadius: "5px",
          background: "#5469d4",
          color: "white",
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default CheckoutForm;
