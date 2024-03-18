import React, { useState } from "react";
import {
  Button,
  Box,
  Autocomplete,
  CircularProgress,
  Typography,
} from "@mui/material";
import useAirports, { IAirport } from "../../hooks/useAirports";
import { useAirportsContext } from "../../context/airportsRoute";
import useFlightRoute from "../../hooks/useFlightRoute";
import {
  ArrowDown,
  ArrowUp,
  Form,
  LanIcon,
  PaperContainer,
  SubmitButton,
  TakeOffIcon,
  TextFieldStyled,
} from "./styles";

const Search: React.FC = () => {
  const [departure, setDeparture] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const { setAirportA, setAirportB } = useAirportsContext();

  const { airports, filterAirports } = useAirports();
  const { triggerDrawRoute, resetDrawRoute, loading } = useFlightRoute();

  const filteredDepartureAirports = filterAirports(departure);
  const filteredDestinationAirports = filterAirports(destination);

  const handleDepartureChange = (value: string): void => {
    if (!value.length) resetDrawRoute();
    setDeparture(value);
  };

  const handleDestinationChange = (value: string): void => {
    if (!value.length) resetDrawRoute();
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    triggerDrawRoute();
  };

  const switchAirports = (): void => {
    setDeparture((currentDeparture) => {
      setDestination(currentDeparture);
      return destination;
    });
  };

  return (
    <PaperContainer>
      <Box
        sx={{
          padding: "2rem",
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
          Search for flights
        </Typography>
        <Form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "1rem",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <TakeOffIcon />
            <Autocomplete
              options={filteredDepartureAirports}
              getOptionLabel={(option) => `${option.iata} - ${option.name}`} // Display the airport name in the dropdown
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
          <Button
            variant="text"
            onClick={() => switchAirports()}
            disabled={!departure || !destination}
          >
            <ArrowDown />
            <ArrowUp />
          </Button>
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
              getOptionLabel={(option) => `${option.iata} - ${option.name}`} // Display the airport name in the dropdown
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
      </Box>
    </PaperContainer>
  );
};

export default Search;
