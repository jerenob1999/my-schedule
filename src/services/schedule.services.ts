import { Schedules, SchedulesSchema } from "@/schemas/schedule.schema";

export async function getSchedules(): Promise<Schedules> {
  ("use server");
  try {
    const res = await fetch(
      "https://my-json-server.typicode.com/juanpernu/bilog-fe-challenge/schedule"
    );
    const data = await res.json();

    const result = SchedulesSchema.safeParse(data);
    if (result.error) {
      throw Error(result.error.message);
    }

    return data;
  } catch (error) {
    throw error;
  }
}
