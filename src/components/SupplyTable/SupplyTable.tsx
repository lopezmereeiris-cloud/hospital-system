"use client";

import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import ViewColumnOutlinedIcon from "@mui/icons-material/ViewColumnOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import Tooltip from "@mui/material/Tooltip";
import { alpha } from "@mui/material/styles";
import { palette } from "@/theme/palette";
import { SupplyItem, SupplyTableProps } from "./interface";
import { SupplyContainer, StyledHeaderCell, StyledBodyCell, StyledRow } from "./elements";

const COLUMN_OPTIONS = [
  { key: "supplyId", label: "Supply ID" },
  { key: "name", label: "Item Name" },
  { key: "brand", label: "Brand" },
  { key: "category", label: "Category" },
  { key: "subcategory", label: "Subcategory" },
  { key: "qty", label: "Qty" },
  { key: "stockLevel", label: "Stock Level" },
  { key: "unit", label: "Unit" },
  { key: "unitCost", label: "Unit Cost" },
  { key: "totalValue", label: "Total Value" },
  { key: "expiry", label: "Expiry Date" },
  { key: "storage", label: "Storage" },
  { key: "alert", label: "Alert" },
];

function getPersistedColumns() {
  if (typeof window === "undefined") return COLUMN_OPTIONS.map((c) => c.key);
  const saved = localStorage.getItem("supplyTableColumns");
  return saved ? JSON.parse(saved) : COLUMN_OPTIONS.map((c) => c.key);
}

function persistColumns(cols: string[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("supplyTableColumns", JSON.stringify(cols));
  }
}

function getAlertChip(item: SupplyItem) {
  if (item.expiredFlag) return <Chip label="Expired" color="error" size="small" />;
  if (item.nearExpiryFlag) return <Chip label="Near Expiry" color="warning" size="small" />;
  if (item.lowStockAlert) return <Chip label="Low Stock" color="warning" size="small" />;
  if (item.overstockFlag) return <Chip label="Overstock" color="info" size="small" />;
  return <Chip label="Normal" color="success" size="small" />;
}

