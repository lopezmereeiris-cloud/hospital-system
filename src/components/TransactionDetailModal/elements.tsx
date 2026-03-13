"use client";

import { styled } from "@mui/material/styles";

export const Overlay = styled("div")(() => ({
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
  backgroundColor: "#FFFFFF",
  borderRadius: 16,
  width: "100%",
  maxWidth: 520,
  maxHeight: "90vh",
  overflowY: "auto",
  padding: theme.spacing(3.5),
  boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
}));

export const ModalHeader = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: 24,
}));

export const ReceiptBadge = styled("div")(() => ({
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

export const SectionTitle = styled("div")(() => ({
  fontSize: "0.75rem",
  fontWeight: 700,
  color: "#6F767E",
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
  backgroundColor: "#FCFCFD",
  border: "1px solid #F0F2F5",
}));

export const DetailLabel = styled("span")(() => ({
  fontSize: "0.68rem",
  fontWeight: 700,
  color: "#6F767E",
  textTransform: "uppercase" as const,
  letterSpacing: "0.06em",
}));

export const DetailValue = styled("span")(() => ({
  fontSize: "0.88rem",
  color: "#1A1D1F",
  fontWeight: 500,
}));

export const SectionDivider = styled("div")(({ theme }) => ({
  borderTop: "1px solid #F0F2F5",
  margin: theme.spacing(2.5, 0),
}));

export const BalanceRow = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 16px",
  borderRadius: 10,
  backgroundColor: "#F9FAFB",
  border: "1px solid #F0F2F5",
}));

export const BalanceLabel = styled("span")(() => ({
  fontSize: "0.78rem",
  color: "#6F767E",
  fontWeight: 500,
}));

export const BalanceValue = styled("span")(() => ({
  fontSize: "0.92rem",
  fontWeight: 700,
  color: "#1A1D1F",
}));
