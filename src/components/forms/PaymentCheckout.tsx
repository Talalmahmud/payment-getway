"use client";
import React, { useState } from "react";
import StripeCheckout from "../common/StripeCheckOut";
import { title } from "process";

const PaymentCheckout = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-w-[400px] p-6 bg-white shadow-md border-[1px]  border-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Payment Checkout
      </h2>
      <div className="mb-4 ">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Title:
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="Add payment title"
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Amount:
        </label>
        <input
          placeholder="Add paymen amount"
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {formData?.title !== "" && formData?.amount && (
        <StripeCheckout title={formData?.title} amount={formData?.amount} />
      )}
    </div>
  );
};

export default PaymentCheckout;
