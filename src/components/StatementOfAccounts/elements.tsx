"use client";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { alpha, styled } from "@mui/material/styles";

export const SoaContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const TabsCard = styled(Paper)(({ theme }) => ({
  borderRadius: 14,
  border: `1px solid ${theme.palette.grey[200]}`,
  padding: 10,
  boxShadow: "none",
}));

export const FilterCard = styled(Paper)(({ theme }) => ({
  borderRadius: 14,
  border: `1px solid ${theme.palette.grey[200]}`,
  padding: theme.spacing(1.6),
  boxShadow: "none",
}));

export const MainGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.5fr) minmax(360px, 1fr)",
  gap: theme.spacing(2),
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const PanelCard = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: "none",
  overflow: "hidden",
}));

export const PanelHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(1.5),
  padding: theme.spacing(2.2, 2.6),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.grey[50],
}));

export const PanelTitleWrap = styled("div")({
  minWidth: 0,
});

export const PanelTitle = styled("h3")(({ theme }) => ({
  margin: 0,
  fontSize: "1rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
  lineHeight: 1.3,
}));

export const PanelSubtitle = styled("p")(({ theme }) => ({
  margin: "4px 0 0",
  fontSize: "0.8rem",
  color: theme.palette.grey[500],
  fontWeight: 500,
  lineHeight: 1.4,
}));

export const TableWrap = styled("div")({
  overflowX: "auto",
});

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
  verticalAlign: "top",
}));

export const StyledRow = styled(TableRow)(({ theme }) => ({
  transition: "background-color 0.18s ease",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.03),
  },
  "&:last-child td": {
    borderBottom: 0,
  },
}));

export const BillIdButton = styled("button")(({ theme }) => ({
  border: "none",
  padding: 0,
  margin: 0,
  background: "transparent",
  color: theme.palette.grey[700],
  fontSize: "0.8rem",
  fontWeight: 700,
  cursor: "pointer",
  textAlign: "left",
  "&:hover": {
    color: "#1D4ED8",
  },
}));

export const ValueStrong = styled("span")({
  fontWeight: 700,
  color: "#111827",
  fontSize: "0.8rem",
});

export const SubtleText = styled("div")(({ theme }) => ({
  color: theme.palette.grey[500],
  fontWeight: 500,
  fontSize: "0.74rem",
  marginTop: 3,
}));

export const StatusBadge = styled("span", {
  shouldForwardProp: (prop) => prop !== "status",
})<{ status: "Pending" | "Partial" | "Paid" }>(({ status, theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "3px 10px",
  borderRadius: 999,
  fontSize: "0.68rem",
  fontWeight: 700,
  lineHeight: 1.25,
  border:
    status === "Paid"
      ? `1px solid ${alpha(theme.palette.success.main, 0.3)}`
      : status === "Partial"
        ? `1px solid ${alpha(theme.palette.warning.main, 0.3)}`
        : `1px solid ${alpha(theme.palette.error.main, 0.3)}`,
  color: status === "Paid" ? theme.palette.success.dark : status === "Partial" ? theme.palette.warning.dark : theme.palette.error.dark,
  backgroundColor:
    status === "Paid" ? alpha(theme.palette.success.main, 0.1) : status === "Partial" ? alpha(theme.palette.warning.main, 0.1) : alpha(theme.palette.error.main, 0.1),
}));

export const CoverageBadge = styled("span", {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>(({ active, theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  padding: "2px 8px",
  borderRadius: 999,
  border: `1px solid ${active ? alpha("#1570EF", 0.3) : theme.palette.grey[300]}`,
  backgroundColor: active ? alpha("#1570EF", 0.08) : theme.palette.background.paper,
  color: active ? "#175CD3" : theme.palette.grey[500],
  fontSize: "0.66rem",
  fontWeight: 600,
  lineHeight: 1.3,
}));

export const DetailBody = styled("div")(({ theme }) => ({
  padding: theme.spacing(2.1, 2.6, 2.6),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.8),
}));

export const DetailHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  gap: theme.spacing(1.5),
  alignItems: "flex-start",
  flexWrap: "wrap",
}));

