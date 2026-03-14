"use client";

import { styled, alpha } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

export const RegisterPatientButton = styled(Button)(({ theme }) => ({
  backgroundColor: `${theme.palette.primary.main} !important`,
  color: "#FFFFFF !important",
  textTransform: "none",
  borderRadius: 10,
  fontWeight: 600,
  padding: "8px 20px",
  boxShadow: "none !important",
  "&:hover": {
    backgroundColor: "#3A56D4 !important",
    boxShadow: "none !important",
  },
}));

export const PatientContainer = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  overflow: "hidden",
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: "none",
}));

export const PatientHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2.5, 3),
  borderBottom: "1px solid #ECECEC",
  gap: theme.spacing(2),
}));

export const PatientHeaderTitle = styled("div")(({ theme }) => ({
  fontSize: "1.05rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
  lineHeight: 1.2,
}));

export const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "0.7rem",
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.grey[50],
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1.4, 1.5),
  whiteSpace: "nowrap",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
}));

export const StyledBodyCell = styled(TableCell)(({ theme }) => ({
  fontSize: "0.8rem",
  padding: theme.spacing(1.3, 1.5),
  color: theme.palette.text.primary,
  borderBottom: "1px solid #F8F9FA",
}));

export const StyledRow = styled(TableRow)(({ theme }) => ({
  transition: "background-color 0.18s ease",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.02),
  },
  "&:last-child td": {
    borderBottom: 0,
  },
}));

/* MODAL */

export const ModalHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: 28,
  padding: "20px 22px",
  borderRadius: 16,
  background: "linear-gradient(135deg, rgba(13, 138, 63, 0.08) 0%, rgba(13, 138, 63, 0.03) 100%)",
  border: "1px solid rgba(13, 138, 63, 0.12)",
}));

export const HeaderInfo = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 8,
}));

export const ModalTitle = styled("h3")(({ theme }) => ({
  fontSize: "1.4rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
  margin: 0,
  lineHeight: 1.2,
}));

export const ModalSubtitle = styled("span")(({ theme }) => ({
  fontSize: "0.9rem",
  color: "#5F6B76",
  fontWeight: 500,
  lineHeight: 1.5,
  maxWidth: "520px",
}));

export const SectionDivider = styled("div")(({ theme }) => ({
  height: 1,
  background: "#ECECEC",
  margin: theme.spacing(3, 0, 2.5),
}));

export const SectionTitle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  fontSize: "0.95rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
}));

export const FormGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const FormActions = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: theme.spacing(1.5),
  marginTop: theme.spacing(4),
}));