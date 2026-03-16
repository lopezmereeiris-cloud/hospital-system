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
import { palette } from "@/theme/palette";

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
    return { label: "Expired", color: "error", bg: "#FEF3F2", fg: palette.error.main };
  if (med.nearExpiryFlag)
    return { label: "Near Expiry", color: "warning", bg: "#FFFAEB", fg: palette.warning.main };
  if (med.lowStockAlert)
    return { label: "Low Stock", color: "warning", bg: "#FFFAEB", fg: palette.warning.main };
  if (med.overstockFlag)
    return { label: "Overstock", color: "info", bg: "#EFF8FF", fg: palette.info.main };
  return { label: "Normal", color: "success", bg: "#ECFDF3", fg: palette.success.main };
}

function getBarColor(alert: AlertInfo) {
  if (alert.label === "Expired" || alert.label === "Low Stock") return alert.fg;
  if (alert.label === "Near Expiry") return palette.warning.main;
  if (alert.label === "Overstock") return palette.info.main;
  return palette.success.main;
}

const MedicineCard: React.FC<MedicineCardProps> = ({ medicine }) => {
  const stockPct = Math.min(
    Math.round((medicine.quantityOnHand / (medicine.maximumStockLevel || 1)) * 100),
    100
  );
  const alert = getAlert(medicine);
  const barColor = getBarColor(alert);

  return (
    <Card
      sx={{
        borderRadius: "12px",
        border: `1px solid ${palette.grey[200]}`,
        boxShadow: "0 1px 3px rgba(16,24,40,0.06), 0 1px 2px rgba(16,24,40,0.04)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: "background.paper",
        transition: "all 0.2s ease",
        overflow: "hidden",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(16,24,40,0.08), 0 2px 4px rgba(16,24,40,0.04)",
          borderColor: "grey.300",
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
        <Typography sx={{ fontSize: 12, fontWeight: 600, color: "grey.500", letterSpacing: "0.04em" }}>
          {medicine.id}
        </Typography>
        <Chip
          label={alert.label}
          size="small"
          sx={{
            bgcolor: alert.bg,
            color: alert.fg,
            fontWeight: 700,
            fontSize: 11,
            height: 22,
            border: `1px solid ${alpha(alert.fg, 0.25)}`,
          }}
        />
      </Box>

      {/* Medicine Name */}
      <Box sx={{ px: 2.5, pt: 0.5, pb: 1 }}>
        <Typography sx={{ fontSize: 15, fontWeight: 700, color: "grey.900", lineHeight: 1.3 }}>
          {medicine.genericName}
        </Typography>
        {medicine.brandNames?.length > 0 && (
          <Typography sx={{ fontSize: 12, color: "grey.500", mt: 0.25 }}>
            {medicine.brandNames.join(", ")}
          </Typography>
        )}
      </Box>

      {/* Tags */}
      <Box sx={{ px: 2.5, pb: 1.5, display: "flex", gap: 0.75, flexWrap: "wrap" }}>
        {medicine.dosageForm && (
          <Chip label={medicine.dosageForm} size="small" sx={{ fontSize: 11, height: 20, bgcolor: palette.grey[100], color: "grey.700" }} />
        )}
        {medicine.strength && (
          <Chip label={medicine.strength} size="small" sx={{ fontSize: 11, height: 20, bgcolor: palette.grey[100], color: "grey.700" }} />
        )}
        {medicine.therapeuticCategory && (
          <Chip label={medicine.therapeuticCategory} size="small" sx={{ fontSize: 11, height: 20, bgcolor: palette.grey[100], color: "grey.700" }} />
        )}
      </Box>

      {/* Stock Level */}
      <Box sx={{ px: 2.5, pb: 1.5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
          <Typography sx={{ fontSize: 12, color: "grey.500", fontWeight: 500 }}>Stock Level</Typography>
          <Typography sx={{ fontSize: 12, fontWeight: 700, color: "grey.700" }}>
            {medicine.quantityOnHand} / {medicine.maximumStockLevel}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={stockPct}
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: alpha(barColor, 0.12),
            "& .MuiLinearProgress-bar": { bgcolor: barColor, borderRadius: 3 },
          }}
        />
      </Box>

      {/* Cost + Actions */}
      <Box
        sx={{
          px: 2.5,
          pb: 2,
          mt: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography sx={{ fontSize: 11, color: "grey.400", fontWeight: 500 }}>Unit Cost</Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 700, color: "grey.800" }}>
            ₱{medicine.unitCost?.toFixed(2)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <Tooltip title="View details" arrow>
            <IconButton
              size="small"
              sx={{
                color: "grey.400",
                border: `1px solid ${palette.grey[200]}`,
                borderRadius: "8px",
                width: 30,
                height: 30,
                "&:hover": { color: palette.primary.main, borderColor: palette.primary.main, bgcolor: alpha(palette.primary.main, 0.06) },
              }}
            >
              <VisibilityOutlinedIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit" arrow>
            <IconButton
              size="small"
              sx={{
                color: "grey.400",
                border: `1px solid ${palette.grey[200]}`,
                borderRadius: "8px",
                width: 30,
                height: 30,
                "&:hover": { color: palette.primary.main, borderColor: palette.primary.main, bgcolor: alpha(palette.primary.main, 0.06) },
              }}
            >
              <EditOutlinedIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Card>
  );
};

export default MedicineCard;