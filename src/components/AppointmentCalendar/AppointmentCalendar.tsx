"use client";

import React, { useMemo } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Appointment } from "@/components/AppointmentTable/interface";

import { palette } from "@/theme/palette";
interface AppointmentCalendarProps {
  appointments: Appointment[];
  onEventClick?: (appointment: Appointment) => void;
}

const WEEK_DAYS = [
  { key: 0, label: "Sun" },
  { key: 1, label: "Mon" },
  { key: 2, label: "Tue" },
  { key: 3, label: "Wed" },
  { key: 4, label: "Thu" },
  { key: 5, label: "Fri" },
  { key: 6, label: "Sat" },
];

const TIME_SLOTS = [
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

const statusStyles: Record<
  Appointment["status"],
  { bg: string; border: string; color: string }
> = {
  Pending: {
    bg: "#FFF7E8",
    border: "#F7D9A7",
    color: "#B26A00",
  },
  Confirmed: {
    bg: "#EEF4FF",
    border: "#C9D8FF",
    color: "#3157D5",
  },
  Completed: {
    bg: "#ECFDF3",
    border: "#B7E4C7",
    color: "#067647",
  },
  Cancelled: {
    bg: "#FEF3F2",
    border: "#F7C7C3",
    color: "#D92D20",
  },
};

const parseTimeToMinutes = (time: string) => {
  const [clock, modifier] = time.split(" ");
  let [hours, minutes] = clock.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
};

const formatDayLabel = (date: Date) =>
  date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

const getWeekStart = (dateStr: string) => {
  const date = new Date(dateStr);
  const day = date.getDay();
  const start = new Date(date);
  start.setDate(date.getDate() - day);
  start.setHours(0, 0, 0, 0);
  return start;
};

const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({
  appointments,
  onEventClick,
}) => {
  const weekStart = useMemo(() => {
    if (!appointments.length) return getWeekStart("2026-03-12");
    return getWeekStart(appointments[0].date);
  }, [appointments]);

  const weekDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + index);
      return date;
    });
  }, [weekStart]);

  const groupedAppointments = useMemo(() => {
    const grouped: Record<string, Appointment[]> = {};

    appointments.forEach((appointment) => {
      const dateKey = appointment.date;
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(appointment);
    });

    Object.keys(grouped).forEach((dateKey) => {
      grouped[dateKey].sort(
        (a, b) => parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time)
      );
    });

    return grouped;
  }, [appointments]);

  return (
    <Paper
      sx={{
        borderRadius: 2,
        border: `1px solid ${palette.grey[200]}`,
        boxShadow: "none",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 2,
          borderBottom: `1px solid ${palette.grey[200]}`,
          backgroundColor: "grey.50",
        }}
      >
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "text.primary",
          }}
        >
          Weekly Schedule
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "100px repeat(7, minmax(0, 1fr))",
          minWidth: "1100px",
        }}
      >
        <Box
          sx={{
            borderRight: `1px solid ${palette.grey[200]}`,
            borderBottom: `1px solid ${palette.grey[200]}`,
            backgroundColor: "grey.50",
          }}
        />

        {weekDates.map((date, index) => (
          <Box
            key={index}
            sx={{
              px: 1.5,
              py: 1.25,
              borderRight: index === 6 ? "none" : `1px solid ${palette.grey[200]}`,
              borderBottom: `1px solid ${palette.grey[200]}`,
              backgroundColor: "grey.50",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "grey.500",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {WEEK_DAYS[date.getDay()].label}
            </Typography>

            <Typography
              sx={{
                fontSize: "0.88rem",
                fontWeight: 700,
                color: "text.primary",
                mt: 0.35,
              }}
            >
              {formatDayLabel(date)}
            </Typography>
          </Box>
        ))}

        {TIME_SLOTS.map((slot) => (
          <React.Fragment key={slot}>
            <Box
              sx={{
                px: 1.25,
                py: 1.5,
                borderRight: `1px solid ${palette.grey[200]}`,
                borderBottom: `1px solid ${palette.grey[100]}`,
                backgroundColor: "grey.50",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "grey.500",
                }}
              >
                {slot}
              </Typography>
            </Box>

            {weekDates.map((date, index) => {
              const dateKey = date.toISOString().split("T")[0];
              const dayAppointments = groupedAppointments[dateKey] || [];

              const matchingAppointments = dayAppointments.filter((appointment) => {
                const apptMinutes = parseTimeToMinutes(appointment.time);
                const slotMinutes = parseTimeToMinutes(slot);
                return apptMinutes >= slotMinutes && apptMinutes < slotMinutes + 60;
              });

              return (
                <Box
                  key={`${dateKey}-${slot}`}
                  sx={{
                    minHeight: 92,
                    p: 1,
                    borderRight: index === 6 ? "none" : `1px solid ${palette.grey[100]}`,
                    borderBottom: `1px solid ${palette.grey[100]}`,
                    backgroundColor: "background.paper",
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
                    {matchingAppointments.map((appointment) => {
                      const style = statusStyles[appointment.status];

                      return (
                        <Box
                          key={appointment.id}
                          onClick={() => onEventClick?.(appointment)}
                          sx={{
                            p: 1,
                            borderRadius: "10px",
                            backgroundColor: style.bg,
                            border: `1px solid ${style.border}`,
                            cursor: onEventClick ? "pointer" : "default",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "0.72rem",
                              fontWeight: 700,
                              color: style.color,
                              lineHeight: 1.3,
                            }}
                          >
                            {appointment.time}
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: "0.76rem",
                              fontWeight: 700,
                              color: "text.primary",
                              mt: 0.35,
                              lineHeight: 1.3,
                            }}
                          >
                            {appointment.patientName}
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: "0.7rem",
                              color: "grey.500",
                              mt: 0.25,
                              lineHeight: 1.3,
                            }}
                          >
                            {appointment.assignedDoctor}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              );
            })}
          </React.Fragment>
        ))}
      </Box>
    </Paper>
  );
};

export default AppointmentCalendar;