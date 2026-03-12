"use client";

import { styled, alpha } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

export const TimelineContainer = styled(Paper)(() => ({
  borderRadius: 16,
  border: "1px solid #F0F2F5",
  overflow: "hidden",
}));

export const TimelineToolbar = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2.5, 3),
  flexWrap: "wrap",
  gap: theme.spacing(1.5),
}));

export const TimelineScrollArea = styled("div")({
  overflowX: "auto",
  overflowY: "auto",
  maxHeight: 520,
  position: "relative",
});

export const TimelineGrid = styled("div")({
  display: "grid",
  minWidth: "fit-content",
});

export const TimelineHeaderRow = styled("div")({
  display: "flex",
  position: "sticky",
  top: 0,
  zIndex: 2,
  backgroundColor: "#FCFCFD",
  borderBottom: "1px solid #F0F2F5",
});

export const TimelineHeaderCell = styled("div", {
  shouldForwardProp: (prop) => prop !== "isToday",
})<{ isToday?: boolean }>(({ isToday }) => ({
  width: 80,
  minWidth: 80,
  padding: "10px 4px",
  textAlign: "center",
  fontSize: "0.68rem",
  fontWeight: 600,
  color: isToday ? "#4361EE" : "#6F767E",
  backgroundColor: isToday ? alpha("#4361EE", 0.04) : "transparent",
  borderRight: "1px solid #F0F2F5",
  flexShrink: 0,
}));

export const TimelineRoomLabel = styled("div")({
  width: 180,
  minWidth: 180,
  padding: "10px 16px",
  position: "sticky",
  left: 0,
  zIndex: 1,
  backgroundColor: "#FFFFFF",
  borderRight: "2px solid #F0F2F5",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  flexShrink: 0,
});

export const TimelineRoomName = styled("div")(({ theme }) => ({
  fontSize: "0.78rem",
  fontWeight: 600,
  color: theme.palette.text.primary,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));

export const TimelineRoomNumber = styled("div")(({ theme }) => ({
  fontSize: "0.65rem",
  color: theme.palette.text.secondary,
  fontWeight: 500,
}));

export const TimelineRow = styled("div")(() => ({
  display: "flex",
  borderBottom: "1px solid #F8F9FA",
  minHeight: 48,
  "&:hover": {
    backgroundColor: alpha("#4361EE", 0.01),
  },
}));

export const TimelineCell = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "statusColor" &&
    prop !== "isToday" &&
    prop !== "hasEvent" &&
    prop !== "eventType",
})<{ statusColor?: string; isToday?: boolean; hasEvent?: boolean; eventType?: string }>(
  ({ statusColor, isToday, hasEvent, eventType }) => ({
    width: 80,
    minWidth: 80,
    height: 48,
    borderRight: "1px solid #F8F9FA",
    backgroundColor: hasEvent
      ? eventType === "occupied"
        ? alpha(statusColor || "#F04438", 0.24)
        : alpha(statusColor || "#667085", 0.18)
      : isToday
        ? alpha("#4361EE", 0.03)
        : "transparent",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.15s ease",
    flexShrink: 0,
    position: "relative",
    boxShadow: isToday ? `inset 0 0 0 1px ${alpha("#4361EE", 0.26)}` : "none",
    "&:hover": {
      backgroundColor: hasEvent
        ? eventType === "occupied"
          ? alpha(statusColor || "#F04438", 0.32)
          : alpha(statusColor || "#667085", 0.24)
        : alpha("#12B76A", 0.08),
    },
  })
);

export const CellLabel = styled("div", {
  shouldForwardProp: (prop) => prop !== "variant",
})<{ variant?: string }>(({ variant }) => {
  const variantStyles: Record<string, { color: string; backgroundColor: string; borderColor: string }> = {
    occupied: {
      color: "#FFFFFF",
      backgroundColor: "#D92D20",
      borderColor: "#B42318",
    },
    maintenance: {
      color: "#7A2E0B",
      backgroundColor: "#FDEAD7",
      borderColor: "#F79009",
    },
    cleaning: {
      color: "#0C4A6E",
      backgroundColor: "#DFF4FF",
      borderColor: "#36BFFA",
    },
    default: {
      color: "#475467",
      backgroundColor: "#FFFFFF",
      borderColor: "#D0D5DD",
    },
  };

  const activeStyle = variantStyles[variant || "default"] || variantStyles.default;

  return {
  fontSize: "0.58rem",
  fontWeight: 700,
  color: activeStyle.color,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  borderRadius: 6,
  padding: "2px 8px",
  border: `1px solid ${activeStyle.borderColor}`,
  backgroundColor: activeStyle.backgroundColor,
  lineHeight: 1.2,
};
});

export const TimelineHeaderLabel = styled("div")({
  width: 180,
  minWidth: 180,
  padding: "10px 16px",
  position: "sticky",
  left: 0,
  zIndex: 3,
  backgroundColor: "#FCFCFD",
  borderRight: "2px solid #F0F2F5",
  display: "flex",
  alignItems: "center",
  fontSize: "0.7rem",
  fontWeight: 700,
  color: "#6F767E",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  flexShrink: 0,
});
