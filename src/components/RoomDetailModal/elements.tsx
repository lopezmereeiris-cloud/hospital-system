"use client";

import { styled, alpha } from "@mui/material/styles";

export const ModalOverlay = styled("div")({
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1300,
  padding: 24,
});

export const ModalContent = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 16,
  width: "100%",
  maxWidth: 560,
  maxHeight: "85vh",
  overflowY: "auto",
  boxShadow: "0 20px 60px -12px rgba(0,0,0,0.15)",
}));

export const ModalHeader = styled("div", {
  shouldForwardProp: (prop) => prop !== "statusColor",
})<{ statusColor?: string }>(({ statusColor, theme }) => ({
  padding: "24px 28px 16px",
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 16,
  borderTop: `4px solid ${statusColor || theme.palette.primary.main}`,
  borderRadius: "16px 16px 0 0",
}));

export const ModalBody = styled("div")({
  padding: "20px 28px 28px",
  display: "flex",
  flexDirection: "column",
  gap: 20,
});

export const DetailSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 10,
});

export const DetailSectionTitle = styled("div")(({ theme }) => ({
  fontSize: "0.72rem",
  fontWeight: 700,
  color: theme.palette.text.secondary,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
}));

export const DetailGrid = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
});

export const DetailItem = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 2,
});

export const DetailLabel = styled("div")(({ theme }) => ({
  fontSize: "0.68rem",
  fontWeight: 500,
  color: theme.palette.text.secondary,
}));

export const DetailValue = styled("div")(({ theme }) => ({
  fontSize: "0.82rem",
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const StatusBadge = styled("div", {
  shouldForwardProp: (prop) => prop !== "statusColor",
})<{ statusColor: string }>(({ statusColor }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "4px 12px",
  borderRadius: 8,
  backgroundColor: alpha(statusColor, 0.1),
  color: statusColor,
  fontSize: "0.75rem",
  fontWeight: 600,
}));

export const EquipmentChip = styled("div")(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  padding: "3px 10px",
  borderRadius: 6,
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.text.secondary,
  fontSize: "0.7rem",
  fontWeight: 500,
}));

export const ScheduleCard = styled("div", {
  shouldForwardProp: (prop) => prop !== "typeColor",
})<{ typeColor: string }>(({ typeColor }) => ({
  borderRadius: 10,
  border: `1px solid ${alpha(typeColor, 0.2)}`,
  borderLeft: `3px solid ${typeColor}`,
  padding: "10px 14px",
  backgroundColor: alpha(typeColor, 0.03),
}));

export const ScheduleTitle = styled("div")(({ theme }) => ({
  fontSize: "0.78rem",
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const ScheduleMeta = styled("div")(({ theme }) => ({
  fontSize: "0.68rem",
  color: theme.palette.text.secondary,
  marginTop: 2,
}));
