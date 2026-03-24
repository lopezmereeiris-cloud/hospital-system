"use client";

import Paper from "@mui/material/Paper";
import { alpha, styled } from "@mui/material/styles";

export const PageShell = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2.25),
}));

export const HeroCard = styled(Paper)(({ theme }) => ({
  borderRadius: 20,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
  boxShadow: "none",
  padding: theme.spacing(2.6),
  background:
    "linear-gradient(135deg, rgba(67, 97, 238, 0.08) 0%, rgba(255, 255, 255, 0.98) 42%, rgba(16, 185, 129, 0.05) 100%)",
}));

export const HeroEyebrow = styled("div")(({ theme }) => ({
  fontSize: "0.74rem",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(0.75),
}));

export const HeroTitle = styled("h1")(({ theme }) => ({
  margin: 0,
  fontSize: "1.8rem",
  fontWeight: 800,
  lineHeight: 1.1,
  color: theme.palette.text.primary,
}));

export const HeroSubtitle = styled("p")(({ theme }) => ({
  margin: theme.spacing(1, 0, 0),
  maxWidth: 760,
  fontSize: "0.92rem",
  lineHeight: 1.6,
  color: theme.palette.text.secondary,
}));

export const StatsGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(1.4),
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const StatCard = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  border: `1px solid ${theme.palette.grey[200]}`,
  boxShadow: "none",
  padding: theme.spacing(1.7),
  backgroundColor: "#FFFFFF",
}));

export const StatLabel = styled("div")(({ theme }) => ({
  fontSize: "0.7rem",
  fontWeight: 700,
  color: theme.palette.text.secondary,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  marginBottom: theme.spacing(0.6),
}));

export const StatValue = styled("div")(({ theme }) => ({
  fontSize: "1.15rem",
  fontWeight: 800,
  lineHeight: 1.15,
  color: theme.palette.text.primary,
}));

export const SnapshotCard = styled(Paper)(({ theme }) => ({
  borderRadius: 18,
  border: `1px solid ${theme.palette.grey[200]}`,
  boxShadow: "none",
  padding: theme.spacing(2.2),
}));

export const SectionHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1.5),
}));

export const SectionTitle = styled("div")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: 800,
  color: theme.palette.text.primary,
}));

export const SectionSubtitle = styled("div")(({ theme }) => ({
  fontSize: "0.82rem",
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(0.25),
}));

export const SnapshotGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(1.1),
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const SnapshotField = styled("div")<{ fullWidth?: boolean }>(({ theme, fullWidth }) => ({
  borderRadius: 14,
  border: `1px solid ${theme.palette.grey[200]}`,
  backgroundColor: theme.palette.grey[50],
  padding: theme.spacing(1.3, 1.4),
  gridColumn: fullWidth ? "1 / -1" : "auto",
}));

export const SnapshotLabel = styled("div")(({ theme }) => ({
  fontSize: "0.68rem",
  fontWeight: 700,
  color: theme.palette.text.secondary,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  marginBottom: theme.spacing(0.5),
}));

export const SnapshotValue = styled("div")(({ theme }) => ({
  fontSize: "0.88rem",
  lineHeight: 1.55,
  color: theme.palette.text.primary,
  fontWeight: 500,
}));

export const RecordsStack = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(1.6),
}));

export const RecordCard = styled(Paper)(({ theme }) => ({
  borderRadius: 20,
  border: `1px solid ${theme.palette.grey[200]}`,
  boxShadow: "none",
  overflow: "hidden",
}));

export const RecordBanner = styled("div")(({ theme }) => ({
  padding: theme.spacing(2.1, 2.2),
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  background:
    "linear-gradient(180deg, rgba(248, 250, 252, 1) 0%, rgba(255, 255, 255, 1) 100%)",
}));

export const RecordTitle = styled("div")(({ theme }) => ({
  fontSize: "1.08rem",
  fontWeight: 800,
  color: theme.palette.text.primary,
  lineHeight: 1.25,
  marginTop: theme.spacing(1.05),
}));

export const RecordSubline = styled("div")(({ theme }) => ({
  fontSize: "0.84rem",
  color: theme.palette.text.secondary,
  lineHeight: 1.55,
  marginTop: theme.spacing(0.65),
}));

export const RecordBody = styled("div")(({ theme }) => ({
  padding: theme.spacing(2.1, 2.2, 2.3),
}));

export const RecordGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(1.25),
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const DetailCard = styled("section")(({ theme }) => ({
  borderRadius: 16,
  border: `1px solid ${theme.palette.grey[200]}`,
  backgroundColor: "#FFFFFF",
  padding: theme.spacing(1.55),
}));

export const DetailCardTitle = styled("div")(({ theme }) => ({
  fontSize: "0.86rem",
  fontWeight: 800,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1.15),
}));

export const DetailGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(0.9),
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const DetailField = styled("div")<{ fullWidth?: boolean }>(({ theme, fullWidth }) => ({
  borderRadius: 12,
  border: `1px solid ${theme.palette.grey[200]}`,
  backgroundColor: theme.palette.grey[50],
  padding: theme.spacing(1.1, 1.2),
  gridColumn: fullWidth ? "1 / -1" : "auto",
}));

export const DetailLabel = styled("div")(({ theme }) => ({
  fontSize: "0.67rem",
  fontWeight: 700,
  color: theme.palette.text.secondary,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  marginBottom: theme.spacing(0.45),
}));

export const DetailValue = styled("div")(({ theme }) => ({
  fontSize: "0.84rem",
  lineHeight: 1.55,
  color: theme.palette.text.primary,
}));

export const SoftList = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(0.8),
}));

export const SoftListItem = styled("div")(({ theme }) => ({
  borderRadius: 12,
  border: `1px solid ${theme.palette.grey[200]}`,
  backgroundColor: theme.palette.grey[50],
  padding: theme.spacing(1.05, 1.15),
  fontSize: "0.83rem",
  lineHeight: 1.55,
  color: theme.palette.text.primary,
}));
