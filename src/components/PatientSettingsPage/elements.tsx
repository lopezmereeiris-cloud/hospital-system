"use client";

import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

export const SettingsLayout = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2.2),
  alignItems: "flex-start",
  flexDirection: "row",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

export const NavigationCard = styled(Card)(({ theme }) => ({
  width: 255,
  flexShrink: 0,
  borderRadius: 16,
  border: "1px solid #E8ECF2",
  boxShadow: "none",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

export const NavigationHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.2),
  borderBottom: "1px solid #EEF2F6",
}));

export const NavigationTitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.74rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: theme.palette.text.secondary,
}));

export interface NavigationItemProps {
  active: boolean;
}

export const NavigationItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})<NavigationItemProps>(({ theme, active }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.2),
  padding: "11px 12px",
  borderRadius: 10,
  cursor: "pointer",
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  backgroundColor: active ? alpha(theme.palette.primary.main, 0.08) : "transparent",
  transition: "all 0.18s ease",
  "&:hover": {
    backgroundColor: active
      ? alpha(theme.palette.primary.main, 0.1)
      : theme.palette.grey[100],
  },
}));

export const NavigationTextWrap = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 2,
}));

export const NavigationLabel = styled(Typography)(() => ({
  fontSize: "0.84rem",
  fontWeight: 600,
  color: "inherit",
  lineHeight: 1.1,
}));

export const NavigationDescription = styled(Typography)(({ theme }) => ({
  fontSize: "0.7rem",
  color: theme.palette.text.secondary,
  lineHeight: 1.2,
}));

export const ContentCard = styled(Card)(() => ({
  flex: 1,
  minWidth: 0,
  borderRadius: 16,
  border: "1px solid #E8ECF2",
  boxShadow: "none",
  overflow: "hidden",
}));

export const ContentHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.3, 2.5),
  borderBottom: "1px solid #EEF2F6",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.2),
}));

export const HeaderIcon = styled(Box)(() => ({
  width: 38,
  height: 38,
  borderRadius: 11,
  background:
    "linear-gradient(135deg, rgba(67,97,238,1) 0%, rgba(98,120,246,1) 100%)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const ContentTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.04rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

export const ContentSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
  color: theme.palette.text.secondary,
  marginTop: 2,
}));

export const ContentBody = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.2, 2.5),
}));

export const SettingsGroupTitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.74rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1.1),
}));

export const SettingRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(1.2),
  padding: theme.spacing(1.35, 0.3),
}));

export const SettingTextWrap = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 2,
}));

export const SettingLabel = styled(Typography)(({ theme }) => ({
  fontSize: "0.88rem",
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const SettingDescription = styled(Typography)(({ theme }) => ({
  fontSize: "0.77rem",
  color: theme.palette.text.secondary,
  maxWidth: 480,
}));

export const SelectGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing(1.6),
  marginTop: theme.spacing(0.9),
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const FieldLabel = styled("label")(({ theme }) => ({
  fontSize: "0.74rem",
  fontWeight: 700,
  color: theme.palette.grey[500],
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  marginBottom: 6,
  display: "inline-flex",
}));
