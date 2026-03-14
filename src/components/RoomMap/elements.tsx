"use client";

import { styled, alpha } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

export const MapContainer = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  border: `1px solid ${theme.palette.divider}`,
  overflow: "hidden",
}));

export const MapToolbar = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2.5, 3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  flexWrap: "wrap",
  gap: theme.spacing(1.5),
}));

export const MapFilterArea = styled("div")(({ theme }) => ({
  padding: theme.spacing(1.8, 3, 2.2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.grey[50],
}));

export const FloorSection = styled("div")(({ theme }) => ({
  padding: theme.spacing(2.5, 3, 0),
  "&:last-of-type": {
    paddingBottom: theme.spacing(3),
  },
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
    backgroundColor: theme.palette.divider,
  },
}));

export const RoomGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: theme.spacing(2),
}));

export const RoomCard = styled("div", {
  shouldForwardProp: (prop) => prop !== "statusColor",
})<{ statusColor: string }>(({ theme, statusColor }) => ({
  borderRadius: 16,
  border: `1px solid ${theme.palette.divider}`,
  borderTop: `3px solid ${statusColor}`,
  padding: theme.spacing(2.2),
  cursor: "pointer",
  backgroundColor: theme.palette.background.paper,
  transition: "all 0.22s ease",
  "&:hover": {
    borderColor: alpha(theme.palette.primary.main, 0.24),
    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.08)}`,
    transform: "translateY(-1px)",
  },
}));

export const RoomCardStatus = styled("div", {
  shouldForwardProp: (prop) => prop !== "statusColor",
})<{ statusColor: string }>(({ statusColor }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2px 8px",
  borderRadius: 999,
  fontSize: "0.64rem",
  fontWeight: 700,
  color: statusColor,
  backgroundColor: alpha(statusColor, 0.12),
  border: `1px solid ${alpha(statusColor, 0.24)}`,
  textTransform: "uppercase",
  lineHeight: 1.4,
}));

export const RoomCardNumber = styled("div")(({ theme }) => ({
  fontSize: "0.95rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
  lineHeight: 1.2,
}));

export const RoomCardName = styled("div")(({ theme }) => ({
  fontSize: "0.78rem",
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
  fontSize: "0.68rem",
  fontWeight: 600,
  color: typeColor,
  backgroundColor: alpha(typeColor, 0.1),
  padding: "3px 10px",
  borderRadius: 6,
  display: "inline-block",
  marginTop: 8,
  textTransform: "capitalize",
}));

export const RoomCardPatient = styled("div")(({ theme }) => ({
  fontSize: "0.74rem",
  color: theme.palette.text.secondary,
  marginTop: 8,
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
  fontSize: "0.75rem",
  fontWeight: 600,
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

export const EmptyRoomsState = styled("div")(({ theme }) => ({
  margin: theme.spacing(2.5, 3, 3),
  padding: theme.spacing(2.4),
  borderRadius: 12,
  border: `1px dashed ${theme.palette.grey[300]}`,
  backgroundColor: theme.palette.grey[50],
  textAlign: "center",
  fontSize: "0.82rem",
  color: theme.palette.text.secondary,
  fontWeight: 500,
}));
