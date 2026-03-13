"use client";

import { styled } from "@mui/material/styles";

export const ModalHeader = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: 24,
}));

export const HeaderInfo = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  gap: 16,
}));

export const DoctorNameLarge = styled("h3")(() => ({
  fontSize: "1.25rem",
  fontWeight: 700,
  color: "#1A1D1F",
  margin: 0,
  lineHeight: 1.3,
}));

export const Subtitle = styled("span")(() => ({
  fontSize: "0.82rem",
  color: "#4361EE",
  fontWeight: 600,
}));

export const DetailGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
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

export const SectionTitle = styled("div")(({ theme }) => ({
  fontSize: "0.82rem",
  fontWeight: 700,
  color: "#4361EE",
  marginBottom: 12,
  display: "flex",
  alignItems: "center",
  gap: 8,
}));
