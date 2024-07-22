import { getSchedules } from "@/services/schedule.services";
import VerticalNavbar from "@/components/organisms/vertical-navbar";
import DayTable from "@/components/organisms/day-table";

export default async function Page() {
  const schedules = await getSchedules();

  return (
    <main className="flex h-full">
      <VerticalNavbar />
      <section className="w-3/4">
        <DayTable />
      </section>
    </main>
  );
}
