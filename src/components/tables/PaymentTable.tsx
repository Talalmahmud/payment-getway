"use client";
import React, { useState } from "react";

const PaymentTable = () => {
  const [payments, setPayments] = useState([
    {
      title: "Payment 1",
      amount: "$100",
      createAt: "22-02-24",
      status: "Completed",
    },
    {
      title: "Payment 2",
      amount: "$200",
      createAt: "22-02-24",
      status: "Pending",
    },
    {
      title: "Payment 3",
      amount: "$300",
      createAt: "22-02-24",
      status: "Failed",
    },
  ]);

  const handleStatusChange = (index: number, newStatus: string) => {
    const updatedPayments = payments.map((payment, i) =>
      i === index ? { ...payment, status: newStatus } : payment
    );
    setPayments(updatedPayments);
  };

  return (
    <div className=" overflow-x-auto">
      <table className="min-w-full  bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm text-left">
              Title
            </th>
            <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm text-left">
              Amount
            </th>
            <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm text-left">
              Status
            </th>
            <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm text-left">
              Created At
            </th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-4 text-gray-700">{payment.title}</td>
              <td className="py-2 px-4 text-gray-700">{payment.amount}</td>
              <td className="py-1 px-2 text-gray-700 inline-block">
                <select
                  value={payment.status}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                </select>
              </td>
              <td className="py-2 px-4 text-gray-700">{payment.createAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
