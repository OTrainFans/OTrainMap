import { ViewportProps } from "react-map-gl";
import { AppTheme } from "../redux";
import { useMediaQuery } from "@material-ui/core";

export const initialViewState = (): ViewportProps | null => {
  const hashParts = location.hash.substr(1).split("/");
  let builder: ViewportProps = null;

  const zoom = parseFloat(hashParts[0]);
  const latitude = parseFloat(hashParts[1]);
  const longitude = parseFloat(hashParts[2]);
  if (!isNaN(zoom) && !isNaN(latitude) && !isNaN(longitude)) {
    builder = { zoom, latitude, longitude };
  } else {
    return null;
  }

  const bearing = parseFloat(hashParts[3]);
  if (!isNaN(bearing)) {
    builder = { ...builder, bearing };
  }

  const pitch = parseFloat(hashParts[4]);
  if (!isNaN(pitch)) {
    builder = { ...builder, pitch };
  }
  return builder;
};

export const useIsDarkTheme = (appTheme: AppTheme): boolean => {
  const prefersDarkScheme = useMediaQuery("(prefers-color-scheme: dark)");
  return (appTheme === "system" && prefersDarkScheme) || appTheme === "dark";
};
