"use client";

import React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { palette } from "@/theme/palette";
import type { Doctor } from "../interface";

interface ConfirmationStepProps {
  selectedDoctor: Doctor | null;
  selectedDate: string;
  selectedTime: string;
  selectedTimeLabel: string;
  appointmentType: string;
  reason: string;
  notes: string;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  selectedDoctor,
  selectedDate,
  selectedTime,
  selectedTimeLabel,
  appointmentType,
  reason,
  notes,
}) => (
  <Box>
    <Box sx={{ textAlign: "center", mb: 3 }}>
      <CheckCircleRoundedIcon sx={{ fontSize: 48, color: "success.main", mb: 1 }} />
      <Typography sx={{ fontSize: "1.1rem", fontWeight: 700, color: "text.primary" }}>
        Review Your Appointment
      </Typography>
      <Typography sx={{ fontSize: "0.85rem", color: "text.secondary", mt: 0.5 }}>
        Please review the details below before confirming.
      </Typography>
    </Box>

    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        gap: 2,
      }}
    >
      {[
        { label: "Doctor", value: `Dr. ${selectedDoctor?.firstName} ${selectedDoctor?.lastName}` },
        { label: "Department", value: selectedDoctor?.department || "" },
        { label: "Date", value: selectedDate },
        { label: "Time", value: selectedTimeLabel || selectedTime },
        { label: "Type", value: appointmentType },
        { label: "Reason", value: reason },
      ].map((item) => (
        <Box
          key={item.label}
          sx={{
            p: 2,
            borderRadius: "12px",
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
              mb: 0.5,
            }}
          >
            {item.label}
          </Typography>
          <Typography sx={{ fontSize: "0.88rem", fontWeight: 500, color: "text.primary" }}>
            {item.value}
          </Typography>
        </Box>
      ))}
    </Box>

    {notes && (
      <Box
        sx={{
          mt: 2,
          p: 2,
          borderRadius: "12px",
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
            mb: 0.5,
          }}
        >
          Additional Notes
        </Typography>
        <Typography sx={{ fontSize: "0.88rem", fontWeight: 500, color: "text.primary" }}>
          {notes}
        </Typography>
      </Box>
    )}

    <Alert severity="info" sx={{ mt: 2, borderRadius: "10px" }}>
      After submission, this request remains pending while admin validates schedule availability.
    </Alert>
  </Box>
);

export default ConfirmationStep;
