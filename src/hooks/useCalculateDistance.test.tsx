import { renderHook } from "@testing-library/react";
import useCalculateDistance from "./useCalculateDistance";

describe("useCalculateDistance custom hook", () => {
  it("initializes with the coordinates with the value of 0", () => {
    const { result } = renderHook(() => useCalculateDistance());
    expect(result.current.calculate(0, 0, 0, 0)).toBe(0);
  });
  it("calculates the distance between two fake coordinates", () => {
    const { result } = renderHook(() => useCalculateDistance());

    expect(result.current.calculate(0, 0, 0, 1)).toBeCloseTo(60, 0);
  });
  it("calculates the distance between two real coordinates", () => {
    const { result } = renderHook(() => useCalculateDistance());

    expect(
      result.current.calculate(49.384358, -126.848974, 25.76168, -82.19179)
    ).toBeCloseTo(2502, 0);
  });
});
