import { create } from "zustand";
import { Schedule } from "@/schemas/schedule.schema";

interface Store {
  schedules: Schedule[];
}
export const useStore = create<Store>(() => ({
  schedules: [],
}));
