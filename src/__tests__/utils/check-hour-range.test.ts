import { describe, it, expect } from "vitest";
import { checkHourRange } from "@/lib/utils";

describe("checkHourRange", () => {
  it("should return true if the hours are the same", () => {
    expect(checkHourRange("12:00", "12:00")).toBe(true);
    expect(checkHourRange("09:00", "09:00")).toBe(true);
  });

  it("should return true if hourToVerify is within the range of baseHour and 59 minutes", () => {
    expect(checkHourRange("12:00", "12:20")).toBe(true);
    expect(checkHourRange("12:00", "12:59")).toBe(true);
  });

  it("should return false if hourToVerify is before baseHour", () => {
    expect(checkHourRange("12:00", "11:59")).toBe(false);
    expect(checkHourRange("19:00", "18:59")).toBe(false);
  });

  it("should return false if hourToVerify is 60 minutes after baseHour", () => {
    expect(checkHourRange("12:00", "13:00")).toBe(false);
    expect(checkHourRange("12:00", "13:01")).toBe(false);
  });
});
