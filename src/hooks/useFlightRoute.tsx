import { useContext, useState } from "react";
import { AirportsContext } from "../context/airportsRoute";

const useFlightRoute = () => {
  const { setDrawRoute } = useContext(AirportsContext);
  const [loading, setLoading] = useState(false);

  const triggerDrawRoute = async () => {
    try {
      setLoading(true);
      // Simulate a fetch call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update the prop in the context to true
      setDrawRoute(true);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching flight route:", error);
    }
  };

  const resetDrawRoute = () => {
    setDrawRoute(false);
  };

  return { triggerDrawRoute, loading, resetDrawRoute };
};

export default useFlightRoute;
