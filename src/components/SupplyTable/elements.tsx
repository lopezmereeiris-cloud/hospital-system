"use client";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { palette } from "@/theme/palette";

export const SupplyContainer = styled(Paper)({
  borderRadius: "12px",
  border: `1px solid ${palette.grey[200]}`,
  boxShadow: "none",
  overflow: "hidden",
});

export const StyledHeaderCell = styled(TableCell)({
  backgroundColor: palette.grey[50],
  fontSize: 12,
  fontWeight: 700,
  color: palette.grey[500],
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  borderBottom: `1px solid ${palette.grey[200]}`,
  padding: "10px 16px",
  whiteSpace: "nowrap",
});

export const StyledBodyCell = styled(TableCell)({
  fontSize: 14,
  color: palette.grey[700],
  borderBottom: `1px solid ${palette.grey[100]}`,
  padding: "12px 16px",
  verticalAlign: "middle",
});

export const StyledRow = styled(TableRow)({
  "&:hover": {
    backgroundColor: palette.grey[50],
  },
  "&:last-child td": {
    borderBottom: "none",
  },
});
