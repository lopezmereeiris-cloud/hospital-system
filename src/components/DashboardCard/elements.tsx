"use client";

import { styled, alpha } from "@mui/material/styles";
import Card from "@mui/material/Card";

export const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2.5, 3),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  height: "100%",
  position: "relative",
  overflow: "hidden",
  transition: "transform 0.22s ease, box-shadow 0.22s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px -4px rgba(0,0,0,0.06)",
  },
}));

export const CardIconWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "bgColor",
})<{ bgColor: string }>(({ bgColor }) => ({
  width: 46,
  height: 46,
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: alpha(bgColor, 0.12),
  color: bgColor,
  flexShrink: 0,
  "& .MuiSvgIcon-root": {
    fontSize: 24,
  },
}));

export const CardTitle = styled("div")(({ theme }) => ({
  fontSize: "0.8rem",
  fontWeight: 500,
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(0.5),
}));

export const CardValue = styled("div")(({ theme }) => ({
  fontSize: "1.75rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
  lineHeight: 1.15,
  letterSpacing: "-0.02em",
}));

export const CardSubtitle = styled("div", {
  shouldForwardProp: (prop) => prop !== "subtitleColor",
})<{ subtitleColor?: string }>(({ theme, subtitleColor }) => ({
  fontSize: "0.72rem",
  color: subtitleColor || theme.palette.success.main,
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  gap: 4,
}));
