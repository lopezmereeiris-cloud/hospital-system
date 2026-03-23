"use client";

import React, { useMemo, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import AddRoundedIcon from "@mui/icons-material/AddRounded";


import DoctorScheduleCalendar from "@/components/DoctorScheduleCalendar";
import DoctorScheduleDetailModal from "@/components/DoctorScheduleDetailModal";
import SetDoctorScheduleModal from "@/components/SetDoctorScheduleModal";
import {
  DoctorSchedule,
  ScheduleStatus,
} from "@/components/DoctorSchedule";
import { palette } from "@/theme/palette";

const CURRENT_DOCTOR = "Dr. Emily Carter";

const initialSchedules: DoctorSchedule[] = [
  {
    id: 1,
    doctorName: CURRENT_DOCTOR,
    date: "2026-03-08",
    time: "09:00 AM",
    endTime: "12:00 PM",
    department: "General Medicine",
    room: "Consultation Room 1",
    status: "Booked",
    notes: "Morning OPD consultations",
  },
  {
    id: 2,
    doctorName: CURRENT_DOCTOR,
    date: "2026-03-08",
    time: "01:00 PM",
    endTime: "03:00 PM",
    department: "General Medicine",
    room: "Consultation Room 1",
    status: "Available",
    notes: "Open consultation block",
  },
  {
    id: 3,
    doctorName: CURRENT_DOCTOR,
    date: "2026-03-09",
    time: "08:00 AM",
    endTime: "10:00 AM",
    department: "General Medicine",
    room: "Consultation Room 2",
    status: "Booked",
    notes: "Follow up consultations",
  },
  {
    id: 4,
    doctorName: CURRENT_DOCTOR,
    date: "2026-03-09",
    time: "10:30 AM",
    endTime: "12:00 PM",
    department: "General Medicine",
    room: "Consultation Room 2",
    status: "Available",
    notes: "Reserved for walk in patients",
  },
  {
    id: 5,
    doctorName: CURRENT_DOCTOR,
    date: "2026-03-09",
    time: "02:00 PM",
    endTime: "04:00 PM",
    department: "Ward Rounds",
    room: "Inpatient Wing A",
    status: "Unavailable",
    notes: "Inpatient rounds",
  },
  {
    id: 6,
    doctorName: CURRENT_DOCTOR,
    date: "2026-03-10",
    time: "09:00 AM",
    endTime: "11:00 AM",
    department: "General Medicine",
    room: "Consultation Room 1",
    status: "Booked",
    notes: "Morning clinic schedule",
  },
  {
    id: 7,
    doctorName: CURRENT_DOCTOR,
    date: "2026-03-10",
    time: "01:00 PM",
    endTime: "05:00 PM",
    department: "General Medicine",
    room: "Consultation Room 3",
    status: "Available",
    notes: "Afternoon OPD block",
  },
  {
    id: 8,
    doctorName: CURRENT_DOCTOR,
    date: "2026-03-11",
    time: "08:30 AM",
    endTime: "10:30 AM",
    department: "General Medicine",
    room: "Consultation Room 1",
    status: "Booked",
    notes: "Scheduled consultations",
  },
  {
    id: 9,
    doctorName: CURRENT_DOCTOR,
    date: "2026-03-11",
    time: "11:00 AM",
    endTime: "12:00 PM",
    department: "Teleconsultation",
    room: "Online",
    status: "Available",
    notes: "Virtual consultation slot",
  },
  {
    id: 10,
    doctorName: CURRENT_DOCTOR,
    date: "2026-03-11",
    time: "02:00 PM",
    endTime: "04:00 PM",
    department: "Admin / Case Review",
    room: "Doctor’s Office",
    status: "Unavailable",
    notes: "Case reviews and documentation",
  },
  {
    id: 11,
    doctorName: CURRENT_DOCTOR,
    date: "2026-03-12",
    time: "09:00 AM",
    endTime: "12:00 PM",
    department: "General Medicine",
    room: "Consultation Room 1",
    status: "Booked",
    notes: "Morning clinic schedule",
  },
  {
    id: 12,
    doctorName: CURRENT_DOCTOR,
    date: "2026-03-12",
    time: "01:00 PM",
    endTime: "03:00 PM",
    department: "General Medicine",
    room: "Consultation Room 1",
    status: "Available",
    notes: "Open follow up block",
  },
  {
    id: 13,
    doctorName: CURRENT_DOCTOR,
    date: "2026-03-13",
    time: "08:00 AM",
    endTime: "09:30 AM",
    department: "Ward Rounds",
    room: "Inpatient Wing B",
    status: "Unavailable",
    notes: "Morning hospital rounds",
  },
  {
    id: 14,
    doctorName: CURRENT_DOCTOR,
    date: "2026-03-13",
    time: "10:00 AM",
    endTime: "12:00 PM",
    department: "General Medicine",
    room: "Consultation Room 2",
    status: "Booked",
    notes: "Consultation block",
  },
  {
    id: 15,
    doctorName: CURRENT_DOCTOR,
    date: "2026-03-13",
    time: "01:00 PM",
    endTime: "04:00 PM",
    department: "General Medicine",
    room: "Consultation Room 2",
    status: "Available",
    notes: "Afternoon clinic availability",
  },
  {
    id: 16,
    doctorName: CURRENT_DOCTOR,
    date: "2026-03-14",
    time: "09:00 AM",
    endTime: "11:00 AM",
    department: "General Medicine",
    room: "Consultation Room 1",
    status: "Available",
    notes: "Weekend consultation schedule",
  },
  {
    id: 17,
    doctorName: CURRENT_DOCTOR,
    date: "2026-03-14",
    time: "11:30 AM",
    endTime: "01:00 PM",
    department: "Teleconsultation",
    room: "Online",
    status: "Booked",
    notes: "Remote follow up consultations",
  },
  {
    id: 18,
    doctorName: CURRENT_DOCTOR,
    date: "2026-03-14",
    time: "02:00 PM",
    endTime: "04:00 PM",
    department: "Unavailable",
    room: "N/A",
    status: "Unavailable",
    notes: "Personal time / off duty",
  },
];

const parseTimeToMinutes = (rawTime: string) => {
  const time = rawTime.trim();
  const twelveHourMatch = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

  if (twelveHourMatch) {
    let hours = Number(twelveHourMatch[1]);
    const minutes = Number(twelveHourMatch[2]);
    const meridiem = twelveHourMatch[3].toUpperCase();

    if (meridiem === "PM" && hours !== 12) hours += 12;
    if (meridiem === "AM" && hours === 12) hours = 0;

    return hours * 60 + minutes;
  }

  return 0;
};

const formatTimeTo12Hour = (value: string) => {
  const [hourStr, minute] = value.split(":");
  let hour = Number(hourStr);
  const suffix = hour >= 12 ? "PM" : "AM";

  if (hour === 0) hour = 12;
  else if (hour > 12) hour -= 12;

  return `${String(hour).padStart(2, "0")}:${minute} ${suffix}`;
};

const StatCard = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) => (
  <Card
    sx={{
      p: 2.2,
      borderRadius: 1,
      border: `1px solid ${palette.grey[200]}`,
      boxShadow: "none",
      height: "100%",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: "10px",
          backgroundColor: "#EEF4FF",
          color: "primary.main",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography
          sx={{
            fontSize: "0.74rem",
            color: palette.info.dark,
            fontWeight: 600,
            mb: 0.25,
          }}
        >
          {label}
        </Typography>

        <Typography
          sx={{
            fontSize: "1.45rem",
            fontWeight: 700,
            color: "text.primary",
            lineHeight: 1.1,
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  </Card>
);

export default function DoctorSchedulePage() {
  const [schedules, setSchedules] = useState<DoctorSchedule[]>(initialSchedules);
  const [selectedSchedule, setSelectedSchedule] =
    useState<DoctorSchedule | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [setScheduleOpen, setSetScheduleOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const mySchedules = useMemo(
    () => schedules.filter((s) => s.doctorName === CURRENT_DOCTOR),
    [schedules]
  );

  const sortedSchedules = useMemo(
    () =>
      [...mySchedules].sort((a, b) => {
        if (a.date !== b.date) return a.date.localeCompare(b.date);
        return parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time);
      }),
    [mySchedules]
  );

  const totalBlocks = mySchedules.length;
  const upcomingBlocks = mySchedules.filter(
    (s) => s.status === "Available" || s.status === "Booked"
  ).length;
  const availableBlocks = mySchedules.filter(
    (s) => s.status === "Available"
  ).length;
  const unavailableBlocks = mySchedules.filter(
    (s) => s.status === "Unavailable"
  ).length;

 

  const handleRowClick = (schedule: DoctorSchedule) => {
    setSelectedSchedule(schedule);
    setDetailOpen(true);
  };

  const handleAddSchedule = (data: {
    date: string;
    time: string;
    endTime: string;
    department: string;
    room?: string;
    status: ScheduleStatus;
    notes?: string;
  }) => {
    const newSchedule: DoctorSchedule = {
      id: schedules.length + 1,
      doctorName: CURRENT_DOCTOR,
      date: data.date,
      time: formatTimeTo12Hour(data.time),
      endTime: formatTimeTo12Hour(data.endTime),
      department: data.department,
      room: data.room,
      status: data.status,
      notes: data.notes,
    };

    setSchedules((prev) => [...prev, newSchedule]);
    setToastOpen(true);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            Schedule
          </Typography>
          <Typography
            sx={{ fontSize: "0.88rem", color: "text.secondary", mt: 0.4 }}
          >
            Manage your clinic availability and add schedule blocks as needed.
          </Typography>
        </Box>

       
      </Box>
<Grid container spacing={2}>
  <Grid size={{ xs: 12 }}>
    <Card
      sx={{
        borderRadius: 1,
        border: `1px solid ${palette.grey[200]}`,
        boxShadow: "none",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: { xs: 2, sm: 2.2 },
          borderBottom: `1px solid ${palette.grey[200]}`,
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            Weekly Schedule
          </Typography>
          <Typography
            sx={{
              fontSize: "0.82rem",
              color: "text.secondary",
              mt: 0.35,
            }}
          >
            View and manage your current availability blocks.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={() => setSetScheduleOpen(true)}
          sx={{
            backgroundColor: "primary.main",
            textTransform: "none",
            borderRadius: "10px",
            fontWeight: 600,
            px: 2.2,
            py: 0.9,
            boxShadow: "none",
            "&:hover": { backgroundColor: "#3A56D4", boxShadow: "none" },
          }}
        >
          Add Schedule
        </Button>
      </Box>

      {sortedSchedules.length === 0 ? (
        <Box sx={{ p: 4.5, textAlign: "center" }}>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            No schedule blocks yet
          </Typography>
          <Typography
            sx={{
              fontSize: "0.85rem",
              color: "text.secondary",
              mt: 0.6,
              mb: 2.4,
            }}
          >
            Add your first availability block to start managing your doctor
            schedule.
          </Typography>
          <Button
            variant="contained"
            onClick={() => setSetScheduleOpen(true)}
            sx={{
              backgroundColor: "primary.main",
              textTransform: "none",
              borderRadius: "10px",
              fontWeight: 600,
              px: 2.4,
              py: 0.95,
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#3A56D4",
                boxShadow: "none",
              },
            }}
          >
            Add Schedule
          </Button>
        </Box>
      ) : (
        <Box sx={{ p: 2, overflowX: "auto" }}>
          <DoctorScheduleCalendar
            schedules={sortedSchedules}
            onEventClick={handleRowClick}
          />
        </Box>
      )}
    </Card>
  </Grid>
</Grid>

      <Snackbar
        open={toastOpen}
        autoHideDuration={4000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Schedule block added successfully.
        </Alert>
      </Snackbar>

      <DoctorScheduleDetailModal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        schedule={selectedSchedule}
      />

      <SetDoctorScheduleModal
        open={setScheduleOpen}
        onClose={() => setSetScheduleOpen(false)}
        onSave={handleAddSchedule}
      />
    </Box>
  );
}