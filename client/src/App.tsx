import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./components/CheckoutForm";

const STRIPE_KEY = import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY;

const stripePromise = loadStripe(STRIPE_KEY);

function App() {
  const [secret, setSecret] = useState("");

  useEffect(() => {
    async function getSecret() {
      const { data } = await axios.post("http://localhost:3001/paymentintent", {
        amount: 1500 * 100,
      });
      setSecret(data.clientSecret);
    }
    getSecret();
  }, []);

  return (
    <>
      {secret && (
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "30%",
            width: "35%",
            margin: "auto",
            padding: "20px 30px",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
        >
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: secret,
              appearance: {
                theme: "stripe",
                variables: { colorPrimaryText: "#262626" },
                rules: {
                  ".Input": {
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    border: "none",
                    outline: "none",
                    padding: "0.75em 1em",
                    color: "#444",
                    fontFamily: "Arial",
                  },
                  ".Input:focus": {
                    boxShadow: "inset 0 0 0 2px #2563eb",
                  },
                  ".Label": {
                    fontSize: "18px",
                    fontWeight: "300",
                    padding: "5px",
                    fontFamily: "Arial",
                    textTransform: "capitalize",
                  },
                },
              },
            }}
          >
            <CheckoutForm />
          </Elements>
        </div>
      )}
    </>
  );
}

export default App;
