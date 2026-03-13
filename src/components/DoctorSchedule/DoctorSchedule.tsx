"use client";

import React, { useMemo } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export interface ScheduleBlock {
  day: string;
  startTime: string;
  endTime: string;
  activity: string;
  type: "consultation" | "procedure" | "rounds" | "specialty" | "admin" | "break";
}

interface DoctorScheduleProps {
  schedule: ScheduleBlock[];
}

const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const TIME_SLOTS = [
  "07:00", "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00", "16:00",
];

const TIME_LABELS: Record<string, string> = {
  "07:00": "7:00 AM",
  "08:00": "8:00 AM",
  "09:00": "9:00 AM",
  "10:00": "10:00 AM",
  "11:00": "11:00 AM",
  "12:00": "12:00 PM",
  "13:00": "1:00 PM",
  "14:00": "2:00 PM",
  "15:00": "3:00 PM",
  "16:00": "4:00 PM",
};

const typeStyles: Record<ScheduleBlock["type"], { bg: string; border: string; color: string }> = {
  consultation: { bg: "#EEF4FF", border: "#C9D8FF", color: "#3157D5" },
  procedure: { bg: "#F4F0FF", border: "#DDD5F9", color: "#6941C6" },
  rounds: { bg: "#ECFDF3", border: "#B7E4C7", color: "#067647" },
  specialty: { bg: "#FFF1E7", border: "#FDDCB7", color: "#C4530A" },
  admin: { bg: "#F2F4F7", border: "#D0D5DD", color: "#475467" },
  break: { bg: "#FFFAEB", border: "#FEDF89", color: "#B54708" },
};

const parseToMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const DoctorSchedule: React.FC<DoctorScheduleProps> = ({ schedule }) => {
  const grouped = useMemo(() => {
    const map: Record<string, ScheduleBlock[]> = {};
    WEEK_DAYS.forEach((d) => (map[d] = []));
    schedule.forEach((block) => {
      if (map[block.day]) map[block.day].push(block);
    });
    return map;
  }, [schedule]);

  return (
    <Paper
      sx={{
        borderRadius: 2,
        border: "1px solid #ECEFF3",
        boxShadow: "none",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 2,
          borderBottom: "1px solid #ECEFF3",
          backgroundColor: "#FCFCFD",
        }}
      >
        <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: "#1A1D1F" }}>
          Weekly Schedule
        </Typography>
      </Box>

      <Box sx={{ overflowX: "auto" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "100px repeat(7, minmax(0, 1fr))",
            minWidth: "1100px",
          }}
        >
          {/* Top-left blank cell */}
          <Box
            sx={{
              borderRight: "1px solid #ECEFF3",
              borderBottom: "1px solid #ECEFF3",
              backgroundColor: "#FCFCFD",
            }}
          />

          {/* Day column headers */}
          {DAY_LABELS.map((label, index) => (
            <Box
              key={label}
              sx={{
                px: 1.5,
                py: 1.25,
                borderRight: index === 6 ? "none" : "1px solid #ECEFF3",
                borderBottom: "1px solid #ECEFF3",
                backgroundColor: "#FCFCFD",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "#6B7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {label}
              </Typography>
              <Typography
                sx={{ fontSize: "0.88rem", fontWeight: 700, color: "#1A1D1F", mt: 0.35 }}
              >
                {WEEK_DAYS[index]}
              </Typography>
            </Box>
          ))}

          {/* Time rows */}
          {TIME_SLOTS.map((slot) => (
            <React.Fragment key={slot}>
              {/* Time label */}
              <Box
                sx={{
                  px: 1.25,
                  py: 1.5,
                  borderRight: "1px solid #ECEFF3",
                  borderBottom: "1px solid #F2F4F7",
                  backgroundColor: "#FCFCFD",
                }}
              >
                <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, color: "#6B7280" }}>
                  {TIME_LABELS[slot]}
                </Typography>
              </Box>

              {/* Day cells */}
              {WEEK_DAYS.map((day, dayIdx) => {
                const slotMin = parseToMinutes(slot);
                const blocks = grouped[day].filter((b) => {
                  const start = parseToMinutes(b.startTime);
                  return start >= slotMin && start < slotMin + 60;
                });

                return (
                  <Box
                    key={`${day}-${slot}`}
                    sx={{
                      minHeight: 92,
                      p: 1,
                      borderRight: dayIdx === 6 ? "none" : "1px solid #F2F4F7",
                      borderBottom: "1px solid #F2F4F7",
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
                      {blocks.map((block, bIdx) => {
                        const style = typeStyles[block.type];
                        const durationHrs =
                          (parseToMinutes(block.endTime) - parseToMinutes(block.startTime)) / 60;

                        return (
                          <Box
                            key={bIdx}
                            sx={{
                              p: 1,
                              borderRadius: "10px",
                              backgroundColor: style.bg,
                              border: `1px solid ${style.border}`,
                              minHeight: durationHrs > 1 ? 60 : undefined,
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
                              {TIME_LABELS[block.startTime] || block.startTime} –{" "}
                              {TIME_LABELS[block.endTime] || block.endTime}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "0.76rem",
                                fontWeight: 700,
                                color: "#1A1D1F",
                                mt: 0.35,
                                lineHeight: 1.3,
                              }}
                            >
                              {block.activity}
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
      </Box>

      {/* Legend */}
      <Box
        sx={{
          px: 3,
          py: 1.5,
          borderTop: "1px solid #ECEFF3",
          backgroundColor: "#FCFCFD",
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {(Object.entries(typeStyles) as [ScheduleBlock["type"], typeof typeStyles.consultation][]).map(
          ([type, style]) => (
            <Box key={type} sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "3px",
                  backgroundColor: style.bg,
                  border: `1px solid ${style.border}`,
                }}
              />
              <Typography
                sx={{
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  color: "#6B7280",
                  textTransform: "capitalize",
                }}
              >
                {type}
              </Typography>
            </Box>
          )
        )}
      </Box>
    </Paper>
  );
};

export default DoctorSchedule;
