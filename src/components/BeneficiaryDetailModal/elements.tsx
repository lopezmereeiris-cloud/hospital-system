"use client";

import { styled, alpha } from "@mui/material/styles";

const PH_GREEN = "#0D8A3F";

export const ModalHeader = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: 24,
}));

export const HeaderInfo = styled("div")(() => ({
  display: "flex",
  flexDirection: "column" as const,
  gap: 6,
}));

export const BeneficiaryName = styled("h3")(() => ({
  fontSize: "1.25rem",
  fontWeight: 700,
  color: "#1A1D1F",
  margin: 0,
}));

export const DetailGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const DetailItem = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 3,
  padding: theme.spacing(1.5, 2),
  borderRadius: 12,
  backgroundColor: "#F0FFF4",
  border: "1px solid #D1FAE5",
}));

export const DetailLabel = styled("span")(() => ({
  fontSize: "0.68rem",
  fontWeight: 700,
  color: "#6F767E",
  textTransform: "uppercase" as const,
  letterSpacing: "0.06em",
}));

export const DetailValue = styled("span")(() => ({
  fontSize: "0.88rem",
  color: "#1A1D1F",
  fontWeight: 500,
}));

export const SectionDivider = styled("div")(({ theme }) => ({
  borderTop: "1px solid #E5E7EB",
  margin: theme.spacing(2.5, 0),
}));

export const SectionTitle = styled("div")(() => ({
  fontSize: "0.82rem",
  fontWeight: 700,
  color: PH_GREEN,
  marginBottom: 12,
  display: "flex",
  alignItems: "center",
  gap: 8,
}));

export const BalanceBar = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  gap: 16,
  padding: "16px 20px",
  borderRadius: 14,
  background: `linear-gradient(135deg, ${alpha(PH_GREEN, 0.06)} 0%, ${alpha("#14A44D", 0.03)} 100%)`,
  border: `1px solid ${alpha(PH_GREEN, 0.12)}`,
  marginBottom: 20,
}));

export const BalanceAmount = styled("div")(() => ({
  fontSize: "1.5rem",
  fontWeight: 700,
  color: PH_GREEN,
  lineHeight: 1.1,
}));

export const BalanceLabel = styled("div")(() => ({
  fontSize: "0.72rem",
  fontWeight: 600,
  color: "#6F767E",
  textTransform: "uppercase" as const,
  letterSpacing: "0.04em",
}));

export const TransactionRow = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 0",
  borderBottom: "1px solid #F2F4F7",
  "&:last-child": {
    borderBottom: "none",
  },
}));

export const TransactionDate = styled("span")(() => ({
  fontSize: "0.75rem",
  fontWeight: 600,
  color: "#6F767E",
  minWidth: 90,
}));

export const TransactionDesc = styled("span")(() => ({
  fontSize: "0.82rem",
  fontWeight: 500,
  color: "#1A1D1F",
  flex: 1,
  paddingLeft: 12,
}));

export const TransactionAmount = styled("span")(() => ({
  fontSize: "0.82rem",
  fontWeight: 700,
  color: "#F04438",
  whiteSpace: "nowrap" as const,
}));

export const EmptyTransactions = styled("div")(() => ({
  textAlign: "center" as const,
  padding: "24px 16px",
  color: "#9CA3AF",
  fontSize: "0.85rem",
}));
