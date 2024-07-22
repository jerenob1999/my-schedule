import { create } from "zustand";
import { Schedules, Schedule } from "@/schemas/schedule.schema";
import { devtools } from "zustand/middleware";
import { isMatchSchedule } from "@/lib/utils";
import { isSameDay, format } from "date-fns";

interface State {
  schedules: Schedules;
  getfilteredSchedulesByDay: () => Schedules;
  selectedDay: Date;
}

interface Action {
  updateSelectedDay: (day: Date) => void;
  addSchedule: (schedule: Schedule) => void;
  removeSchedule: (schedule: Schedule) => void;
  updateSchedule: (index: number, updatedSchedule: Schedule) => void;
}

export const useStore = create<State & Action>()(
  devtools((set, get) => ({
    schedules: [],
    selectedDay: new Date(),
    getfilteredSchedulesByDay: () =>
      get().schedules.filter((schedule) => {
        return isSameDay(
          schedule.fecha,
          format(get().selectedDay, "yyyy-MM-dd")
        );
      }),
    removeSchedule: (schedule: Schedule) => {
      set((state) => ({
        schedules: state.schedules.filter(
          (data) => !isMatchSchedule(schedule, data)
        ),
      }));
    },
    setSchedules: (schedules: Schedules) => {
      set(() => ({
        schedules,
      }));
    },
    updateSchedule: (index: number, updatedSchedule: Schedule) =>
      set((state) => {
        const updatedSchedules = [...state.schedules];
        updatedSchedules[index] = updatedSchedule;
        return { schedules: updatedSchedules };
      }),
    addSchedule: (schedule: Schedule) =>
      set((state) => ({
        schedules: [...state.schedules, schedule],
      })),
    updateSelectedDay: (day: Date) => set({ selectedDay: day }),
  }))
);
