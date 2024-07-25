"use client";

import React from "react";
import { Calendar } from "@/components/molecules";
import { useStore } from "@/lib/store/store";
import { AddSlotPopover } from "@/components/molecules/slot-popover";
import { isSameDay, format } from "date-fns";
import { Button } from "@/components/atoms/button";
import { useToast } from "@/hooks/use-toast";

function VerticalNavbar() {
  const { toast } = useToast();
  const { updateSelectedDay, selectedDay, schedules, setSchedules } = useStore(
    (store) => store
  );

  const selectedDayFormatted = format(selectedDay, "yyyy-MM-dd");

  const handleChangeSelectedDay = (newDate: Date) => {
    updateSelectedDay(newDate);
  };

  const handleCleanAllAppointments = () => {
    const schedulesWithouthAppointments = schedules.map((schedule) => {
      const isSameDayCheck = isSameDay(schedule.fecha, selectedDayFormatted);
      if (!isSameDayCheck) return schedule;

      return { ...schedule, ape_nom: null, id_agenda: -1, id_paciente: null };
    });
    setSchedules(schedulesWithouthAppointments);

    return toast({
      title: "Success!",
      description: `All Appointments from day ${selectedDayFormatted} have been removed`,
    });
  };

  const handleCleanAllSchedules = () => {
    const filteredSchedulesByCurrentDate = schedules.filter(
      (schedule) => !isSameDay(schedule.fecha, selectedDayFormatted)
    );
    setSchedules(filteredSchedulesByCurrentDate);

    return toast({
      title: "Success!",
      description: `All schedules from day ${selectedDayFormatted} have been removed`,
    });
  };

  return (
    <section className="container items-center p-6 w-1/4 h-full flex flex-col  max-w-80 min-w-72 m-0 shadow-lg border-0">
      <Calendar selected={selectedDay} onDayClick={handleChangeSelectedDay} />
      <div className="grid gap-2">
        <AddSlotPopover />
        <Button
          variant={"outline"}
          onClick={handleCleanAllAppointments}
          className="border-red-600 text-red-600 hover:text-red-600"
        >
          Clean all appointments
        </Button>
        <Button
          onClick={handleCleanAllSchedules}
          className="bg-red-600 hover:bg-red-800 grid"
        >
          Clean schedule
        </Button>
      </div>
    </section>
  );
}

export default VerticalNavbar;
