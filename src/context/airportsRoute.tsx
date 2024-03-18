import React, {
  ReactElement,
  createContext,
  useContext,
  useState,
} from "react";
import { IAirport } from "../hooks/useAirports";

interface AirportsContextType {
  airportA: IAirport;
  airportB: IAirport;
  drawRoute: boolean;
  setAirportA: React.Dispatch<React.SetStateAction<IAirport>>;
  setAirportB: React.Dispatch<React.SetStateAction<IAirport>>;
  setDrawRoute: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialContextValue: AirportsContextType = {
  airportA: {} as IAirport,
  airportB: {} as IAirport,
  drawRoute: false,
  setAirportA: () => {},
  setAirportB: () => {},
  setDrawRoute: () => {},
};

export const AirportsContext =
  createContext<AirportsContextType>(initialContextValue);

export const AirportsProvider = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  const [airportA, setAirportA] = useState<IAirport>({} as IAirport);
  const [airportB, setAirportB] = useState<IAirport>({} as IAirport);
  const [drawRoute, setDrawRoute] = useState<boolean>(false);

  return (
    <AirportsContext.Provider
      value={{
        airportA,
        airportB,
        setAirportA,
        setAirportB,
        drawRoute,
        setDrawRoute,
      }}
    >
      {children}
    </AirportsContext.Provider>
  );
};

export const useAirportsContext = (): AirportsContextType => {
  return useContext(AirportsContext);
};
