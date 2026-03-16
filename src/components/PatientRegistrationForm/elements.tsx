"use client";

import { styled, alpha } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const PURPLE = "#4361EE";

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
  background: "#4361EE",
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
  gap: 0,
  padding: "20px 28px 18px",
  borderBottom: "1px solid #EEF2F6",
  background: "linear-gradient(180deg, #FBFFFD 0%, #FFFFFF 100%)",
  overflowX: "hidden",
}));

export const StepDot = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
  minWidth: 80,
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
  backgroundColor: completed ? PURPLE : active ? PURPLE : theme.palette.background.paper,
  color: completed || active ? theme.palette.background.paper : theme.palette.grey[400],
  boxShadow: active ? `0 0 0 4px ${alpha(PURPLE, 0.16)}` : "none",
}));

export const StepLabel = styled("span", {
  shouldForwardProp: (p) => p !== "active" && p !== "completed",
})<{ active?: boolean; completed?: boolean }>(({ active, completed, theme }) => ({
  fontSize: "0.75rem",
  fontWeight: active ? 700 : 600,
  color: active ? PURPLE : completed ? PURPLE : theme.palette.grey[400],
  lineHeight: 1.25,
  maxWidth: 80,
}));

export const StepConnector = styled("div", {
  shouldForwardProp: (p) => p !== "completed",
})<{ completed?: boolean }>(({ completed }) => ({
  flex: 1,                       
  minWidth: 12,                  
  height: 2,
  backgroundColor: completed ? PURPLE : "#E4E7EC",
  transition: "background-color 0.25s ease",
  marginTop: 14,                 
  flexShrink: 1,
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
    borderColor: PURPLE,
    boxShadow: `0 0 0 3px ${alpha(PURPLE, 0.13)}`,
  },
  "&::placeholder": {
    color: theme.palette.grey[400],
  },
}));

export const FieldSelect = styled("select")(({ theme }) => ({
  width: "100%",
  padding: "11px 36px 11px 13px",
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
  WebkitAppearance: "none" as const,
  MozAppearance: "none" as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 8L1 3h10z' fill='%2398A2B3'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 13px center",
  backgroundSize: "12px",
  cursor: "pointer",
  "&:focus": {
    borderColor: PURPLE,
    boxShadow: `0 0 0 3px ${alpha(PURPLE, 0.13)}`,
  },
  "&:disabled": {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.grey[400],
    cursor: "not-allowed",
    borderColor: theme.palette.grey[200],
  },
}));

export const FileUploadArea = styled("div")(({ theme }) => ({
  border: `2px dashed ${alpha(PURPLE, 0.28)}`,
  borderRadius: 12,
  padding: "26px 18px",
  textAlign: "center" as const,
  cursor: "pointer",
  transition: "border-color 0.2s, background-color 0.2s",
  backgroundColor: alpha(PURPLE, 0.025),
  "&:hover": {
    borderColor: PURPLE,
    backgroundColor: alpha(PURPLE, 0.06),
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
  background: "#4361EE",
  color: theme.palette.primary.contrastText,
  "&:hover": {
    background: "#4361EE",
    transform: "translateY(-1px)",
    boxShadow: `0 6px 14px ${alpha(PURPLE, 0.28)}`,
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
  borderBottom: `1px solid ${alpha(PURPLE, 0.2)}`,
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

export const FieldTextarea = styled("textarea")(({ theme }) => ({
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
  resize: "vertical" as const,
  lineHeight: 1.5,
  "&:focus": {
    borderColor: PURPLE,
    boxShadow: `0 0 0 3px ${alpha(PURPLE, 0.13)}`,
  },
  "&::placeholder": {
    color: theme.palette.grey[400],
  },
}));
