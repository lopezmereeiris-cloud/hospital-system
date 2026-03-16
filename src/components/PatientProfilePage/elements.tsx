"use client";

import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

export const PageRoot = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2.5),
  maxWidth: 980,
  margin: "0 auto",
}));

export const ProfileHeroCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  border: "1px solid #E8ECF2",
  boxShadow: "none",
  padding: theme.spacing(2.2, 2.5),
  background:
    "linear-gradient(140deg, #F5F9FF 0%, #FFFFFF 48%, #F4FBF8 100%)",
}));

export const HeroContent = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(2),
  flexWrap: "wrap",
}));

export const HeroIdentity = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
}));

export const HeroText = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 2,
}));

export const HeroName = styled(Typography)(({ theme }) => ({
  fontSize: "1.06rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
  lineHeight: 1.25,
}));

export const HeroSubText = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
  color: theme.palette.text.secondary,
}));

export const HeroBadge = styled("span")(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  borderRadius: 999,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.24)}`,
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
  color: theme.palette.primary.main,
  fontSize: "0.72rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  padding: "5px 10px",
}));

export const AvatarUploadButton = styled("label")(() => ({
  position: "relative",
  cursor: "pointer",
  borderRadius: "50%",
  display: "inline-flex",
  "&:hover .avatar-overlay": {
    opacity: 1,
  },
}));

export const AvatarOverlay = styled(Box)(() => ({
  position: "absolute",
  inset: 0,
  borderRadius: "50%",
  backgroundColor: "rgba(15, 23, 42, 0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  opacity: 0,
  transition: "opacity 0.2s ease",
}));

export const SectionCard = styled(Card)(() => ({
  borderRadius: 16,
  border: "1px solid #E8ECF2",
  boxShadow: "none",
  overflow: "hidden",
}));

export const SectionHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.1, 2.4),
  borderBottom: "1px solid #EEF2F6",
  backgroundColor: theme.palette.grey[50],
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.98rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
  lineHeight: 1.2,
}));

export const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.78rem",
  color: theme.palette.text.secondary,
  marginTop: 4,
}));

export const SectionBody = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.4),
}));

export const FieldGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing(1.8),
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const FieldGroup = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 7,
}));

export const FieldLabel = styled("label")(({ theme }) => ({
  fontSize: "0.75rem",
  fontWeight: 700,
  color: theme.palette.grey[500],
  textTransform: "uppercase",
  letterSpacing: "0.06em",
}));

export const FieldInput = styled("input")(({ theme }) => ({
  height: 40,
  borderRadius: 10,
  border: "1px solid #DCE4ED",
  backgroundColor: theme.palette.grey[50],
  padding: "0 12px",
  fontSize: "0.88rem",
  color: theme.palette.text.primary,
  fontFamily: theme.typography.fontFamily,
  outline: "none",
  transition: "border-color 0.18s ease, background-color 0.18s ease",
  "&::placeholder": {
    color: theme.palette.text.disabled,
  },
  "&:focus": {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const FieldSelect = styled("select")(({ theme }) => ({
  height: 40,
  borderRadius: 10,
  border: "1px solid #DCE4ED",
  backgroundColor: theme.palette.grey[50],
  padding: "0 12px",
  fontSize: "0.88rem",
  color: theme.palette.text.primary,
  fontFamily: theme.typography.fontFamily,
  outline: "none",
  transition: "border-color 0.18s ease, background-color 0.18s ease",
  "&:focus": {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const FieldHelpText = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  color: theme.palette.text.secondary,
}));

export const ActionsRow = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: theme.spacing(1.2),
  marginTop: theme.spacing(2.2),
  flexWrap: "wrap",
}));
