"use client";

import React, { useMemo, useState } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import Tabs from "@mui/material/Tabs";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import AppointmentCalendar from "@/components/AppointmentCalendar";
import AppointmentTable from "@/components/AppointmentTable";
import AppointmentModal from "@/components/AppointmentModal";
import { StyledBodyCell, StyledHeaderCell, StyledTableRow, TableContainer } from "@/components/AppointmentTable/elements";
import { Appointment } from "@/components/AppointmentTable/interface";
import appointmentsData from "@/json/appointments.json";
import { palette } from "@/theme/palette";

function AuditorStatCard({ label, value }: { label: string; value: number }) {
  return (
    <Card sx={{ p: 2.2, borderRadius: 1, border: `1px solid ${palette.grey[200]}`, boxShadow: "none", height: "100%" }}>
      <Typography sx={{ fontSize: "0.75rem", color: palette.info.dark, fontWeight: 600, mb: 0.5 }}>{label}</Typography>
      <Typography sx={{ fontSize: "1.6rem", fontWeight: 700, color: "text.primary", lineHeight: 1.2 }}>{value}</Typography>
    </Card>
  );
}

export default function AuditorAppointmentsPage() {
  const appointments = appointmentsData as Appointment[];
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [tabIndex, setTabIndex] = useState(0);

  const pendingRequests = useMemo(() => appointments.filter((a) => a.status === "Pending"), [appointments]);
  const counts = {
    total: appointments.length,
    pending: pendingRequests.length,
    confirmed: appointments.filter((a) => a.status === "Confirmed").length,
    completed: appointments.filter((a) => a.status === "Completed").length,
  };

  const fmtDate = (iso: string) => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0 0 4px 0", color: "text.primary" }}>Appointments</h2>
      </Box>

      <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <Grid container spacing={2} sx={{ flex: 1 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}><AuditorStatCard label="Total Appointments" value={counts.total} /></Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}><AuditorStatCard label="Pending" value={counts.pending} /></Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}><AuditorStatCard label="Confirmed" value={counts.confirmed} /></Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}><AuditorStatCard label="Completed" value={counts.completed} /></Grid>
        </Grid>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, mb: 2.5, flexWrap: "wrap" }}>
        <Tabs value={tabIndex} onChange={(_, v) => setTabIndex(v)} sx={{ minHeight: 36, "& .MuiTab-root": { textTransform: "none", fontWeight: 600, fontSize: "0.82rem", minHeight: 36, px: 2 }, "& .MuiTabs-indicator": { height: 2.5, borderRadius: 2 } }}>
          <Tab label="All Appointments" />
          <Tab label={<Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>Appointment Requests{counts.pending > 0 && <Chip label={counts.pending} size="small" sx={{ height: 20, minWidth: 20, fontSize: "0.7rem", fontWeight: 700, bgcolor: "#FEF3F2", color: palette.error.dark, "& .MuiChip-label": { px: 0.6 } }} />}</Box>} />
        </Tabs>

        {tabIndex === 0 && (
          <ToggleButtonGroup value={viewMode} exclusive onChange={(_, value) => { if (value) setViewMode(value); }} sx={{ "& .MuiToggleButton-root": { textTransform: "none", borderRadius: "10px", fontWeight: 600, px: 1.75, py: 0.9 } }}>
            <ToggleButton value="list"><ViewListRoundedIcon sx={{ mr: 0.75, fontSize: 18 }} />List View</ToggleButton>
            <ToggleButton value="calendar"><CalendarMonthRoundedIcon sx={{ mr: 0.75, fontSize: 18 }} />Calendar View</ToggleButton>
          </ToggleButtonGroup>
        )}
      </Box>

      {tabIndex === 0 && (
        <>
          {viewMode === "list" ? (
            <AppointmentTable appointments={appointments} onRowClick={(appointment) => { setSelectedAppointment(appointment); setModalOpen(true); }} />
          ) : (
            <AppointmentCalendar appointments={appointments} onEventClick={(appointment) => { setSelectedAppointment(appointment); setModalOpen(true); }} />
          )}
        </>
      )}

      {tabIndex === 1 && (
        <>
          {pendingRequests.length === 0 ? (
            <Card sx={{ p: 5, borderRadius: 1, border: `1px solid ${palette.grey[200]}`, boxShadow: "none", textAlign: "center" }}>
              <CheckCircleOutlineRoundedIcon sx={{ fontSize: 48, color: "grey.300", mb: 1.5 }} />
              <Typography sx={{ fontSize: "1rem", fontWeight: 600, color: "text.primary", mb: 0.5 }}>No Pending Requests</Typography>
              <Typography sx={{ fontSize: "0.85rem", color: "text.secondary" }}>All appointment requests have been processed.</Typography>
            </Card>
          ) : (
            <Card sx={{ borderRadius: 1, border: `1px solid ${palette.grey[200]}`, boxShadow: "none", overflow: "hidden" }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <StyledTableRow>
                      <StyledHeaderCell>Patient</StyledHeaderCell>
                      <StyledHeaderCell>Doctor</StyledHeaderCell>
                      <StyledHeaderCell>Date</StyledHeaderCell>
                      <StyledHeaderCell>Time</StyledHeaderCell>
                      <StyledHeaderCell>Verification ID</StyledHeaderCell>
                      <StyledHeaderCell>Status</StyledHeaderCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {pendingRequests.map((appt) => (
                      <StyledTableRow key={appt.id} onClick={() => { setSelectedAppointment(appt); setModalOpen(true); }}>
                        <StyledBodyCell>
                          <Box>
                            <Typography sx={{ fontSize: "0.84rem", fontWeight: 600, color: "text.primary" }}>{appt.patientName}</Typography>
                            <Typography sx={{ fontSize: "0.72rem", color: "text.secondary" }}>{appt.contact}</Typography>
                          </Box>
                        </StyledBodyCell>
                        <StyledBodyCell><Typography sx={{ fontSize: "0.84rem", color: "grey.700" }}>{appt.assignedDoctor}</Typography></StyledBodyCell>
                        <StyledBodyCell><Typography sx={{ fontSize: "0.84rem", color: "grey.700" }}>{fmtDate(appt.date)}</Typography></StyledBodyCell>
                        <StyledBodyCell><Typography sx={{ fontSize: "0.84rem", color: "grey.700" }}>{appt.time}</Typography></StyledBodyCell>
                        <StyledBodyCell>
                          {appt.verificationIdType ? (
                            <Box>
                              <Typography sx={{ fontSize: "0.78rem", fontWeight: 500, color: "grey.700" }}>{appt.verificationIdType}</Typography>
                              <Typography sx={{ fontSize: "0.72rem", color: "text.secondary" }}>{appt.verificationIdNumber}</Typography>
                            </Box>
                          ) : (
                            <Typography sx={{ fontSize: "0.78rem", color: "grey.400", fontStyle: "italic" }}>Not provided</Typography>
                          )}
                        </StyledBodyCell>
                        <StyledBodyCell><Chip label={appt.status} color="warning" size="small" /></StyledBodyCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          )}
        </>
      )}

      <AppointmentModal open={modalOpen} onClose={() => setModalOpen(false)} appointment={selectedAppointment} readOnly />
    </div>
  );
}
