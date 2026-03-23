"use client";

import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import { DoctorSchedule } from "@/components/DoctorSchedule";

interface DoctorScheduleDetailModalProps {
  open: boolean;
  onClose: () => void;
  schedule: DoctorSchedule | null;
}

const statusColor: Record<string, "success" | "warning" | "error"> = {
  Available: "success",
  Booked: "warning",
  Unavailable: "error",
};

const labelSx = {
  fontSize: "0.72rem",
  fontWeight: 700,
  color: "#6F767E",
  textTransform: "uppercase" as const,
  letterSpacing: "0.06em",
  mb: 0.55,
};

const valueSx = {
  fontSize: "0.95rem",
  fontWeight: 600,
  color: "#1A1D1F",
};

const cardSx = {
  border: "1px solid #E8ECF2",
  borderRadius: "14px",
  padding: "14px 16px",
  backgroundColor: "#FFFFFF",
};

export default function DoctorScheduleDetailModal({
  open,
  onClose,
  schedule,
}: DoctorScheduleDetailModalProps) {
  if (!schedule) return null;

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
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "#1A1D1F",
                mb: 1,
              }}
            >
              {schedule.doctorName}
            </Typography>

            <Chip
              label={schedule.status}
              color={statusColor[schedule.status] || "success"}
              size="small"
              sx={{ fontWeight: 600 }}
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
          Schedule Details
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
            mb: 3,
          }}
        >
          <Box sx={cardSx}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.6 }}>
              <EventAvailableRoundedIcon sx={{ fontSize: 18, color: "#6F767E" }} />
              <Typography sx={labelSx}>Date</Typography>
            </Box>
            <Typography sx={valueSx}>{schedule.date}</Typography>
          </Box>

          <Box sx={cardSx}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.6 }}>
              <AccessTimeRoundedIcon sx={{ fontSize: 18, color: "#6F767E" }} />
              <Typography sx={labelSx}>Time Block</Typography>
            </Box>
            <Typography sx={valueSx}>
              {schedule.time} to {schedule.endTime}
            </Typography>
          </Box>

          <Box sx={cardSx}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.6 }}>
              <LocalHospitalRoundedIcon sx={{ fontSize: 18, color: "#6F767E" }} />
              <Typography sx={labelSx}>Department</Typography>
            </Box>
            <Typography sx={valueSx}>{schedule.department}</Typography>
          </Box>

          <Box sx={cardSx}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.6 }}>
              <MeetingRoomRoundedIcon sx={{ fontSize: 18, color: "#6F767E" }} />
              <Typography sx={labelSx}>Room</Typography>
            </Box>
            <Typography sx={valueSx}>{schedule.room || "Not assigned"}</Typography>
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
          Notes
        </Typography>

        <Box sx={cardSx}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.6 }}>
            <NotesRoundedIcon sx={{ fontSize: 18, color: "#6F767E" }} />
            <Typography sx={labelSx}>Additional Notes</Typography>
          </Box>
          <Typography sx={{ ...valueSx, fontWeight: 500 }}>
            {schedule.notes || "No notes provided."}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}