"use client";

import React from "react";
import { Calendar } from "@/components/molecules";
import { useStore } from "@/lib/store/store";
import { AddSlotPopover } from "@/components/molecules/slot-popover";
import { format } from "date-fns";
import DeleteAppointmentsButton from "@/components/molecules/delete-appointments-button";
import DeleteSlotsButton from "@/components/molecules/delete-slots-button";

function VerticalNavbar() {
  const { updateSelectedDay, selectedDay } = useStore((store) => store);

  const handleChangeSelectedDay = (newDate: Date) => {
    updateSelectedDay(newDate);
  };

  return (
    <section className="container items-center p-6 w-1/4 h-full flex flex-col  max-w-80 min-w-72 m-0 shadow-lg border-0">
      <Calendar selected={selectedDay} onDayClick={handleChangeSelectedDay} />
      <div className="grid gap-2">
        <AddSlotPopover />
        <DeleteAppointmentsButton />
        <DeleteSlotsButton />
      </div>
    </section>
  );
}

export default VerticalNavbar;
