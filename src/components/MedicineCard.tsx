"use client";

import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { alpha } from "@mui/material/styles";
import { Medicine } from "@/components/InventoryTable/interface";

interface MedicineCardProps {
  medicine: Medicine;
}

type AlertInfo = {
  label: string;
  color: "error" | "warning" | "info" | "success";
  bg: string;
  fg: string;
};

function getAlert(med: Medicine): AlertInfo {
  if (med.expiredFlag)
    return { label: "Expired", color: "error", bg: "#FEF3F2", fg: "#F04438" };
  if (med.nearExpiryFlag)
    return { label: "Near Expiry", color: "warning", bg: "#FFFAEB", fg: "#F79009" };
  if (med.lowStockAlert)
    return { label: "Low Stock", color: "warning", bg: "#FFFAEB", fg: "#F79009" };
  if (med.overstockFlag)
    return { label: "Overstock", color: "info", bg: "#EFF8FF", fg: "#36BFFA" };
  return { label: "Normal", color: "success", bg: "#ECFDF3", fg: "#12B76A" };
}

function getBarColor(alert: AlertInfo) {
  if (alert.label === "Expired" || alert.label === "Low Stock") return alert.fg;
  if (alert.label === "Near Expiry") return "#F79009";
  if (alert.label === "Overstock") return "#36BFFA";
  return "#12B76A";
}

const MedicineCard: React.FC<MedicineCardProps> = ({ medicine }) => {
  const stockPct = Math.min(
    Math.round(
      (medicine.quantityOnHand / medicine.maximumStockLevel) * 100
    ),
    100
  );
  const alert = getAlert(medicine);
  const barColor = getBarColor(alert);

  return (
    <Card
      sx={{
        borderRadius: "12px",
        border: "1px solid #EAECF0",
        boxShadow:
          "0 1px 3px rgba(16,24,40,0.06), 0 1px 2px rgba(16,24,40,0.04)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#FFFFFF",
        transition: "all 0.2s ease",
        overflow: "hidden",
        "&:hover": {
          boxShadow:
            "0 4px 12px rgba(16,24,40,0.08), 0 2px 4px rgba(16,24,40,0.04)",
          borderColor: "#D0D5DD",
        },
      }}
    >
      {/* Header: ID + Alert Badge */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2.5,
          pt: 2,
          pb: 0.5,
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 600,
            color: "#667085",
            letterSpacing: "0.04em",
          }}
        >
          {medicine.id}
        </Typography>
        <Chip
          label={alert.label}
          size="small"
          sx={{
            fontWeight: 600,
            fontSize: 11,
            height: 22,
            bgcolor: alert.bg,
            color: alert.fg,
            border: "none",
            "& .MuiChip-label": { px: 1 },
          }}
        />
      </Box>

      {/* Name + Tags */}
      <Box sx={{ px: 2.5, pt: 0.5, pb: 1 }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 16,
            color: "#101828",
            lineHeight: 1.4,
            mb: 0.5,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {medicine.genericName}
        </Typography>
        <Typography
          sx={{
            fontSize: 13,
            color: "#667085",
            fontWeight: 500,
            mb: 1,
            lineHeight: 1.3,
          }}
        >
          {medicine.brandNames.join(" · ")} — {medicine.dosageForm}{" "}
          {medicine.strength}
        </Typography>
        <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
          <Chip
            label={medicine.therapeuticCategory}
            size="small"
            sx={{
              height: 22,
              fontSize: 11,
              fontWeight: 600,
              bgcolor: alpha("#4361EE", 0.08),
              color: "#4361EE",
              "& .MuiChip-label": { px: 1 },
            }}
          />
          <Chip
            label={medicine.drugCategory}
            size="small"
            variant="outlined"
            sx={{
              height: 22,
              fontSize: 11,
              fontWeight: 600,
              borderColor: "#EAECF0",
              color: "#344054",
              "& .MuiChip-label": { px: 1 },
            }}
          />
        </Box>
      </Box>

      {/* Divider */}
      <Box sx={{ mx: 2.5, borderBottom: "1px solid #F2F4F7" }} />

      {/* Details Grid */}
      <Box sx={{ px: 2.5, pt: 1.5, pb: 1, flex: 1 }}>
        {/* Stock Row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 0.5,
          }}
        >
          <Typography sx={{ fontSize: 12, fontWeight: 500, color: "#667085" }}>
            Stock
          </Typography>
          <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#344054" }}>
            {medicine.quantityOnHand}
            <span style={{ fontWeight: 400, color: "#98A2B3" }}>
              {" "}
              / {medicine.maximumStockLevel}
            </span>
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={stockPct}
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: "#F2F4F7",
            mb: 1.5,
            "& .MuiLinearProgress-bar": {
              borderRadius: 3,
              bgcolor: barColor,
            },
          }}
        />

        {/* Info Rows */}
        <DetailRow
          label="Unit Cost"
          value={`₱${medicine.unitCost.toFixed(2)}`}
        />
        <DetailRow
          label="Expiry"
          value={medicine.expiryDate}
          highlight={medicine.nearExpiryFlag || medicine.expiredFlag}
        />
        <DetailRow label="Batch" value={medicine.batchNumber} />
        <DetailRow label="Source" value={medicine.sourceFund} />
      </Box>

      {/* Footer: Actions */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2.5,
          py: 1.2,
          borderTop: "1px solid #F2F4F7",
          bgcolor: "#FAFBFC",
        }}
      >
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 500,
            color: "#98A2B3",
            maxWidth: 160,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {medicine.storageLocation}
        </Typography>
        <Box sx={{ display: "flex", gap: 0.25 }}>
          <Tooltip title="View Details" arrow>
            <IconButton
              size="small"
              sx={{
                color: "#667085",
                "&:hover": {
                  color: "#4361EE",
                  bgcolor: alpha("#4361EE", 0.08),
                },
              }}
            >
              <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit" arrow>
            <IconButton
              size="small"
              sx={{
                color: "#667085",
                "&:hover": {
                  color: "#4361EE",
                  bgcolor: alpha("#4361EE", 0.08),
                },
              }}
            >
              <EditOutlinedIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Card>
  );
};

function DetailRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 0.6,
      }}
    >
      <Typography sx={{ fontSize: 12, fontWeight: 500, color: "#667085" }}>
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 600,
          color: highlight ? "#F04438" : "#344054",
          maxWidth: 160,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          textAlign: "right",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

export default MedicineCard;
