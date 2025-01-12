"use client";
import { insertPayment } from "@/app/actions";
import {
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";

type Props = {
  amount: number;
  title: string;
};

const StripePayment: React.FC<Props> = ({ amount, title }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setProcessing(true);
    insertPayment(title, amount);
    if (!stripe || !elements) {
      setError("Stripe has not loaded yet.");
      setProcessing(false);
      return;
    }

    const paymentElement = elements.getElement(PaymentElement);

    if (!paymentElement) {
      setError("Payment element not found.");
      setProcessing(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
    });

    if (confirmError) {
      setError(confirmError.message || "An error occurred.");
      setProcessing(false);
      return;
    }

    setSucceeded(true);
    setProcessing(false);
  };

  return (
    <div className="bg-blue-400 p-6 rounded-lg shadow-md max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-white p-3 rounded-md shadow-sm">
          <PaymentElement className="p-2" />
        </div>
        <button
          type="submit"
          disabled={!stripe || processing || succeeded}
          className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
            processing || succeeded
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {processing ? "Processing..." : "Pay"}
        </button>
      </form>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {succeeded && (
        <div className="text-green-500 mt-4">Payment succeeded!</div>
      )}
    </div>
  );
};

export default StripePayment;
