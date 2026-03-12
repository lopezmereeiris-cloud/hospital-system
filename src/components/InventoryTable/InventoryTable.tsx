"use client";

import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import PremiumFilter from "@/components/PremiumFilter";
import { InventoryTableProps, Medicine } from "./interface";
import {
  InventoryContainer,
  StyledHeaderCell,
  StyledBodyCell,
  StyledRow,
  InventoryToolbar,
} from "./elements";

export type FilterType = "all" | "low_stock" | "near_expiry" | "expired" | "overstock";

function getAlertType(med: Medicine): FilterType | null {
  if (med.expiredFlag) return "expired";
  if (med.nearExpiryFlag) return "near_expiry";
  if (med.lowStockAlert) return "low_stock";
  if (med.overstockFlag) return "overstock";
  return null;
}

function getAlertChip(med: Medicine) {
  const alertType = getAlertType(med);
  if (!alertType) return <Chip label="Normal" color="success" size="small" />;

  const config: Record<string, { label: string; color: "error" | "warning" | "info" | "success" }> = {
    expired: { label: "Expired", color: "error" },
    near_expiry: { label: "Near Expiry", color: "warning" },
    low_stock: { label: "Low Stock", color: "warning" },
    overstock: { label: "Overstock", color: "info" },
  };

  const c = config[alertType];
  return <Chip label={c.label} color={c.color} size="small" />;
}

const filterOptions: { value: FilterType; label: string }[] = [
  { value: "all", label: "All Items" },
  { value: "low_stock", label: "Low Stock" },
  { value: "near_expiry", label: "Near Expiry" },
  { value: "expired", label: "Expired" },
  { value: "overstock", label: "Overstock" },
];


import { useSearchParams } from "next/navigation";

const InventoryTable: React.FC<InventoryTableProps> = ({ medicines }) => {
  const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const paramFilter = searchParams?.get("filter") as FilterType | null;
  const [filter, setFilter] = useState<FilterType>(paramFilter || "all");

  useEffect(() => {
    if (paramFilter && paramFilter !== filter) {
      setFilter(paramFilter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramFilter]);

  const filtered =
    filter === "all"
      ? medicines
      : medicines.filter((med) => getAlertType(med) === filter);

  // Add counts to filter options
  const optionsWithCounts = filterOptions.map((opt) => ({
    ...opt,
    count:
      opt.value === "all"
        ? medicines.length
        : medicines.filter((m) => getAlertType(m) === opt.value).length,
  }));

  return (
    <InventoryContainer>
      <InventoryToolbar>
        <div style={{ fontSize: "1rem", fontWeight: 700, color: "#1A1D1F" }}>
          Medicine Inventory
        </div>
        <PremiumFilter
          options={optionsWithCounts}
          active={filter}
          onChange={setFilter}
        />
      </InventoryToolbar>

      <TableContainer sx={{ maxHeight: 600, overflowX: "auto" }}>
        <Table stickyHeader size="small">
          <TableHead>
            <StyledRow>
              <StyledHeaderCell>Medicine ID</StyledHeaderCell>
              <StyledHeaderCell>Generic Name</StyledHeaderCell>
              <StyledHeaderCell>Brand(s)</StyledHeaderCell>
              <StyledHeaderCell>Form</StyledHeaderCell>
              <StyledHeaderCell>Strength</StyledHeaderCell>
              <StyledHeaderCell>Category</StyledHeaderCell>
              <StyledHeaderCell>Drug Type</StyledHeaderCell>
              <StyledHeaderCell>Batch #</StyledHeaderCell>
              <StyledHeaderCell>Qty</StyledHeaderCell>
              <StyledHeaderCell>Stock Level</StyledHeaderCell>
              <StyledHeaderCell>Unit Cost</StyledHeaderCell>
              <StyledHeaderCell>Total Value</StyledHeaderCell>
              <StyledHeaderCell>Source</StyledHeaderCell>
              <StyledHeaderCell>Expiry</StyledHeaderCell>
              <StyledHeaderCell>Storage</StyledHeaderCell>
              <StyledHeaderCell>Alert</StyledHeaderCell>
            </StyledRow>
          </TableHead>
          <TableBody>
            {filtered.map((med) => {
              const stockPct = med.reorderLevel > 0
                ? Math.min(Math.round((med.quantityOnHand / med.maximumStockLevel) * 100), 100)
                : 0;
              const barColor = med.expiredFlag
                ? "#F04438"
                : med.lowStockAlert
                ? "#F79009"
                : med.overstockFlag
                ? "#36BFFA"
                : "#12B76A";

              return (
                <StyledRow key={med.id}>
                  <StyledBodyCell sx={{ fontWeight: 600, whiteSpace: "nowrap" }}>{med.id}</StyledBodyCell>
                  <StyledBodyCell sx={{ fontWeight: 500 }}>{med.genericName}</StyledBodyCell>
                  <StyledBodyCell>{med.brandNames.join(", ")}</StyledBodyCell>
                  <StyledBodyCell>{med.dosageForm}</StyledBodyCell>
                  <StyledBodyCell>{med.strength}</StyledBodyCell>
                  <StyledBodyCell>{med.therapeuticCategory}</StyledBodyCell>
                  <StyledBodyCell>
                    <Chip
                      label={med.drugCategory}
                      size="small"
                      variant="outlined"
                      color={med.drugCategory === "Controlled" ? "error" : med.drugCategory === "Prescription" ? "info" : "default"}
                    />
                  </StyledBodyCell>
                  <StyledBodyCell sx={{ whiteSpace: "nowrap" }}>{med.batchNumber}</StyledBodyCell>
                  <StyledBodyCell sx={{ fontWeight: 700 }}>{med.quantityOnHand}</StyledBodyCell>
                  <StyledBodyCell sx={{ minWidth: 110 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <LinearProgress
                        variant="determinate"
                        value={stockPct}
                        sx={{
                          flex: 1,
                          height: 6,
                          borderRadius: 3,
                          bgcolor: "rgba(0,0,0,0.04)",
                          "& .MuiLinearProgress-bar": { borderRadius: 3, bgcolor: barColor },
                        }}
                      />
                      <span style={{ fontSize: "0.68rem", fontWeight: 600, color: "#6F767E", minWidth: 28 }}>
                        {stockPct}%
                      </span>
                    </div>
                  </StyledBodyCell>
                  <StyledBodyCell>₱{med.unitCost.toFixed(2)}</StyledBodyCell>
                  <StyledBodyCell>₱{med.totalValue.toLocaleString()}</StyledBodyCell>
                  <StyledBodyCell>{med.sourceFund}</StyledBodyCell>
                  <StyledBodyCell sx={{ whiteSpace: "nowrap" }}>{med.expiryDate}</StyledBodyCell>
                  <StyledBodyCell sx={{ whiteSpace: "nowrap", maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis" }}>
                    {med.storageLocation}
                  </StyledBodyCell>
                  <StyledBodyCell>{getAlertChip(med)}</StyledBodyCell>
                </StyledRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </InventoryContainer>
  );
};

export default InventoryTable;
