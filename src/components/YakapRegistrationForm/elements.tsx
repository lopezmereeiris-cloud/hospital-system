"use client";

import { styled, alpha } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const PH_GREEN = "#0D8A3F";
const PH_GREEN_LIGHT = "#14A44D";
const PH_BLUE = "#0066B2";

export const FormContainer = styled(Paper)(({ theme }) => ({
  borderRadius: 18,
  overflow: "hidden",
  border: "1px solid #E4E7EC",
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0 8px 24px rgba(16, 24, 40, 0.06)",
}));

export const FormHeader = styled("div")(({ theme }) => ({
  padding: "28px 32px",
  borderBottom: "1px solid rgba(255,255,255,0.16)",
  background: `linear-gradient(130deg, ${PH_GREEN} 0%, ${PH_GREEN_LIGHT} 60%, #0B7735 100%)`,
}));

export const FormTitle = styled("h3")(({ theme }) => ({
  fontSize: "1.2rem",
  fontWeight: 700,
  color: theme.palette.primary.contrastText,
  margin: 0,
  letterSpacing: "0.01em",
}));

export const FormSubtitle = styled("p")(({ theme }) => ({
  fontSize: "0.84rem",
  color: "rgba(255,255,255,0.9)",
  margin: "6px 0 0 0",
  maxWidth: 640,
  lineHeight: 1.5,
}));

export const StepperContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  gap: 8,
  padding: "20px 28px 18px",
  borderBottom: "1px solid #EEF2F6",
  background: "linear-gradient(180deg, #FBFFFD 0%, #FFFFFF 100%)",
  overflowX: "auto",
}));

export const StepDot = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
  minWidth: 116,
  textAlign: "center",
}));

export const StepCircle = styled("div", {
  shouldForwardProp: (p) => p !== "active" && p !== "completed",
})<{ active?: boolean; completed?: boolean }>(({ active, completed, theme }) => ({
  width: 34,
  height: 34,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.8rem",
  fontWeight: 700,
  border: completed || active ? "none" : `1px solid ${theme.palette.grey[300]}`,
  transition: "all 0.25s ease",
  backgroundColor: completed ? PH_GREEN : active ? PH_BLUE : theme.palette.background.paper,
  color: completed || active ? theme.palette.background.paper : theme.palette.grey[400],
  boxShadow: active ? `0 0 0 4px ${alpha(PH_BLUE, 0.16)}` : "none",
}));

export const StepLabel = styled("span", {
  shouldForwardProp: (p) => p !== "active" && p !== "completed",
})<{ active?: boolean; completed?: boolean }>(({ active, completed, theme }) => ({
  fontSize: "0.75rem",
  fontWeight: active ? 700 : 600,
  color: active ? PH_BLUE : completed ? PH_GREEN : theme.palette.grey[400],
  lineHeight: 1.25,
  maxWidth: 106,
}));

export const StepConnector = styled("div", {
  shouldForwardProp: (p) => p !== "completed",
})<{ completed?: boolean }>(({ completed }) => ({
  width: 56,
  height: 2,
  backgroundColor: completed ? PH_GREEN : "#E4E7EC",
  transition: "background-color 0.25s ease",
  marginTop: 16,
  flexShrink: 0,
}));

export const FormBody = styled("div")(({ theme }) => ({
  padding: "24px 28px 28px",
}));

export const StepMeta = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  flexWrap: "wrap",
  marginBottom: 10,
}));

export const StepMetaTitle = styled("div")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: 700,
  color: theme.palette.grey[900],
}));

export const StepMetaHint = styled("div")(({ theme }) => ({
  marginTop: 2,
  fontSize: "0.8rem",
  fontWeight: 500,
  color: theme.palette.grey[500],
}));

export const StepMetaBadge = styled("div")(({ theme }) => ({
  borderRadius: 999,
  border: `1px solid ${theme.palette.grey[300]}`,
  backgroundColor: theme.palette.grey[50],
  color: theme.palette.grey[700],
  fontSize: "0.73rem",
  fontWeight: 700,
  letterSpacing: "0.04em",
  textTransform: "uppercase" as const,
  padding: "7px 12px",
}));

export const StepContentCard = styled("div")(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: 14,
  padding: "18px 18px 4px",
  backgroundColor: theme.palette.background.paper,
}));

export const FieldRow = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 18,
  marginBottom: 18,
}));

