"use client";

import React from "react";
import { differenceInHours } from "date-fns";
import { useStore } from "@/lib/store/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/table";
import { format } from "date-fns";
import { getHoursArray } from "@/lib/utils";
import SlotCard from "@/components/molecules/slot-card";

function DayTable() {
  const { selectedDay, getfilteredSchedulesByDay } = useStore((store) => store);
  const selectedDayToString = format(selectedDay, "yyyy-MM-dd");
  const filteredSchedulesByDay = getfilteredSchedulesByDay();
  const rows = getHoursArray();

  const checkRange = (hour1: string, hour2: string) => {
    const sd1 = new Date(`2021-09-16T${hour1}:00`);
    const d2 = new Date(`2021-09-16T${hour2}:00`);

    return differenceInHours(sd1, d2) === 0 ? true : false;
  };

  return (
    <Table className="max-h-screen">
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/6 text-primary">
            {selectedDayToString}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((hour) => {
          const filteredSchedulesByHour = filteredSchedulesByDay.filter(
            (schedule) => checkRange(schedule.hora, hour)
          );
          return (
            <TableRow key={hour}>
              <TableCell className="text-xl text-muted-foreground">
                {hour}
              </TableCell>
              <TableCell className="flex">
                {filteredSchedulesByHour.map((schedule) => (
                  <SlotCard key={schedule.hora} schedule={schedule} />
                ))}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default DayTable;
