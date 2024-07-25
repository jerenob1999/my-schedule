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

function DeleteSlotsButton() {
  const { toast } = useToast();
  const { selectedDay, schedules, setSchedules } = useStore((store) => store);

  const handleCleanAllSchedules = () => {
    const selectedDayFormatted = format(selectedDay, "yyyy-MM-dd");

    const filteredSchedulesByCurrentDate = schedules.filter(
      (schedule) => !isSameDay(schedule.fecha, selectedDayFormatted)
    );
    setSchedules(filteredSchedulesByCurrentDate);

    return toast({
      title: "Success!",
      description: `All schedules from day ${selectedDayFormatted} have been removed`,
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"outline"}
          className="bg-red-600 hover:bg-red-800 grid text-white hover:text-white"
        >
          Clean schedule
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will completly clean the schedule from the selected day.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleCleanAllSchedules}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteSlotsButton;
