import AppInitializer from "@/lib/store/provider";
import { getSchedules } from "@/services/schedule.services";

export default async function Page() {
  const schedules = await getSchedules();

  return (
    <AppInitializer schedules={schedules}>
      <main></main>
    </AppInitializer>
  );
}
