import { useState } from "react";

const data = require("../data/airports.json") as IAirport[];

export interface IAirport {
  iata: string;
  name: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
}

const useAirports = () => {
  const [airports] = useState<IAirport[] | []>(data);

  const filterAirports = (searchString: string) => {
    return airports.filter((airport) => {
      const { name, iata } = airport;
      const lowerCaseSearchString = searchString.toLowerCase();
      return (
        name.toLowerCase().includes(lowerCaseSearchString) ||
        iata.toLowerCase().includes(lowerCaseSearchString)
      );
    });
  };
  return { airports, filterAirports };
};

export default useAirports;
