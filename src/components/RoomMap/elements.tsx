"use client";

import { styled, alpha } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

export const MapContainer = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  border: "1px solid #F0F2F5",
  overflow: "hidden",
}));

export const MapToolbar = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2.5, 3),
  flexWrap: "wrap",
  gap: theme.spacing(1.5),
}));

export const FloorSection = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 3, 2.5),
}));

export const FloorLabel = styled("div")(({ theme }) => ({
  fontSize: "0.82rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1.5),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  "&::after": {
    content: '""',
    flex: 1,
    height: 1,
    backgroundColor: "#F0F2F5",
  },
}));

export const RoomGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: theme.spacing(1.5),
}));

export const RoomCard = styled("div", {
  shouldForwardProp: (prop) => prop !== "statusColor",
})<{ statusColor: string }>(({ theme, statusColor }) => ({
  borderRadius: 12,
  border: `1px solid ${alpha(statusColor, 0.25)}`,
  borderLeft: `4px solid ${statusColor}`,
  padding: theme.spacing(1.5, 2),
  cursor: "pointer",
  backgroundColor: alpha(statusColor, 0.03),
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: alpha(statusColor, 0.08),
    transform: "translateY(-1px)",
    boxShadow: `0 4px 12px -2px ${alpha(statusColor, 0.15)}`,
  },
}));

export const RoomCardNumber = styled("div")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
  lineHeight: 1.2,
}));

export const RoomCardName = styled("div")(({ theme }) => ({
  fontSize: "0.75rem",
  color: theme.palette.text.secondary,
  fontWeight: 500,
  marginTop: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));

export const RoomCardType = styled("div", {
  shouldForwardProp: (prop) => prop !== "typeColor",
})<{ typeColor: string }>(({ typeColor }) => ({
  fontSize: "0.65rem",
  fontWeight: 600,
  color: typeColor,
  backgroundColor: alpha(typeColor, 0.1),
  padding: "2px 8px",
  borderRadius: 6,
  display: "inline-block",
  marginTop: 6,
  textTransform: "capitalize",
}));

export const RoomCardPatient = styled("div")(({ theme }) => ({
  fontSize: "0.7rem",
  color: theme.palette.text.secondary,
  marginTop: 4,
  display: "flex",
  alignItems: "center",
  gap: 4,
}));

export const StatusLegend = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  flexWrap: "wrap",
}));

export const LegendItem = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 6,
  fontSize: "0.72rem",
  fontWeight: 500,
  color: theme.palette.text.secondary,
}));

export const LegendDot = styled("div", {
  shouldForwardProp: (prop) => prop !== "color",
})<{ color: string }>(({ color }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: color,
}));
