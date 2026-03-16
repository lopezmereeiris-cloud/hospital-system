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
  mode?: "add" | "edit" | "view";
  editMedicine?: Medicine | null;
  onEdit?: (medicine: Medicine) => void;
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

const AddMedicineModal: React.FC<AddMedicineModalProps> = ({ open, onClose, onAdd, mode = "add", editMedicine, onEdit }) => {
  const [form, setForm] = useState(initialForm);
  const isView = mode === "view";
  const isEdit = mode === "edit";

  React.useEffect(() => {
    if ((isEdit || isView) && editMedicine) {
      setForm({
        genericName: editMedicine.genericName || "",
        brandNames: editMedicine.brandNames?.join(", ") || "",
        manufacturer: editMedicine.manufacturer || "",
        dosageForm: editMedicine.dosageForm || "",
        strength: editMedicine.strength || "",
        therapeuticCategory: editMedicine.therapeuticCategory || "",
        drugCategory: editMedicine.drugCategory || "",
        batchNumber: editMedicine.batchNumber || "",
        quantityOnHand: editMedicine.quantityOnHand?.toString() || "",
        unitCost: editMedicine.unitCost?.toString() || "",
        expiryDate: editMedicine.expiryDate || "",
        storageLocation: editMedicine.storageLocation || "",
      });
    } else if (mode === "add") {
      setForm(initialForm);
    }
  }, [editMedicine, mode, isEdit, isView]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const qty = Number(form.quantityOnHand) || 0;
    const cost = Number(form.unitCost) || 0;
    const medicine: Medicine = {
      ...(isEdit && editMedicine ? editMedicine : {}),
      id: isEdit && editMedicine ? editMedicine.id : `MED-${Date.now()}`,
      genericName: form.genericName,
      brandNames: form.brandNames ? form.brandNames.split(",").map((b) => b.trim()) : [],
      manufacturer: form.manufacturer,
      fdaRegistrationNo: isEdit && editMedicine ? editMedicine.fdaRegistrationNo : "",
      atcCode: isEdit && editMedicine ? editMedicine.atcCode : "",
      pndfListed: isEdit && editMedicine ? editMedicine.pndfListed : false,
      pndfCategory: isEdit && editMedicine ? editMedicine.pndfCategory : "",
      dosageForm: form.dosageForm,
      strength: form.strength,
      routeOfAdministration: isEdit && editMedicine ? editMedicine.routeOfAdministration : "",
      therapeuticCategory: form.therapeuticCategory,
      therapeuticAction: isEdit && editMedicine ? editMedicine.therapeuticAction : "",
      unitOfMeasure: isEdit && editMedicine ? editMedicine.unitOfMeasure : "",
      packSize: isEdit && editMedicine ? editMedicine.packSize : "",
      ddbClassification: isEdit && editMedicine ? editMedicine.ddbClassification : "",
      genericActCompliance: isEdit && editMedicine ? editMedicine.genericActCompliance : false,
      dohProgramTag: isEdit && editMedicine ? editMedicine.dohProgramTag : null,
      philhealthCoverage: isEdit && editMedicine ? editMedicine.philhealthCoverage : false,
      prescriptionRequired: isEdit && editMedicine ? editMedicine.prescriptionRequired : false,
      drugCategory: form.drugCategory,
      storageTemperature: isEdit && editMedicine ? editMedicine.storageTemperature : "",
      storageInstructions: isEdit && editMedicine ? editMedicine.storageInstructions : "",
      handlingPrecautions: isEdit && editMedicine ? editMedicine.handlingPrecautions : "",
      storageLocation: form.storageLocation,
      batchNumber: form.batchNumber,
      quantityOnHand: qty,
      unitCost: cost,
      totalValue: cost * qty,
      sourceFund: isEdit && editMedicine ? editMedicine.sourceFund : "",
      reorderLevel: isEdit && editMedicine ? editMedicine.reorderLevel : 0,
      maximumStockLevel: isEdit && editMedicine ? editMedicine.maximumStockLevel : 0,
      averageMonthlyConsumption: isEdit && editMedicine ? editMedicine.averageMonthlyConsumption : 0,
      status: isEdit && editMedicine ? editMedicine.status : "Active",
      dateReceived: isEdit && editMedicine ? editMedicine.dateReceived : new Date().toISOString().split("T")[0],
      expiryDate: form.expiryDate,
      manufacturingDate: isEdit && editMedicine ? editMedicine.manufacturingDate : "",
      dateAddedToSystem: isEdit && editMedicine ? editMedicine.dateAddedToSystem : new Date().toISOString().split("T")[0],
      lastUpdatedDate: new Date().toISOString().split("T")[0],
      nearExpiryFlag: isEdit && editMedicine ? editMedicine.nearExpiryFlag : false,
      lowStockAlert: isEdit && editMedicine ? editMedicine.lowStockAlert : false,
      expiredFlag: isEdit && editMedicine ? editMedicine.expiredFlag : false,
      recalledFlag: isEdit && editMedicine ? editMedicine.recalledFlag : false,
      overstockFlag: isEdit && editMedicine ? editMedicine.overstockFlag : false,
    };
    if (isEdit) {
      onEdit?.(medicine);
    } else {
      onAdd(medicine);
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
              {isView ? "View Medicine" : isEdit ? "Edit Medicine" : "Add New Medicine"}
            </Typography>
            <Typography sx={{ fontSize: 12.5, color: "grey.500", mt: 0.25 }}>
              {isView ? "Medicine details (read-only)" : isEdit ? "Update the medicine details" : "Fill in the details to add medicine to inventory"}
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
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Generic Name"
              name="genericName"
              value={form.genericName}
              onChange={handleChange}
              fullWidth
              required={!isView}
              placeholder="e.g. Amoxicillin"
              slotProps={{ input: { readOnly: isView } }}
              sx={fieldSx}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Brand Names"
              name="brandNames"
              value={form.brandNames}
              onChange={handleChange}
              fullWidth
              placeholder="e.g. Amoxil, Moxilin (comma separated)"
              slotProps={{ input: { readOnly: isView } }}
              sx={fieldSx}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Manufacturer"
              name="manufacturer"
              value={form.manufacturer}
              onChange={handleChange}
              fullWidth
              placeholder="e.g. GlaxoSmithKline Philippines"
              slotProps={{ input: { readOnly: isView } }}
              sx={fieldSx}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <TextField
              label="Dosage Form"
              name="dosageForm"
              value={form.dosageForm}
              onChange={handleChange}
              fullWidth
              placeholder="e.g. Capsule"
              slotProps={{ input: { readOnly: isView } }}
              sx={fieldSx}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <TextField
              label="Strength"
              name="strength"
              value={form.strength}
              onChange={handleChange}
              fullWidth
              placeholder="e.g. 500mg"
              slotProps={{ input: { readOnly: isView } }}
              sx={fieldSx}
            />
          </Grid>
        </Grid>

        <Divider sx={{ mb: 3 }} />

        {/* Section 2: Classification */}
        <SectionHeader icon={<LocalPharmacyRoundedIcon sx={{ fontSize: 16 }} />} label="Classification" />
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Therapeutic Category"
              name="therapeuticCategory"
              value={form.therapeuticCategory}
              onChange={handleChange}
              fullWidth
              placeholder="e.g. Antibiotic"
              slotProps={{ input: { readOnly: isView } }}
              sx={fieldSx}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Drug Category"
              name="drugCategory"
              value={form.drugCategory}
              onChange={handleChange}
              fullWidth
              placeholder="e.g. Prescription"
              slotProps={{ input: { readOnly: isView } }}
              sx={fieldSx}
            />
          </Grid>
        </Grid>

        <Divider sx={{ mb: 3 }} />

        {/* Section 3: Stock & Storage */}
        <SectionHeader icon={<Inventory2RoundedIcon sx={{ fontSize: 16 }} />} label="Stock & Storage" />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Batch Number"
              name="batchNumber"
              value={form.batchNumber}
              onChange={handleChange}
              fullWidth
              placeholder="e.g. BATCH-AMX-2025"
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
              placeholder="e.g. Shelf A-1"
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
          <Grid size={{ xs: 12, sm: 4 }}>
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
          <Grid size={{ xs: 12, sm: 4 }}>
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
          {isView ? "Close" : "Cancel"}
        </Button>
        {!isView && (
          <Button
            onClick={handleSubmit}
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
            {isEdit ? "Save Changes" : "Add Medicine"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AddMedicineModal;