"use client";

import { styled, alpha } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const PH_GREEN = "#0D8A3F";
const PH_GREEN_LIGHT = "#14A44D";
const PH_BLUE = "#0066B2";

export const FormContainer = styled(Paper)(() => ({
  borderRadius: 18,
  overflow: "hidden",
  border: "1px solid #E4E7EC",
  backgroundColor: "#FFFFFF",
  boxShadow: "0 8px 24px rgba(16, 24, 40, 0.06)",
}));

export const FormHeader = styled("div")(() => ({
  padding: "28px 32px",
  borderBottom: "1px solid rgba(255,255,255,0.16)",
  background: `linear-gradient(130deg, ${PH_GREEN} 0%, ${PH_GREEN_LIGHT} 60%, #0B7735 100%)`,
}));

export const FormTitle = styled("h3")(() => ({
  fontSize: "1.2rem",
  fontWeight: 700,
  color: "#FFFFFF",
  margin: 0,
  letterSpacing: "0.01em",
}));

export const FormSubtitle = styled("p")(() => ({
  fontSize: "0.84rem",
  color: "rgba(255,255,255,0.9)",
  margin: "6px 0 0 0",
  maxWidth: 640,
  lineHeight: 1.5,
}));

export const StepperContainer = styled("div")(() => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  gap: 8,
  padding: "20px 28px 18px",
  borderBottom: "1px solid #EEF2F6",
  background: "linear-gradient(180deg, #FBFFFD 0%, #FFFFFF 100%)",
  overflowX: "auto",
}));

export const StepDot = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
  minWidth: 116,
  textAlign: "center",
}));

export const StepCircle = styled("div", {
  shouldForwardProp: (p) => p !== "active" && p !== "completed",
})<{ active?: boolean; completed?: boolean }>(({ active, completed }) => ({
  width: 34,
  height: 34,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.8rem",
  fontWeight: 700,
  border: completed || active ? "none" : "1px solid #D0D5DD",
  transition: "all 0.25s ease",
  backgroundColor: completed ? PH_GREEN : active ? PH_BLUE : "#FFFFFF",
  color: completed || active ? "#FFFFFF" : "#98A2B3",
  boxShadow: active ? `0 0 0 4px ${alpha(PH_BLUE, 0.16)}` : "none",
}));

export const StepLabel = styled("span", {
  shouldForwardProp: (p) => p !== "active" && p !== "completed",
})<{ active?: boolean; completed?: boolean }>(({ active, completed }) => ({
  fontSize: "0.75rem",
  fontWeight: active ? 700 : 600,
  color: active ? PH_BLUE : completed ? PH_GREEN : "#98A2B3",
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

export const FormBody = styled("div")(() => ({
  padding: "24px 28px 28px",
}));

export const StepMeta = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  flexWrap: "wrap",
  marginBottom: 10,
}));

export const StepMetaTitle = styled("div")(() => ({
  fontSize: "1rem",
  fontWeight: 700,
  color: "#101828",
}));

export const StepMetaHint = styled("div")(() => ({
  marginTop: 2,
  fontSize: "0.8rem",
  fontWeight: 500,
  color: "#667085",
}));

export const StepMetaBadge = styled("div")(() => ({
  borderRadius: 999,
  border: "1px solid #D0D5DD",
  backgroundColor: "#FCFCFD",
  color: "#344054",
  fontSize: "0.73rem",
  fontWeight: 700,
  letterSpacing: "0.04em",
  textTransform: "uppercase" as const,
  padding: "7px 12px",
}));

export const StepContentCard = styled("div")(() => ({
  border: "1px solid #EAECF0",
  borderRadius: 14,
  padding: "18px 18px 4px",
  backgroundColor: "#FFFFFF",
}));

export const FieldRow = styled("div")(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 18,
  marginBottom: 18,
}));

export const FieldLabel = styled("label")(() => ({
  display: "block",
  fontSize: "0.76rem",
  fontWeight: 700,
  color: "#344054",
  marginBottom: 6,
  textTransform: "uppercase" as const,
  letterSpacing: "0.04em",
}));

export const FieldInput = styled("input")(() => ({
  width: "100%",
  padding: "11px 13px",
  borderRadius: 10,
  border: "1px solid #D0D5DD",
  fontSize: "0.87rem",
  fontFamily: "inherit",
  color: "#1D2939",
  backgroundColor: "#FFFFFF",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box" as const,
  "&:focus": {
    borderColor: PH_GREEN,
    boxShadow: `0 0 0 3px ${alpha(PH_GREEN, 0.13)}`,
  },
  "&::placeholder": {
    color: "#98A2B3",
  },
}));

export const FieldSelect = styled("select")(() => ({
  width: "100%",
  padding: "11px 13px",
  borderRadius: 10,
  border: "1px solid #D0D5DD",
  fontSize: "0.87rem",
  fontFamily: "inherit",
  color: "#1D2939",
  backgroundColor: "#FFFFFF",
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

export const FileUploadArea = styled("div")(() => ({
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

export const ButtonRow = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 24,
  paddingTop: 18,
  borderTop: "1px solid #EAECF0",
  gap: 12,
}));

export const PrimaryButton = styled("button")(() => ({
  padding: "11px 28px",
  borderRadius: 10,
  border: "none",
  fontSize: "0.86rem",
  fontWeight: 700,
  fontFamily: "inherit",
  cursor: "pointer",
  transition: "all 0.2s ease",
  background: `linear-gradient(135deg, ${PH_GREEN} 0%, ${PH_GREEN_LIGHT} 100%)`,
  color: "#FFFFFF",
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

export const SecondaryButton = styled("button")(() => ({
  padding: "11px 22px",
  borderRadius: 10,
  border: "1px solid #D0D5DD",
  fontSize: "0.84rem",
  fontWeight: 700,
  fontFamily: "inherit",
  cursor: "pointer",
  transition: "all 0.2s ease",
  backgroundColor: "#FFFFFF",
  color: "#344054",
  "&:hover": {
    backgroundColor: "#F9FAFB",
    borderColor: "#98A2B3",
  },
}));

export const ReviewSection = styled("div")(() => ({
  marginBottom: 16,
  padding: "14px 14px 10px",
  border: "1px solid #EAECF0",
  borderRadius: 12,
  backgroundColor: "#FCFCFD",
}));

export const ReviewTitle = styled("h4")(() => ({
  fontSize: "0.9rem",
  fontWeight: 700,
  color: "#101828",
  margin: "0 0 12px 0",
  paddingBottom: 8,
  borderBottom: `1px solid ${alpha(PH_GREEN, 0.2)}`,
}));

export const ReviewGrid = styled("div")(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
  gap: "10px 18px",
}));

export const ReviewItem = styled("div")(() => ({
  padding: "4px 0",
}));

export const ReviewLabel = styled("span")(() => ({
  display: "block",
  fontSize: "0.7rem",
  fontWeight: 700,
  color: "#98A2B3",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
}));

export const ReviewValue = styled("span")(() => ({
  display: "block",
  fontSize: "0.86rem",
  fontWeight: 600,
  color: "#1D2939",
  marginTop: 2,
}));
