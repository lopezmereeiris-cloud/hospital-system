"use client";

import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { palette } from "@/theme/palette";
import { ID_TYPES } from "../interface";

interface DetailsVerificationStepProps {
  appointmentType: string;
  reason: string;
  notes: string;
  verificationIdType: string;
  verificationIdNumber: string;
  onAppointmentTypeChange: (value: string) => void;
  onReasonChange: (value: string) => void;
  onNotesChange: (value: string) => void;
  onIdTypeChange: (value: string) => void;
  onIdNumberChange: (value: string) => void;
}

const isValidIdNumber = (idNumber: string) => /^[A-Za-z0-9-]{6,20}$/.test(idNumber.trim());

const DetailsVerificationStep: React.FC<DetailsVerificationStepProps> = ({
  appointmentType,
  reason,
  notes,
  verificationIdType,
  verificationIdNumber,
  onAppointmentTypeChange,
  onReasonChange,
  onNotesChange,
  onIdTypeChange,
  onIdNumberChange,
}) => (
  <Box>
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        gap: 2,
        mb: 3,
      }}
    >
      <TextField
        select
        label="Appointment Type"
        fullWidth
        value={appointmentType}
        onChange={(e) => onAppointmentTypeChange(e.target.value)}
      >
        <MenuItem value="Consultation">Consultation</MenuItem>
        <MenuItem value="Follow-up">Follow-up</MenuItem>
        <MenuItem value="Check-up">Check-up</MenuItem>
        <MenuItem value="Procedure">Procedure</MenuItem>
      </TextField>
    </Box>

    <TextField
      label="Reason for Visit"
      fullWidth
      required
      value={reason}
      onChange={(e) => onReasonChange(e.target.value)}
      placeholder="Describe your reason for visiting..."
      sx={{ mb: 2 }}
    />

    <TextField
      label="Additional Notes (optional)"
      fullWidth
      multiline
      rows={3}
      value={notes}
      onChange={(e) => onNotesChange(e.target.value)}
      placeholder="Any additional information you'd like the doctor to know..."
      sx={{ mb: 2.2 }}
    />

    <Box
      sx={{
        p: 2,
        borderRadius: "12px",
        border: `1px solid ${palette.grey[200]}`,
        backgroundColor: "grey.50",
      }}
    >
      <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, color: "text.primary", mb: 1.5 }}>
        Patient Verification ID
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
        }}
      >
        <TextField
          select
          label="ID Type"
          fullWidth
          value={verificationIdType}
          onChange={(e) => onIdTypeChange(e.target.value)}
        >
          {ID_TYPES.map((idType) => (
            <MenuItem key={idType} value={idType}>
              {idType}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="ID Number"
          fullWidth
          value={verificationIdNumber}
          onChange={(e) => onIdNumberChange(e.target.value)}
          error={verificationIdNumber.trim().length > 0 && !isValidIdNumber(verificationIdNumber)}
          helperText={
            verificationIdNumber.trim().length > 0 && !isValidIdNumber(verificationIdNumber)
              ? "Use 6-20 letters/numbers (dashes allowed)."
              : "Example: A12-334455"
          }
        />
      </Box>
    </Box>
  </Box>
);

export default DetailsVerificationStep;
