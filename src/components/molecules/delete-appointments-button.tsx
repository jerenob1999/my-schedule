import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/atoms/alert-dialog";
import { Button } from "@/components/atoms/button";
import { useToast } from "@/hooks/use-toast";
import { isSameDay, format } from "date-fns";
import { useStore } from "@/lib/store/store";

import React from "react";

function DeleteAppointmentsButton() {
  const { toast } = useToast();
  const { selectedDay, schedules, setSchedules } = useStore((store) => store);

  const handleCleanAllAppointments = () => {
    const selectedDayFormatted = format(selectedDay, "yyyy-MM-dd");

    const schedulesWithouthAppointments = schedules.map((schedule) => {
      const isSameDayCheck = isSameDay(schedule.fecha, selectedDayFormatted);
      if (!isSameDayCheck) return schedule;

      return { ...schedule, ape_nom: null, id_agenda: -1, id_paciente: null };
    });
    setSchedules(schedulesWithouthAppointments);

    return toast({
      title: "Success!",
      description: `All Appointments from day ${selectedDayFormatted} have been removed`,
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"outline"}
          className="border-red-600 text-red-600 hover:text-red-600"
        >
          Clean all appointments
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove all appointments from the selected day.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleCleanAllAppointments}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteAppointmentsButton;
