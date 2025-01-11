import PaymentCheckout from "@/components/forms/PaymentCheckout";
import DocumentTable from "@/components/tables/DocumentTable";
import PaymentTable from "@/components/tables/PaymentTable";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <PaymentTable />
      <DocumentTable />
      <PaymentCheckout />
    </div>
  );
};

export default page;
