"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/atoms/popover";
import { Button } from "@/components/atoms/button";
import SlotForm from "@/components/molecules/slot-form";

export function AddSlotPopover() {
  const [open, setOpen] = useState(false);

  const onChangePopover = (open: boolean) => {
    setOpen(open);
  };
  return (
    <Popover onOpenChange={onChangePopover} open={open}>
      <PopoverTrigger asChild>
        <Button variant="outline">New Slot</Button>
      </PopoverTrigger>
      <PopoverContent>
        <SlotForm onChangePopover={onChangePopover} />
      </PopoverContent>
    </Popover>
  );
}
