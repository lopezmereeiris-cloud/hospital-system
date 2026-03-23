"use client";

import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { palette } from "@/theme/palette";
import type { DoctorSchedule } from "@/components/DoctorSchedule";

interface DoctorScheduleCalendarProps {
  schedules: DoctorSchedule[];
  onEventClick?: (schedule: DoctorSchedule) => void;
}

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const START_HOUR = 8;
const END_HOUR = 18;
const HOUR_HEIGHT = 88;

const parseTimeToMinutes = (rawTime: string) => {
  const [time, modifier] = rawTime.trim().split(" ");
  let [hours, minutes] = time.split(":").map(Number);

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

const statusStyles = {
  Available: {
    bg: "#ECFDF3",
    border: "#ABEFC6",
    text: "#067647",
  },
  Booked: {
    bg: "#EEF4FF",
    border: "#C7D7FE",
    text: "#1D4ED8",
  },
  Unavailable: {
    bg: "#FEF3F2",
    border: "#FECDCA",
    text: "#D92D20",
  },
};

export default function DoctorScheduleCalendar({
  schedules,
  onEventClick,
}: DoctorScheduleCalendarProps) {
  const weekStart = useMemo(() => {
    if (!schedules.length) return getWeekStart("2026-03-12");
    return getWeekStart(schedules[0].date);
  }, [schedules]);

  const weekDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + index);
      return date;
    });
  }, [weekStart]);

  const schedulesByDate = useMemo(() => {
    const grouped: Record<string, DoctorSchedule[]> = {};

    schedules.forEach((schedule) => {
      if (!grouped[schedule.date]) grouped[schedule.date] = [];
      grouped[schedule.date].push(schedule);
    });

    return grouped;
  }, [schedules]);

  const timeLabels = Array.from(
    { length: END_HOUR - START_HOUR },
    (_, i) => START_HOUR + i
  );

  const dayColumnHeight = (END_HOUR - START_HOUR) * HOUR_HEIGHT;

  return (
    <Box
      sx={{
        border: `1px solid ${palette.grey[200]}`,
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: "#FFF",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "80px repeat(7, 1fr)",
          borderBottom: `1px solid ${palette.grey[200]}`,
          backgroundColor: "#FCFCFD",
        }}
      >
        <Box sx={{ borderRight: `1px solid ${palette.grey[200]}` }} />

        {weekDates.map((date, index) => (
          <Box
            key={index}
            sx={{
              py: 1.8,
              textAlign: "center",
              borderRight:
                index === 6 ? "none" : `1px solid ${palette.grey[200]}`,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.76rem",
                fontWeight: 700,
                color: "grey.500",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {WEEK_DAYS[date.getDay()]}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.86rem",
                fontWeight: 700,
                color: "text.primary",
                mt: 0.35,
              }}
            >
              {formatDayLabel(date)}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "120px repeat(7, 1fr)",
        }}
      >
        {/* Time labels */}
        <Box sx={{ borderRight: `1px solid ${palette.grey[200]}` }}>
          {timeLabels.map((hour) => {
            const displayHour =
              hour === 12 ? 12 : hour > 12 ? hour - 12 : hour;
            const suffix = hour >= 12 ? "PM" : "AM";

            return (
              <Box
                key={hour}
                sx={{
                  height: HOUR_HEIGHT,
                  px: 1.5,
                  py: 1.25,
                  borderBottom: `1px solid ${palette.grey[100]}`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "grey.500",
                  }}
                >
                  {`${String(displayHour).padStart(2, "0")}:00 ${suffix}`}
                </Typography>
              </Box>
            );
          })}
        </Box>

        {/* Day columns */}
        {weekDates.map((date, index) => {
          const dateKey = date.toISOString().split("T")[0];
          const daySchedules = schedulesByDate[dateKey] || [];

          return (
            <Box
              key={dateKey}
              sx={{
                position: "relative",
                height: dayColumnHeight,
                borderRight:
                  index === 6 ? "none" : `1px solid ${palette.grey[200]}`,
                backgroundImage: `repeating-linear-gradient(
                  to bottom,
                  transparent,
                  transparent ${HOUR_HEIGHT - 1}px,
                  ${palette.grey[100]} ${HOUR_HEIGHT - 1}px,
                  ${palette.grey[100]} ${HOUR_HEIGHT}px
                )`,
              }}
            >
              {daySchedules.map((schedule) => {
                const startMinutes = parseTimeToMinutes(schedule.time);
                const endMinutes = parseTimeToMinutes(schedule.endTime);

                const top =
                  ((startMinutes - START_HOUR * 60) / 60) * HOUR_HEIGHT;
                const height =
                  ((endMinutes - startMinutes) / 60) * HOUR_HEIGHT;

                const style = statusStyles[schedule.status];

                return (
                  <Box
                    key={schedule.id}
                    onClick={() => onEventClick?.(schedule)}
                    sx={{
                      position: "absolute",
                      top,
                      left: 8,
                      right: 8,
                      height: Math.max(height - 6, 44),
                      p: 1.2,
                      borderRadius: "12px",
                      backgroundColor: style.bg,
                      border: `1px solid ${style.border}`,
                      cursor: onEventClick ? "pointer" : "default",
                      overflow: "hidden",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: style.text,
                        lineHeight: 1.25,
                      }}
                    >
                      {schedule.time} to {schedule.endTime}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: "text.primary",
                        mt: 0.4,
                        lineHeight: 1.25,
                      }}
                    >
                      {schedule.department}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "0.72rem",
                        color: "grey.500",
                        mt: 0.25,
                        lineHeight: 1.25,
                      }}
                    >
                      {schedule.room || "Room TBD"}
                    </Typography>

                    <Chip
                      label={schedule.status}
                      size="small"
                      sx={{
                        mt: 0.8,
                        height: 22,
                        fontSize: "0.66rem",
                        fontWeight: 700,
                        backgroundColor: "#FFF",
                      }}
                    />
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}