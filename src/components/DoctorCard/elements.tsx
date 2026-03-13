"use client";

import { styled, alpha } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

export const DoctorGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
  gap: theme.spacing(2.5),
}));

export const DoctorCardContainer = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  border: "1px solid #F0F2F5",
  padding: theme.spacing(3),
  transition: "all 0.22s ease",
  cursor: "pointer",
  "&:hover": {
    borderColor: alpha("#4361EE", 0.2),
    boxShadow: `0 4px 20px ${alpha("#4361EE", 0.08)}`,
  },
}));

export const DoctorHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export const DoctorInfo = styled("div")(() => ({
  flex: 1,
  minWidth: 0,
}));

export const DoctorName = styled("div")(({ theme }) => ({
  fontWeight: 700,
  fontSize: "0.95rem",
  color: theme.palette.text.primary,
  lineHeight: 1.3,
}));

export const DoctorSpecialization = styled("div")(({ theme }) => ({
  fontSize: "0.78rem",
  color: "#4361EE",
  fontWeight: 600,
  marginTop: 2,
}));

export const DoctorBio = styled("div")(({ theme }) => ({
  fontSize: "0.78rem",
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
  marginBottom: theme.spacing(2),
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
}));

export const DetailRow = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(0.6, 0),
  fontSize: "0.78rem",
  color: theme.palette.text.secondary,
  "& svg": {
    fontSize: 16,
    color: theme.palette.text.disabled,
    flexShrink: 0,
  },
}));

export const DoctorToolbar = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(3),
  flexWrap: "wrap",
  gap: theme.spacing(1.5),
}));

export const FilterChips = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(0.8),
  flexWrap: "wrap",
}));
