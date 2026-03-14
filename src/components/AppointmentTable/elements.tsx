"use client";

import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

export const TableContainer = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  overflow: "hidden",
  border: `1px solid ${theme.palette.divider}`,
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  cursor: "pointer",
  transition: "background-color 0.18s ease",
  "&:hover": {
    backgroundColor: "rgba(67, 97, 238, 0.03)",
  },
  "&:last-child td": {
    borderBottom: 0,
  },
}));

export const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "0.72rem",
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.grey[50],
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1.6, 2.5),
  textTransform: "uppercase",
  letterSpacing: "0.06em",
}));

export const StyledBodyCell = styled(TableCell)(({ theme }) => ({
  fontSize: "0.85rem",
  padding: theme.spacing(1.6, 2.5),
  color: theme.palette.text.primary,
  borderBottom: "1px solid #F8F9FA",
}));
