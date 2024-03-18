import { useContext, useState } from "react";

import { AirportsContext } from "../context/airportsRoute";

type FlightRouteHook = {
  triggerDrawRoute: () => Promise<void>;
  loading: boolean;
  resetDrawRoute: () => void;
};

const useFlightRoute = (): FlightRouteHook => {
  const { setDrawRoute } = useContext(AirportsContext);
  const [loading, setLoading] = useState<boolean>(false);

  const triggerDrawRoute = async (): Promise<void> => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setDrawRoute(true);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching flight route:", error);
    }
  };

  const resetDrawRoute = (): void => {
    setDrawRoute(false);
  };

  return { triggerDrawRoute, loading, resetDrawRoute };
};

export default useFlightRoute;
