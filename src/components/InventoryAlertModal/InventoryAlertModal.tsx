"use client";

import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import { Medicine } from "@/components/InventoryTable/interface";

interface InventoryAlertModalProps {
  open: boolean;
  onClose: () => void;
  medicine: Medicine | null;
  mode: "reorder" | "review";
  readOnly?: boolean;
}

const InventoryAlertModal: React.FC<InventoryAlertModalProps> = ({
  open,
  onClose,
  medicine,
  mode,
  readOnly = false,
}) => {
  if (!medicine) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {readOnly ? "Medicine Alert Details" : mode === "reorder" ? "Reorder Medicine" : "Review Alert"}
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="h6" sx={{ mb: 1 }}>{medicine.genericName}</Typography>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 12 }}>
          <Chip label={medicine.brandNames.join(", ")} size="small" color="info" />
          <Chip label={medicine.dosageForm} size="small" />
          <Chip label={medicine.strength} size="small" />
          <Chip label={medicine.therapeuticCategory} size="small" />
          <Chip label={medicine.drugCategory} size="small" />
        </div>
        <Divider sx={{ my: 1.5 }} />
        <Typography variant="body2" sx={{ mb: 1 }}>
          <b>Batch #:</b> {medicine.batchNumber} &nbsp; | &nbsp;
          <b>Expiry:</b> {medicine.expiryDate} &nbsp; | &nbsp;
          <b>Stock:</b> {medicine.quantityOnHand} / {medicine.maximumStockLevel}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={Math.min(Math.round((medicine.quantityOnHand / (medicine.maximumStockLevel || 1)) * 100), 100)}
          sx={{ height: 8, borderRadius: 3, mb: 2 }}
        />
        <Typography variant="body2" sx={{ mb: 1 }}>
          <b>Unit Cost:</b> ₱{medicine.unitCost.toFixed(2)} &nbsp; | &nbsp;
          <b>Total Value:</b> ₱{medicine.totalValue.toLocaleString()}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          <b>Source:</b> {medicine.sourceFund} &nbsp; | &nbsp;
          <b>Storage:</b> {medicine.storageLocation}
        </Typography>
        <Divider sx={{ my: 2 }} />
        {readOnly ? (
          <>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Alert Summary</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              This item is flagged for monitoring. Auditor access is view-only, so stock actions are disabled here.
            </Typography>
          </>
        ) : mode === "reorder" ? (
          <>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Reorder Form</Typography>
            <input type="number" placeholder="Quantity to reorder" style={{ width: "100%", marginBottom: 12, padding: 8, borderRadius: 6, border: "1px solid #E0E0E0" }} />
            <input type="text" placeholder="Supplier (optional)" style={{ width: "100%", marginBottom: 12, padding: 8, borderRadius: 6, border: "1px solid #E0E0E0" }} />
            <textarea placeholder="Notes (optional)" style={{ width: "100%", minHeight: 60, padding: 8, borderRadius: 6, border: "1px solid #E0E0E0" }} />
          </>
        ) : (
          <>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Review Alert</Typography>
            <textarea placeholder="Notes (optional)" style={{ width: "100%", minHeight: 60, padding: 8, borderRadius: 6, border: "1px solid #E0E0E0" }} />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="text">{readOnly ? "Close" : "Cancel"}</Button>
        {!readOnly && (
          <Button onClick={onClose} variant="contained" color="primary">
            {mode === "reorder" ? "Submit Reorder" : "Mark as Reviewed"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default InventoryAlertModal;