const SupplyTable: React.FC<SupplyTableProps> = ({ items, onEdit, onView, onDelete }) => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [colDialogOpen, setColDialogOpen] = useState(false);
  const [tempCols, setTempCols] = useState<string[]>([]);

  useEffect(() => {
    setVisibleColumns(getPersistedColumns());
  }, []);

  const handleOpenColDialog = () => {
    setTempCols([...visibleColumns]);
    setColDialogOpen(true);
  };

  const handleToggleCol = (key: string) => {
    setTempCols((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleApplyCols = () => {
    setVisibleColumns(tempCols);
    persistColumns(tempCols);
    setColDialogOpen(false);
  };

  const isCol = (key: string) => visibleColumns.includes(key);

  return (
    <>
      <SupplyContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            px: 2,
            py: 1.5,
            borderBottom: `1px solid ${palette.grey[100]}`,
          }}
        >
          <Button
            size="small"
            startIcon={<ViewColumnOutlinedIcon />}
            onClick={handleOpenColDialog}
            sx={{
              fontSize: 13,
              color: "grey.600",
              textTransform: "none",
              borderRadius: "8px",
              fontWeight: 600,
            }}
          >
            Columns
          </Button>
        </Box>

        <TableContainer>
          <Table size="small" stickyHeader>
            <TableHead>
              <StyledRow>
                {isCol("supplyId") && <StyledHeaderCell>Supply ID</StyledHeaderCell>}
                {isCol("name") && <StyledHeaderCell>Item Name</StyledHeaderCell>}
                {isCol("brand") && <StyledHeaderCell>Brand</StyledHeaderCell>}
                {isCol("category") && <StyledHeaderCell>Category</StyledHeaderCell>}
                {isCol("subcategory") && <StyledHeaderCell>Subcategory</StyledHeaderCell>}
                {isCol("qty") && <StyledHeaderCell align="right">Qty</StyledHeaderCell>}
                {isCol("stockLevel") && (
                  <StyledHeaderCell sx={{ minWidth: 120 }}>Stock Level</StyledHeaderCell>
                )}
                {isCol("unit") && <StyledHeaderCell>Unit</StyledHeaderCell>}
                {isCol("unitCost") && <StyledHeaderCell align="right">Unit Cost</StyledHeaderCell>}
                {isCol("totalValue") && <StyledHeaderCell align="right">Total Value</StyledHeaderCell>}
                {isCol("expiry") && <StyledHeaderCell>Expiry Date</StyledHeaderCell>}
                {isCol("storage") && <StyledHeaderCell>Storage</StyledHeaderCell>}
                {isCol("alert") && <StyledHeaderCell>Alert</StyledHeaderCell>}
                <StyledHeaderCell sx={{ textAlign: "center" }}>Actions</StyledHeaderCell>
              </StyledRow>
            </TableHead>
            <TableBody>
              {items.map((item) => {
                const stockPct =
                  item.maximumStockLevel > 0
                    ? Math.min(
                        Math.round((item.quantityOnHand / item.maximumStockLevel) * 100),
                        100
                      )
                    : 0;

                let barColor = palette.success.main;
                if (item.expiredFlag || item.lowStockAlert) barColor = palette.error.main;
                else if (item.nearExpiryFlag) barColor = palette.warning.main;
                else if (item.overstockFlag) barColor = palette.info.main;

                return (
                  <StyledRow key={item.id}>
                    {isCol("supplyId") && (
                      <StyledBodyCell>
                        <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: "grey.500" }}>
                          {item.id}
                        </Typography>
                      </StyledBodyCell>
                    )}
                    {isCol("name") && (
                      <StyledBodyCell>
                        <Typography sx={{ fontSize: 14, fontWeight: 600, color: "grey.900" }}>
                          {item.name}
                        </Typography>
                        {item.supplier && (
                          <Typography sx={{ fontSize: 12, color: "grey.400" }}>
                            {item.supplier}
                          </Typography>
                        )}
                      </StyledBodyCell>
                    )}
                    {isCol("brand") && (
                      <StyledBodyCell>
                        <Typography sx={{ fontSize: 13.5 }}>{item.brand || "—"}</Typography>
                      </StyledBodyCell>
                    )}
                    {isCol("category") && (
                      <StyledBodyCell>
                        <Chip
                          label={item.category}
                          size="small"
                          sx={{ fontSize: 12, height: 22 }}
                        />
                      </StyledBodyCell>
                    )}
                    {isCol("subcategory") && (
                      <StyledBodyCell>
                        <Typography sx={{ fontSize: 13.5 }}>{item.subcategory || "—"}</Typography>
                      </StyledBodyCell>
                    )}
                    {isCol("qty") && (
                      <StyledBodyCell align="right">
                        <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                          {item.quantityOnHand.toLocaleString()}
                        </Typography>
                      </StyledBodyCell>
                    )}
                    {isCol("stockLevel") && (
                      <StyledBodyCell sx={{ minWidth: 120 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={stockPct}
                            sx={{
                              flex: 1,
                              height: 6,
                              borderRadius: 4,
                              bgcolor: palette.grey[100],
                              "& .MuiLinearProgress-bar": { bgcolor: barColor, borderRadius: 4 },
                            }}
                          />
                          <Typography sx={{ fontSize: 12, color: "grey.500", minWidth: 28 }}>
                            {stockPct}%
                          </Typography>
                        </Box>
                      </StyledBodyCell>
                    )}
                    {isCol("unit") && (
                      <StyledBodyCell>
                        <Typography sx={{ fontSize: 13.5 }}>{item.unit}</Typography>
                      </StyledBodyCell>
                    )}
                    {isCol("unitCost") && (
                      <StyledBodyCell align="right">
                        <Typography sx={{ fontSize: 13.5, fontWeight: 600 }}>
                          ₱{item.unitCost.toLocaleString()}
                        </Typography>
                      </StyledBodyCell>
                    )}
                    {isCol("totalValue") && (
                      <StyledBodyCell align="right">
                        <Typography sx={{ fontSize: 13.5, fontWeight: 700 }}>
                          ₱{item.totalValue.toLocaleString()}
                        </Typography>
                      </StyledBodyCell>
                    )}
                    {isCol("expiry") && (
                      <StyledBodyCell>
                        <Typography sx={{ fontSize: 13.5 }}>
                          {item.expiryDate || "N/A"}
                        </Typography>
                      </StyledBodyCell>
                    )}
                    {isCol("storage") && (
                      <StyledBodyCell>
                        <Typography sx={{ fontSize: 13.5 }}>
                          {item.storageLocation || "—"}
                        </Typography>
                      </StyledBodyCell>
                    )}
                    {isCol("alert") && <StyledBodyCell>{getAlertChip(item)}</StyledBodyCell>}
                    <StyledBodyCell sx={{ textAlign: "center", whiteSpace: "nowrap" }}>
                      <Tooltip title="View details" arrow>
                        <IconButton
                          size="small"
                          onClick={() => onView?.(item)}
                          sx={{
                            color: "grey.400",
                            border: `1px solid ${palette.grey[200]}`,
                            borderRadius: "6px",
                            width: 28,
                            height: 28,
                            mr: 0.5,
                            "&:hover": { color: palette.primary.main, borderColor: palette.primary.main, bgcolor: alpha(palette.primary.main, 0.06) },
                          }}
                        >
                          <VisibilityOutlinedIcon sx={{ fontSize: 15 }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit" arrow>
                        <IconButton
                          size="small"
                          onClick={() => onEdit?.(item)}
                          sx={{
                            color: "grey.400",
                            border: `1px solid ${palette.grey[200]}`,
                            borderRadius: "6px",
                            width: 28,
                            height: 28,
                            mr: 0.5,
                            "&:hover": { color: palette.primary.main, borderColor: palette.primary.main, bgcolor: alpha(palette.primary.main, 0.06) },
                          }}
                        >
                          <EditOutlinedIcon sx={{ fontSize: 15 }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" arrow>
                        <IconButton
                          size="small"
                          onClick={() => onDelete?.(item)}
                          sx={{
                            color: "grey.400",
                            border: `1px solid ${palette.grey[200]}`,
                            borderRadius: "6px",
                            width: 28,
                            height: 28,
                            "&:hover": { color: palette.error.main, borderColor: palette.error.main, bgcolor: alpha(palette.error.main, 0.06) },
                          }}
                        >
                          <DeleteOutlineRoundedIcon sx={{ fontSize: 15 }} />
                        </IconButton>
                      </Tooltip>
                    </StyledBodyCell>
                  </StyledRow>
                );
              })}

              {items.length === 0 && (
                <StyledRow>
                  <StyledBodyCell
                    colSpan={COLUMN_OPTIONS.length}
                    align="center"
                    sx={{ py: 6, color: "grey.400", fontSize: 14 }}
                  >
                    No supply items found.
                  </StyledBodyCell>
                </StyledRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </SupplyContainer>

      {/* Column Visibility Dialog */}
      <Dialog
        open={colDialogOpen}
        onClose={() => setColDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: "12px" } }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
            py: 2,
            borderBottom: `1px solid ${palette.grey[100]}`,
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: 16 }}>Visible Columns</Typography>
          <IconButton size="small" onClick={() => setColDialogOpen(false)}>
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
        <DialogContent sx={{ px: 3, py: 2 }}>
          {COLUMN_OPTIONS.map((col) => (
            <Box key={col.key} sx={{ display: "flex", alignItems: "center", gap: 1, py: 0.5 }}>
              <Checkbox
                checked={tempCols.includes(col.key)}
                onChange={() => handleToggleCol(col.key)}
                size="small"
                sx={{ p: 0.5 }}
              />
              <Typography sx={{ fontSize: 14, color: "grey.700" }}>{col.label}</Typography>
            </Box>
          ))}
        </DialogContent>
        <Divider />
        <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
          <Button
            onClick={() => setColDialogOpen(false)}
            variant="outlined"
            sx={{ borderRadius: "8px", textTransform: "none", fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleApplyCols}
            variant="contained"
            sx={{ borderRadius: "8px", textTransform: "none", fontWeight: 700 }}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SupplyTable;
