"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import map from "lodash/map";

interface NumOfProjectsAreasChartProps {
  topAreasByNumOfProjects: any;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      // position: "bottom" as const,
    },
    title: {
      display: false,
      // text: "Кол-во проектов по отраслям, шт.",
    },
  },

  scales: {
    y: {
      ticks: {
        stepSize: 1,
        // crossAlign: "far" as const,
        font: {
          size: 14,
        },
      },
    },
    x: {
      ticks: {
        font: {
          size: 14,
        },
      },
    },
  },
};

const NumOfProjectsAreasChart = ({
  topAreasByNumOfProjects,
}: NumOfProjectsAreasChartProps) => {
  const data = {
    labels: map(topAreasByNumOfProjects, (i) => i.labelShort),
    datasets: [
      {
        data: map(topAreasByNumOfProjects, (i) => i.numOfProjects),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="text-center">
      <h1 className="font-bold">Топ округов по кол-ву проектов, шт.</h1>
      <div className="flex mt-2 max-h-72 justify-center">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default NumOfProjectsAreasChart;
