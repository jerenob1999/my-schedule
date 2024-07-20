"use client";

import React from "react";
import { Calendar } from "@/components/molecules";
import { useStore } from "@/lib/store/store";
import { AddSlotPopover } from "@/components/molecules/slot-popover";

function VerticalNavbar() {
  const { updateSelectedDay, selectedDay } = useStore((store) => store);

  const handleChangeSelectedDay = (newDate: Date) => {
    updateSelectedDay(newDate);
  };

  return (
    <section className="container bg-neutral-50 p-6 w-1/4 h-full flex flex-col  max-w-80 min-w-72 m-0 shadow-lg border-0">
      <Calendar selected={selectedDay} onDayClick={handleChangeSelectedDay} />
      <AddSlotPopover />
    </section>
  );
}

export default VerticalNavbar;
