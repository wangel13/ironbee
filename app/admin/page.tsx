import { Dashboard } from "@/components/Dashboard";
import { ProjectCard } from "@/components/ProjectCard";
import { getStatistics } from "./helpers";

export default async function Projects() {
  const statistics = await getStatistics();

  return (
    <div className="p-4 my-4">
      <h1 className="text-xl font-bold">Статистика</h1>
      <Dashboard statistics={statistics} />
    </div>
  );
}
