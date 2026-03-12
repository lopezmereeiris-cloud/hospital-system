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

export const TabsCard = styled(Paper)(() => ({
  borderRadius: 14,
  border: "1px solid #EAECF0",
  padding: 10,
  boxShadow: "none",
}));

export const FilterCard = styled(Paper)(({ theme }) => ({
  borderRadius: 14,
  border: "1px solid #EAECF0",
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

export const PanelCard = styled(Paper)(() => ({
  borderRadius: 16,
  border: "1px solid #F0F2F5",
  boxShadow: "none",
  overflow: "hidden",
}));

export const PanelHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(1.5),
  padding: theme.spacing(2.2, 2.6),
  borderBottom: "1px solid #F0F2F5",
  backgroundColor: "#FCFCFD",
}));

export const PanelTitleWrap = styled("div")({
  minWidth: 0,
});

export const PanelTitle = styled("h3")({
  margin: 0,
  fontSize: "1rem",
  fontWeight: 700,
  color: "#1A1D1F",
  lineHeight: 1.3,
});

export const PanelSubtitle = styled("p")({
  margin: "4px 0 0",
  fontSize: "0.8rem",
  color: "#667085",
  fontWeight: 500,
  lineHeight: 1.4,
});

export const TableWrap = styled("div")({
  overflowX: "auto",
});

export const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "0.7rem",
  color: theme.palette.text.secondary,
  backgroundColor: "#FCFCFD",
  borderBottom: "1px solid #F0F2F5",
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

export const StyledRow = styled(TableRow)(() => ({
  transition: "background-color 0.18s ease",
  "&:hover": {
    backgroundColor: alpha("#4361EE", 0.03),
  },
  "&:last-child td": {
    borderBottom: 0,
  },
}));

export const BillIdButton = styled("button")(() => ({
  border: "none",
  padding: 0,
  margin: 0,
  background: "transparent",
  color: "#344054",
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

export const SubtleText = styled("div")({
  color: "#667085",
  fontWeight: 500,
  fontSize: "0.74rem",
  marginTop: 3,
});

export const StatusBadge = styled("span", {
  shouldForwardProp: (prop) => prop !== "status",
})<{ status: "Pending" | "Partial" | "Paid" }>(({ status }) => ({
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
      ? `1px solid ${alpha("#12B76A", 0.3)}`
      : status === "Partial"
        ? `1px solid ${alpha("#F79009", 0.3)}`
        : `1px solid ${alpha("#F04438", 0.3)}`,
  color: status === "Paid" ? "#027A48" : status === "Partial" ? "#B54708" : "#B42318",
  backgroundColor:
    status === "Paid" ? alpha("#12B76A", 0.1) : status === "Partial" ? alpha("#F79009", 0.1) : alpha("#F04438", 0.1),
}));

export const CoverageBadge = styled("span", {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>(({ active }) => ({
  display: "inline-flex",
  alignItems: "center",
  padding: "2px 8px",
  borderRadius: 999,
  border: `1px solid ${active ? alpha("#1570EF", 0.3) : "#D0D5DD"}`,
  backgroundColor: active ? alpha("#1570EF", 0.08) : "#FFFFFF",
  color: active ? "#175CD3" : "#667085",
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

export const PatientName = styled("div")({
  fontSize: "1.1rem",
  fontWeight: 700,
  color: "#1A1D1F",
  lineHeight: 1.25,
});

export const PatientMeta = styled("div")({
  marginTop: 4,
  fontSize: "0.78rem",
  fontWeight: 500,
  color: "#667085",
  lineHeight: 1.45,
});

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

export const MetaCard = styled("div")({
  border: "1px solid #EAECF0",
  borderRadius: 10,
  backgroundColor: "#FFFFFF",
  padding: "9px 10px",
});

export const MetaLabel = styled("div")({
  fontSize: "0.68rem",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  fontWeight: 700,
  color: "#98A2B3",
  lineHeight: 1.25,
});

export const MetaValue = styled("div")({
  marginTop: 5,
  fontSize: "0.84rem",
  fontWeight: 600,
  color: "#1F2937",
  lineHeight: 1.35,
});

export const BreakdownCard = styled("div")({
  border: "1px solid #E4E7EC",
  borderRadius: 12,
  overflow: "hidden",
  backgroundColor: "#FFFFFF",
});

export const BreakdownHeader = styled("div")({
  padding: "10px 12px",
  borderBottom: "1px solid #EAECF0",
  backgroundColor: "#FCFCFD",
  fontSize: "0.76rem",
  fontWeight: 700,
  color: "#344054",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
});

export const BreakdownRow = styled("div", {
  shouldForwardProp: (prop) => !["total", "danger", "positive"].includes(String(prop)),
})<{ total?: boolean; danger?: boolean; positive?: boolean }>(({ total, danger, positive }) => ({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  gap: 12,
  padding: "8px 12px",
  borderTop: "1px solid #F2F4F7",
  fontSize: total ? "0.95rem" : "0.8rem",
  fontWeight: total ? 700 : 500,
  color: danger ? "#B42318" : positive ? "#027A48" : "#344054",
  backgroundColor: total ? "#F9FAFB" : "#FFFFFF",
}));

export const NotesCard = styled("div")({
  border: "1px solid #EAECF0",
  borderRadius: 10,
  backgroundColor: "#FCFCFD",
  padding: "10px 12px",
});

export const NotesLabel = styled("div")({
  fontSize: "0.7rem",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  fontWeight: 700,
  color: "#98A2B3",
});

export const NotesValue = styled("p")({
  margin: "6px 0 0",
  fontSize: "0.8rem",
  color: "#475467",
  lineHeight: 1.5,
  fontWeight: 500,
});

export const ActionRow = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.2),
  flexWrap: "wrap",
}));

export const PrimaryActionButton = styled(Button)(() => ({
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

export const SecondaryActionButton = styled(Button)(() => ({
  borderRadius: 10,
  fontWeight: 700,
  fontSize: "0.8rem",
  textTransform: "none",
  boxShadow: "none !important",
  padding: "8px 16px",
  borderColor: "#D0D5DD !important",
  color: "#344054 !important",
  "&:hover": {
    borderColor: "#98A2B3 !important",
    backgroundColor: "#F9FAFB",
    boxShadow: "none !important",
  },
}));

export const EmptyState = styled("div")(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2.8),
  borderRadius: 12,
  border: "1px dashed #D0D5DD",
  backgroundColor: "#FCFCFD",
  textAlign: "center",
  color: "#667085",
  fontSize: "0.82rem",
  fontWeight: 500,
}));
