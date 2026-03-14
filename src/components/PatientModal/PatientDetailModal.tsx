"use client";

import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Patient } from "@/components/PatientList/interface";

interface Props {
  open: boolean;
  onClose: () => void;
  patient: Patient | null;
}

const statusColor: Record<string, "success" | "error" | "warning"> = {
  Active: "success",
  Admitted: "warning",
  Discharged: "error",
};

const labelStyle = {
  fontSize: "0.78rem",
  fontWeight: 700,
  color: "#6F767E",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  mb: 0.5,
};

const valueStyle = {
  fontSize: "0.95rem",
  fontWeight: 600,
  color: "#1A1D1F",
};

const infoCardStyle = {
  border: "1px solid #E8ECF2",
  borderRadius: "14px",
  padding: "14px 18px",
  backgroundColor: "#FFFFFF",
};

export default function PatientDetailModal({
  open,
  onClose,
  patient,
}: Props) {
  if (!patient) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent sx={{ p: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 3,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "1.15rem",
                fontWeight: 700,
                color: "#1A1D1F",
                mb: 1,
              }}
            >
              {patient.name}
            </Typography>

            <Chip
              label={patient.status}
              color={statusColor[patient.status] || "success"}
              size="small"
              sx={{
                fontWeight: 600,
              }}
            />
          </Box>

          <IconButton onClick={onClose} size="small">
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        <Typography
          sx={{
            fontSize: "0.95rem",
            fontWeight: 700,
            color: "#6F767E",
            mb: 1.75,
          }}
        >
          Patient Details
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
            mb: 3,
          }}
        >
          <Box sx={infoCardStyle}>
            <Typography sx={labelStyle}>Patient ID</Typography>
            <Typography sx={valueStyle}>{patient.patient_id}</Typography>
          </Box>

          <Box sx={infoCardStyle}>
            <Typography sx={labelStyle}>Age</Typography>
            <Typography sx={valueStyle}>{patient.age} years old</Typography>
          </Box>

          <Box sx={infoCardStyle}>
            <Typography sx={labelStyle}>Gender</Typography>
            <Typography sx={valueStyle}>{patient.gender}</Typography>
          </Box>

          <Box sx={infoCardStyle}>
            <Typography sx={labelStyle}>PhilHealth #</Typography>
            <Typography sx={valueStyle}>{patient.philhealth_number}</Typography>
          </Box>

          <Box sx={infoCardStyle}>
            <Typography sx={labelStyle}>Contact</Typography>
            <Typography sx={valueStyle}>{patient.contact_number}</Typography>
          </Box>

          <Box sx={infoCardStyle}>
            <Typography sx={labelStyle}>Address</Typography>
            <Typography sx={valueStyle}>{patient.address}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2.5 }} />

        <Typography
          sx={{
            fontSize: "0.95rem",
            fontWeight: 700,
            color: "#6F767E",
            mb: 1.75,
          }}
        >
          Visit Information
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
            mb: 3,
          }}
        >
          <Box sx={infoCardStyle}>
            <Typography sx={labelStyle}>Status</Typography>
            <Typography sx={valueStyle}>{patient.status}</Typography>
          </Box>

          <Box sx={infoCardStyle}>
            <Typography sx={labelStyle}>Last Visit</Typography>
            <Typography sx={valueStyle}>{patient.last_visit}</Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}