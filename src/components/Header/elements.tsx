"use client";

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

export const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "sidebarWidth",
})<{ sidebarWidth?: number }>(({ theme, sidebarWidth = 260 }) => ({
  backgroundColor: "#FFFFFF",
  color: theme.palette.text.primary,
  boxShadow: "none",
  borderBottom: "1px solid #F0F2F5",
  zIndex: theme.zIndex.drawer - 1,
  transition:
    "width 0.28s cubic-bezier(0.4,0,0.2,1), margin-left 0.28s cubic-bezier(0.4,0,0.2,1)",
  [theme.breakpoints.up("md")]: {
    width: `calc(100% - ${sidebarWidth}px)`,
    marginLeft: sidebarWidth,
  },
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  minHeight: 68,
  padding: theme.spacing(0, 3),
}));

export const HeaderLeft = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  flex: "0 0 auto",
}));

export const HeaderCenter = styled("div")(() => ({
  flex: 1,
  display: "flex",
  justifyContent: "center",
}));

export const HeaderRight = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  flex: "0 0 auto",
}));

export const PageTitle = styled("h1")(() => ({
  fontSize: "1.2rem",
  fontWeight: 700,
  margin: 0,
  lineHeight: 1.3,
  whiteSpace: "nowrap",
}));

export const SearchBar = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  backgroundColor: theme.palette.grey[50],
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: 10,
  padding: theme.spacing(0.85, 1.8),
  minWidth: 260,
  color: theme.palette.text.disabled,
  fontSize: "0.84rem",
  cursor: "pointer",
  transition: "border-color 0.2s, background-color 0.2s",
  "&:hover": {
    borderColor: theme.palette.grey[300],
    backgroundColor: theme.palette.grey[100],
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const SearchShortcut = styled("span")(({ theme }) => ({
  marginLeft: "auto",
  fontSize: "0.7rem",
  fontWeight: 600,
  color: theme.palette.text.disabled,
  backgroundColor: "#FFFFFF",
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: 6,
  padding: "2px 8px",
  lineHeight: 1.5,
}));

export const UserInfo = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(0.5, 1, 0.5, 0.5),
  borderRadius: 12,
  cursor: "pointer",
  transition: "background-color 0.2s",
  "&:hover": {
    backgroundColor: theme.palette.grey[50],
  },
}));

export const UserName = styled("span")(({ theme }) => ({
  fontSize: "0.82rem",
  fontWeight: 600,
  color: theme.palette.text.primary,
  lineHeight: 1.3,
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

export const UserRole = styled("span")(({ theme }) => ({
  fontSize: "0.7rem",
  color: theme.palette.text.secondary,
  lineHeight: 1.3,
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));
