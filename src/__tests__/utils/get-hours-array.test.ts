import { describe, it, expect } from "vitest";
import { getHoursArray } from "@/lib/utils";

describe("getHoursArray", () => {
  it("should start at 01:00 and end at 23:00", () => {
    const hoursArray = getHoursArray();
    expect(hoursArray[0]).toBe("01:00");
    expect(hoursArray[hoursArray.length - 1]).toBe("23:00");
  });
});
