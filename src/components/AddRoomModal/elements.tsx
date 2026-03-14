"use client";

import { styled, alpha } from "@mui/material/styles";

export const ModalOverlay = styled("div")({
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1300,
  padding: 24,
});

export const ModalContent = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 16,
  width: "100%",
  maxWidth: 520,
  maxHeight: "85vh",
  overflowY: "auto",
  boxShadow: "0 20px 60px -12px rgba(0,0,0,0.15)",
}));

export const ModalHeader = styled("div")(({ theme }) => ({
  padding: "24px 28px 16px",
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const ModalBody = styled("div")({
  padding: "20px 28px 28px",
  display: "flex",
  flexDirection: "column",
  gap: 18,
});

export const FormField = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 6,
});

export const FormLabel = styled("label")(({ theme }) => ({
  fontSize: "0.75rem",
  fontWeight: 600,
  color: theme.palette.text.secondary,
}));

export const FormInput = styled("input")(({ theme }) => ({
  padding: "10px 14px",
  borderRadius: 10,
  border: `1px solid ${theme.palette.grey[200]}`,
  fontSize: "0.82rem",
  color: theme.palette.text.primary,
  fontFamily: "inherit",
  outline: "none",
  transition: "border-color 0.2s ease",
  "&:focus": {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
  },
  "&::placeholder": {
    color: theme.palette.text.disabled,
  },
}));

export const FormSelect = styled("select")(({ theme }) => ({
  padding: "10px 14px",
  borderRadius: 10,
  border: `1px solid ${theme.palette.grey[200]}`,
  fontSize: "0.82rem",
  color: theme.palette.text.primary,
  fontFamily: "inherit",
  outline: "none",
  backgroundColor: theme.palette.background.paper,
  cursor: "pointer",
  transition: "border-color 0.2s ease",
  "&:focus": {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
  },
}));

export const FormRow = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 14,
});

export const ButtonRow = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  gap: 10,
  paddingTop: 8,
});

export const PrimaryButton = styled("button")(({ theme }) => ({
  padding: "10px 24px",
  borderRadius: 10,
  border: "none",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontSize: "0.82rem",
  fontWeight: 600,
  fontFamily: "inherit",
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: "#3A56D4",
  },
}));

export const SecondaryButton = styled("button")(({ theme }) => ({
  padding: "10px 24px",
  borderRadius: 10,
  border: `1px solid ${theme.palette.grey[200]}`,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  fontSize: "0.82rem",
  fontWeight: 600,
  fontFamily: "inherit",
  cursor: "pointer",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "#F8FAFC",
  },
}));
