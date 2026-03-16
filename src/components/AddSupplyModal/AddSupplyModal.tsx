"use client";

import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import WarehouseRoundedIcon from "@mui/icons-material/WarehouseRounded";
import { SupplyItem } from "@/components/SupplyTable/interface";
import { palette } from "@/theme/palette";

interface AddSupplyModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (item: SupplyItem) => void;
  mode?: "add" | "edit" | "view";
  editItem?: SupplyItem | null;
  onEdit?: (item: SupplyItem) => void;
}

const initialForm = {
  name: "",
  brand: "",
  supplier: "",
  category: "",
  subcategory: "",
  unit: "",
  batchNumber: "",
  storageLocation: "",
  expiryDate: "",
  quantityOnHand: "",
  unitCost: "",
};

const SectionHeader = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2, mt: 0.5 }}>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 28,
        height: 28,
        borderRadius: "8px",
        bgcolor: `${palette.primary.main}14`,
        color: palette.primary.main,
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>
    <Typography
      sx={{
        fontSize: 13,
        fontWeight: 700,
        color: "grey.700",
        letterSpacing: "0.03em",
        textTransform: "uppercase",
      }}
    >
      {label}
    </Typography>
    <Box sx={{ flex: 1, height: "1px", bgcolor: "grey.100", ml: 1 }} />
  </Box>
);

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    fontSize: 14,
    bgcolor: "#FAFAFA",
    "& fieldset": { borderColor: "#E4E7EC" },
    "&:hover fieldset": { borderColor: palette.primary.main },
    "&.Mui-focused fieldset": { borderColor: palette.primary.main },
  },
  "& .MuiInputLabel-root": { fontSize: 13.5 },
};

