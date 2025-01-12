"use client";
import { getDailyPaymentStatistics } from "@/app/actions";
import React, { useEffect, useState } from "react";
import CustomBarchart from "./CustomBarChart";

type Props = {};

const Chart = (props: Props) => {
  const [dailyData, setDailyData] = useState<any>([]);
  const getData = async () => {
    const chartData = (await getDailyPaymentStatistics()) || [];
    setDailyData(chartData);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <CustomBarchart title={"Daily Payment"} dataset={dailyData} />
    </div>
  );
};

export default Chart;
