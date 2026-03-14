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
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import ViewColumnOutlinedIcon from "@mui/icons-material/ViewColumnOutlined";

import { palette } from "@/theme/palette";
// Column definitions for filtering
const COLUMN_OPTIONS = [
  { key: "medicineId", label: "Medicine ID" },
  { key: "genericName", label: "Generic Name" },
  { key: "brand", label: "Brand(s)" },
  { key: "form", label: "Form" },
  { key: "strength", label: "Strength" },
  { key: "category", label: "Category" },
  { key: "drugType", label: "Drug Type" },
  { key: "batch", label: "Batch #" },
  { key: "qty", label: "Qty" },
  { key: "stockLevel", label: "Stock Level" },
  { key: "unitCost", label: "Unit Cost" },
  { key: "totalValue", label: "Total Value" },
  { key: "source", label: "Source" },
  { key: "expiry", label: "Expiry" },
  { key: "storage", label: "Storage" },
  { key: "alert", label: "Alert" },
];

function getPersistedColumns() {
  if (typeof window === "undefined") return COLUMN_OPTIONS.map(c => c.key);
  const saved = localStorage.getItem("inventoryTableColumns");
  return saved ? JSON.parse(saved) : COLUMN_OPTIONS.map(c => c.key);
}

function persistColumns(cols: string[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("inventoryTableColumns", JSON.stringify(cols));
  }
}

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

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>(getPersistedColumns());
  const [pendingColumns, setPendingColumns] = useState<string[]>(selectedColumns);

  const handleOpenModal = () => {
    setPendingColumns(selectedColumns);
    setModalOpen(true);
  };
  const handleCloseModal = () => setModalOpen(false);
  const handleToggleColumn = (key: string) => {
    setPendingColumns((prev: string[]) =>
      prev.includes(key) ? prev.filter((k: string) => k !== key) : [...prev, key]
    );
  };
  const handleApplyColumns = () => {
    setSelectedColumns(pendingColumns);
    persistColumns(pendingColumns);
    setModalOpen(false);
  };
  const handleClearColumns = () => setPendingColumns([]);
  const handleSelectAll = () => setPendingColumns(COLUMN_OPTIONS.map(c => c.key));
  const allSelected = pendingColumns.length === COLUMN_OPTIONS.length;

  return (
    <InventoryContainer>
      <InventoryToolbar>
        <div style={{ fontSize: "1rem", fontWeight: 700, color: "text.primary" }}>
          Medicine Inventory
        </div>
        <PremiumFilter
          options={optionsWithCounts}
          active={filter}
          onChange={setFilter}
        />
        <Button
          variant="outlined"
          size="small"
          startIcon={<ViewColumnOutlinedIcon />}
          onClick={handleOpenModal}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.8125rem",
            borderColor: "grey.300",
            color: "grey.700",
            borderRadius: "8px",
            px: 1.5,
            gap: 0.5,
            "&:hover": { borderColor: "primary.main", color: "primary.main", background: "#F5F7FF" },
          }}
        >
          Filters
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: palette.primary.main,
            color: palette.background.paper,
            borderRadius: "999px",
            fontSize: "0.65rem",
            fontWeight: 700,
            minWidth: 18,
            height: 18,
            padding: "0 5px",
            marginLeft: 4,
          }}>
            {selectedColumns.length}
          </span>
        </Button>

        <Dialog
          open={modalOpen}
          onClose={handleCloseModal}
          PaperProps={{
            sx: {
              borderRadius: "16px",
              width: 480,
              maxWidth: "95vw",
              p: 0,
              overflow: "hidden",
            },
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "22px 24px 14px 24px" }}>
            <div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "grey.900", letterSpacing: "-0.01em" }}>Manage Columns</div>
              <div style={{ fontSize: "0.78rem", color: "grey.500", marginTop: 3 }}>
                {pendingColumns.length} of {COLUMN_OPTIONS.length} columns selected
              </div>
            </div>
            <IconButton onClick={handleCloseModal} size="small" sx={{ color: "grey.400", mt: "-4px", "&:hover": { color: "grey.700", background: palette.grey[100] } }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>

          <Divider />

          <DialogContent sx={{ px: 3, py: 2.5 }}>
            {/* Select All toggle */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "grey.400", textTransform: "uppercase", letterSpacing: "0.06em" }}>Columns</span>
              <button
                onClick={allSelected ? handleClearColumns : handleSelectAll}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "primary.main",
                  padding: 0,
                }}
              >
                {allSelected ? "Deselect All" : "Select All"}
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "8px",
              }}
            >
              {COLUMN_OPTIONS.map((col) => {
                const checked = pendingColumns.includes(col.key);
                return (
                  <label
                    key={col.key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      cursor: "pointer",
                      padding: "9px 12px",
                      borderRadius: 10,
                      border: checked ? `1.5px solid ${palette.primary.main}` : "1.5px solid #E4E7EC",
                      background: checked ? "#F5F7FF" : palette.grey[50],
                      transition: "all 0.15s",
                      userSelect: "none",
                    }}
                  >
                    <Checkbox
                      checked={checked}
                      onChange={() => handleToggleColumn(col.key)}
                      size="small"
                      sx={{
                        p: 0,
                        color: "grey.300",
                        "&.Mui-checked": { color: "primary.main" },
                      }}
                    />
                    <span style={{ fontSize: "0.8rem", fontWeight: checked ? 600 : 400, color: checked ? palette.grey[800] : palette.grey[600], whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {col.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </DialogContent>

          <Divider />

          <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
            <Button
              onClick={handleClearColumns}
              variant="text"
              disabled={pendingColumns.length === 0}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                color: "grey.500",
                fontSize: "0.85rem",
                mr: "auto",
                "&:hover": { background: palette.background.default, color: "grey.700" },
                "&.Mui-disabled": { color: "grey.300" },
              }}
            >
              Clear All
            </Button>
            <Button
              onClick={handleCloseModal}
              variant="outlined"
              sx={{
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.85rem",
                borderColor: "grey.300",
                color: "grey.700",
                borderRadius: "8px",
                px: 2.5,
                "&:hover": { borderColor: "grey.400", background: palette.background.default },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleApplyColumns}
              variant="contained"
              sx={{
                textTransform: "none",
                fontWeight: 700,
                fontSize: "0.85rem",
                background: palette.primary.main,
                borderRadius: "8px",
                px: 2.5,
                boxShadow: "none",
                "&:hover": { background: "#3451d1", boxShadow: "none" },
              }}
            >
              Apply Filters
            </Button>
          </DialogActions>
        </Dialog>
      </InventoryToolbar>

      <TableContainer sx={{ maxHeight: 600, overflowX: "auto" }}>
        <Table stickyHeader size="small">
          <TableHead>
            <StyledRow>
              {COLUMN_OPTIONS.filter(col => selectedColumns.includes(col.key)).map(col => (
                <StyledHeaderCell key={col.key}>{col.label}</StyledHeaderCell>
              ))}
            </StyledRow>
          </TableHead>
          <TableBody>
            {filtered.map((med) => {
              const stockPct = med.reorderLevel > 0
                ? Math.min(Math.round((med.quantityOnHand / med.maximumStockLevel) * 100), 100)
                : 0;
              const barColor = med.expiredFlag
                ? palette.error.main
                : med.lowStockAlert
                ? palette.warning.main
                : med.overstockFlag
                ? palette.info.main
                : palette.success.main;

              return (
                <StyledRow key={med.id}>
                  {COLUMN_OPTIONS.filter(col => selectedColumns.includes(col.key)).map(col => {
                    switch (col.key) {
                      case "medicineId": return <StyledBodyCell key="medicineId">{med.id}</StyledBodyCell>;
                      case "genericName": return <StyledBodyCell key="genericName">{med.genericName}</StyledBodyCell>;
                      case "brand": return <StyledBodyCell key="brand">{med.brandNames?.join(", ")}</StyledBodyCell>;
                      case "form": return <StyledBodyCell key="form">{med.dosageForm}</StyledBodyCell>;
                      case "strength": return <StyledBodyCell key="strength">{med.strength}</StyledBodyCell>;
                      case "category": return <StyledBodyCell key="category">{med.therapeuticCategory}</StyledBodyCell>;
                      case "drugType": return <StyledBodyCell key="drugType">{med.drugCategory}</StyledBodyCell>;
                      case "batch": return <StyledBodyCell key="batch">{med.batchNumber}</StyledBodyCell>;
                      case "qty": return <StyledBodyCell key="qty">{med.quantityOnHand}</StyledBodyCell>;
                      case "stockLevel": return <StyledBodyCell key="stockLevel">{/* Add your stock level logic here */}</StyledBodyCell>;
                      case "unitCost": return <StyledBodyCell key="unitCost">{med.unitCost}</StyledBodyCell>;
                      case "totalValue": return <StyledBodyCell key="totalValue">{med.unitCost * med.quantityOnHand}</StyledBodyCell>;
                      case "source": return <StyledBodyCell key="source">{med.sourceFund}</StyledBodyCell>;
                      case "expiry": return <StyledBodyCell key="expiry">{med.expiryDate}</StyledBodyCell>;
                      case "storage": return <StyledBodyCell key="storage">{med.storageLocation}</StyledBodyCell>;
                      case "alert": return <StyledBodyCell key="alert">{getAlertChip(med)}</StyledBodyCell>;
                      default: return null;
                    }
                  })}
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
