"use client";

import { styled, alpha } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

export const TypeManagerContainer = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  border: "1px solid #F0F2F5",
  overflow: "hidden",
}));

export const TypeManagerToolbar = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2.5, 3),
  flexWrap: "wrap",
  gap: theme.spacing(1.5),
}));

export const TypeGrid = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 3, 3),
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: theme.spacing(1.5),
}));

export const TypeCard = styled("div", {
  shouldForwardProp: (prop) => prop !== "typeColor",
})<{ typeColor: string }>(({ typeColor }) => ({
  borderRadius: 12,
  border: `1px solid ${alpha(typeColor, 0.2)}`,
  borderTop: `3px solid ${typeColor}`,
  padding: "16px 18px",
  backgroundColor: alpha(typeColor, 0.02),
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: alpha(typeColor, 0.06),
    boxShadow: `0 4px 12px -2px ${alpha(typeColor, 0.1)}`,
  },
}));

export const TypeCardHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 8,
});

export const TypeCardTitle = styled("div")(({ theme }) => ({
  fontSize: "0.88rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

export const TypeCardMeta = styled("div")(({ theme }) => ({
  fontSize: "0.72rem",
  color: theme.palette.text.secondary,
  fontWeight: 500,
}));

export const AmenityList = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 6,
  marginTop: 10,
}));

export const AmenityChip = styled("div", {
  shouldForwardProp: (prop) => prop !== "chipColor",
})<{ chipColor: string }>(({ theme, chipColor }) => ({
  padding: "3px 8px",
  borderRadius: 6,
  backgroundColor: alpha(chipColor, 0.08),
  color: chipColor,
  fontSize: "0.65rem",
  fontWeight: 600,
}));

export const ActiveBadge = styled("div", {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>(({ isActive }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  padding: "2px 8px",
  borderRadius: 6,
  backgroundColor: isActive ? alpha("#12B76A", 0.1) : alpha("#F04438", 0.1),
  color: isActive ? "#12B76A" : "#F04438",
  fontSize: "0.65rem",
  fontWeight: 600,
}));

export const CreateTypeForm = styled("div")(({ theme }) => ({
  margin: theme.spacing(0, 3, 2.5),
  padding: theme.spacing(2.5),
  borderRadius: 12,
  backgroundColor: "#F8FAFC",
  border: "1px solid #F0F2F5",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),
}));

export const FormRow = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: 12,
});

export const FormField = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

export const FormLabel = styled("label")(({ theme }) => ({
  fontSize: "0.7rem",
  fontWeight: 600,
  color: theme.palette.text.secondary,
}));

export const FormInput = styled("input")(({ theme }) => ({
  padding: "8px 12px",
  borderRadius: 8,
  border: "1px solid #EAECF0",
  fontSize: "0.8rem",
  color: theme.palette.text.primary,
  fontFamily: "inherit",
  outline: "none",
  "&:focus": {
    borderColor: "#4361EE",
    boxShadow: `0 0 0 3px ${alpha("#4361EE", 0.1)}`,
  },
}));

export const SmallButton = styled("button")(({ theme }) => ({
  padding: "8px 18px",
  borderRadius: 8,
  border: "none",
  backgroundColor: "#4361EE",
  color: "#FFFFFF",
  fontSize: "0.78rem",
  fontWeight: 600,
  fontFamily: "inherit",
  cursor: "pointer",
  alignSelf: "flex-start",
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: "#3A56D4",
  },
}));
