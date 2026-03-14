"use client";

import { styled } from "@mui/material/styles";

export const ModalHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: 24,
}));

export const HeaderInfo = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 16,
}));

export const DoctorNameLarge = styled("h3")(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
  margin: 0,
  lineHeight: 1.3,
}));

export const Subtitle = styled("span")(({ theme }) => ({
  fontSize: "0.82rem",
  color: theme.palette.primary.main,
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

export const SectionTitle = styled("div")(({ theme }) => ({
  fontSize: "0.82rem",
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: 12,
  display: "flex",
  alignItems: "center",
  gap: 8,
}));
