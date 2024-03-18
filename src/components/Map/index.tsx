import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  PolylineF,
} from "@react-google-maps/api";
import { Paper } from "@mui/material";
import { useAirportsContext } from "../../context/airportsRoute";
import { FlightLand, FlightTakeoff } from "@mui/icons-material";

interface Territory {
  lat: number;
  lng: number;
}

type MapOptions = google.maps.MapOptions;

const Map: React.FC = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [flightPath, setFlightPath] = useState<
    | google.maps.MVCArray<google.maps.LatLng>
    | google.maps.LatLng[]
    | google.maps.LatLngLiteral[]
    | undefined
  >(undefined);
  const { airportA, airportB, drawRoute } = useAirportsContext();
  const center = { lat: 39.123, lng: -94.5194 };

  const usTerritory: Territory[] = [
    { lat: 49.384358, lng: -126.848974 },
    { lat: 25.76168, lng: -82.19179 },
    { lat: 44.693947, lng: -71.381927 },
    { lat: 39.739235, lng: -106.99025 },
  ];

  let bounds: google.maps.LatLngBounds | undefined;
  let options: MapOptions | undefined;

  if (isScriptLoaded) {
    bounds = new window.google.maps.LatLngBounds();
    usTerritory.forEach((territory) => {
      bounds?.extend(territory);
    });

    options = {
      restriction: {
        latLngBounds: bounds,
        strictBounds: false,
      },
      streetViewControl: false,
      disableDefaultUI: false,
      mapTypeControl: false,
      fullscreenControl: false,
      zoomControl: false,
    };
  }

  const getRouteCenter = () => {
    if (airportA && airportB) {
      return {
        lat: (airportA.latitude + airportB.latitude) / 2,
        lng: (airportA.longitude + airportB.longitude) / 2,
      };
    }

    return center;
  };

  const containerStyle = {
    width: "100%",
    height: "40vh",
  };

  useEffect(() => {
    if (drawRoute && airportA && airportB) {
      const origin = {
        lat: airportA.latitude,
        lng: airportA.longitude,
      };
      const destination = {
        lat: airportB.latitude,
        lng: airportB.longitude,
      };

      const path = [origin, destination];
      setFlightPath(path);
      path.forEach((p) => {
        bounds?.extend(p);
      });
    } else {
      setFlightPath([]);
    }
  }, [drawRoute, airportA, airportB, bounds]);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyA7szSiIGQX3V2_gkDhQVnCr95k-lWmZBI"
      onLoad={() => setIsScriptLoaded(true)}
    >
      {isScriptLoaded && (
        <Paper
          elevation={3}
          sx={{
            margin: "1rem",
          }}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={drawRoute ? getRouteCenter() : center}
            zoom={drawRoute ? 5 : 3.5}
            options={options}
          >
            {airportA?.latitude && airportA?.longitude && (
              <MarkerF
                position={{
                  lat: airportA.latitude,
                  lng: airportA.longitude,
                }}
              >
                <div>
                  <FlightTakeoff />
                </div>
              </MarkerF>
            )}
            {airportB?.latitude && airportB?.longitude && (
              <MarkerF
                position={{
                  lat: airportB.latitude,
                  lng: airportB.longitude,
                }}
              >
                <div>
                  <FlightLand />
                </div>
              </MarkerF>
            )}
            {flightPath && (
              <PolylineF
                options={{
                  path: flightPath,
                  strokeColor: "#FF0000",
                  strokeOpacity: 1.0,
                  strokeWeight: 2,
                  geodesic: true,
                }}
              />
            )}
          </GoogleMap>
        </Paper>
      )}
    </LoadScript>
  );
};

export default Map;
