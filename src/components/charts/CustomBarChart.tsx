import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const valueFormatter = (value: any) => `${value} tk.`;

type Props = {
  dataset: any;
  title: any;
};

const CustomTooltip = (props: any) => {
  const { payload } = props;
  console.log(payload);
  // const {
  //   day,
  //   enrollments,
  //   total_earning,
  //   total_enrollment_earning,
  //   due_daily_student,
  //   due_daily_earn,
  // } = payload[0]?.payload;

  return (
    <div className=" bg-white p-2 border-[1px] border-gray_light rounded-md  text-[14px] ">
      <p className="">{`Day: ${payload[0]?.payload?.day}`}</p>
      <p className="">{`Amount: $ ${payload[0]?.payload?.totalAmount}`}</p>

      {/* <p className=" ">{`Enroll: ${payload[0]?.payload?.enrollments}`}</p>
      <p className=" ">
        {`Total Earning: ${payload[0]?.payload?.total_earning}`}
        <span className="text-orange"> tk.</span>
      </p>
      <p className=" ">
        {`Today Earning: ${payload[0]?.payload?.total_enrollment_earning}`}
        <span className="text-orange"> tk.</span>
      </p>
      <p className=" ">
        {`Due Earning: ${payload[0]?.payload?.due_daily_earn}`}
        <span className="text-orange"> tk.</span>
      </p> */}
    </div>
  );
};

const CustomTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={8}
        textAnchor="middle"
        fill="#666"
        style={{ fontSize: "10px", fontWeight: "bold" }}
      >
        {payload.value}
      </text>
    </g>
  );
};

const CustomBarchart = ({ dataset, title }: Props) => (
  <div className="w-full flex flex-col items-center justify-center gap-2 my-4">
    <p className="font-bold text-[16px]">{title}</p>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={dataset}>
        <XAxis dataKey="day" interval={0} tick={<CustomTick />} />
        <YAxis tick={{ fontSize: "10px" }} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="totalAmount" radius={[4, 4, 0, 0]} fill="#f56642"></Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default CustomBarchart;
