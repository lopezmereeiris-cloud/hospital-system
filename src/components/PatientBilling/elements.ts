"use client";

import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

export const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 24,
}));

export const PanelCard = styled(Box)(({ theme }) => ({
  border: "1px solid #E8ECF2",
  borderRadius: 16,
  overflow: "hidden",
  background: theme.palette.background.paper,
}));

export const PanelHeader = styled(Box)(({ theme }) => ({
  padding: "16px 20px",
  borderBottom: "1px solid #EEF2F6",
  background: theme.palette.grey[50],
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const PanelTitleWrap = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 4,
}));

export const PanelTitle = styled("div")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

export const PanelSubtitle = styled("div")(({ theme }) => ({
  fontSize: "0.82rem",
  color: theme.palette.text.secondary,
}));

export const DetailBody = styled(Box)(({ theme }) => ({
  padding: 20,
}));

export const DetailHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 16,
  marginBottom: 20,
}));

export const PatientName = styled("div")(({ theme }) => ({
  fontSize: "1.9rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
  lineHeight: 1.15,
}));

export const PatientMeta = styled("div")(({ theme }) => ({
  fontSize: "0.95rem",
  color: "#5F6B76",
  marginTop: 6,
}));

export const BadgeRow = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  marginTop: 14,
}));

export const CoverageBadge = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>(({ active, theme }) => ({
  height: 30,
  borderRadius: 999,
  fontWeight: 600,
  fontSize: "0.78rem",
  background: active ? alpha("#0D8A3F", 0.08) : "#F8FAFC",
  color: active ? "#0D8A3F" : theme.palette.grey[500],
  border: `1px solid ${active ? alpha("#0D8A3F", 0.18) : "#D8E0EA"}`,
  "& .MuiChip-label": {
    paddingLeft: 12,
    paddingRight: 12,
  },
}));

export const StatusBadge = styled("span", {
  shouldForwardProp: (prop) => prop !== "status",
})<{
  status: "Paid" | "Partial" | "Unpaid";
}>(({ status, theme }) => {
  const styles = {
    Paid: {
      background: alpha("#0D8A3F", 0.08),
      color: "#0D8A3F",
      border: alpha("#0D8A3F", 0.18),
    },
    Partial: {
      background: alpha(theme.palette.warning.main, 0.1),
      color: "#B26A00",
      border: alpha(theme.palette.warning.main, 0.2),
    },
    Unpaid: {
      background: alpha(theme.palette.error.main, 0.08),
      color: "#D92D20",
      border: alpha(theme.palette.error.main, 0.18),
    },
  }[status];

  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 30,
    padding: "0 12px",
    borderRadius: 999,
    fontSize: "0.78rem",
    fontWeight: 700,
    background: styles.background,
    color: styles.color,
    border: `1px solid ${styles.border}`,
  };
});

export const MetaGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 12,
  marginBottom: 20,
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const MetaCard = styled(Box)(({ theme }) => ({
  border: "1px solid #E8ECF2",
  borderRadius: 14,
  padding: "14px 16px",
  background: theme.palette.background.paper,
}));

export const MetaLabel = styled("div")(({ theme }) => ({
  fontSize: "0.74rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: theme.palette.grey[400],
  marginBottom: 8,
}));

export const MetaValue = styled("div")(({ theme }) => ({
  fontSize: "0.98rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

export const BreakdownCard = styled(Box)(({ theme }) => ({
  border: "1px solid #E8ECF2",
  borderRadius: 16,
  overflow: "hidden",
  marginBottom: 20,
}));

export const BreakdownHeader = styled("div")(({ theme }) => ({
  padding: "14px 16px",
  fontSize: "0.95rem",
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  color: theme.palette.grey[700],
  background: "#F8FAFC",
  borderBottom: "1px solid #E8ECF2",
}));

export const BreakdownRow = styled(Box, {
  shouldForwardProp: (prop) =>
    !["positive", "total", "danger"].includes(String(prop)),
})<{
  positive?: boolean;
  total?: boolean;
  danger?: boolean;
}>(({ positive, total, danger, theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: total ? "14px 16px" : "12px 16px",
  borderBottom: total ? "none" : "1px solid #EEF2F6",
  fontSize: total ? "1rem" : "0.95rem",
  fontWeight: total ? 800 : 500,
  color: danger ? "#D92D20" : positive ? "#0D8A3F" : theme.palette.grey[800],
  background: total ? theme.palette.grey[50] : theme.palette.background.paper,
}));

export const NotesCard = styled(Box)(({ theme }) => ({
  border: "1px solid #E8ECF2",
  borderRadius: 16,
  padding: "16px 18px",
  background: theme.palette.background.paper,
}));

export const NotesLabel = styled("div")(({ theme }) => ({
  fontSize: "0.74rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: theme.palette.grey[400],
  marginBottom: 10,
}));

export const NotesValue = styled("div")(({ theme }) => ({
  fontSize: "0.92rem",
  color: theme.palette.grey[700],
  lineHeight: 1.6,
}));