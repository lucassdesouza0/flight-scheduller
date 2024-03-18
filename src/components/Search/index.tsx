import React, { useState } from "react";
import { Box, Autocomplete, CircularProgress, Typography } from "@mui/material";
import useAirports, { IAirport } from "../../hooks/useAirports";
import { useAirportsContext } from "../../context/airportsRoute";
import useFlightRoute from "../../hooks/useFlightRoute";
import {
  Form,
  LanIcon,
  PaperContainer,
  SubmitButton,
  TakeOffIcon,
  TextFieldStyled,
} from "./styles";
import useCalculateDistance from "../../hooks/useCalculateDistance";
import { Flight } from "@mui/icons-material";

const Search: React.FC = () => {
  const [departure, setDeparture] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [milesDistance, setMilesDistance] = useState<number | null>(null);
  const { airportA, airportB, setAirportA, setAirportB } = useAirportsContext();
  const { calculate } = useCalculateDistance();

  const { airports, filterAirports } = useAirports();
  const { triggerDrawRoute, resetDrawRoute, loading } = useFlightRoute();

  const filteredDepartureAirports = filterAirports(departure);
  const filteredDestinationAirports = filterAirports(destination);

  const handleDepartureChange = (value: string): void => {
    if (!value.length) {
      resetDrawRoute();
      setMilesDistance(null);
    }
    setDeparture(value);
  };

  const handleDestinationChange = (value: string): void => {
    if (!value.length) {
      resetDrawRoute();
      setMilesDistance(null);
    }
    setDestination(value);
  };

  const handleAirportSelect = (
    airport: IAirport | null,
    type: string
  ): void => {
    if (type === "departure") {
      const index = airports.findIndex((a) => a.iata === airport?.iata);
      setAirportA(airports[index]);
    } else if (type === "destination") {
      const index = airports.findIndex((a) => a.iata === airport?.iata);

      setAirportB(airports[index]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const distance = calculate(
      airportA.latitude,
      airportA.longitude,
      airportB.latitude,
      airportB.longitude
    );
    await triggerDrawRoute();
    setMilesDistance(distance);
  };

  return (
    <PaperContainer>
      <Box
        sx={{
          padding: "2rem",
        }}
      >
        <Typography
          variant="h5"
          sx={{ marginBottom: "2rem", textAlign: "center" }}
        >
          Search for flights
        </Typography>
        <Form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <TakeOffIcon />
            <Autocomplete
              options={filteredDepartureAirports}
              getOptionLabel={(option) => `${option.iata} - ${option.name}`}
              inputValue={departure}
              onInputChange={(e, newInputValue) => {
                handleDepartureChange(newInputValue);
              }}
              onChange={(e, newValue) => {
                handleAirportSelect(newValue, "departure");
              }}
              renderInput={(params) => (
                <TextFieldStyled
                  {...params}
                  label="Departure"
                  fullWidth
                  required
                  value={departure}
                />
              )}
              sx={{ flexGrow: 1 }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
            }}
          >
            <LanIcon />

            <Autocomplete
              options={filteredDestinationAirports}
              getOptionLabel={(option) => `${option.iata} - ${option.name}`}
              inputValue={destination}
              onInputChange={(e, newInputValue) => {
                handleDestinationChange(newInputValue);
              }}
              onChange={(e, newValue) => {
                handleAirportSelect(newValue, "destination");
              }}
              renderInput={(params) => (
                <TextFieldStyled
                  {...params}
                  variant="outlined"
                  label="Destination"
                  fullWidth
                  required
                  value={destination}
                />
              )}
              sx={{ flexGrow: 1 }}
            />
          </Box>
          <SubmitButton
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={!departure || !destination}
          >
            {loading ? (
              <CircularProgress color="secondary" size={16} />
            ) : (
              "Search"
            )}
          </SubmitButton>
        </Form>
        {milesDistance && (
          <Typography
            variant="h6"
            sx={{
              marginTop: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              justifyContent: "center",
            }}
          >
            <Flight />
            {milesDistance.toFixed(2)} Nautical Miles
          </Typography>
        )}
      </Box>
    </PaperContainer>
  );
};

export default Search;
