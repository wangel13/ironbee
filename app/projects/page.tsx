import { ProjectCard } from "@/components/ProjectCard";
import prisma from "@/lib/prisma";
import isEmpty from "lodash/isEmpty";

export default async function Projects() {
  const projects = await prisma.project.findMany({
    include: { area: true, author: true, industry: true, legalForm: true },
  });

  return (
    <div className="p-4 my-4">
      <h1 className="text-xl font-bold">Список проектов</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
        <>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              years={project.years}
              workers={project.workers}
              legalFormName={project.legalForm.name}
              industryName={project.industry?.name}
              areaName={project.area?.name}
              minCost={project.minCost}
              maxCost={project.maxCost}
              // authorName={project.author.firstName}
            />
          ))}
          {isEmpty(projects) && (
            <h2 className="text-md mt-1">Проекты отсутствуют</h2>
          )}
        </>
      </div>
    </div>
  );
}
