import express from "express";
import cors from "cors";
import Stripe from "stripe";
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  typescript: true,
});

app.post("/paymentintent", async (req, res) => {
  const model = req.body;
  console.log(model);

  try {
    const p = await stripe.paymentIntents.create({
      amount: model.amount,
      currency: model.currency || "USD",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      success: true,
      clientSecret: p?.client_secret,
    });
  } catch (e) {
    res.status(500).send({ success: false, error: (<Error>e)?.message });
  }
});

app.listen(3001, () => {
  console.log("Server listening on port: 3001");
});
