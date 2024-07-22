import { z } from "zod";

export const ScheduleSchema = z.object({
  id_agenda: z.number(),
  id_paciente: z.number().nullable(),
  fecha: z.string(),
  hora: z.string(),
  ape_nom: z
    .string()
    .nullable()
    .transform((value) => (value === "" ? null : value)),
});

export const SchedulesSchema = z.array(ScheduleSchema);
export type Schedules = z.infer<typeof SchedulesSchema>;
export type Schedule = z.infer<typeof ScheduleSchema>;
