"use client";

import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

export const Container = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 24,
}));

export const PanelCard = styled(Box)(() => ({
  border: "1px solid #E8ECF2",
  borderRadius: 16,
  overflow: "hidden",
  background: "#FFF",
}));

export const PanelHeader = styled(Box)(() => ({
  padding: "16px 20px",
  borderBottom: "1px solid #EEF2F6",
  background: "#FCFCFD",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const PanelTitleWrap = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 4,
}));

export const PanelTitle = styled("div")(() => ({
  fontSize: "1rem",
  fontWeight: 700,
  color: "#1A1D1F",
}));

export const PanelSubtitle = styled("div")(() => ({
  fontSize: "0.82rem",
  color: "#6F767E",
}));

export const DetailBody = styled(Box)(() => ({
  padding: 20,
}));

export const DetailHeader = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 16,
  marginBottom: 20,
}));

export const PatientName = styled("div")(() => ({
  fontSize: "1.9rem",
  fontWeight: 700,
  color: "#1A1D1F",
  lineHeight: 1.15,
}));

export const PatientMeta = styled("div")(() => ({
  fontSize: "0.95rem",
  color: "#5F6B76",
  marginTop: 6,
}));

export const BadgeRow = styled(Box)(() => ({
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  marginTop: 14,
}));

export const CoverageBadge = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>(({ active }) => ({
  height: 30,
  borderRadius: 999,
  fontWeight: 600,
  fontSize: "0.78rem",
  background: active ? alpha("#0D8A3F", 0.08) : "#F8FAFC",
  color: active ? "#0D8A3F" : "#667085",
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
}>(({ status }) => {
  const styles = {
    Paid: {
      background: alpha("#0D8A3F", 0.08),
      color: "#0D8A3F",
      border: alpha("#0D8A3F", 0.18),
    },
    Partial: {
      background: alpha("#F79009", 0.1),
      color: "#B26A00",
      border: alpha("#F79009", 0.2),
    },
    Unpaid: {
      background: alpha("#F04438", 0.08),
      color: "#D92D20",
      border: alpha("#F04438", 0.18),
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

export const MetaCard = styled(Box)(() => ({
  border: "1px solid #E8ECF2",
  borderRadius: 14,
  padding: "14px 16px",
  background: "#FFF",
}));

export const MetaLabel = styled("div")(() => ({
  fontSize: "0.74rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "#98A2B3",
  marginBottom: 8,
}));

export const MetaValue = styled("div")(() => ({
  fontSize: "0.98rem",
  fontWeight: 700,
  color: "#1A1D1F",
}));

export const BreakdownCard = styled(Box)(() => ({
  border: "1px solid #E8ECF2",
  borderRadius: 16,
  overflow: "hidden",
  marginBottom: 20,
}));

export const BreakdownHeader = styled("div")(() => ({
  padding: "14px 16px",
  fontSize: "0.95rem",
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  color: "#344054",
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
}>(({ positive, total, danger }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: total ? "14px 16px" : "12px 16px",
  borderBottom: total ? "none" : "1px solid #EEF2F6",
  fontSize: total ? "1rem" : "0.95rem",
  fontWeight: total ? 800 : 500,
  color: danger ? "#D92D20" : positive ? "#0D8A3F" : "#1D2939",
  background: total ? "#FCFCFD" : "#FFF",
}));

export const NotesCard = styled(Box)(() => ({
  border: "1px solid #E8ECF2",
  borderRadius: 16,
  padding: "16px 18px",
  background: "#FFF",
}));

export const NotesLabel = styled("div")(() => ({
  fontSize: "0.74rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "#98A2B3",
  marginBottom: 10,
}));

export const NotesValue = styled("div")(() => ({
  fontSize: "0.92rem",
  color: "#344054",
  lineHeight: 1.6,
}));