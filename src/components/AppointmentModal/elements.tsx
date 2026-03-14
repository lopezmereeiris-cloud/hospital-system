"use client";

import { styled, alpha } from "@mui/material/styles";

export const ModalHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: theme.spacing(3.5),
}));

export const DetailGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing(2.5),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const DetailItem = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: theme.spacing(1.5, 2),
  borderRadius: 12,
  backgroundColor: theme.palette.grey[50],
  border: `1px solid ${theme.palette.divider}`,
}));

export const DetailLabel = styled("span")(({ theme }) => ({
  fontSize: "0.68rem",
  fontWeight: 700,
  color: theme.palette.text.secondary,
  textTransform: "uppercase",
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
  fontSize: "0.78rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1.5),
}));

export const ModalActions = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  flexWrap: "wrap",
  marginTop: theme.spacing(2),
}));
