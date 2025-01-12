import PaymentCheckout from "@/components/forms/PaymentCheckout";
import DocumentTable from "@/components/tables/DocumentTable";
import PaymentTable from "@/components/tables/PaymentTable";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  return (
    <div className=" w-full flex flex-col-reverse md:flex-row gap-6 px-6">
      <div className="flex w-full flex-col gap-6 bg-slate-100">
        <div className=" flex flex-col gap-2">
          <p className=" text-[18px] font-semibold">Payment Request</p>
          <PaymentTable />
        </div>
        <div className=" flex flex-col gap-2 bg-slate-100">
          <p className=" text-[18px] font-semibold">Uploaded Documents</p>
          <DocumentTable />{" "}
        </div>
      </div>
      <PaymentCheckout />
    </div>
  );
};

export default page;
