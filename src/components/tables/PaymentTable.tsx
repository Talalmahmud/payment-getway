"use client";
import { getPayments, getUserRole, updatePaymentStatus } from "@/app/actions";
import { createClient } from "@/utils/supabase/client";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import Pagination from "../common/Pagination";

const PaymentTable = () => {
  const [payments, setPayments] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [status, setStatus] = useState("All");
  const [itemsPerPage, setItemsPerPage] = useState<number>(10); // You can adjust the number of items per page
  const [user, setUser] = useState<any>("");

  const [selectDate, setSelectDate] = useState<any>("");
  const handleStatusChange = (
    index: number,
    newStatus: string,
    pId: string
  ) => {
    updatePaymentStatus(newStatus, pId);
    getPaymentData();
  };
  const getPaymentData = async () => {
    const data = await getPayments(status, selectDate, page, 10);
    setPayments(data);
    const totalDocuments = data?.length || 1;
    setItemsPerPage(Math.ceil(totalDocuments / itemsPerPage));
  };

  const getRole = async () => {
    const user: any = await getUserRole();
    setUser(user);
  };
  useEffect(() => {
    getPaymentData();
  }, [status, selectDate, page]);
  useEffect(() => {
    getPaymentData();
    getRole();
  }, []);

  return (
    <div className=" overflow-x-auto">
      <div className="mb-4 flex items-center justify-end gap-4">
        <label htmlFor="statusFilter" className="text-gray-700 font-bold">
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="All">All</option>
          <option value="approved" className="text-green-500">
            Approved
          </option>
          <option value="pending" className="text-yellow-500">
            Pending
          </option>
          <option value="rejected" className="text-red-500">
            Rejected
          </option>
        </select>
        <input
          type="date"
          id="startDate"
          value={selectDate}
          onChange={(e) => setSelectDate(e.target.value)}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <table className="min-w-full  bg-white shadow-md rounded-lg">
        <thead>
          <tr className="text-[12px]">
            <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase text-left">
              Title
            </th>
            <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase text-left">
              Amount
            </th>
            <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase text-left">
              Status
            </th>
            <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase text-left">
              Created At
            </th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment: any, index: any) => (
            <tr key={index} className="border-b text-[12px]">
              <td className="py-2 px-4 text-gray-700">{payment.title}</td>
              <td className="py-2 px-4 text-gray-700">{payment.amount}</td>
              <td className="py-2 px-4 inline-block">
                {user?.role === "user" ? (
                  payment.status
                ) : (
                  <select
                    value={payment.status}
                    onChange={(e) =>
                      handleStatusChange(index, e.target.value, payment?.id)
                    }
                    className={`shadow appearance-none border inline-block rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline}`}
                  >
                    <option value="approved" className="text-green-500">
                      Approved
                    </option>
                    <option value="pending" className="text-yellow-500">
                      Pending
                    </option>
                    <option value="rejected" className="text-red-500">
                      Rejected
                    </option>
                  </select>
                )}
              </td>
              <td className="py-2 px-4 text-gray-700">
                {format(payment.created_at, "yyyy-MM-dd,HH-mm-ss")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {itemsPerPage > 10 && (
        <Pagination
          currentPage={page}
          totalPages={itemsPerPage}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default PaymentTable;
