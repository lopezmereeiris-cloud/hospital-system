"use client";

import { styled, alpha } from "@mui/material/styles";
import Link from "next/link";

// ——— Layout ———————————————————————————————————————

export const PageWrapper = styled("div")(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: theme.palette.grey[100],
  fontFamily: theme.typography.fontFamily,
  padding: 24,
}));

export const CardWrapper = styled("div")(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: 20,
  width: "100%",
  maxWidth: 900,
  display: "flex",
  overflow: "hidden",
  boxShadow: "0 8px 40px rgba(0,0,0,0.13)",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
  [theme.breakpoints.down("sm")]: {
    borderRadius: 0,
    boxShadow: "none",
  },
}));

// ——— Form Section ————————————————————————————————

export const FormSection = styled("div")(({ theme }) => ({
  flex: 1,
  padding: "40px 48px",
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  [theme.breakpoints.down("md")]: { padding: "32px 18px" },
  [theme.breakpoints.down("sm")]: { padding: "22px 6vw" },
}));

export const BrandName = styled("div")(({ theme }) => ({
  fontStyle: "italic",
  fontSize: 17,
  color: theme.palette.text.disabled,
  marginBottom: 36,
}));

export const LogoBox = styled("div")(({ theme }) => ({
  width: 50,
  height: 50,
  background: theme.palette.primary.main,
  borderRadius: 13,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 22,
}));

export const FormTitle = styled("div")(({ theme }) => ({
  ...theme.typography.h2,
  color: theme.palette.text.primary,
  marginBottom: 4,
  letterSpacing: "-0.02em",
}));

export const FormSubtitle = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  marginBottom: 28,
}));

export const ErrorBanner = styled("div")(({ theme }) => ({
  color: theme.palette.error.dark,
  background: alpha(theme.palette.error.main, 0.1),
  borderRadius: 6,
  padding: "8px 12px",
  marginBottom: 16,
  ...theme.typography.body2,
}));

export const FieldRow = styled("div")({
  display: "flex",
  gap: 20,
});

export const FieldGroup = styled("div")({
  flex: 1,
  marginBottom: 18,
  position: "relative",
});

export const FieldGroupFull = styled("div")({
  marginBottom: 18,
  position: "relative",
});

export const FieldLabel = styled("label")(({ theme }) => ({
  display: "block",
  fontSize: "0.72rem",
  fontWeight: 500,
  color: theme.palette.text.secondary,
  marginBottom: 6,
  letterSpacing: "0.01em",
}));

export const TextInput = styled("input")(({ theme }) => ({
  width: "100%",
  border: "none",
  borderBottom: `1.5px solid ${theme.palette.divider}`,
  padding: "8px 0",
  ...theme.typography.body1,
  color: theme.palette.text.primary,
  background: "transparent",
  outline: "none",
  transition: "border-color 0.2s",
  fontFamily: theme.typography.fontFamily,
  "&::placeholder": {
    color: theme.palette.text.disabled,
  },
  "&:focus": {
    borderBottomColor: theme.palette.primary.main,
  },
}));

export const PasswordInput = styled(TextInput)({
  paddingRight: 28,
});

export const EyeButton = styled("button", {
  shouldForwardProp: (prop) => prop !== "$active",
})<{ $active?: boolean }>(({ theme, $active }) => ({
  position: "absolute",
  right: 0,
  bottom: 8,
  cursor: "pointer",
  color: $active ? theme.palette.primary.main : theme.palette.grey[400],
  background: "none",
  border: "none",
  padding: 0,
  display: "flex",
  alignItems: "center",
}));

export const TermsRow = styled("div")({
  display: "flex",
  alignItems: "flex-start",
  gap: 10,
  marginBottom: 22,
  marginTop: 4,
});

export const TermsCheckbox = styled("input")(({ theme }) => ({
  width: 16,
  height: 16,
  minWidth: 16,
  accentColor: theme.palette.primary.main,
  marginTop: 1,
  cursor: "pointer",
}));

export const TermsLabel = styled("label")(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  lineHeight: 1.5,
  cursor: "pointer",
}));

export const TermsLink = styled("a")(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 500,
  textDecoration: "none",
}));

