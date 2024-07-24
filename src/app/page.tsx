"use client";

import useFetchSchedules from "@/hooks/use-fetch-schedules";
import VerticalNavbar from "@/components/organisms/vertical-navbar";
import DayTable from "@/components/organisms/day-table";

export default function Page() {
  useFetchSchedules();

  return (
    <>
      <VerticalNavbar />
      <section className="w-full px-4">
        <DayTable />
      </section>
    </>
  );
}