const AddSupplyModal: React.FC<AddSupplyModalProps> = ({ open, onClose, onAdd, mode = "add", editItem, onEdit }) => {
  const [form, setForm] = useState(initialForm);
  const isView = mode === "view";
  const isEdit = mode === "edit";

  React.useEffect(() => {
    if ((isEdit || isView) && editItem) {
      setForm({
        name: editItem.name || "",
        brand: editItem.brand || "",
        supplier: editItem.supplier || "",
        category: editItem.category || "",
        subcategory: editItem.subcategory || "",
        unit: editItem.unit || "",
        batchNumber: editItem.batchNumber || "",
        storageLocation: editItem.storageLocation || "",
        expiryDate: editItem.expiryDate || "",
        quantityOnHand: editItem.quantityOnHand?.toString() || "",
        unitCost: editItem.unitCost?.toString() || "",
      });
    } else if (mode === "add") {
      setForm(initialForm);
    }
  }, [editItem, mode, isEdit, isView]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const qty = Number(form.quantityOnHand) || 0;
    const cost = Number(form.unitCost) || 0;
    const item: SupplyItem = {
      ...(isEdit && editItem ? editItem : {}),
      id: isEdit && editItem ? editItem.id : `SUP-${Date.now()}`,
      name: form.name,
      brand: form.brand,
      supplier: form.supplier,
      category: form.category,
      subcategory: form.subcategory,
      unit: form.unit,
      batchNumber: form.batchNumber,
      storageLocation: form.storageLocation,
      expiryDate: form.expiryDate,
      quantityOnHand: qty,
      unitCost: cost,
      totalValue: cost * qty,
      reorderLevel: isEdit && editItem ? editItem.reorderLevel : 0,
      maximumStockLevel: isEdit && editItem ? editItem.maximumStockLevel : Math.max(qty * 2, 1),
      dateReceived: isEdit && editItem ? editItem.dateReceived : new Date().toISOString().split("T")[0],
      lastUpdatedDate: new Date().toISOString().split("T")[0],
      status: isEdit && editItem ? editItem.status : "Active",
      lowStockAlert: isEdit && editItem ? editItem.lowStockAlert : false,
      nearExpiryFlag: isEdit && editItem ? editItem.nearExpiryFlag : false,
      expiredFlag: isEdit && editItem ? editItem.expiredFlag : false,
      overstockFlag: isEdit && editItem ? editItem.overstockFlag : false,
      notes: isEdit && editItem ? editItem.notes : "",
    };
    if (isEdit) {
      onEdit?.(item);
    } else {
      onAdd(item);
    }
    setForm(initialForm);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          boxShadow: "0 20px 60px rgba(16,24,40,0.15)",
          overflow: "hidden",
        },
      }}
    >
      {/* ── Header ── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          py: 2.5,
          borderBottom: `1px solid ${palette.grey[100]}`,
          bgcolor: palette.background.paper,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 38,
              height: 38,
              borderRadius: "10px",
              bgcolor: `${palette.primary.main}14`,
              color: palette.primary.main,
            }}
          >
            <Inventory2RoundedIcon sx={{ fontSize: 22 }} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: 17, fontWeight: 700, color: "grey.900", lineHeight: 1.2 }}>
              {isView ? "View Supply Item" : isEdit ? "Edit Supply Item" : "Add Supply Item"}
            </Typography>
            <Typography sx={{ fontSize: 12.5, color: "grey.500", mt: 0.25 }}>
              {isView ? "Supply item details (read-only)" : isEdit ? "Update the supply item details" : "Fill in the details to add a new item to hospital inventory"}
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: "grey.400",
            borderRadius: "8px",
            "&:hover": { bgcolor: palette.grey[100], color: "grey.700" },
          }}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* ── Body ── */}
      <DialogContent sx={{ px: 3, py: 3, bgcolor: palette.background.default }}>
        {/* Section 1: Item Identity */}
        <SectionHeader icon={<Inventory2RoundedIcon sx={{ fontSize: 16 }} />} label="Item Identity" />
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Item Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              required={!isView}
              placeholder="e.g. Surgical Face Mask (N95)"
              slotProps={{ input: { readOnly: isView } }}
              sx={fieldSx}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Brand"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              fullWidth
              placeholder="e.g. 3M"
              slotProps={{ input: { readOnly: isView } }}
              sx={fieldSx}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Supplier"
              name="supplier"
              value={form.supplier}
              onChange={handleChange}
              fullWidth
              placeholder="e.g. MedSupply PH Inc."
              slotProps={{ input: { readOnly: isView } }}
              sx={fieldSx}
            />
          </Grid>
        </Grid>

        <Divider sx={{ mb: 3 }} />

        {/* Section 2: Classification */}
        <SectionHeader icon={<CategoryRoundedIcon sx={{ fontSize: 16 }} />} label="Classification" />
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
              fullWidth
              placeholder="e.g. PPE, Equipment, Consumables"
              slotProps={{ input: { readOnly: isView } }}
              sx={fieldSx}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Subcategory"
              name="subcategory"
              value={form.subcategory}
              onChange={handleChange}
              fullWidth
              placeholder="e.g. Masks, Beds, IV Supplies"
              slotProps={{ input: { readOnly: isView } }}
              sx={fieldSx}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Unit of Measure"
              name="unit"
              value={form.unit}
              onChange={handleChange}
              fullWidth
              placeholder="e.g. pieces, boxes, sets"
              slotProps={{ input: { readOnly: isView } }}
              sx={fieldSx}
            />
          </Grid>
        </Grid>

        <Divider sx={{ mb: 3 }} />

        {/* Section 3: Stock & Storage */}
        <SectionHeader icon={<WarehouseRoundedIcon sx={{ fontSize: 16 }} />} label="Stock & Storage" />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Batch Number"
              name="batchNumber"
              value={form.batchNumber}
              onChange={handleChange}
              fullWidth
              placeholder="e.g. MASK-2026-001"
              slotProps={{ input: { readOnly: isView } }}
              sx={fieldSx}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Storage Location"
              name="storageLocation"
              value={form.storageLocation}
              onChange={handleChange}
              fullWidth
              placeholder="e.g. Storage Room A"
              slotProps={{ input: { readOnly: isView } }}
              sx={fieldSx}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Expiry Date"
              name="expiryDate"
              value={form.expiryDate}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              slotProps={{ input: { readOnly: isView } }}
              sx={fieldSx}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Quantity On Hand"
              name="quantityOnHand"
              value={form.quantityOnHand}
              onChange={handleChange}
              type="number"
              fullWidth
              placeholder="0"
              slotProps={{ input: { readOnly: isView } }}
              sx={fieldSx}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Unit Cost"
              name="unitCost"
              value={form.unitCost}
              onChange={handleChange}
              type="number"
              fullWidth
              placeholder="0.00"
              InputProps={{
                readOnly: isView,
                startAdornment: <InputAdornment position="start">₱</InputAdornment>,
              }}
              sx={fieldSx}
            />
          </Grid>
        </Grid>
      </DialogContent>

      {/* ── Footer ── */}
      <DialogActions
        sx={{
          px: 3,
          py: 2,
          borderTop: `1px solid ${palette.grey[100]}`,
          bgcolor: palette.background.paper,
          gap: 1,
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 600,
            fontSize: 14,
            borderColor: palette.grey[300],
            color: "grey.700",
            px: 3,
            "&:hover": { borderColor: "grey.400", bgcolor: palette.grey[50] },
          }}
        >
          {isView ? "Close" : "Cancel"}
        </Button>
        {!isView && (
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!form.name}
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 700,
              fontSize: 14,
              bgcolor: palette.primary.main,
              px: 3,
              boxShadow: "none",
              "&:hover": { bgcolor: "#3451d1", boxShadow: "none" },
              "&.Mui-disabled": { bgcolor: palette.grey[200], color: "grey.400" },
            }}
          >
            {isEdit ? "Save Changes" : "Add Item"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AddSupplyModal;
