import { renderHook } from "@testing-library/react";

import useFlightRoute from "./useFlightRoute";

describe("useFlightRoute custom hook", () => {
  it("initializes with the loading value of false", () => {
    const { result } = renderHook(() => useFlightRoute());
    expect(result.current.loading).toBe(false);
  });
  it("triggers the draw route and sets the loading to true", async () => {
    const { result } = renderHook(() => useFlightRoute());
    await result.current.triggerDrawRoute();
    expect(result.current.loading).toBe(true);
  });
  it("resets the draw route and sets the loading to false", () => {
    const { result } = renderHook(() => useFlightRoute());
    result.current.resetDrawRoute();
    expect(result.current.loading).toBe(false);
  });
});
