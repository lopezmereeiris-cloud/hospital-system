"use client";

import { styled, alpha } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export const RoomContainer = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  overflow: "hidden",
  border: `1px solid ${theme.palette.divider}`,
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

export const RoomToolbar = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2.5, 3),
  flexWrap: "wrap",
  gap: theme.spacing(1.5),
}));

export const FilterChips = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(0.8),
  flexWrap: "wrap",
}));
