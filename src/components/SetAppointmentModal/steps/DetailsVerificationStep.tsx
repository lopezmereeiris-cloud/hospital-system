"use client";

import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";
import VaccinesRoundedIcon from "@mui/icons-material/VaccinesRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { palette } from "@/theme/palette";
import type { Doctor } from "../interface";

interface DetailsVerificationStepProps {
  appointmentType: string;
  reason: string;
  notes: string;
  selectedDoctor: Doctor | null;
  onAppointmentTypeChange: (value: string) => void;
  onReasonChange: (value: string) => void;
  onNotesChange: (value: string) => void;
}

const APPOINTMENT_TYPES = [
  {
    value: "Consultation",
    label: "Consultation",
    description: "First-time visit or new health concern",
    icon: <MedicalServicesRoundedIcon />,
    color: palette.primary.main,
  },
  {
    value: "Follow-up",
    label: "Follow-up",
    description: "Return visit for an ongoing treatment",
    icon: <ReplayRoundedIcon />,
    color: palette.info.main,
  },
  {
    value: "Check-up",
    label: "Check-up",
    description: "Regular health screening or annual physical",
    icon: <MonitorHeartRoundedIcon />,
    color: palette.success.main,
  },
  {
    value: "Procedure",
    label: "Procedure",
    description: "Scheduled medical procedure or minor surgery",
    icon: <VaccinesRoundedIcon />,
    color: palette.warning.main,
  },
];

const DetailsVerificationStep: React.FC<DetailsVerificationStepProps> = ({
  appointmentType,
  reason,
  notes,
  selectedDoctor,
  onAppointmentTypeChange,
  onReasonChange,
  onNotesChange,
}) => (
  <Box>
    <Box sx={{ mb: 3 }}>
      <Typography
        sx={{
          fontSize: "0.92rem",
          fontWeight: 700,
          color: "text.primary",
          mb: 0.5,
        }}
      >
        What type of appointment do you need?
      </Typography>
      <Typography sx={{ fontSize: "0.78rem", color: "text.secondary", mb: 2 }}>
        Select the option that best describes your visit so we can assign the most suitable doctor.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr 1fr" },
          gap: 1.5,
        }}
      >
        {APPOINTMENT_TYPES.map((type) => {
          const isSelected = appointmentType === type.value;
          return (
            <Box
              key={type.value}
              onClick={() => onAppointmentTypeChange(type.value)}
              sx={{
                p: 2,
                borderRadius: "14px",
                border: isSelected
                  ? `2px solid ${type.color}`
                  : `1.5px solid ${palette.grey[200]}`,
                backgroundColor: isSelected ? alpha(type.color, 0.05) : palette.background.paper,
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.18s ease",
                "&:hover": {
                  borderColor: type.color,
                  backgroundColor: alpha(type.color, 0.03),
                },
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 1,
                  backgroundColor: isSelected ? alpha(type.color, 0.12) : palette.grey[100],
                  color: isSelected ? type.color : palette.grey[400],
                  transition: "all 0.18s ease",
                  "& svg": { fontSize: 22 },
                }}
              >
                {type.icon}
              </Box>
              <Typography
                sx={{
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: isSelected ? type.color : "text.primary",
                  mb: 0.25,
                }}
              >
                {type.label}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.68rem",
                  color: "text.secondary",
                  lineHeight: 1.35,
                }}
              >
                {type.description}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>



    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
        <EditNoteRoundedIcon sx={{ fontSize: 20, color: "primary.main" }} />
        <Typography sx={{ fontSize: "0.92rem", fontWeight: 700, color: "text.primary" }}>
          Reason for your visit
        </Typography>
      </Box>
      <Typography sx={{ fontSize: "0.78rem", color: "text.secondary", mb: 1.5 }}>
        Briefly describe your symptoms or the reason for your visit.
      </Typography>
      <TextField
        fullWidth
        required
        multiline
        rows={2}
        value={reason}
        onChange={(e) => onReasonChange(e.target.value)}
        placeholder="e.g. Persistent headaches for the past two weeks, recurring chest pain when exercising..."
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            fontSize: "0.88rem",
          },
        }}
      />
    </Box>

    <Box sx={{ mb: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
        <InfoOutlinedIcon sx={{ fontSize: 20, color: "text.secondary" }} />
        <Typography sx={{ fontSize: "0.92rem", fontWeight: 700, color: "text.primary" }}>
          Additional notes
          <Typography
            component="span"
            sx={{ fontSize: "0.78rem", fontWeight: 500, color: "text.secondary", ml: 0.75 }}
          >
            (optional)
          </Typography>
        </Typography>
      </Box>
      <Typography sx={{ fontSize: "0.78rem", color: "text.secondary", mb: 1.5 }}>
        Include any details the doctor should know.
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={3}
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder="e.g. Allergic to Penicillin, currently taking Metformin 500mg, needs wheelchair access..."
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            fontSize: "0.88rem",
          },
        }}
      />
    </Box>
  </Box>
);

export default DetailsVerificationStep;
