import { Dashboard } from "@/components/Dashboard";
import { getStatistics } from "./helpers";

export default async function AnalyticsPage() {
  const statistics = await getStatistics();

  return (
    <div className="p-4 my-4">
      <h1 className="text-xl font-bold mb-8">Аналитика</h1>
      <Dashboard statistics={statistics} />
    </div>
  );
}
