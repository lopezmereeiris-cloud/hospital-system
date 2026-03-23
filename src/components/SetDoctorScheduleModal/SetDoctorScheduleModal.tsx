"use client";

import React, { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

type ScheduleStatus = "Available" | "Booked" | "Unavailable";

interface SetDoctorScheduleModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    date: string;
    time: string;
    endTime: string;
    department: string;
    room?: string;
    status: ScheduleStatus;
    notes?: string;
  }) => void;
}

const departmentRoomMap: Record<string, string[]> = {
  "General Medicine": [
    "Consultation Room 1",
    "Consultation Room 2",
    "Consultation Room 3",
  ],
  Pediatrics: [
    "Pedia Room 1",
    "Pedia Room 2",
  ],
  Cardiology: [
    "Cardio Room 1",
    "Cardio Room 2",
  ],
  "Ward Rounds": [
    "Inpatient Wing A",
    "Inpatient Wing B",
    "Inpatient Wing C",
  ],
  Teleconsultation: [
    "Online",
  ],
  "Admin / Case Review": [
    "Doctor's Office",
    "Conference Room",
  ],
  Radiology: [
    "Radiology Room 1",
    "Radiology Room 2",
  ],
  Emergency: [
    "ER Room 1",
    "ER Room 2",
  ],
  Surgery: [
    "Operating Room 1",
    "Operating Room 2",
  ],
};

const initialState = {
  date: "",
  time: "",
  endTime: "",
  department: "",
  room: "",
  status: "Available" as ScheduleStatus,
  notes: "",
};

export default function SetDoctorScheduleModal({
  open,
  onClose,
  onSave,
}: SetDoctorScheduleModalProps) {
  const [form, setForm] = useState(initialState);

  const roomOptions = useMemo(() => {
    if (!form.department) return [];
    return departmentRoomMap[form.department] || [];
  }, [form.department]);

  const handleChange =
    (field: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      if (field === "department") {
        setForm((prev) => ({
          ...prev,
          department: value,
          room: "",
        }));
        return;
      }

      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleClose = () => {
    setForm(initialState);
    onClose();
  };

  const handleSave = () => {
    if (!form.date || !form.time || !form.endTime || !form.department) return;

    onSave({
      date: form.date,
      time: form.time,
      endTime: form.endTime,
      department: form.department,
      room: form.room,
      status: form.status,
      notes: form.notes,
    });

    setForm(initialState);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
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
                mb: 0.5,
              }}
            >
              Add Schedule Block
            </Typography>
            <Typography sx={{ fontSize: "0.88rem", color: "text.secondary" }}>
              Set your availability, room assignment, and current schedule status.
            </Typography>
          </Box>

          <IconButton onClick={handleClose} size="small">
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
          Schedule Information
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
            mb: 3,
          }}
        >
          <TextField
            label="Date"
            type="date"
            value={form.date}
            onChange={handleChange("date")}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <TextField
            label="Department"
            select
            value={form.department}
            onChange={handleChange("department")}
            fullWidth
          >
            {Object.keys(departmentRoomMap).map((department) => (
              <MenuItem key={department} value={department}>
                {department}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Start Time"
            type="time"
            value={form.time}
            onChange={handleChange("time")}
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 300 }}
            fullWidth
          />

          <TextField
            label="End Time"
            type="time"
            value={form.endTime}
            onChange={handleChange("endTime")}
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 300 }}
            fullWidth
          />

          <TextField
            label="Room"
            select
            value={form.room}
            onChange={handleChange("room")}
            fullWidth
            disabled={!form.department}
            helperText={
              !form.department
                ? "Select a department first"
                : roomOptions.length === 0
                ? "No rooms available"
                : ""
            }
          >
            {roomOptions.map((room) => (
              <MenuItem key={room} value={room}>
                {room}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Status"
            select
            value={form.status}
            onChange={handleChange("status")}
            fullWidth
          >
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="Booked">Booked</MenuItem>
            <MenuItem value="Unavailable">Unavailable</MenuItem>
          </TextField>
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

        <TextField
          label="Additional Notes"
          value={form.notes}
          onChange={handleChange("notes")}
          multiline
          rows={4}
          fullWidth
        />
      </DialogContent>

      <DialogActions sx={{ px: 4, pb: 3 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            textTransform: "none",
            borderRadius: "10px",
            fontWeight: 600,
            px: 2.5,
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            backgroundColor: "primary.main",
            textTransform: "none",
            borderRadius: "10px",
            fontWeight: 600,
            px: 2.5,
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#3A56D4",
              boxShadow: "none",
            },
          }}
        >
          Save Schedule
        </Button>
      </DialogActions>
    </Dialog>
  );
}