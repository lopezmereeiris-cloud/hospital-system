"use client";

import { styled, alpha } from "@mui/material/styles";

export const ProfileContainer = styled("div")(({ theme }) => ({
  maxWidth: 780,
  margin: "0 auto",
}));

export const SectionCard = styled("div")(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: 16,
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(3.5, 4),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2.5, 2),
  },
}));

export const SectionTitle = styled("h2")(({ theme }) => ({
  ...theme.typography.h4,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(3),
  margin: 0,
  paddingBottom: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const AvatarUploadWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2.5),
  marginBottom: theme.spacing(3),
  marginTop: theme.spacing(2),
}));

export const AvatarUploadButton = styled("label")(({ theme }) => ({
  position: "relative",
  cursor: "pointer",
  "&:hover .overlay": {
    opacity: 1,
  },
}));

export const AvatarOverlay = styled("div")(({ theme }) => ({
  position: "absolute",
  inset: 0,
  borderRadius: "50%",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0,
  transition: "opacity 0.2s",
  color: "#fff",
}));

export const AvatarHint = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 2,
}));

export const AvatarHintLabel = styled("span")(({ theme }) => ({
  ...theme.typography.subtitle1,
  color: theme.palette.text.primary,
}));

export const AvatarHintSub = styled("span")(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.disabled,
}));

export const FieldRow = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing(2.5),
  marginBottom: theme.spacing(2.5),
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const FieldGroup = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.75),
}));

export const FieldLabel = styled("label")(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
}));

export const TextInput = styled("input")(({ theme }) => ({
  width: "100%",
  padding: "10px 14px",
  borderRadius: 10,
  border: `1px solid ${theme.palette.grey[200]}`,
  background: theme.palette.grey[50],
  ...theme.typography.body1,
  color: theme.palette.text.primary,
  fontFamily: theme.typography.fontFamily,
  outline: "none",
  transition: "border-color 0.2s, background-color 0.2s",
  "&::placeholder": {
    color: theme.palette.text.disabled,
  },
  "&:focus": {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const ActionsRow = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: theme.spacing(1.5),
  marginTop: theme.spacing(1),
}));