export const PatientName = styled("div")(({ theme }) => ({
  fontSize: "1.1rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
  lineHeight: 1.25,
}));

export const PatientMeta = styled("div")(({ theme }) => ({
  marginTop: 4,
  fontSize: "0.78rem",
  fontWeight: 500,
  color: theme.palette.grey[500],
  lineHeight: 1.45,
}));

export const BadgeRow = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 6,
  flexWrap: "wrap",
  marginTop: 10,
});

export const MetaGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: theme.spacing(1.2),
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
}));

export const MetaCard = styled("div")(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: 10,
  backgroundColor: theme.palette.background.paper,
  padding: "9px 10px",
}));

export const MetaLabel = styled("div")(({ theme }) => ({
  fontSize: "0.68rem",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  fontWeight: 700,
  color: theme.palette.grey[400],
  lineHeight: 1.25,
}));

export const MetaValue = styled("div")({
  marginTop: 5,
  fontSize: "0.84rem",
  fontWeight: 600,
  color: "#1F2937",
  lineHeight: 1.35,
});

export const BreakdownCard = styled("div")(({ theme }) => ({
  border: "1px solid #E4E7EC",
  borderRadius: 12,
  overflow: "hidden",
  backgroundColor: theme.palette.background.paper,
}));

export const BreakdownHeader = styled("div")(({ theme }) => ({
  padding: "10px 12px",
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  backgroundColor: theme.palette.grey[50],
  fontSize: "0.76rem",
  fontWeight: 700,
  color: theme.palette.grey[700],
  letterSpacing: "0.06em",
  textTransform: "uppercase",
}));

export const BreakdownRow = styled("div", {
  shouldForwardProp: (prop) => !["total", "danger", "positive"].includes(String(prop)),
})<{ total?: boolean; danger?: boolean; positive?: boolean }>(({ total, danger, positive, theme }) => ({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  gap: 12,
  padding: "8px 12px",
  borderTop: `1px solid ${theme.palette.grey[100]}`,
  fontSize: total ? "0.95rem" : "0.8rem",
  fontWeight: total ? 700 : 500,
  color: danger ? theme.palette.error.dark : positive ? theme.palette.success.dark : theme.palette.grey[700],
  backgroundColor: total ? theme.palette.background.default : theme.palette.background.paper,
}));

export const NotesCard = styled("div")(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: 10,
  backgroundColor: theme.palette.grey[50],
  padding: "10px 12px",
}));

export const NotesLabel = styled("div")(({ theme }) => ({
  fontSize: "0.7rem",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  fontWeight: 700,
  color: theme.palette.grey[400],
}));

export const NotesValue = styled("p")(({ theme }) => ({
  margin: "6px 0 0",
  fontSize: "0.8rem",
  color: theme.palette.grey[600],
  lineHeight: 1.5,
  fontWeight: 500,
}));

export const ActionRow = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.2),
  flexWrap: "wrap",
}));

export const PrimaryActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 10,
  fontWeight: 700,
  fontSize: "0.8rem",
  textTransform: "none",
  boxShadow: "none !important",
  padding: "8px 16px",
  background: "linear-gradient(135deg, #4D95B4 0%, #226E8E 100%) !important",
  color: "#FFFFFF !important",
  "&:hover": {
    background: "linear-gradient(135deg, #4588A6 0%, #1F6785 100%) !important",
    boxShadow: "none !important",
  },
}));

export const SecondaryActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 10,
  fontWeight: 700,
  fontSize: "0.8rem",
  textTransform: "none",
  boxShadow: "none !important",
  padding: "8px 16px",
  borderColor: `${theme.palette.grey[300]} !important`,
  color: `${theme.palette.grey[700]} !important`,
  "&:hover": {
    borderColor: `${theme.palette.grey[400]} !important`,
    backgroundColor: theme.palette.background.default,
    boxShadow: "none !important",
  },
}));

export const EmptyState = styled("div")(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2.8),
  borderRadius: 12,
  border: `1px dashed ${theme.palette.grey[300]}`,
  backgroundColor: theme.palette.grey[50],
  textAlign: "center",
  color: theme.palette.grey[500],
  fontSize: "0.82rem",
  fontWeight: 500,
}));
