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
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { alpha } from "@mui/material/styles";
import { SupplyItem } from "@/components/SupplyTable/interface";
import { palette } from "@/theme/palette";

interface SupplyCardProps {
  item: SupplyItem;
  onEdit?: (item: SupplyItem) => void;
  onView?: (item: SupplyItem) => void;
  onDelete?: (item: SupplyItem) => void;
}

type AlertInfo = {
  label: string;
  color: "error" | "warning" | "info" | "success";
  bg: string;
  fg: string;
};

function getAlert(item: SupplyItem): AlertInfo {
  if (item.expiredFlag)
    return { label: "Expired", color: "error", bg: "#FEF3F2", fg: palette.error.main };
  if (item.nearExpiryFlag)
    return { label: "Near Expiry", color: "warning", bg: "#FFFAEB", fg: palette.warning.main };
  if (item.lowStockAlert)
    return { label: "Low Stock", color: "warning", bg: "#FFFAEB", fg: palette.warning.main };
  if (item.overstockFlag)
    return { label: "Overstock", color: "info", bg: "#EFF8FF", fg: palette.info.main };
  return { label: "Normal", color: "success", bg: "#ECFDF3", fg: palette.success.main };
}

const SupplyCard: React.FC<SupplyCardProps> = ({ item, onEdit, onView, onDelete }) => {
  const stockPct = Math.min(
    item.maximumStockLevel > 0
      ? Math.round((item.quantityOnHand / item.maximumStockLevel) * 100)
      : 0,
    100
  );
  const alert = getAlert(item);

  let barColor = palette.success.main;
  if (item.expiredFlag || item.lowStockAlert) barColor = alert.fg;
  else if (item.nearExpiryFlag) barColor = palette.warning.main;
  else if (item.overstockFlag) barColor = palette.info.main;

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
          {item.id}
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

      {/* Item Name + Brand */}
      <Box sx={{ px: 2.5, pt: 0.5, pb: 1 }}>
        <Typography sx={{ fontSize: 15, fontWeight: 700, color: "grey.900", lineHeight: 1.3 }}>
          {item.name}
        </Typography>
        {item.brand && (
          <Typography sx={{ fontSize: 12, color: "grey.500", mt: 0.25 }}>{item.brand}</Typography>
        )}
      </Box>

      {/* Tags */}
      <Box sx={{ px: 2.5, pb: 1.5, display: "flex", gap: 0.75, flexWrap: "wrap" }}>
        {item.category && (
          <Chip
            label={item.category}
            size="small"
            sx={{ fontSize: 11, height: 20, bgcolor: palette.grey[100], color: "grey.700" }}
          />
        )}
        {item.subcategory && (
          <Chip
            label={item.subcategory}
            size="small"
            sx={{ fontSize: 11, height: 20, bgcolor: palette.grey[100], color: "grey.700" }}
          />
        )}
        {item.unit && (
          <Chip
            label={item.unit}
            size="small"
            sx={{ fontSize: 11, height: 20, bgcolor: palette.grey[100], color: "grey.700" }}
          />
        )}
      </Box>

      {/* Stock Bar */}
      <Box sx={{ px: 2.5, pb: 1.5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
          <Typography sx={{ fontSize: 12, color: "grey.500" }}>Stock</Typography>
          <Typography sx={{ fontSize: 12, fontWeight: 600, color: "grey.700" }}>
            {item.quantityOnHand.toLocaleString()} / {item.maximumStockLevel.toLocaleString()}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={stockPct}
          sx={{
            height: 6,
            borderRadius: 4,
            bgcolor: palette.grey[100],
            "& .MuiLinearProgress-bar": { bgcolor: barColor, borderRadius: 4 },
          }}
        />
      </Box>

      {/* Footer: Unit Cost + Actions */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2.5,
          py: 1.5,
          borderTop: `1px solid ${palette.grey[100]}`,
          mt: "auto",
        }}
      >
        <Typography sx={{ fontSize: 14, fontWeight: 700, color: "grey.900" }}>
          ₱{item.unitCost.toLocaleString()}
          <Typography
            component="span"
            sx={{ fontSize: 11, fontWeight: 500, color: "grey.400", ml: 0.5 }}
          >
            / {item.unit}
          </Typography>
        </Typography>
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <Tooltip title="View details" arrow>
            <IconButton
              size="small"
              onClick={() => onView?.(item)}
              sx={{
                color: "grey.400",
                borderRadius: "6px",
                "&:hover": {
                  bgcolor: alpha(palette.primary.main, 0.08),
                  color: palette.primary.main,
                },
              }}
            >
              <VisibilityOutlinedIcon sx={{ fontSize: 17 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit" arrow>
            <IconButton
              size="small"
              onClick={() => onEdit?.(item)}
              sx={{
                color: "grey.400",
                borderRadius: "6px",
                "&:hover": {
                  bgcolor: alpha(palette.primary.main, 0.08),
                  color: palette.primary.main,
                },
              }}
            >
              <EditOutlinedIcon sx={{ fontSize: 17 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" arrow>
            <IconButton
              size="small"
              onClick={() => onDelete?.(item)}
              sx={{
                color: "grey.400",
                borderRadius: "6px",
                "&:hover": {
                  bgcolor: alpha(palette.error.main, 0.08),
                  color: palette.error.main,
                },
              }}
            >
              <DeleteOutlineRoundedIcon sx={{ fontSize: 17 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Card>
  );
};

export default SupplyCard;
