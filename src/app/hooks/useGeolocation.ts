import { useState, useEffect } from "react";
import { toast } from "./use-toast";

export interface GeolocationData {
  latitude: number;
  longitude: number;
  altitude: number;
}

export const useGeolocation = (): {
  position: GeolocationData | null;
  error: string | null;
  isLoading: boolean;
} => {
  const [position, setPosition] = useState<GeolocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");

      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          altitude: pos.coords.altitude || 0,
        });
        setIsLoading(false);
      },
      (err) => {
        setPosition({
          latitude: 30.435975,
          longitude: -97.685133,
          altitude: 0,
        });
        toast({
          title: "Unable to access your location.",
          description:
            "Check location services in browser settings or refresh the page. Using Phoenix HQ Position.",
          variant: "destructive", // Red background for error
          duration: 3000,
        });
        setError(
          "Unable to access your location. Please enable location services."
        );
        console.log("we are in eerror for navigator case");
        setIsLoading(false);
      }
    );
  }, []);

  return { position, error, isLoading };
};
