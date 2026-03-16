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
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import LocalPharmacyRoundedIcon from "@mui/icons-material/LocalPharmacyRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import { Medicine } from "@/components/InventoryTable/interface";
import { palette } from "@/theme/palette";

interface AddMedicineModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (medicine: Medicine) => void;
}

const initialForm = {
  genericName: "",
  brandNames: "",
  manufacturer: "",
  dosageForm: "",
  strength: "",
  therapeuticCategory: "",
  drugCategory: "",
  batchNumber: "",
  quantityOnHand: "",
  unitCost: "",
  expiryDate: "",
  storageLocation: "",
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
    <Typography sx={{ fontSize: 13, fontWeight: 700, color: "grey.700", letterSpacing: "0.03em", textTransform: "uppercase" }}>
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

const AddMedicineModal: React.FC<AddMedicineModalProps> = ({ open, onClose, onAdd }) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    const qty = Number(form.quantityOnHand) || 0;
    const cost = Number(form.unitCost) || 0;
    const newMedicine: Medicine = {
      id: `MED-${Date.now()}`,
      genericName: form.genericName,
      brandNames: form.brandNames ? form.brandNames.split(",").map((b) => b.trim()) : [],
      manufacturer: form.manufacturer,
      fdaRegistrationNo: "",
      atcCode: "",
      pndfListed: false,
      pndfCategory: "",
      dosageForm: form.dosageForm,
      strength: form.strength,
      routeOfAdministration: "",
      therapeuticCategory: form.therapeuticCategory,
      therapeuticAction: "",
      unitOfMeasure: "",
      packSize: "",
      ddbClassification: "",
      genericActCompliance: false,
      dohProgramTag: null,
      philhealthCoverage: false,
      prescriptionRequired: false,
      drugCategory: form.drugCategory,
      storageTemperature: "",
      storageInstructions: "",
      handlingPrecautions: "",
      storageLocation: form.storageLocation,
      batchNumber: form.batchNumber,
      quantityOnHand: qty,
      unitCost: cost,
      totalValue: cost * qty,
      sourceFund: "",
      reorderLevel: 0,
      maximumStockLevel: 0,
      averageMonthlyConsumption: 0,
      status: "Active",
      dateReceived: new Date().toISOString().split("T")[0],
      expiryDate: form.expiryDate,
      manufacturingDate: "",
      dateAddedToSystem: new Date().toISOString().split("T")[0],
      lastUpdatedDate: new Date().toISOString().split("T")[0],
      nearExpiryFlag: false,
      lowStockAlert: false,
      expiredFlag: false,
      recalledFlag: false,
      overstockFlag: false,
    };
    onAdd(newMedicine);
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
      {/* ── Modal Header ── */}
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
            <MedicationRoundedIcon sx={{ fontSize: 22 }} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: 17, fontWeight: 700, color: "grey.900", lineHeight: 1.2 }}>
              Add New Medicine
            </Typography>
            <Typography sx={{ fontSize: 12.5, color: "grey.500", mt: 0.25 }}>
              Fill in the details to add medicine to inventory
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

      {/* ── Modal Body ── */}
      <DialogContent sx={{ px: 3, py: 3, bgcolor: palette.background.default }}>
        {/* Section 1: Medicine Identity */}
        <SectionHeader icon={<MedicationRoundedIcon sx={{ fontSize: 16 }} />} label="Medicine Identity" />
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Generic Name"
              name="genericName"
              value={form.genericName}
              onChange={handleChange}
              fullWidth
              required
              placeholder="e.g. Amoxicillin"
              sx={fieldSx}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Brand Names"
              name="brandNames"
              value={form.brandNames}
              onChange={handleChange}
              fullWidth
              placeholder="e.g. Amoxil, Moxilin (comma separated)"
              sx={fieldSx}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Manufacturer"
              name="manufacturer"
              value={form.manufacturer}
              onChange={handleChange}
              fullWidth
              placeholder="e.g. GlaxoSmithKline Philippines"
              sx={fieldSx}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Dosage Form"
              name="dosageForm"
              value={form.dosageForm}
              onChange={handleChange}
              fullWidth
              placeholder="e.g. Capsule"
              sx={fieldSx}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Strength"
              name="strength"
              value={form.strength}
              onChange={handleChange}
              fullWidth
              placeholder="e.g. 500mg"
              sx={fieldSx}
            />
          </Grid>
        </Grid>

        <Divider sx={{ mb: 3 }} />

        {/* Section 2: Classification */}
        <SectionHeader icon={<LocalPharmacyRoundedIcon sx={{ fontSize: 16 }} />} label="Classification" />
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Therapeutic Category"
              name="therapeuticCategory"
              value={form.therapeuticCategory}
              onChange={handleChange}
              fullWidth
              placeholder="e.g. Antibiotic"
              sx={fieldSx}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Drug Category"
              name="drugCategory"
              value={form.drugCategory}
              onChange={handleChange}
              fullWidth
              placeholder="e.g. Prescription"
              sx={fieldSx}
            />
          </Grid>
        </Grid>

        <Divider sx={{ mb: 3 }} />

        {/* Section 3: Stock & Storage */}
        <SectionHeader icon={<Inventory2RoundedIcon sx={{ fontSize: 16 }} />} label="Stock & Storage" />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Batch Number"
              name="batchNumber"
              value={form.batchNumber}
              onChange={handleChange}
              fullWidth
              placeholder="e.g. BATCH-AMX-2025"
              sx={fieldSx}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Storage Location"
              name="storageLocation"
              value={form.storageLocation}
              onChange={handleChange}
              fullWidth
              placeholder="e.g. Shelf A-1"
              sx={fieldSx}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Expiry Date"
              name="expiryDate"
              value={form.expiryDate}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={fieldSx}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Quantity On Hand"
              name="quantityOnHand"
              value={form.quantityOnHand}
              onChange={handleChange}
              type="number"
              fullWidth
              placeholder="0"
              sx={fieldSx}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Unit Cost"
              name="unitCost"
              value={form.unitCost}
              onChange={handleChange}
              type="number"
              fullWidth
              placeholder="0.00"
              InputProps={{
                startAdornment: <InputAdornment position="start">₱</InputAdornment>,
              }}
              sx={fieldSx}
            />
          </Grid>
        </Grid>
      </DialogContent>

      {/* ── Modal Footer ── */}
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
          Cancel
        </Button>
        <Button
          onClick={handleAdd}
          variant="contained"
          disabled={!form.genericName}
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
          Add Medicine
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMedicineModal;