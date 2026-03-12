"use client";

import React from "react";
import Chip from "@mui/material/Chip";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import { AlertIndicatorProps } from "./interface";

const alertConfig: Record<
  string,
  { color: "error" | "warning" | "info" | "success"; label: string; icon: React.ReactElement }
> = {
  low_stock: {
    color: "warning",
    label: "Low Stock",
    icon: <WarningAmberRoundedIcon fontSize="small" />,
  },
  near_expiry: {
    color: "info",
    label: "Near Expiry",
    icon: <ScheduleRoundedIcon fontSize="small" />,
  },
  expired: {
    color: "error",
    label: "Expired",
    icon: <ErrorOutlineRoundedIcon fontSize="small" />,
  },
  overstock: {
    color: "success",
    label: "Overstock",
    icon: <InventoryRoundedIcon fontSize="small" />,
  },
};

const AlertIndicator: React.FC<AlertIndicatorProps> = ({ type, label }) => {
  const config = alertConfig[type];
  return (
    <Chip
      icon={config.icon}
      label={label || config.label}
      color={config.color}
      size="small"
      variant="outlined"
    />
  );
};

export default AlertIndicator;
