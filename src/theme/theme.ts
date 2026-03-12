"use client";

import { createTheme, alpha } from "@mui/material/styles";
import { palette } from "./palette";
import { typography } from "./typography";
import { breakpoints } from "./breakpoints";

const theme = createTheme({
  palette,
  typography,
  breakpoints,
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: "thin",
          scrollbarColor: "#C4CDD5 transparent",
          "&::-webkit-scrollbar": { width: 6, height: 6 },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: 3,
            backgroundColor: "#C4CDD5",
          },
          "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow:
            "0 1px 3px 0 rgba(0,0,0,0.04), 0 1px 2px -1px rgba(0,0,0,0.03)",
          borderRadius: 16,
          border: "1px solid #F0F2F5",
          backgroundImage: "none",
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: "none" as const,
          fontWeight: 600,
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #4A8CA8 0%, #1B5E7B 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #1B5E7B 0%, #0D3B50 100%)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 8,
          fontSize: "0.75rem",
        },
        colorWarning: {
          backgroundColor: alpha("#FFA726", 0.12),
          color: "#B76E00",
          border: "none",
        },
        colorError: {
          backgroundColor: alpha("#EF5350", 0.1),
          color: "#B71D18",
          border: "none",
        },
        colorSuccess: {
          backgroundColor: alpha("#66BB6A", 0.12),
          color: "#1B806A",
          border: "none",
        },
        colorInfo: {
          backgroundColor: alpha("#42A5F5", 0.12),
          color: "#006C9C",
          border: "none",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderBottom: "1px solid #F0F2F5" },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          boxShadow: "0 24px 48px -12px rgba(0,0,0,0.18)",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: { borderRadius: 8, fontSize: "0.75rem", fontWeight: 500 },
      },
    },
  },
});

export default theme;
