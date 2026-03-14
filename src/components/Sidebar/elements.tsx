"use client";

import { styled, alpha } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import ListItemButton from "@mui/material/ListItemButton";

const EXPANDED_WIDTH = 260;
const COLLAPSED_WIDTH = 78;

export const SidebarDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "collapsed",
})<{ collapsed?: boolean }>(({ theme, collapsed }) => ({
  "& .MuiDrawer-paper": {
    width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
    borderRight: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 0, 0, 0),
    transition: "width 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
  },
}));

export const LogoContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "collapsed",
})<{ collapsed?: boolean }>(({ theme, collapsed }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  padding: collapsed ? theme.spacing(2.5, 0) : theme.spacing(2.5, 2.5, 1.5, 2.5),
  justifyContent: collapsed ? "center" : "flex-start",
  minHeight: 64,
}));

export const LogoText = styled("div")(({ theme }) => ({
  fontWeight: 800,
  fontSize: "1.4rem",
  letterSpacing: "-0.02em",
  color: theme.palette.primary.main,
  whiteSpace: "nowrap",
}));

export const NavItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "active" && prop !== "collapsed",
})<{ active?: boolean; collapsed?: boolean }>(({ theme, active, collapsed }) => ({
  borderRadius: 10,
  margin: collapsed ? theme.spacing(0.4, 1) : theme.spacing(0.35, 1.5),
  padding: collapsed ? theme.spacing(1.2) : theme.spacing(1.1, 2),
  justifyContent: collapsed ? "center" : "flex-start",
  minHeight: 44,
  color: active ? theme.palette.primary.contrastText : theme.palette.text.secondary,
  backgroundColor: active ? theme.palette.primary.main : "transparent",
  "&:hover": {
    backgroundColor: active ? theme.palette.primary.dark : alpha(theme.palette.primary.main, 0.06),
    color: active ? theme.palette.primary.contrastText : theme.palette.text.primary,
  },
  transition: "all 0.2s ease",
}));

export const NavLabel = styled("span")(({ theme }) => ({
  fontSize: "0.875rem",
  fontWeight: 500,
  marginLeft: 14,
  whiteSpace: "nowrap",
}));

export const SectionLabel = styled("div", {
  shouldForwardProp: (prop) => prop !== "collapsed",
})<{ collapsed?: boolean }>(({ theme, collapsed }) => ({
  fontSize: "0.65rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  color: theme.palette.text.disabled,
  padding: collapsed
    ? theme.spacing(2, 0, 0.8, 0)
    : theme.spacing(2, 2.5, 0.8, 2.5),
  textAlign: collapsed ? "center" : "left",
  whiteSpace: "nowrap",
  overflow: "hidden",
  minHeight: collapsed ? 20 : "auto",
}));

export const CollapseToggle = styled("button", {
  shouldForwardProp: (prop) => prop !== "collapsed",
})<{ collapsed?: boolean }>(({ theme, collapsed }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  justifyContent: collapsed ? "center" : "flex-start",
  padding: collapsed ? theme.spacing(1.8, 0) : theme.spacing(1.8, 2.5),
  margin: 0,
  border: "none",
  borderTop: `1px solid ${theme.palette.divider}`,
  background: "none",
  color: theme.palette.text.secondary,
  cursor: "pointer",
  width: "100%",
  fontSize: "0.82rem",
  fontFamily: "inherit",
  transition: "color 0.2s",
  "&:hover": {
    color: theme.palette.text.primary,
  },
}));

export const CollapseLabel = styled("span")(({ theme }) => ({
  fontSize: "0.82rem",
  fontWeight: 500,
  whiteSpace: "nowrap",
}));
