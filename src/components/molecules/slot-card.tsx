import React, { useState } from "react";
import { Schedule } from "@/schemas/schedule.schema";
import { clsx } from "clsx";
import { Card, CardTitle, CardHeader } from "@/components/atoms/card";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/atoms/popover";
import SlotForm from "./slot-form";

interface Props {
  schedule: Schedule;
}

function SlotCard({ schedule }: Props) {
  const [open, setOpen] = useState(false);

  const onChangePopover = (open: boolean) => {
    setOpen(open);
  };

  return (
    <Popover onOpenChange={onChangePopover} open={open}>
      <PopoverTrigger asChild>
        <Card className="w-1/4 min-w-64 cursor-pointer transition-colors duration-300 bg-cyan-600 hover:bg-sky-800 ">
          <CardHeader>
            <CardTitle className="flex justify-between">
              <p
                className={clsx(
                  "text-base font-normal ",
                  !schedule.ape_nom ? "text-lime-200" : "text-neutral-100"
                )}
              >
                {schedule.id_agenda === -1 ? "Available" : schedule.ape_nom}
              </p>
              <p className="text-xl font-semibold text-neutral-100">
                {schedule.hora}
              </p>
            </CardTitle>
          </CardHeader>
        </Card>
      </PopoverTrigger>
      <PopoverContent>
        <SlotForm schedule={schedule} onChangePopover={onChangePopover} />
      </PopoverContent>
    </Popover>
  );
}

export default SlotCard;
