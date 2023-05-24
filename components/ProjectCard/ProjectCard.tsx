import React from "react";
import { Button } from "../HookForm/Button";
import Link from "next/link";
import { formatCurrency } from "@/lib/formatCurrency";

interface ProjectCardProps {
  id: number;
  years: number;
  workers: number;
  industryName?: string;
  areaName?: string;
  legalFormName: string;
  minCost: number;
  maxCost: number;
}

const ProjectCard = ({
  id,
  years,
  workers,
  industryName,
  areaName,
  legalFormName,
  minCost,
  maxCost,
}: ProjectCardProps) => {
  return (
    <div className="bg-white p-10 rounded-lg shadow">
      <h1 className="text-xl font-bold">{`Проект в отрасли "${industryName}" на ${years} год`}</h1>

      <h1 className="text-xl font-bold mt-4">{`От ${formatCurrency(minCost)} до ${formatCurrency(maxCost)}, в млн. руб.`}</h1>

      <div className="mt-4">
        <h2 className="text-md mt-1">
          <div className="flex items-center">
            <div className="mr-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 fill-red-500"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 3.75A2.75 2.75 0 018.75 1h2.5A2.75 2.75 0 0114 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 016 4.193V3.75zm6.5 0v.325a41.622 41.622 0 00-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25zM10 10a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1V11a1 1 0 00-1-1H10z"
                  clip-rule="evenodd"
                />
                <path d="M3 15.055v-.684c.126.053.255.1.39.142 2.092.642 4.313.987 6.61.987 2.297 0 4.518-.345 6.61-.987.135-.041.264-.089.39-.142v.684c0 1.347-.985 2.53-2.363 2.686a41.454 41.454 0 01-9.274 0C3.985 17.585 3 16.402 3 15.055z" />
              </svg>
            </div>
            <div>
              <span>Тип организации: </span>
              <span className="font-bold">{legalFormName}</span>
            </div>
          </div>
        </h2>

        <h2 className="text-md mt-1">
          <div className="flex items-center">
            <div className="mr-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 fill-red-500"
              >
                <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z" />
              </svg>
            </div>
            <div>
              <span>Количество сотрудников: </span>
              <span className="font-bold">{workers}</span>
            </div>
          </div>
        </h2>

        <h2 className="text-md mt-1">
          <div className="flex items-center">
            <div className="mr-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 fill-red-500"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div>
              <span>Район: </span>
              <span className="font-bold">{areaName}</span>
            </div>
          </div>
        </h2>
      </div>

      <Link href={`projects/${id}`} passHref>
        <Button className="mt-4">Перейти к проекту</Button>
      </Link>
    </div>
  );
};

export default ProjectCard;

{
  /* <h2 className="text-md ">
<span className="uppercase">Тип организации: </span>
<span className="font-bold">{legalFormName}</span>
</h2> */
}

{
  /* <div className="mt-4 mb-10">
<p className="text-gray-600">Course 75% completed</p>
<div className="bg-gray-400 w-64 h-3 rounded-lg mt-2 overflow-hidden">
  <div className="bg-pink-400 w-3/4 h-full rounded-lg shadow-md"></div>
</div>
</div> */
}

{
  /* <h2 className="text-md mt-1">
<span className="uppercase">Район: </span>
<span className="font-bold">{areaName}</span>
</h2> */
}
