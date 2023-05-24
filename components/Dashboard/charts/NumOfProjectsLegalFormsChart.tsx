"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { map } from "lodash";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

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
        backgroundColor: "rgba(255, 99, 132, 0.5)",
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
