"use client";

import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import AppointmentTable from "@/components/AppointmentTable";
import AppointmentModal from "@/components/AppointmentModal";
import { Appointment } from "@/components/AppointmentTable/interface";
import appointmentsData from "@/json/appointments.json";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(
    appointmentsData as Appointment[]
  );
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

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

  return (
    <div>
      {/* Summary bar */}
      <Card
        sx={{
          p: 2.5,
          mb: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "text.primary", mr: 1 }}>
          Overview
        </Typography>
        <Chip label={`${counts.total} Total`} size="small" />
        <Chip label={`${counts.pending} Pending`} color="warning" size="small" />
        <Chip label={`${counts.confirmed} Confirmed`} color="info" size="small" />
        <Chip label={`${counts.completed} Completed`} color="success" size="small" />

        <Typography
          sx={{ fontSize: "0.78rem", color: "text.secondary", ml: "auto" }}
        >
          Click on a row to view full details
        </Typography>
      </Card>

      <AppointmentTable
        appointments={appointments}
        onRowClick={handleRowClick}
      />

      <AppointmentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        appointment={selectedAppointment}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
  
