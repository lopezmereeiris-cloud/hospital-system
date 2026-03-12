"use client";

import { styled } from "@mui/material/styles";

export const AlertRow = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(1.5, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:last-child": {
    borderBottom: "none",
  },
}));

export const AlertInfo = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
}));

export const AlertMedicineName = styled("span")(({ theme }) => ({
  fontSize: "0.875rem",
  fontWeight: 500,
  color: theme.palette.text.primary,
}));

export const AlertDetail = styled("span")(({ theme }) => ({
  fontSize: "0.75rem",
  color: theme.palette.text.secondary,
}));
