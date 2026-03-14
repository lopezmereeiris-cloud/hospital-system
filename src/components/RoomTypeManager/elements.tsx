"use client";

import { styled, alpha } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

export const TypeManagerContainer = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  border: `1px solid ${theme.palette.divider}`,
  overflow: "hidden",
}));

export const TypeManagerToolbar = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2.5, 3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  flexWrap: "wrap",
  gap: theme.spacing(1.5),
}));

export const TypeGrid = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 3, 3),
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: theme.spacing(2),
}));

export const TypeCard = styled("div", {
  shouldForwardProp: (prop) => prop !== "typeColor",
})<{ typeColor: string }>(({ typeColor, theme }) => ({
  borderRadius: 16,
  border: `1px solid ${theme.palette.divider}`,
  borderTop: `3px solid ${typeColor}`,
  padding: "18px 20px",
  backgroundColor: theme.palette.background.paper,
  transition: "all 0.22s ease",
  "&:hover": {
    borderColor: alpha(theme.palette.primary.main, 0.24),
    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.08)}`,
    transform: "translateY(-1px)",
  },
}));

export const TypeCardHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10,
  marginBottom: 10,
});

export const TypeCardTitle = styled("div")(({ theme }) => ({
  fontSize: "0.95rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

export const TypeCardMeta = styled("div")(({ theme }) => ({
  fontSize: "0.78rem",
  color: theme.palette.text.secondary,
  fontWeight: 500,
  lineHeight: 1.5,
}));

export const AmenityList = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 6,
  marginTop: 12,
}));

export const AmenityChip = styled("div", {
  shouldForwardProp: (prop) => prop !== "chipColor",
})<{ chipColor: string }>(({ chipColor }) => ({
  padding: "3px 9px",
  borderRadius: 999,
  backgroundColor: alpha(chipColor, 0.1),
  color: chipColor,
  fontSize: "0.66rem",
  fontWeight: 600,
  border: `1px solid ${alpha(chipColor, 0.16)}`,
}));

export const ActiveBadge = styled("div", {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>(({ isActive, theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  padding: "2px 8px",
  borderRadius: 999,
  backgroundColor: isActive ? alpha(theme.palette.success.main, 0.12) : alpha(theme.palette.error.main, 0.12),
  color: isActive ? theme.palette.success.dark : theme.palette.error.dark,
  fontSize: "0.64rem",
  fontWeight: 700,
  border: `1px solid ${
    isActive ? alpha(theme.palette.success.main, 0.24) : alpha(theme.palette.error.main, 0.24)
  }`,
  textTransform: "uppercase",
  lineHeight: 1.4,
}));

export const CreateTypeForm = styled("div")(({ theme }) => ({
  margin: theme.spacing(2.5, 3, 2.5),
  padding: theme.spacing(2.4),
  borderRadius: 14,
  backgroundColor: theme.palette.grey[50],
  border: "1px solid #ECECEC",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),
}));

export const FormRow = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 12,
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const FormField = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 6,
});

export const FormLabel = styled("label")(({ theme }) => ({
  fontSize: "0.72rem",
  fontWeight: 600,
  color: theme.palette.text.secondary,
}));

export const FormInput = styled("input")(({ theme }) => ({
  padding: "10px 12px",
  borderRadius: 10,
  border: `1px solid ${theme.palette.grey[200]}`,
  fontSize: "0.82rem",
  color: theme.palette.text.primary,
  fontFamily: "inherit",
  outline: "none",
  backgroundColor: theme.palette.background.paper,
  transition: "border-color 0.2s ease",
  "&:focus": {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
  },
}));

export const SmallButton = styled("button")(({ theme }) => ({
  background: "linear-gradient(135deg, #4D95B4 0%, #226E8E 100%)",
  color: theme.palette.primary.contrastText,
  textTransform: "none",
  borderRadius: 12,
  border: "none",
  fontWeight: 600,
  fontSize: "0.8rem",
  padding: "9px 20px",
  boxShadow: "none",
  cursor: "pointer",
  transition: "background 0.2s ease",
  "&:hover": {
    background: "linear-gradient(135deg, #4588A6 0%, #1F6785 100%)",
  },
}));
