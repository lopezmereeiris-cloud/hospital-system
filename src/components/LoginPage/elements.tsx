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
  minHeight: 580,
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
  padding: "44px 48px",
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
  marginBottom: 48,
}));

export const LogoBox = styled("div")(({ theme }) => ({
  width: 52,
  height: 52,
  background: theme.palette.primary.main,
  borderRadius: 14,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 28,
}));

export const FormTitle = styled("div")(({ theme }) => ({
  ...theme.typography.h2,
  color: theme.palette.text.primary,
  marginBottom: 5,
  letterSpacing: "-0.02em",
}));

export const FormSubtitle = styled("div")(({ theme }) => ({
  ...theme.typography.body1,
  color: theme.palette.text.secondary,
  marginBottom: 36,
}));

export const ErrorBanner = styled("div")(({ theme }) => ({
  color: theme.palette.error.dark,
  background: alpha(theme.palette.error.main, 0.1),
  borderRadius: 6,
  padding: "8px 12px",
  marginBottom: 16,
  ...theme.typography.body2,
}));

export const FieldGroup = styled("div")({
  marginBottom: 22,
  position: "relative",
});

export const FieldLabelRow = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 7,
  "& label": {
    marginBottom: 0,
  },
});

export const FieldLabel = styled("label")(({ theme }) => ({
  display: "block",
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: 7,
}));

export const ForgotLink = styled("a")(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  textDecoration: "none",
}));

export const TextInput = styled("input")(({ theme }) => ({
  width: "100%",
  border: "none",
  borderBottom: `1.5px solid ${theme.palette.divider}`,
  padding: "9px 0",
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
  marginTop: 28,
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
  marginTop: 18,
}));

export const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 500,
  textDecoration: "none",
}));

// ——— Hero Section ————————————————————————————————

export const HeroSection = styled("div")(({ theme }) => ({
  width: "52%",
  background: `radial-gradient(ellipse at 30% 20%, ${alpha(theme.palette.primary.light, 0.9)} 0%, ${theme.palette.primary.main} 42%, ${theme.palette.primary.dark} 100%)`,
  borderRadius: 16,
  margin: 10,
  position: "relative",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "44px 40px 36px",
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
  fontSize: 46,
  color: theme.palette.background.paper,
  lineHeight: 1.1,
  letterSpacing: "-0.02em",
  marginBottom: 10,
  fontStyle: "italic",
}));

// ——— Decorative Patient Card ——————————————————————

export const CardArea = styled("div")({
  position: "relative",
  zIndex: 1,
  display: "flex",
  alignItems: "flex-end",
  gap: 10,
});

export const MiniNav = styled("div")({
  width: 42,
  background: "rgba(255,255,255,0.08)",
  borderRadius: 14,
  padding: "14px 0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 18,
  backdropFilter: "blur(8px)",
});

export const NavDot = styled("div", {
  shouldForwardProp: (prop) => prop !== "$opacity",
})<{ $opacity?: number }>(({ $opacity = 1 }) => ({
  width: 20,
  height: 20,
  borderRadius: 5,
  background: "rgba(255,255,255,0.15)",
  opacity: $opacity,
}));

export const PatientCardBox = styled("div")({
  flex: 1,
  background: "rgba(255,255,255,0.95)",
  borderRadius: 16,
  padding: "20px 20px 18px",
});

export const CardLogoBox = styled("div")(({ theme }) => ({
  width: 26,
  height: 26,
  background: theme.palette.primary.main,
  borderRadius: 7,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 14,
}));

export const ConsultLabel = styled("div")(({ theme }) => ({
  fontSize: "0.66rem",
  color: theme.palette.text.disabled,
  marginBottom: 2,
}));

export const ConsultValue = styled("div")(({ theme }) => ({
  fontSize: 22,
  fontWeight: 600,
  color: theme.palette.text.primary,
  letterSpacing: "-0.03em",
  marginBottom: 16,
}));

export const CardDivider = styled("div")(({ theme }) => ({
  height: 1,
  background: theme.palette.divider,
  marginBottom: 14,
}));

export const CardInfoRow = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const PatientName = styled("div")(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.primary,
}));

export const PatientID = styled("div")(({ theme }) => ({
  fontSize: "0.66rem",
  color: theme.palette.text.disabled,
  marginTop: 2,
}));

export const ActiveBadge = styled("div")(({ theme }) => ({
  fontSize: "0.625rem",
  fontWeight: 600,
  color: theme.palette.primary.contrastText,
  background: theme.palette.primary.main,
  padding: "4px 10px",
  borderRadius: 20,
}));
