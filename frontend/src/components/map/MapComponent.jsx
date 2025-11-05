import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import { Box, Typography, Chip, Avatar } from "@mui/material";
import { LocationOn, MyLocation, LocalShipping } from "@mui/icons-material";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useThemeMode } from "../../theme/ThemeProvider";

// Fix for default marker icons not showing
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom markers
const createCustomIcon = (color) => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      background-color: ${color};
      width: 32px;
      height: 32px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
};

const pickupIcon = createCustomIcon("#3b82f6"); // Blue
const dropoffIcon = createCustomIcon("#ef4444"); // Red
const vehicleIcon = createCustomIcon("#10b981"); // Green

// Component to update map view when coordinates change
const MapViewController = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, zoom || map.getZoom());
    }
  }, [center, zoom, map]);

  return null;
};

const MapComponent = ({
  pickup,
  dropoff,
  vehicleLocation,
  showRoute = true,
  height = "500px",
  zoom = 7,
}) => {
  const { mode } = useThemeMode();
  const isDark = mode === "dark";

  // Default coordinates (Mumbai to Pune example)
  const defaultPickup = { lat: 19.076, lng: 72.8777, name: "Mumbai" };
  const defaultDropoff = { lat: 18.5204, lng: 73.8567, name: "Pune" };
  const defaultVehicle = { lat: 18.8, lng: 73.3, name: "Current Location" };

  const pickupCoords = pickup || defaultPickup;
  const dropoffCoords = dropoff || defaultDropoff;
  const vehicleCoords = vehicleLocation || defaultVehicle;

  // Calculate center point
  const center = vehicleLocation
    ? [vehicleCoords.lat, vehicleCoords.lng]
    : [
        (pickupCoords.lat + dropoffCoords.lat) / 2,
        (pickupCoords.lng + dropoffCoords.lng) / 2,
      ];

  // Route line coordinates
  const routeCoordinates = [
    [pickupCoords.lat, pickupCoords.lng],
    [vehicleCoords.lat, vehicleCoords.lng],
    [dropoffCoords.lat, dropoffCoords.lng],
  ];

  return (
    <Box
      sx={{
        height,
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: isDark
          ? "0 8px 32px rgba(0, 0, 0, 0.4)"
          : "0 8px 32px rgba(0, 0, 0, 0.08)",
        border: `1px solid ${
          isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"
        }`,
        position: "relative",
        "& .leaflet-container": {
          height: "100%",
          width: "100%",
          background: isDark ? "#0a0e1a" : "#f8fafc",
        },
        "& .leaflet-popup-content-wrapper": {
          backgroundColor: isDark ? "#1a1d29" : "#ffffff",
          color: isDark ? "#ffffff" : "#000000",
          borderRadius: "12px",
          boxShadow: isDark
            ? "0 8px 32px rgba(0, 0, 0, 0.6)"
            : "0 8px 32px rgba(0, 0, 0, 0.15)",
        },
        "& .leaflet-popup-tip": {
          backgroundColor: isDark ? "#1a1d29" : "#ffffff",
        },
      }}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        touchZoom={true}
        doubleClickZoom={true}
        dragging={true}
        zoomControl={true}
        tap={true}
        style={{ height: "100%", width: "100%" }}
        zoomSnap={0.5}
        zoomDelta={0.5}
      >
        <MapViewController center={center} zoom={zoom} />

        {/* Tile Layer - Different style for dark mode */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url={
            isDark
              ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
        />

        {/* Route Polyline */}
        {showRoute && (
          <Polyline
            positions={routeCoordinates}
            pathOptions={{
              color: "#3b82f6",
              weight: 4,
              opacity: 0.7,
              dashArray: "10, 10",
            }}
          />
        )}

        {/* Pickup Marker */}
        <Marker
          position={[pickupCoords.lat, pickupCoords.lng]}
          icon={pickupIcon}
        >
          <Popup>
            <Box sx={{ p: 1, minWidth: 200 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <Avatar sx={{ bgcolor: "#3b82f6", width: 32, height: 32 }}>
                  <MyLocation sx={{ fontSize: 18 }} />
                </Avatar>
                <Typography variant="subtitle2" fontWeight={700}>
                  Pickup Location
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                {pickupCoords.name || "Pickup Point"}
              </Typography>
              {pickupCoords.address && (
                <Typography variant="caption" color="text.secondary">
                  {pickupCoords.address}
                </Typography>
              )}
            </Box>
          </Popup>
        </Marker>

        {/* Vehicle Marker */}
        {vehicleLocation && (
          <Marker
            position={[vehicleCoords.lat, vehicleCoords.lng]}
            icon={vehicleIcon}
          >
            <Popup>
              <Box sx={{ p: 1, minWidth: 200 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <Avatar sx={{ bgcolor: "#10b981", width: 32, height: 32 }}>
                    <LocalShipping sx={{ fontSize: 18 }} />
                  </Avatar>
                  <Typography variant="subtitle2" fontWeight={700}>
                    Vehicle Location
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  {vehicleCoords.name || "Current Position"}
                </Typography>
                {vehicleCoords.driver && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block" }}
                  >
                    Driver: {vehicleCoords.driver}
                  </Typography>
                )}
                {vehicleCoords.vehicleNumber && (
                  <Chip
                    label={vehicleCoords.vehicleNumber}
                    size="small"
                    sx={{ mt: 1, fontWeight: 600 }}
                  />
                )}
              </Box>
            </Popup>
          </Marker>
        )}

        {/* Dropoff Marker */}
        <Marker
          position={[dropoffCoords.lat, dropoffCoords.lng]}
          icon={dropoffIcon}
        >
          <Popup>
            <Box sx={{ p: 1, minWidth: 200 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <Avatar sx={{ bgcolor: "#ef4444", width: 32, height: 32 }}>
                  <LocationOn sx={{ fontSize: 18 }} />
                </Avatar>
                <Typography variant="subtitle2" fontWeight={700}>
                  Dropoff Location
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                {dropoffCoords.name || "Delivery Point"}
              </Typography>
              {dropoffCoords.address && (
                <Typography variant="caption" color="text.secondary">
                  {dropoffCoords.address}
                </Typography>
              )}
            </Box>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Legend */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: 8, sm: 16 },
          right: { xs: 8, sm: 16 },
          backgroundColor: isDark
            ? "rgba(26, 29, 41, 0.95)"
            : "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(8px)",
          borderRadius: 2,
          p: { xs: 1, sm: 1.5 },
          boxShadow: isDark
            ? "0 4px 16px rgba(0, 0, 0, 0.4)"
            : "0 4px 16px rgba(0, 0, 0, 0.1)",
          border: `1px solid ${
            isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
          }`,
          zIndex: 1000,
        }}
      >
        <Typography
          variant="caption"
          fontWeight={700}
          sx={{
            display: "block",
            mb: 1,
            fontSize: { xs: "0.65rem", sm: "0.75rem" },
          }}
        >
          Legend
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 0.3, sm: 0.5 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, sm: 1 },
            }}
          >
            <Box
              sx={{
                width: { xs: 10, sm: 12 },
                height: { xs: 10, sm: 12 },
                borderRadius: "50%",
                bgcolor: "#3b82f6",
                border: "2px solid white",
              }}
            />
            <Typography
              variant="caption"
              sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" } }}
            >
              Pickup
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, sm: 1 },
            }}
          >
            <Box
              sx={{
                width: { xs: 10, sm: 12 },
                height: { xs: 10, sm: 12 },
                borderRadius: "50%",
                bgcolor: "#10b981",
                border: "2px solid white",
              }}
            />
            <Typography
              variant="caption"
              sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" } }}
            >
              Vehicle
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, sm: 1 },
            }}
          >
            <Box
              sx={{
                width: { xs: 10, sm: 12 },
                height: { xs: 10, sm: 12 },
                borderRadius: "50%",
                bgcolor: "#ef4444",
                border: "2px solid white",
              }}
            />
            <Typography
              variant="caption"
              sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" } }}
            >
              Dropoff
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MapComponent;
