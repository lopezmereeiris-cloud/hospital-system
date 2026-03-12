"use client";

import { styled, alpha } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

export const TypeManagerContainer = styled(Paper)(() => ({
  borderRadius: 16,
  border: "1px solid #F0F2F5",
  overflow: "hidden",
}));

export const TypeManagerToolbar = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2.5, 3),
  borderBottom: "1px solid #F0F2F5",
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
})<{ typeColor: string }>(({ typeColor }) => ({
  borderRadius: 16,
  border: "1px solid #F0F2F5",
  borderTop: `3px solid ${typeColor}`,
  padding: "18px 20px",
  backgroundColor: "#FFFFFF",
  transition: "all 0.22s ease",
  "&:hover": {
    borderColor: alpha("#4361EE", 0.24),
    boxShadow: `0 4px 20px ${alpha("#4361EE", 0.08)}`,
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

export const AmenityList = styled("div")(() => ({
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
})<{ isActive: boolean }>(({ isActive }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  padding: "2px 8px",
  borderRadius: 999,
  backgroundColor: isActive ? alpha("#12B76A", 0.12) : alpha("#F04438", 0.12),
  color: isActive ? "#027A48" : "#B42318",
  fontSize: "0.64rem",
  fontWeight: 700,
  border: `1px solid ${
    isActive ? alpha("#12B76A", 0.24) : alpha("#F04438", 0.24)
  }`,
  textTransform: "uppercase",
  lineHeight: 1.4,
}));

export const CreateTypeForm = styled("div")(({ theme }) => ({
  margin: theme.spacing(2.5, 3, 2.5),
  padding: theme.spacing(2.4),
  borderRadius: 14,
  backgroundColor: "#FCFCFD",
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
  border: "1px solid #EAECF0",
  fontSize: "0.82rem",
  color: theme.palette.text.primary,
  fontFamily: "inherit",
  outline: "none",
  backgroundColor: "#FFFFFF",
  transition: "border-color 0.2s ease",
  "&:focus": {
    borderColor: "#4361EE",
    boxShadow: `0 0 0 3px ${alpha("#4361EE", 0.1)}`,
  },
}));

export const SmallButton = styled("button")(() => ({
  background: "linear-gradient(135deg, #4D95B4 0%, #226E8E 100%)",
  color: "#FFFFFF",
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
