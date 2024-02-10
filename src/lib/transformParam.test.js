import { describe, it, expect } from "vitest";
import { formatLayoutParam } from "./formatLayoutParam";

describe("transformParam", () => {
  it("separates each character by exactly one space", () => {
    expect(formatLayoutParam("a b c \n 123\n []")).toBe("a b c\n1 2 3\n[ ]");
  });
});
