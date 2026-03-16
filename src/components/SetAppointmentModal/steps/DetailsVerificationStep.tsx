"use client";

import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

interface DetailsVerificationStepProps {
  appointmentType: string;
  reason: string;
  notes: string;
  onAppointmentTypeChange: (value: string) => void;
  onReasonChange: (value: string) => void;
  onNotesChange: (value: string) => void;
}

const DetailsVerificationStep: React.FC<DetailsVerificationStepProps> = ({
  appointmentType,
  reason,
  notes,
  onAppointmentTypeChange,
  onReasonChange,
  onNotesChange,
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
    />
  </Box>
);

export default DetailsVerificationStep;
