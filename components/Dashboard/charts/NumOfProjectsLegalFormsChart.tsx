"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { map } from "lodash";

ChartJS.register(ArcElement, Tooltip, Legend);

interface NumOfProjectsLegalFormsChartProps {
  legalFormsByNumOfProjects: any;
}

const NumOfProjectsLegalFormsChart = ({
  legalFormsByNumOfProjects,
}: NumOfProjectsLegalFormsChartProps) => {
  const data = {
    labels: map(legalFormsByNumOfProjects, (i) => i.labelShort),
    datasets: [
      {
        data: map(legalFormsByNumOfProjects, (i) => i.numOfProjects),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="text-center">
      <h1 className="font-bold">
        Кол-во проектов в разрезе правовых форм, шт.
      </h1>
      <div className="flex mt-2 max-h-72 justify-center">
        <Pie data={data} />
      </div>
    </div>
  );
};

export default NumOfProjectsLegalFormsChart;
