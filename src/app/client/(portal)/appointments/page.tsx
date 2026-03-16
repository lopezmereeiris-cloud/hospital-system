"use client";

import React, { useMemo, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CalendarViewWeekRoundedIcon from "@mui/icons-material/CalendarViewWeekRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import AppointmentCalendar from "@/components/AppointmentCalendar";
import {
  StyledBodyCell,
  StyledHeaderCell,
  StyledTableRow,
  TableContainer,
} from "@/components/AppointmentTable/elements";
import { Appointment } from "@/components/AppointmentTable/interface";
import ClientAppointmentDetail from "@/components/ClientAppointmentDetail";
import SetAppointmentModal from "@/components/SetAppointmentModal";
import appointmentsData from "@/json/appointments.json";

import { palette } from "@/theme/palette";
const statusColorMap: Record<
  string,
  "warning" | "success" | "info" | "error" | "default"
> = {
  Pending: "warning",
  Confirmed: "info",
  Completed: "success",
  Cancelled: "error",
};

const CURRENT_PATIENT = "Maria Santos";

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

  const twentyFourHourMatch = time.match(/^(\d{1,2}):(\d{2})$/);
  if (twentyFourHourMatch) {
    return Number(twentyFourHourMatch[1]) * 60 + Number(twentyFourHourMatch[2]);
  }

  return 0;
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

export default function ClientAppointmentsPage() {
  const [tabIndex, setTabIndex] = useState(0);
  const [appointments, setAppointments] = useState<Appointment[]>(
    appointmentsData as Appointment[]
  );
  const [myViewMode, setMyViewMode] = useState<"list" | "calendar">("list");
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [setApptOpen, setSetApptOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const myAppointments = useMemo(
    () => appointments.filter((a) => a.patientName === CURRENT_PATIENT),
    [appointments]
  );

  const sortedMyAppointments = useMemo(
    () =>
      [...myAppointments].sort((a, b) => {
        if (a.date !== b.date) {
          return a.date.localeCompare(b.date);
        }
        return parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time);
      }),
    [myAppointments]
  );

  const nextAppointment = useMemo(
    () =>
      sortedMyAppointments.find(
        (appt) => appt.status === "Pending" || appt.status === "Confirmed"
      ) || null,
    [sortedMyAppointments]
  );

  const awaitingApprovalCount = myAppointments.filter(
    (a) => a.status === "Pending"
  ).length;
  const upcomingCount = myAppointments.filter(
    (a) => a.status === "Pending" || a.status === "Confirmed"
  ).length;
  const completedCount = myAppointments.filter(
    (a) => a.status === "Completed"
  ).length;
  const cancelledCount = myAppointments.filter(
    (a) => a.status === "Cancelled"
  ).length;

  const handleRowClick = (appt: Appointment) => {
    setSelectedAppointment(appt);
    setDetailOpen(true);
  };

  const handleBook = (data: {
    doctor: string;
    department: string;
    date: string;
    time: string;
    type: string;
    reason: string;
    notes: string;
  }) => {
    const newAppt: Appointment = {
      id: appointments.length + 1,
      patientName: CURRENT_PATIENT,
      assignedDoctor: data.doctor,
      date: data.date,
      time: data.time,
      status: "Pending",
      contact: "+63 917 000 0000",
      email: "maria.santos@email.com",
      age: 34,
      gender: "Female",
      medicalHistory: "",
      specialNotes: [
        `Reason: ${data.reason}`,
        data.notes ? `Patient note: ${data.notes}` : "",
      ]
        .filter(Boolean)
        .join(" "),
    };

    setAppointments((prev) => [...prev, newAppt]);
    setToastOpen(true);
    setTabIndex(0);
    setMyViewMode("list");
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
            Appointments
          </Typography>
          <Typography sx={{ fontSize: "0.88rem", color: "text.secondary", mt: 0.4 }}>
            View your schedules and send appointment requests.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={() => setSetApptOpen(true)}
          sx={{
            backgroundColor: "primary.main",
            textTransform: "none",
            borderRadius: "10px",
            fontWeight: 600,
            px: 2.5,
            py: 1,
            boxShadow: "none",
            "&:hover": { backgroundColor: "#3A56D4", boxShadow: "none" },
          }}
        >
          Request Appointment
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            label="Awaiting"
            value={awaitingApprovalCount}
            icon={<HourglassBottomRoundedIcon sx={{ fontSize: 20 }} />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            label="Upcoming"
            value={upcomingCount}
            icon={<CalendarMonthRoundedIcon sx={{ fontSize: 20 }} />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            label="Completed"
            value={completedCount}
            icon={<EventNoteRoundedIcon sx={{ fontSize: 20 }} />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            label="Cancelled"
            value={cancelledCount}
            icon={<AccessTimeRoundedIcon sx={{ fontSize: 20 }} />}
          />
        </Grid>
      </Grid>

      <Tabs
        value={tabIndex}
        onChange={(_, value) => setTabIndex(value)}
        sx={{
          mb: 2.4,
          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.88rem",
            minHeight: 40,
          },
          "& .MuiTabs-indicator": { backgroundColor: "primary.main", height: 2.5 },
          "& .Mui-selected": { color: `${palette.primary.main} !important` },
        }}
      >
        <Tab label="My Appointments" />
        <Tab label="Request Appointment" />
      </Tabs>

      {tabIndex === 0 && (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, lg: 8 }}>
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
                <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: "text.primary" }}>
                  My Appointments
                </Typography>

                <ToggleButtonGroup
                  value={myViewMode}
                  exclusive
                  onChange={(_, nextMode) => {
                    if (nextMode) setMyViewMode(nextMode);
                  }}
                  sx={{
                    "& .MuiToggleButton-root": {
                      textTransform: "none",
                      borderRadius: "9px",
                      fontWeight: 600,
                      px: 1.3,
                      py: 0.6,
                    },
                  }}
                >
                  <ToggleButton value="list">
                    <ViewListRoundedIcon sx={{ fontSize: 16, mr: 0.55 }} />
                    List
                  </ToggleButton>
                  <ToggleButton value="calendar">
                    <CalendarViewWeekRoundedIcon sx={{ fontSize: 16, mr: 0.55 }} />
                    Calendar
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>

              {sortedMyAppointments.length === 0 ? (
                <Box sx={{ p: 4.5, textAlign: "center" }}>
                  <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: "text.primary" }}>
                    No appointments yet
                  </Typography>
                  <Typography sx={{ fontSize: "0.85rem", color: "text.secondary", mt: 0.6, mb: 2.4 }}>
                    Create your first request to start scheduling with a doctor.
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => setSetApptOpen(true)}
                    sx={{
                      backgroundColor: "primary.main",
                      textTransform: "none",
                      borderRadius: "10px",
                      fontWeight: 600,
                      px: 2.4,
                      py: 0.95,
                      boxShadow: "none",
                      "&:hover": { backgroundColor: "#3A56D4", boxShadow: "none" },
                    }}
                  >
                    Request Appointment
                  </Button>
                </Box>
              ) : myViewMode === "list" ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <StyledTableRow>
                        <StyledHeaderCell>Doctor</StyledHeaderCell>
                        <StyledHeaderCell>Date</StyledHeaderCell>
                        <StyledHeaderCell>Time</StyledHeaderCell>
                        <StyledHeaderCell>Status</StyledHeaderCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      {sortedMyAppointments.map((appt) => (
                        <StyledTableRow
                          key={appt.id}
                          onClick={() => handleRowClick(appt)}
                          sx={{ cursor: "pointer" }}
                        >
                          <StyledBodyCell>{appt.assignedDoctor}</StyledBodyCell>
                          <StyledBodyCell>{appt.date}</StyledBodyCell>
                          <StyledBodyCell>{appt.time}</StyledBodyCell>
                          <StyledBodyCell>
                            <Chip
                              label={appt.status}
                              color={statusColorMap[appt.status] || "default"}
                              size="small"
                            />
                          </StyledBodyCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Box sx={{ p: 2, overflowX: "auto" }}>
                  <AppointmentCalendar
                    appointments={sortedMyAppointments}
                    onEventClick={handleRowClick}
                  />
                </Box>
              )}
            </Card>
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <Card
              sx={{
                p: 2.2,
                borderRadius: 1,
                border: `1px solid ${palette.grey[200]}`,
                boxShadow: "none",
                height: "100%",
              }}
            >
              <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: "text.primary" }}>
                Next Appointment
              </Typography>
              <Typography sx={{ fontSize: "0.82rem", color: "text.secondary", mt: 0.4 }}>
                Your nearest upcoming schedule.
              </Typography>

              <Divider sx={{ my: 2 }} />

              {nextAppointment ? (
                <>
                  <Chip
                    size="small"
                    label={nextAppointment.status}
                    color={statusColorMap[nextAppointment.status] || "default"}
                    sx={{ mb: 1.2 }}
                  />

                  <Typography sx={{ fontSize: "0.94rem", fontWeight: 700, color: "text.primary" }}>
                    {nextAppointment.assignedDoctor}
                  </Typography>
                  <Typography sx={{ fontSize: "0.84rem", color: "text.secondary", mt: 0.6 }}>
                    {nextAppointment.date} at {nextAppointment.time}
                  </Typography>

                  {nextAppointment.status === "Pending" && (
                    <Alert severity="info" sx={{ mt: 1.8, borderRadius: "10px" }}>
                      Waiting for admin confirmation.
                    </Alert>
                  )}

                  <Button
                    variant="text"
                    onClick={() => handleRowClick(nextAppointment)}
                    sx={{
                      mt: 1.4,
                      px: 0,
                      textTransform: "none",
                      fontWeight: 600,
                      justifyContent: "flex-start",
                    }}
                  >
                    View details
                  </Button>
                </>
              ) : (
                <Typography sx={{ fontSize: "0.85rem", color: "text.secondary" }}>
                  No upcoming appointment found.
                </Typography>
              )}
            </Card>
          </Grid>
        </Grid>
      )}

      {tabIndex === 1 && (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Card
              sx={{
                p: { xs: 2.2, sm: 2.6 },
                borderRadius: 1,
                border: `1px solid ${palette.grey[200]}`,
                boxShadow: "none",
                height: "100%",
              }}
            >
              <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: "text.primary" }}>
                New Appointment Request
              </Typography>
              <Typography sx={{ fontSize: "0.85rem", color: "text.secondary", mt: 0.45 }}>
                Use the multi-step flow to choose a doctor, schedule, visit reason,
                and submit a valid ID.
              </Typography>

              <Box sx={{ mt: 2.2, display: "flex", flexDirection: "column", gap: 1.2 }}>
                <Typography sx={{ fontSize: "0.84rem", color: "grey.600" }}>
                  1. Select doctor and available schedule
                </Typography>
                <Typography sx={{ fontSize: "0.84rem", color: "grey.600" }}>
                  2. Add reason for visit and notes
                </Typography>
                <Typography sx={{ fontSize: "0.84rem", color: "grey.600" }}>
                  3. Provide a valid ID for verification
                </Typography>
                <Typography sx={{ fontSize: "0.84rem", color: "grey.600" }}>
                  4. Submit request for admin confirmation
                </Typography>
              </Box>

              <Button
                variant="contained"
                startIcon={<AddRoundedIcon />}
                onClick={() => setSetApptOpen(true)}
                sx={{
                  mt: 2.4,
                  backgroundColor: "primary.main",
                  textTransform: "none",
                  borderRadius: "10px",
                  fontWeight: 600,
                  px: 2.5,
                  py: 1,
                  boxShadow: "none",
                  "&:hover": { backgroundColor: "#3A56D4", boxShadow: "none" },
                }}
              >
                Start Request
              </Button>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Card
              sx={{
                p: { xs: 2.2, sm: 2.6 },
                borderRadius: 1,
                border: `1px solid ${palette.grey[200]}`,
                boxShadow: "none",
                height: "100%",
              }}
            >
              <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: "text.primary" }}>
                Approval Workflow
              </Typography>
              <Typography sx={{ fontSize: "0.85rem", color: "text.secondary", mt: 0.45 }}>
                Submitted requests are reviewed by the admin team.
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography sx={{ fontSize: "0.84rem", color: "grey.600", mb: 1.1 }}>
                1. Request is submitted by patient.
              </Typography>
              <Typography sx={{ fontSize: "0.84rem", color: "grey.600", mb: 1.1 }}>
                2. Admin validates doctor availability and provided ID.
              </Typography>
              <Typography sx={{ fontSize: "0.84rem", color: "grey.600" }}>
                3. Status is updated to confirmed once approved.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      )}

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
          Request submitted with verification ID. Waiting for admin confirmation.
        </Alert>
      </Snackbar>

      <ClientAppointmentDetail
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        appointment={selectedAppointment}
      />

      <SetAppointmentModal
        open={setApptOpen}
        onClose={() => setSetApptOpen(false)}
        onBook={handleBook}
      />
    </Box>
  );
}
