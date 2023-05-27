"use client";

import React from "react";
import NumOfProjectsInIndustriesChart from "./charts/NumOfProjectsInIndustriesChart";
import OneNumChart from "./charts/OneNumChart";
import NumOfProjectsAreasChart from "./charts/NumOfProjectsAreasChart";
import NumOfProjectsLegalFormsChart from "./charts/NumOfProjectsLegalFormsChart";

interface DashboardProps {
  statistics: any;
}

const Dashboard = ({ statistics }: DashboardProps) => {
  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-6">
        <div className="bg-white p-4 rounded-lg shadow-sm ">
          <OneNumChart title="кол-во проектов" num={statistics.numOfProjects} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <OneNumChart
            title="кол-во пользователей"
            num={statistics.numOfUsers}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mt-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <NumOfProjectsInIndustriesChart
            topIndustriesByNumOfProjects={
              statistics.topIndustriesByNumOfProjects
            }
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <NumOfProjectsAreasChart
            topAreasByNumOfProjects={statistics.topAreasByNumOfProjects}
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <NumOfProjectsLegalFormsChart
            legalFormsByNumOfProjects={statistics.legalFormsByNumOfProjects}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
