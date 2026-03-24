"use client";

import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

export const HistoryPanel = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.4),
  borderRadius: 18,
  border: `1px solid ${theme.palette.grey[200]}`,
  boxShadow: "none",
}));

export const HistoryEmptyPanel = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.4),
  borderRadius: 18,
  border: `1px solid ${theme.palette.grey[200]}`,
  boxShadow: "none",
}));
