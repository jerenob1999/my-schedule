import { create } from "zustand";
import { Schedules, Schedule } from "@/schemas/schedule.schema";
import { devtools } from "zustand/middleware";

interface State {
  schedules: Schedules;
  selectedDay: Date;
}

interface Action {
  updateSelectedDay: (day: Date) => void;
  addSchedule: (schedule: Schedule) => void;
}

export const useStore = create<State & Action>()(
  devtools((set) => ({
    schedules: [],
    selectedDay: new Date(),
    addSchedule: (schedule: Schedule) =>
      set((state) => ({
        schedules: [...state.schedules, schedule],
      })),
    updateSelectedDay: (day: Date) => set({ selectedDay: day }),
  }))
);
