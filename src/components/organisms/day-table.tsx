"use client";

import React from "react";
import { useStore } from "@/lib/store/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/table";
import {
  getHoursArray,
  getDayWithNumber,
  checkHourRange,
  sortByHour,
} from "@/lib/utils";
import SlotCard from "@/components/molecules/slot-card";

function DayTable() {
  const { selectedDay, getfilteredSchedulesByDay } = useStore((store) => store);
  const selectedDayToString = getDayWithNumber(selectedDay);
  const filteredSchedulesByDay = getfilteredSchedulesByDay();
  const rows = getHoursArray();

  return (
    <Table className="max-h-screen max-w min-w-[768px]">
      <TableHeader className="h-12">
        <TableRow>
          <TableHead className="w-1/6 text-lg text-primary sticky top-0 bg-white p-2">
            <div className="bg-secondary w-20 flex items-center text-center justify-center h-20 p-2 rounded-full">
              {selectedDayToString}
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((hour) => {
          const filteredSchedulesByHour = filteredSchedulesByDay.filter(
            (schedule) => checkHourRange(hour, schedule.hora)
          );
          const sortedSchedules = sortByHour(filteredSchedulesByHour);
          return (
            <TableRow key={hour}>
              <TableCell className="flex items-center">
                <p className="text-xl text-muted-foreground w-20">{hour}</p>
                <div className="grid xs:grid-cols-8 grid-cols-10 w-full">
                  {sortedSchedules.map((schedule) => (
                    <article
                      className="xs:col-span-2 col-span-5 grid-item"
                      key={schedule.hora}
                    >
                      <SlotCard schedule={schedule} />
                    </article>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default DayTable;
