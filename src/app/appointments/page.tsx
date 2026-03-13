"use client";

import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AppointmentCalendar from "@/components/AppointmentCalendar";
import AppointmentTable from "@/components/AppointmentTable";
import AppointmentModal from "@/components/AppointmentModal";
import { Appointment } from "@/components/AppointmentTable/interface";
import appointmentsData from "@/json/appointments.json";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import BookAppointmentModal from "@/components/BookAppointmentModal";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(
    appointmentsData as Appointment[]
  );
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [bookModalOpen, setBookModalOpen] = useState(false);

  const handleRowClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setModalOpen(true);
  };

  const handleStatusChange = (id: number, status: Appointment["status"]) => {
    setAppointments((prev) =>
      prev.map((appt) => (appt.id === id ? { ...appt, status } : appt))
    );
    setSelectedAppointment((prev) =>
      prev && prev.id === id ? { ...prev, status } : prev
    );
  };

  const counts = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === "Pending").length,
    confirmed: appointments.filter((a) => a.status === "Confirmed").length,
    completed: appointments.filter((a) => a.status === "Completed").length,
  };

  const StatCard = ({ label, value }: { label: string; value: number }) => (
    <Card
      sx={{
        p: 2.2,
        borderRadius: 1,
        border: "1px solid #ECEFF3",
        boxShadow: "none",
        height: "100%",
      }}
    >
      <Typography
        sx={{
          fontSize: "0.75rem",
          color: "#026AA2",
          fontWeight: 600,
          mb: 0.5,
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          fontSize: "1.6rem",
          fontWeight: 700,
          color: "#1A1D1F",
          lineHeight: 1.2,
        }}
      >
        {value}
      </Typography>
    </Card>
  );

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <Typography
          sx={{
            fontSize: "1.3rem",
            fontWeight: 700,
            color: "#1A1D1F",
          }}
        >
          March 12, 2026
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        <Grid container spacing={2} sx={{ flex: 1 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard label="Total Appointments" value={counts.total} />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard label="Pending" value={counts.pending} />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard label="Confirmed" value={counts.confirmed} />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard label="Completed" value={counts.completed} />
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            flexWrap: "wrap",
          }}
        >
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, value) => {
              if (value) setViewMode(value);
            }}
            sx={{
              "& .MuiToggleButton-root": {
                textTransform: "none",
                borderRadius: "10px",
                fontWeight: 600,
                px: 1.75,
                py: 0.9,
              },
            }}
          >
            <ToggleButton value="list">
              <ViewListRoundedIcon sx={{ mr: 0.75, fontSize: 18 }} />
              List View
            </ToggleButton>

            <ToggleButton value="calendar">
              <CalendarMonthRoundedIcon sx={{ mr: 0.75, fontSize: 18 }} />
              Calendar View
            </ToggleButton>
          </ToggleButtonGroup>

          <Button
  variant="contained"
  onClick={() => setBookModalOpen(true)}
  sx={{
    backgroundColor: "#4361EE",
    textTransform: "none",
    borderRadius: "10px",
    fontWeight: 600,
    px: 2.5,
    py: 1,
    boxShadow: "none",
    height: "40px",
    "&:hover": {
      backgroundColor: "#3A56D4",
      boxShadow: "none",
    },
  }}
>
  Book Appointment
</Button>
        </Box>
      </Box>

      {viewMode === "list" ? (
        <AppointmentTable
          appointments={appointments}
          onRowClick={handleRowClick}
        />
      ) : (
        <AppointmentCalendar
          appointments={appointments}
          onEventClick={handleRowClick}
        />
      )}

    <AppointmentModal
  open={modalOpen}
  onClose={() => setModalOpen(false)}
  appointment={selectedAppointment}
  onStatusChange={handleStatusChange}
/>

<BookAppointmentModal
  open={bookModalOpen}
  onClose={() => setBookModalOpen(false)}
/>
    </div>

  );
}
