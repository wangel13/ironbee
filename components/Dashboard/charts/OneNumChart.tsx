import React from "react";

interface OneNumChartProps {
  title: string;
  num: number;
}

const OneNumChart = ({ title, num }: OneNumChartProps) => {
  return (
    <div className="flex h-full">
      <div className="m-auto text-center">
        <h4 className="text-sm uppercase text-gray-500 leading-tight">
          {title}
        </h4>
        <h3 className="text-3xl text-gray-700 font-semibold leading-tight my-3">
          {num}
        </h3>
      </div>
    </div>
  );
};

export default OneNumChart;
