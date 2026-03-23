"use client";

import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import DashboardCard from "@/components/DashboardCard";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import { Typography } from "@mui/material";
import appointmentsData from "@/json/appointments.json";
import { palette } from "@/theme/palette";
import {
  ActivityItem,
  ActivityMeta,
  ActivityTitle,
  ColumnStack,
  DetailLabel,
  DetailRowRoot,
  DetailValue,
  EmptyStateText,
  HeroCard,
  HeroSubtitle,
  HeroTag,
  HeroTitle,
  PageRoot,
  SectionCardRoot,
  SectionSubtitle,
  SectionTitle,
  StepIconBox,
  StepItem,
  StepText,
  StepTitle,
  TopCardsGrid,
} from "./elements";

interface AppointmentRecord {
  id: number;
  patientName: string;
  assignedDoctor: string;
  date: string;
  time: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled" | string;
  contact?: string;
  email?: string;
  age?: number;
  gender?: string;
  medicalHistory?: string;
  specialNotes?: string;
}

interface SectionCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const CURRENT_DOCTOR = "Dr. Emily Carter";

const dateFormatter = new Intl.DateTimeFormat("en-PH", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const shortDateFormatter = new Intl.DateTimeFormat("en-PH", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

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

const formatDate = (dateValue: string) => {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return dateValue;
  return dateFormatter.format(date);
};

const formatShortDate = (dateValue: string) => {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return dateValue;
  return shortDateFormatter.format(date);
};

const isToday = (dateValue: string) => {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return false;

  const today = new Date();

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};

const isOnOrAfterToday = (dateValue: string) => {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return false;
  date.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return date.getTime() >= today.getTime();
};

function SectionCard({ title, subtitle, children }: SectionCardProps) {
  return (
    <SectionCardRoot>
      <SectionTitle>{title}</SectionTitle>
      <SectionSubtitle>{subtitle}</SectionSubtitle>
      {children}
    </SectionCardRoot>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <DetailRowRoot>
      <DetailLabel>{label}</DetailLabel>
      <DetailValue>{value}</DetailValue>
    </DetailRowRoot>
  );
}

export default function DoctorDashboardPage() {
  const appointments = appointmentsData as AppointmentRecord[];

  const myAppointments = React.useMemo(
    () => appointments.filter((item) => item.assignedDoctor === CURRENT_DOCTOR),
    [appointments]
  );

  const sortedAppointments = React.useMemo(
    () =>
      [...myAppointments].sort((a, b) => {
        if (a.date !== b.date) {
          return a.date.localeCompare(b.date);
        }
        return parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time);
      }),
    [myAppointments]
  );

  const todayAppointments = React.useMemo(
    () => sortedAppointments.filter((item) => isToday(item.date)),
    [sortedAppointments]
  );

  const confirmedToday = React.useMemo(
    () => todayAppointments.filter((item) => item.status === "Confirmed").length,
    [todayAppointments]
  );

  const pendingCount = React.useMemo(
    () => myAppointments.filter((item) => item.status === "Pending").length,
    [myAppointments]
  );

  const completedCount = React.useMemo(
    () => myAppointments.filter((item) => item.status === "Completed").length,
    [myAppointments]
  );

  const upcomingAppointments = React.useMemo(
    () =>
      sortedAppointments.filter(
        (item) =>
          isOnOrAfterToday(item.date) &&
          (item.status === "Pending" || item.status === "Confirmed")
      ),
    [sortedAppointments]
  );

  const nextAppointment = upcomingAppointments[0] ?? null;

  const nextSteps = React.useMemo(() => {
    const steps: Array<{ title: string; detail: string; done: boolean }> = [];

    if (nextAppointment) {
      steps.push({
        title: "Prepare for your next consultation",
        detail: `${nextAppointment.patientName} on ${formatDate(
          nextAppointment.date
        )} at ${nextAppointment.time}.`,
        done: false,
      });
    } else {
      steps.push({
        title: "No upcoming consultation scheduled",
        detail: "Your queue is currently clear for the next available dates.",
        done: true,
      });
    }

    if (pendingCount > 0) {
      steps.push({
        title: "Review pending appointments",
        detail: `You currently have ${pendingCount} pending appointment request${
          pendingCount > 1 ? "s" : ""
        } awaiting attention.`,
        done: false,
      });
    } else {
      steps.push({
        title: "No pending requests",
        detail: "All appointment requests have already been reviewed.",
        done: true,
      });
    }

    if (todayAppointments.length > 0) {
      steps.push({
        title: "Check today’s consultation queue",
        detail: `You have ${todayAppointments.length} appointment${
          todayAppointments.length > 1 ? "s" : ""
        } scheduled for today.`,
        done: false,
      });
    } else {
      steps.push({
        title: "No consultations scheduled for today",
        detail: "Your calendar is currently open for today.",
        done: true,
      });
    }

    return steps;
  }, [nextAppointment, pendingCount, todayAppointments.length]);

  return (
    <PageRoot>
      <HeroCard>
        <HeroTag>Doctor Dashboard</HeroTag>
        <HeroTitle>Welcome back, {CURRENT_DOCTOR}</HeroTitle>
        <HeroSubtitle>
          View your consultation queue, upcoming patient appointments, and daily
          priorities in one place.
        </HeroSubtitle>
      </HeroCard>

      <TopCardsGrid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DashboardCard
            title="Today’s Appointments"
            value={todayAppointments.length}
            subtitle="All patients scheduled for today"
            icon={<CalendarMonthRoundedIcon />}
            color={palette.primary.main}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DashboardCard
            title="Confirmed Today"
            value={confirmedToday}
            subtitle="Ready for consultation"
            icon={<EventAvailableRoundedIcon />}
            color={palette.success.main}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DashboardCard
            title="Pending Requests"
            value={pendingCount}
            subtitle="Appointments awaiting review"
            icon={<HourglassBottomRoundedIcon />}
            color={palette.warning.main}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DashboardCard
            title="Completed Consultations"
            value={completedCount}
            subtitle="Finished patient consultations"
            icon={<TaskAltRoundedIcon />}
            color="#7A5AF8"
          />
        </Grid>
      </TopCardsGrid>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <ColumnStack spacing={2.5}>
            <SectionCard
              title="What you need to do next"
              subtitle="Quick doctor reminders based on your current schedule."
            >
              <Stack spacing={1.2}>
                {nextSteps.map((step) => (
                  <StepItem key={step.title} done={step.done}>
                    <StepIconBox done={step.done}>
                      {step.done ? <TaskAltRoundedIcon /> : <HourglassBottomRoundedIcon />}
                    </StepIconBox>
                    <Box>
                      <StepTitle>{step.title}</StepTitle>
                      <StepText>{step.detail}</StepText>
                    </Box>
                  </StepItem>
                ))}
              </Stack>
            </SectionCard>

            <SectionCard
              title="Your next consultation"
              subtitle="The nearest upcoming patient appointment in your queue."
            >
              {nextAppointment ? (
                <Stack spacing={1.2}>
                  <DetailRow label="Patient" value={nextAppointment.patientName} />
                  <Divider />
                  <DetailRow
                    label="Date and time"
                    value={`${formatDate(nextAppointment.date)} at ${nextAppointment.time}`}
                  />
                  <Divider />
                  <DetailRow
                    label="Status"
                    value={
                      nextAppointment.status === "Pending"
                        ? "Pending confirmation"
                        : nextAppointment.status
                    }
                  />
                  <Divider />
                  <DetailRow
                    label="Reminder"
                    value="Please review patient notes and arrive before the consultation block starts."
                  />
                </Stack>
              ) : (
                <EmptyStateText>
                  No upcoming consultation found in your current schedule.
                </EmptyStateText>
              )}
            </SectionCard>

            <SectionCard
              title="Recent appointment activity"
              subtitle="Latest patient consultations and updates under your care."
            >
              <Stack spacing={1.1}>
                {sortedAppointments.length === 0 && (
                  <EmptyStateText>No appointment activity found yet.</EmptyStateText>
                )}

                {sortedAppointments.slice(0, 4).map((item) => (
                  <ActivityItem key={item.id}>
                    <ActivityTitle>{item.patientName}</ActivityTitle>
                    <ActivityMeta>
                      {formatShortDate(item.date)} at {item.time} • {item.status}
                    </ActivityMeta>
                  </ActivityItem>
                ))}
              </Stack>
            </SectionCard>
          </ColumnStack>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <ColumnStack spacing={2.5}>
            <SectionCard
              title="Today’s queue"
              subtitle="Patients currently lined up in your consultation schedule."
            >
              {todayAppointments.length > 0 ? (
                <Stack spacing={1.2}>
                  {todayAppointments.map((item) => (
                    <ActivityItem key={`today-${item.id}`}>
                      <ActivityTitle>{item.patientName}</ActivityTitle>
                      <ActivityMeta>
                        {item.time} • {item.status}
                      </ActivityMeta>
                    </ActivityItem>
                  ))}
                </Stack>
              ) : (
                <EmptyStateText>
                  No patients are currently scheduled for today.
                </EmptyStateText>
              )}
            </SectionCard>

            <SectionCard
              title="Work summary"
              subtitle="A quick snapshot of your current appointment load."
            >
              <Stack spacing={1.2}>
                <DetailRow
                  label="Total assigned appointments"
                  value={String(myAppointments.length)}
                />
                <Divider />
                <DetailRow
                  label="Upcoming consultations"
                  value={String(upcomingAppointments.length)}
                />
                <Divider />
                <DetailRow
                  label="Completed consultations"
                  value={String(completedCount)}
                />
                <Divider />
                <DetailRow
                  label="Pending requests"
                  value={String(pendingCount)}
                />
              </Stack>

              <Box
                sx={{
                  mt: 1.8,
                  p: 1.4,
                  borderRadius: "12px",
                  backgroundColor: "#F8FAFC",
                  border: `1px solid ${palette.grey[200]}`,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <AccessTimeRoundedIcon
                  sx={{ fontSize: 18, color: palette.primary.main }}
                />
                <Typography sx={{ fontSize: "0.82rem", color: "text.secondary" }}>
                  Tip: Review your schedule page regularly to keep your
                  availability updated.
                </Typography>
              </Box>
            </SectionCard>
          </ColumnStack>
        </Grid>
      </Grid>
    </PageRoot>
  );
}