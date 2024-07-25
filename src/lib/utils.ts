import { format, startOfDay, addHours } from "date-fns";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Schedule, Schedules } from "@/schemas/schedule.schema";
import { isSameDay, parse, addMinutes, isAfter, isBefore } from "date-fns";
import { enUS } from "date-fns/locale";

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

export function getDayWithNumber(date: Date) {
  const dayWeek = format(date, "EEEE", { locale: enUS });
  const dayMonth = format(date, "d", { locale: enUS });

  return `${dayWeek.slice(0, 3)} ${dayMonth}`;
}

export function isMatchSchedule(schedule1: Schedule, schedule2: Schedule) {
  const isSameScheduleDay = isSameDay(schedule1.fecha, schedule2.fecha);
  const isSameScheduleHours = schedule1.hora === schedule2.hora;

  return isSameScheduleHours && isSameScheduleDay ? true : false;
}

/**
 * @param {string} baseHour - This is the base hour of the day without minutes.For example 13:00.
 * @param {string} hourToVerify - This is the hour that has to be verified.
 * @returns {boolean} - If hourToVerify is between the base hour and base hour + 59 minutes it returns true, else it returns false.
 */

export function checkHourRange(baseHour: string, hourToVerify: string) {
  if (baseHour === hourToVerify) return true;

  const hourToVerifyToDate = parse(hourToVerify, "HH:mm", new Date());
  const baseHourDate = parse(baseHour, "HH:mm", new Date());
  const hourEnd = addMinutes(baseHourDate, 59);

  if (
    isAfter(hourToVerifyToDate, baseHourDate) &&
    isBefore(hourToVerifyToDate, hourEnd)
  ) {
    return true;
  }

  return false;
}

export function sortByHour(schedules: Schedules) {
  return schedules.sort((a, b) => {
    const dateA = parseInt(a.hora.replace(":", ""));
    const dateB = parseInt(b.hora.replace(":", ""));
    return dateA - dateB;
  });
}