export const SubmitButton = styled("button")(({ theme }) => ({
  width: "100%",
  padding: 13,
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  border: "none",
  borderRadius: 8,
  ...theme.typography.button,
  fontSize: "0.875rem",
  cursor: "pointer",
  letterSpacing: "0.02em",
  transition: "background 0.2s",
  fontFamily: theme.typography.fontFamily,
  "&:disabled": {
    opacity: 0.7,
    cursor: "not-allowed",
  },
  "&:hover:not(:disabled)": {
    background: theme.palette.primary.dark,
  },
}));

export const FooterText = styled("p")(({ theme }) => ({
  textAlign: "center",
  ...theme.typography.body2,
  color: theme.palette.text.disabled,
  marginTop: 16,
}));

export const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 500,
  textDecoration: "none",
}));

// ——— Success State ————————————————————————————————

export const SuccessWrapper = styled("div")({
  textAlign: "center",
  padding: "40px 0",
});

export const SuccessIcon = styled("div")(({ theme }) => ({
  fontSize: 44,
  color: theme.palette.primary.main,
  marginBottom: 10,
}));

export const SuccessTitle = styled("div")(({ theme }) => ({
  ...theme.typography.h3,
  marginBottom: 8,
}));

export const SuccessMessage = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  marginBottom: 24,
}));

export const BackButton = styled("button")(({ theme }) => ({
  padding: "12px 32px",
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  border: "none",
  borderRadius: 8,
  ...theme.typography.button,
  fontSize: "0.9375rem",
  cursor: "pointer",
  fontFamily: theme.typography.fontFamily,
  "&:hover": {
    background: theme.palette.primary.dark,
  },
}));

// ——— Hero Section ————————————————————————————————

export const HeroSection = styled("div")(({ theme }) => ({
  width: "48%",
  background: `radial-gradient(ellipse at 30% 20%, ${alpha(theme.palette.primary.light, 0.9)} 0%, ${theme.palette.primary.main} 42%, ${theme.palette.primary.dark} 100%)`,
  borderRadius: 16,
  margin: 10,
  position: "relative",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "44px 36px 36px",
  minWidth: 0,
  [theme.breakpoints.down("md")]: {
    width: "100%",
    margin: 0,
    borderRadius: "0 0 16px 16px",
    padding: "32px 18px 24px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "22px 6vw 18px",
  },
}));

export const HeroTextBlock = styled("div")({
  position: "relative",
  zIndex: 1,
});

export const HeroHeading = styled("h2")(({ theme }) => ({
  ...theme.typography.h1,
  fontSize: 42,
  color: theme.palette.background.paper,
  lineHeight: 1.1,
  letterSpacing: "-0.02em",
  marginBottom: 16,
  fontStyle: "italic",
}));

export const HeroDescription = styled("p")(({ theme }) => ({
  ...theme.typography.body2,
  color: "rgba(255,255,255,0.5)",
  lineHeight: 1.6,
  maxWidth: 240,
  marginTop: 0,
}));

// ——— Steps ————————————————————————————————————————

export const StepsContainer = styled("div")({
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 10,
});

export const StepItem = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 13,
  background: "rgba(255,255,255,0.07)",
  borderRadius: 12,
  padding: "13px 16px",
  backdropFilter: "blur(6px)",
});

export const StepNumber = styled("div", {
  shouldForwardProp: (prop) => prop !== "$done",
})<{ $done?: boolean }>(({ theme, $done }) => ({
  width: 26,
  height: 26,
  minWidth: 26,
  borderRadius: "50%",
  background: $done ? theme.palette.background.paper : "rgba(255,255,255,0.12)",
  color: $done ? theme.palette.primary.main : theme.palette.background.paper,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.6875rem",
  fontWeight: 600,
}));

export const StepContent = styled("div")({
  flex: 1,
});

export const StepTitle = styled("div")(({ theme }) => ({
  fontSize: "0.75rem",
  fontWeight: 500,
  color: theme.palette.background.paper,
}));

export const StepSub = styled("div")({
  fontSize: "0.6875rem",
  color: "rgba(255,255,255,0.45)",
  marginTop: 1,
});

export const StepCheckIcon = styled("div", {
  shouldForwardProp: (prop) => prop !== "$done",
})<{ $done?: boolean }>(({ $done }) => ({
  color: $done ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.2)",
  display: "flex",
  alignItems: "center",
}));
