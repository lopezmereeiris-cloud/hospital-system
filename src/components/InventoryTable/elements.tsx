"use client";

import { styled, alpha } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export const InventoryContainer = styled(Paper)(() => ({
  borderRadius: 12,
  overflow: "hidden",
  border: "1px solid #EAECF0",
  boxShadow: "0 1px 3px rgba(16,24,40,0.06), 0 1px 2px rgba(16,24,40,0.04)",
}));

export const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "0.72rem",
  color: "#667085",
  backgroundColor: "#F9FAFB",
  borderBottom: "1px solid #EAECF0",
  padding: theme.spacing(1.4, 1.5),
  whiteSpace: "nowrap",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
}));

export const StyledBodyCell = styled(TableCell)(({ theme }) => ({
  fontSize: "0.82rem",
  padding: theme.spacing(1.4, 1.5),
  color: "#344054",
  borderBottom: "1px solid #F2F4F7",
}));

export const StyledRow = styled(TableRow)(() => ({
  transition: "background-color 0.15s ease",
  "&:hover": {
    backgroundColor: alpha("#4361EE", 0.02),
  },
  "&:last-child td": {
    borderBottom: 0,
  },
}));

export const InventoryToolbar = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2, 2.5),
  flexWrap: "wrap",
  gap: theme.spacing(1.5),
  borderBottom: "1px solid #EAECF0",
}));

export const FilterChips = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(0.8),
  flexWrap: "wrap",
}));
