"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import StripePayment from "./StripePayment";

type Props = {
  amount: number;
  title: string;
};
const stripeLoad = loadStripe(process.env.NEXT_PUBLIC_STRIP_API_KEY as string);

const StripeCheckout = ({ amount, title }: Props) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the client secret from the backend
    if (amount > 0) {
      fetch("/api/checkout-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amount * 100 }), // Convert dollars to cents
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
        })
        .catch((error) => {
          console.error("Error fetching client secret:", error);
        });
    }
  }, [amount]);

  return (
    <div>
      {clientSecret && amount > 0 && (
        <Elements stripe={stripeLoad} options={{ clientSecret }}>
          <StripePayment amount={amount} title={title} />
        </Elements>
      )}
    </div>
  );
};

export default StripeCheckout;
