import { renderHook } from "@testing-library/react";
import useAirports from "./useAirports";

describe("useAirports custom hook", () => {
  it("initializes with the initial value of 3376 airports", () => {
    const { result } = renderHook(() => useAirports());
    expect(result.current.airports.length).toBe(3376);
  });

  it("filters airports", () => {
    const { result } = renderHook(() => useAirports());
    const filteredAirports = result.current.filterAirports("JFK");
    expect(filteredAirports.length).toBe(1);
  });
});
