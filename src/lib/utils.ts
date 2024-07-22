import { format, startOfDay, addHours } from "date-fns";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Schedule } from "@/schemas/schedule.schema";
import { isSameDay, isSameHour } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getHoursArray() {
  const hours = [];
  let date = startOfDay(new Date());
  for (let i = 1; i <= 23; i++) {
    hours.push(format(addHours(date, i), "HH:mm"));
  }
  return hours;
}

export function isMatchSchedule(schedule1: Schedule, schedule2: Schedule) {
  const isSameScheduleDay = isSameDay(schedule1.fecha, schedule2.fecha);
  const dateHour1 = new Date(`2000-12-17T${schedule1.hora}:00`);
  const dateHour2 = new Date(`2000-12-17T${schedule2.hora}:00`);
  const isSameScheduleHours = isSameHour(dateHour1, dateHour2);

  return isSameScheduleHours && isSameScheduleDay;
}
