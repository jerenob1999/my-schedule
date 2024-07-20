import React from "react";
import { useStore } from "@/lib/store/store";
import { Label } from "@/components/atoms/label";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import { Schedule } from "@/schemas/schedule.schema";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScheduleSchema } from "@/schemas/schedule.schema";

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
  const { addSchedule } = useStore((store) => store);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schedule>({
    defaultValues: schedule ?? defaultValues,
    resolver: zodResolver(ScheduleSchema),
  });

  const onSubmit: SubmitHandler<Schedule> = (state) => {
    if (!schedule) {
      addSchedule(state);
    } else {
    }
    onChangePopover(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Slot</h4>
        <p className="text-sm text-muted-foreground">Add a new slot.</p>
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
          <Button>Create Slot</Button>
        </div>
      </div>
    </form>
  );
}

export default SlotForm;