export const FieldLabel = styled("label")(({ theme }) => ({
  display: "block",
  fontSize: "0.76rem",
  fontWeight: 700,
  color: theme.palette.grey[700],
  marginBottom: 6,
  textTransform: "uppercase" as const,
  letterSpacing: "0.04em",
}));

export const FieldInput = styled("input")(({ theme }) => ({
  width: "100%",
  padding: "11px 13px",
  borderRadius: 10,
  border: `1px solid ${theme.palette.grey[300]}`,
  fontSize: "0.87rem",
  fontFamily: "inherit",
  color: theme.palette.grey[800],
  backgroundColor: theme.palette.background.paper,
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box" as const,
  "&:focus": {
    borderColor: PH_GREEN,
    boxShadow: `0 0 0 3px ${alpha(PH_GREEN, 0.13)}`,
  },
  "&::placeholder": {
    color: theme.palette.grey[400],
  },
}));

export const FieldSelect = styled("select")(({ theme }) => ({
  width: "100%",
  padding: "11px 13px",
  borderRadius: 10,
  border: `1px solid ${theme.palette.grey[300]}`,
  fontSize: "0.87rem",
  fontFamily: "inherit",
  color: theme.palette.grey[800],
  backgroundColor: theme.palette.background.paper,
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box" as const,
  appearance: "none" as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 8L1 3h10z' fill='%2398A2B3'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  "&:focus": {
    borderColor: PH_GREEN,
    boxShadow: `0 0 0 3px ${alpha(PH_GREEN, 0.13)}`,
  },
}));

export const FileUploadArea = styled("div")(({ theme }) => ({
  border: `2px dashed ${alpha(PH_GREEN, 0.28)}`,
  borderRadius: 12,
  padding: "26px 18px",
  textAlign: "center" as const,
  cursor: "pointer",
  transition: "border-color 0.2s, background-color 0.2s",
  backgroundColor: alpha(PH_GREEN, 0.025),
  "&:hover": {
    borderColor: PH_GREEN,
    backgroundColor: alpha(PH_GREEN, 0.06),
  },
}));

export const ButtonRow = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 24,
  paddingTop: 18,
  borderTop: `1px solid ${theme.palette.grey[200]}`,
  gap: 12,
}));

export const PrimaryButton = styled("button")(({ theme }) => ({
  padding: "11px 28px",
  borderRadius: 10,
  border: "none",
  fontSize: "0.86rem",
  fontWeight: 700,
  fontFamily: "inherit",
  cursor: "pointer",
  transition: "all 0.2s ease",
  background: `linear-gradient(135deg, ${PH_GREEN} 0%, ${PH_GREEN_LIGHT} 100%)`,
  color: theme.palette.primary.contrastText,
  "&:hover": {
    background: `linear-gradient(135deg, #0B7735 0%, ${PH_GREEN} 100%)`,
    transform: "translateY(-1px)",
    boxShadow: `0 6px 14px ${alpha(PH_GREEN, 0.28)}`,
  },
  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
    transform: "none",
    boxShadow: "none",
  },
}));

export const SecondaryButton = styled("button")(({ theme }) => ({
  padding: "11px 22px",
  borderRadius: 10,
  border: `1px solid ${theme.palette.grey[300]}`,
  fontSize: "0.84rem",
  fontWeight: 700,
  fontFamily: "inherit",
  cursor: "pointer",
  transition: "all 0.2s ease",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.grey[700],
  "&:hover": {
    backgroundColor: theme.palette.background.default,
    borderColor: theme.palette.grey[400],
  },
}));

export const ReviewSection = styled("div")(({ theme }) => ({
  marginBottom: 16,
  padding: "14px 14px 10px",
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: 12,
  backgroundColor: theme.palette.grey[50],
}));

export const ReviewTitle = styled("h4")(({ theme }) => ({
  fontSize: "0.9rem",
  fontWeight: 700,
  color: theme.palette.grey[900],
  margin: "0 0 12px 0",
  paddingBottom: 8,
  borderBottom: `1px solid ${alpha(PH_GREEN, 0.2)}`,
}));

export const ReviewGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
  gap: "10px 18px",
}));

export const ReviewItem = styled("div")(({ theme }) => ({
  padding: "4px 0",
}));

export const ReviewLabel = styled("span")(({ theme }) => ({
  display: "block",
  fontSize: "0.7rem",
  fontWeight: 700,
  color: theme.palette.grey[400],
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
}));

export const ReviewValue = styled("span")(({ theme }) => ({
  display: "block",
  fontSize: "0.86rem",
  fontWeight: 600,
  color: theme.palette.grey[800],
  marginTop: 2,
}));
