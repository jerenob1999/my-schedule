"use client";
import { useStore } from "@/lib/store/store";
import { Schedule } from "@/schemas/schedule.schema";

interface Props {
  children: React.ReactNode;
  schedules: Schedule[];
}

export default function AppInitializer({ schedules, children }: Props) {
  useStore.setState({
    schedules,
  });
  return children;
}
