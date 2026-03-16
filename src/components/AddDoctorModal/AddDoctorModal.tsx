"use client";

import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { palette } from "@/theme/palette";
import { AddDoctorModalProps, AddDoctorFormData } from "./interface";

const STEPS = ["Personal Info", "Professional Details", "Review"];

const SPECIALIZATIONS = [
  "Internal Medicine",
  "Pediatrics",
  "Surgery",
  "OB-GYN",
  "Orthopedics",
  "Dentistry",
  "Dermatology",
  "Pulmonology",
  "Ophthalmology",
  "Neurology",
  "Cardiology",
  "Psychiatry",
  "ENT",
  "Radiology",
  "Pathology",
  "Anesthesiology",
  "Emergency Medicine",
  "Family Medicine",
  "Rehabilitation Medicine",
];

const INITIAL: AddDoctorFormData = {
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfBirth: "",
  sex: "",
  contactNumber: "",
  email: "",
  specialization: "",
  subSpecialization: "",
  department: "",
  prcLicenseNumber: "",
  ptrNumber: "",
  yearsOfExperience: "",
  bio: "",
  status: "Active",
};

const AddDoctorModal: React.FC<AddDoctorModalProps> = ({
  open,
  onClose,
  onAdd,
  departments,
}) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<AddDoctorFormData>(INITIAL);

  const update = (field: keyof AddDoctorFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 0:
        return !!(
          form.firstName &&
          form.lastName &&
          form.dateOfBirth &&
          form.sex &&
          form.contactNumber &&
          form.email
        );
      case 1:
        return !!(
          form.specialization &&
          form.department &&
          form.prcLicenseNumber &&
          form.yearsOfExperience
        );
      default:
        return true;
    }
  };

  const handleClose = () => {
    setStep(0);
    setForm(INITIAL);
    onClose();
  };

  const handleSubmit = () => {
    onAdd(form);
    handleClose();
  };

  const initials = form.firstName && form.lastName
    ? `${form.firstName[0]}${form.lastName[0]}`.toUpperCase()
    : "?";

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogContent sx={{ p: { xs: 2.5, sm: 4 } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
          <div>
            <Typography sx={{ fontSize: "1.25rem", fontWeight: 700, color: "text.primary" }}>
              Add New Doctor
            </Typography>
            <Typography sx={{ fontSize: "0.85rem", color: "text.secondary", mt: 0.5 }}>
              Fill in all required information to register a new doctor.
            </Typography>
          </div>
          <IconButton onClick={handleClose} size="small">
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        <Stepper
          activeStep={step}
          alternativeLabel
          sx={{
            mb: 3.5,
            "& .MuiStepLabel-label": { fontSize: "0.78rem", fontWeight: 600, mt: 0.75 },
            "& .MuiStepIcon-root.Mui-active": { color: "primary.main" },
            "& .MuiStepIcon-root.Mui-completed": { color: "success.main" },
          }}
        >
          {STEPS.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Step 0: Personal Info */}
        {step === 0 && (
          <Box>
            <Typography
              sx={{
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "primary.main",
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <PersonRoundedIcon sx={{ fontSize: 18 }} />
              Personal Information
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" }, gap: 2, mb: 2 }}>
              <TextField
                label="First Name"
                required
                fullWidth
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                size="small"
              />
              <TextField
                label="Middle Name"
                fullWidth
                value={form.middleName}
                onChange={(e) => update("middleName", e.target.value)}
                size="small"
              />
              <TextField
                label="Last Name"
                required
                fullWidth
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                size="small"
              />
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2, mb: 2 }}>
              <TextField
                label="Date of Birth"
                type="date"
                required
                fullWidth
                value={form.dateOfBirth}
                onChange={(e) => update("dateOfBirth", e.target.value)}
                InputLabelProps={{ shrink: true }}
                size="small"
              />
              <TextField
                select
                label="Sex"
                required
                fullWidth
                value={form.sex}
                onChange={(e) => update("sex", e.target.value)}
                size="small"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </TextField>
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
              <TextField
                label="Contact Number"
                required
                fullWidth
                value={form.contactNumber}
                onChange={(e) => update("contactNumber", e.target.value)}
                placeholder="+63 917 123 4567"
                size="small"
              />
              <TextField
                label="Email Address"
                required
                fullWidth
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="doctor@hospital.ph"
                size="small"
              />
            </Box>
          </Box>
        )}

        {/* Step 1: Professional Details */}
        {step === 1 && (
          <Box>
            <Typography
              sx={{
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "primary.main",
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <WorkRoundedIcon sx={{ fontSize: 18 }} />
              Professional Details
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2, mb: 2 }}>
              <TextField
                select
                label="Specialization"
                required
                fullWidth
                value={form.specialization}
                onChange={(e) => update("specialization", e.target.value)}
                size="small"
              >
                {SPECIALIZATIONS.map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </TextField>
              <TextField
                label="Sub-Specialization"
                fullWidth
                value={form.subSpecialization}
                onChange={(e) => update("subSpecialization", e.target.value)}
                placeholder="e.g. Cardiology"
                size="small"
              />
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2, mb: 2 }}>
              <TextField
                select
                label="Department"
                required
                fullWidth
                value={form.department}
                onChange={(e) => update("department", e.target.value)}
                size="small"
              >
                {departments.map((d) => (
                  <MenuItem key={d} value={d}>{d}</MenuItem>
                ))}
              </TextField>
              <TextField
                label="Years of Experience"
                required
                fullWidth
                type="number"
                value={form.yearsOfExperience}
                onChange={(e) => update("yearsOfExperience", e.target.value)}
                inputProps={{ min: 0 }}
                size="small"
              />
            </Box>

            <Typography
              sx={{
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "primary.main",
                mb: 2,
                mt: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <BadgeRoundedIcon sx={{ fontSize: 18 }} />
              License & Credentials
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2, mb: 2 }}>
              <TextField
                label="PRC License Number"
                required
                fullWidth
                value={form.prcLicenseNumber}
                onChange={(e) => update("prcLicenseNumber", e.target.value)}
                placeholder="PRC-XXXXXXX"
                size="small"
              />
              <TextField
                label="PTR Number"
                fullWidth
                value={form.ptrNumber}
                onChange={(e) => update("ptrNumber", e.target.value)}
                placeholder="PTR-XXXX-XXXXX"
                size="small"
              />
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 2, mb: 2 }}>
              <TextField
                label="Bio / Short Description"
                fullWidth
                multiline
                rows={3}
                value={form.bio}
                onChange={(e) => update("bio", e.target.value)}
                placeholder="Brief professional background..."
                size="small"
              />
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
              <TextField
                select
                label="Status"
                fullWidth
                value={form.status}
                onChange={(e) => update("status", e.target.value as AddDoctorFormData["status"])}
                size="small"
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="On Leave">On Leave</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </TextField>
            </Box>
          </Box>
        )}

        {/* Step 2: Review */}
        {step === 2 && (
          <Box>
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  mx: "auto",
                  mb: 1.5,
                  background: `linear-gradient(135deg, ${palette.primary.main}, #6C83F6)`,
                  fontWeight: 700,
                  fontSize: "1.1rem",
                }}
              >
                {initials}
              </Avatar>
              <Typography sx={{ fontSize: "1.1rem", fontWeight: 700, color: "text.primary" }}>
                Dr. {form.firstName} {form.lastName}
              </Typography>
              <Typography sx={{ fontSize: "0.82rem", color: "primary.main", fontWeight: 600, mt: 0.25 }}>
                {form.specialization}
                {form.subSpecialization ? ` — ${form.subSpecialization}` : ""}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 1.5,
              }}
            >
              {[
                { label: "Full Name", value: [form.firstName, form.middleName, form.lastName].filter(Boolean).join(" ") },
                { label: "Date of Birth", value: form.dateOfBirth },
                { label: "Sex", value: form.sex },
                { label: "Contact", value: form.contactNumber },
                { label: "Email", value: form.email },
                { label: "Department", value: form.department },
                { label: "Years of Experience", value: `${form.yearsOfExperience} years` },
                { label: "PRC License", value: form.prcLicenseNumber },
                { label: "PTR Number", value: form.ptrNumber || "—" },
                { label: "Status", value: form.status },
              ].map((item) => (
                <Box
                  key={item.label}
                  sx={{
                    p: 1.5,
                    borderRadius: "10px",
                    backgroundColor: "grey.50",
                    border: `1px solid ${palette.divider}`,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      color: "text.secondary",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      mb: 0.25,
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Typography sx={{ fontSize: "0.85rem", fontWeight: 500, color: "text.primary" }}>
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Box>

            {form.bio && (
              <Box
                sx={{
                  mt: 1.5,
                  p: 1.5,
                  borderRadius: "10px",
                  backgroundColor: "grey.50",
                  border: `1px solid ${palette.divider}`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    color: "text.secondary",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    mb: 0.25,
                  }}
                >
                  Bio
                </Typography>
                <Typography sx={{ fontSize: "0.85rem", fontWeight: 500, color: "text.primary" }}>
                  {form.bio}
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {/* Navigation */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 4,
            pt: 3,
            borderTop: `1px solid ${palette.grey[200]}`,
          }}
        >
          <Button
            disabled={step === 0}
            onClick={() => setStep((s) => s - 1)}
            variant="outlined"
            sx={{ textTransform: "none", borderRadius: "10px", px: 2.5, py: 1, fontWeight: 600 }}
          >
            Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button
              variant="contained"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed()}
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                px: 3,
                py: 1,
                fontWeight: 600,
                boxShadow: "none",
                "&:hover": { boxShadow: "none" },
              }}
            >
              Continue
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: palette.success.main,
                textTransform: "none",
                borderRadius: "10px",
                px: 3,
                py: 1,
                fontWeight: 600,
                boxShadow: "none",
                "&:hover": { backgroundColor: "#0E9F5A", boxShadow: "none" },
              }}
            >
              Add Doctor
            </Button>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddDoctorModal;
