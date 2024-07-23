"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/lib/store/store";
import { SchedulesSchema } from "@/schemas/schedule.schema";

function useFetchSchedules() {
  const { setSchedules } = useStore((store) => store);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("api/schedules");
        if (!response.ok) {
          setError("There was an error loading the schedules");
          return;
        }
        const schedules = await response.json();
        const result = SchedulesSchema.safeParse(schedules.data);
        if (!result.success) {
          setError("There was an error loading the schedules");
          return;
        }
        setSchedules(schedules.data);
        setError(null);
      } catch (error) {
        setError(
          "Whoops, something went wrong when processing the request, please try again later"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [error, setSchedules]);
  return { isLoading, error };
}

export default useFetchSchedules;
