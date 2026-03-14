"use client";

import { styled } from "@mui/material/styles";

export const Overlay = styled("div")(({ theme }) => ({
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(16, 24, 40, 0.55)",
  zIndex: 1300,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
}));

export const ModalPanel = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.background.paper,
  borderRadius: 16,
  width: "100%",
  maxWidth: 520,
  maxHeight: "90vh",
  overflowY: "auto",
  padding: theme.spacing(3.5),
  boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
}));

export const ModalHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: 24,
}));

export const ReceiptBadge = styled("div")(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: 14,
  backgroundColor: "#F0FDF4",
  color: "#16A34A",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
}));

export const SectionTitle = styled("div")(({ theme }) => ({
  fontSize: "0.75rem",
  fontWeight: 700,
  color: theme.palette.text.secondary,
  textTransform: "uppercase" as const,
  letterSpacing: "0.06em",
  marginBottom: 10,
}));

export const DetailGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing(1.5),
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const DetailItem = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 3,
  padding: theme.spacing(1.5, 2),
  borderRadius: 12,
  backgroundColor: theme.palette.grey[50],
  border: `1px solid ${theme.palette.divider}`,
}));

export const DetailLabel = styled("span")(({ theme }) => ({
  fontSize: "0.68rem",
  fontWeight: 700,
  color: theme.palette.text.secondary,
  textTransform: "uppercase" as const,
  letterSpacing: "0.06em",
}));

export const DetailValue = styled("span")(({ theme }) => ({
  fontSize: "0.88rem",
  color: theme.palette.text.primary,
  fontWeight: 500,
}));

export const SectionDivider = styled("div")(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  margin: theme.spacing(2.5, 0),
}));

export const BalanceRow = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 16px",
  borderRadius: 10,
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
}));

export const BalanceLabel = styled("span")(({ theme }) => ({
  fontSize: "0.78rem",
  color: theme.palette.text.secondary,
  fontWeight: 500,
}));

export const BalanceValue = styled("span")(({ theme }) => ({
  fontSize: "0.92rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
}));
