function useCalculateDistance(): {
  calculate: (lat1: number, lon1: number, lat2: number, lon2: number) => number;
} {
  const calculate = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const radiansLat1: number = (lat1 * Math.PI) / 180;
    const radiansLon1: number = (lon1 * Math.PI) / 180;
    const radiansLat2: number = (lat2 * Math.PI) / 180;
    const radiansLon2: number = (lon2 * Math.PI) / 180;

    const dLat: number = radiansLat2 - radiansLat1;
    const dLon: number = radiansLon2 - radiansLon1;
    const a: number =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(radiansLat1) * Math.cos(radiansLat2) * Math.sin(dLon / 2) ** 2;
    const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const radiusKm: number = 6371;

    const distanceKm: number = radiusKm * c;

    const distanceNauticalMiles: number = distanceKm / 1.852;

    return distanceNauticalMiles;
  };

  return { calculate };
}

export default useCalculateDistance;
