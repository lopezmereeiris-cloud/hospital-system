"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import { alpha, styled } from "@mui/material/styles";

export const PageRoot = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

export const HeroCard = styled(Card)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: 16,
  border: "1px solid #E8ECF2",
  boxShadow: "none",
  padding: theme.spacing(2.5, 3),
  background: "linear-gradient(145deg, #F5F9FF 0%, #FFFFFF 48%, #F3FCF7 100%)",
  "&::after": {
    content: '""',
    position: "absolute",
    top: -40,
    right: -30,
    width: 160,
    height: 160,
    borderRadius: "50%",
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    pointerEvents: "none",
  },
}));

export const HeroTag = styled("span")(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(0.75),
  borderRadius: 999,
  border: "1px solid #DEE8FF",
  backgroundColor: theme.palette.background.paper,
  color: "#3554D1",
  fontSize: "0.72rem",
  fontWeight: 700,
  letterSpacing: "0.02em",
  textTransform: "uppercase",
  padding: "5px 10px",
  marginBottom: theme.spacing(1.2),
}));

export const HeroTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.48rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: 4,
  position: "relative",
  zIndex: 1,
}));

export const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.9rem",
  color: theme.palette.text.secondary,
  position: "relative",
  zIndex: 1,
}));

export const TopCardsGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(0.2),
}));

export const ColumnStack = styled(Stack)(({ theme }) => ({
  height: "100%",
}));

export const SectionCardRoot = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: 16,
  border: "1px solid #E8ECF2",
  boxShadow: "none",
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: 6,
}));

export const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.84rem",
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
}));

export const DetailRowRoot = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 16,
}));

export const DetailLabel = styled(Typography)(({ theme }) => ({
  fontSize: "0.82rem",
  color: theme.palette.text.secondary,
}));

export const DetailValue = styled(Typography)(({ theme }) => ({
  fontSize: "0.88rem",
  color: theme.palette.text.primary,
  fontWeight: 600,
  textAlign: "right",
}));

export interface StepItemProps {
  done: boolean;
}

export const StepItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "done",
})<StepItemProps>(({ done, theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: 10,
  padding: 12,
  borderRadius: 12,
  border: "1px solid #EEF2F6",
  backgroundColor: done ? theme.palette.grey[50] : "#F8FAFF",
}));

export const StepIconBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "done",
})<StepItemProps>(({ done, theme }) => ({
  marginTop: 1,
  color: done ? theme.palette.success.main : theme.palette.primary.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& .MuiSvgIcon-root": {
    fontSize: 18,
  },
}));

export const StepTitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.88rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

export const StepText = styled(Typography)(({ theme }) => ({
  fontSize: "0.82rem",
  color: theme.palette.text.secondary,
  marginTop: 2,
}));

export const ActivityItem = styled(Box)(({ theme }) => ({
  padding: 12,
  border: "1px solid #EEF2F6",
  borderRadius: 12,
  backgroundColor: theme.palette.grey[50],
}));

export const ActivityTitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.84rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

export const ActivityMeta = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
  color: theme.palette.text.secondary,
  marginTop: 2,
}));

export const ActivityAmount = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
  color: theme.palette.info.dark,
  marginTop: 2,
}));

export const EmptyStateText = styled(Typography)(({ theme }) => ({
  fontSize: "0.88rem",
  color: theme.palette.text.secondary,
}));

export const BillingStatusChip = styled(Chip)(({ theme }) => ({
  fontWeight: 600,
  "& .MuiChip-label": {
    fontWeight: 600,
  },
  "& .MuiChip-icon": {
    fontSize: "0.95rem",
  },
}));

export const BenefitUsageText = styled(Typography)(({ theme }) => ({
  fontSize: "0.76rem",
  color: theme.palette.text.secondary,
  marginBottom: 6,
}));

export interface BenefitProgressProps {
  highUsage: boolean;
}

export const BenefitProgress = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== "highUsage",
})<BenefitProgressProps>(({ highUsage, theme }) => ({
  height: 8,
  borderRadius: 999,
  backgroundColor: theme.palette.divider,
  "& .MuiLinearProgress-bar": {
    borderRadius: 999,
    backgroundColor: highUsage ? theme.palette.warning.main : theme.palette.success.main,
  },
}));

export const TipBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  padding: theme.spacing(1.2),
  borderRadius: 12,
  border: "1px solid #E9EEFF",
  backgroundColor: "#F8FAFF",
  display: "flex",
  gap: theme.spacing(1),
  alignItems: "flex-start",
}));

export const TipIcon = styled(MedicationRoundedIcon)(({ theme }) => ({
  fontSize: 18,
  color: theme.palette.primary.main,
  marginTop: 1,
}));

export const TipText = styled(Typography)(({ theme }) => ({
  fontSize: "0.79rem",
  color: theme.palette.grey[600],
}));
