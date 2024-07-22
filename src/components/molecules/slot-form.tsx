import React from "react";
import { useStore } from "@/lib/store/store";
import { Label } from "@/components/atoms/label";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import { Schedule } from "@/schemas/schedule.schema";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScheduleSchema } from "@/schemas/schedule.schema";
import { isMatchSchedule } from "@/lib/utils";

const defaultValues = {
  id_agenda: -1,
  id_paciente: null,
  fecha: "",
  hora: "",
  ape_nom: null,
};

interface Props {
  schedule?: Schedule;
  onChangePopover: (open: boolean) => void;
}

function SlotForm({ schedule, onChangePopover }: Props) {
  const { addSchedule, schedules, removeSchedule, updateSchedule } = useStore(
    (store) => store
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, dirtyFields },
  } = useForm<Schedule>({
    defaultValues: schedule ?? defaultValues,
    resolver: zodResolver(ScheduleSchema),
  });
  const scheduleIndex = schedules.findIndex((data) =>
    schedule ? isMatchSchedule(schedule, data) : false
  );

  const onSubmit: SubmitHandler<Schedule> = (state) => {
    if (state.ape_nom && dirtyFields.ape_nom) {
      state.id_agenda = Math.floor(Math.random() * 10000);
      state.id_paciente = Math.floor(Math.random() * 10000);
    }
    if (!schedule) {
      addSchedule(state);
      onChangePopover(false);
    } else {
      updateSchedule(scheduleIndex, state);
      reset();
    }
  };

  const onDeleteAppointment = (schedule: Schedule) => {
    const scheduleAppintmentDeleted = {
      ...schedule,
      id_agenda: -1,
      id_paciente: null,
      ape_nom: null,
    };
    updateSchedule(scheduleIndex, scheduleAppintmentDeleted);
    reset();
  };

  const onDeleteSchedule = (schedule: Schedule) => {
    if (schedule) {
      removeSchedule(schedule);
      onChangePopover(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Slot</h4>
        <p className="text-sm text-muted-foreground">
          {schedule ? "Edit selected slot." : "Add a new slot."}
        </p>
      </div>
      <div className="grid gap-2">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="date">Date *</Label>
          <Input
            {...register("fecha")}
            type="date"
            id="date"
            required
            className="col-span-2 h-8"
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="hour">Hour *</Label>
          <Input
            {...register("hora")}
            step="1800"
            type="time"
            required
            id="hour"
            className="col-span-2 h-8"
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="ape_nom">Patient</Label>
          <Input
            {...register("ape_nom")}
            placeholder="Juan Garcia"
            id="ape_nom"
            className="col-span-2 h-8"
          />
        </div>
        <div className="grid">
          <Button type="submit" disabled={!isDirty}>
            {schedule ? "Edit Slot" : "Create Slot"}{" "}
          </Button>
        </div>
        {schedule ? (
          <>
            <div className="grid">
              <Button
                type="button"
                className="border-red-600 text-red-600 hover:text-red-600"
                variant={"outline"}
                onClick={() => onDeleteAppointment(schedule)}
              >
                Remove Appointment
              </Button>
            </div>
            <div className="grid">
              <Button
                type="button"
                onClick={() => onDeleteSchedule(schedule)}
                className="bg-red-600 hover:bg-red-800"
              >
                Delete Slot
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </form>
  );
}

export default SlotForm;
