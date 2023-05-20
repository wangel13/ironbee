import prisma from "@/lib/prisma";

export default async function Projects() {
  const projects = await prisma.project.findMany();
  return (
    <div className="bg-white shadow rounded p-4 my-4">
      Список проектов
      {projects.map((project) => (
        <div key={project.id}>{project.id}</div>
      ))}
    </div>
  );
}
