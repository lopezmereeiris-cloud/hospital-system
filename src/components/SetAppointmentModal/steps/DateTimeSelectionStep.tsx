"use client";

import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { palette } from "@/theme/palette";
import type { Doctor, Schedule } from "../interface";
import { format24HourTo12Hour } from "../interface";

interface DateTimeSelectionStepProps {
  selectedDoctor: Doctor | null;
  selectedDate: string;
  selectedTime: string;
  availableSlots: Schedule[];
  minDate: string;
  onDateChange: (value: string) => void;
  onTimeSelect: (time: string, label: string) => void;
}

const DateTimeSelectionStep: React.FC<DateTimeSelectionStepProps> = ({
  selectedDoctor,
  selectedDate,
  selectedTime,
  availableSlots,
  minDate,
  onDateChange,
  onTimeSelect,
}) => (
  <Box>
    <Typography sx={{ fontSize: "0.92rem", fontWeight: 600, color: "text.primary", mb: 2 }}>
      Selected Doctor: Dr. {selectedDoctor?.firstName} {selectedDoctor?.lastName}
    </Typography>

    <TextField
      label="Select Date"
      type="date"
      fullWidth
      value={selectedDate}
      onChange={(e) => onDateChange(e.target.value)}
      InputLabelProps={{ shrink: true }}
      inputProps={{ min: minDate }}
      sx={{ mb: 3 }}
    />

    {selectedDate && (
      <>
        <Typography
          sx={{
            fontSize: "0.82rem",
            fontWeight: 600,
            color: "text.secondary",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            mb: 1.5,
          }}
        >
          Available Time Slots
        </Typography>
        {availableSlots.length === 0 ? (
          <Box
            sx={{
              p: 3,
              textAlign: "center",
              backgroundColor: "grey.50",
              borderRadius: "12px",
              border: `1px solid ${palette.grey[200]}`,
            }}
          >
            <Typography sx={{ fontSize: "0.88rem", color: "text.secondary" }}>
              No available slots for this date. The doctor is not scheduled for consultations on this day.
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: 1.5,
            }}
          >
            {availableSlots.map((slot, i) => {
              const slotStart = format24HourTo12Hour(slot.startTime);
              const slotEnd = format24HourTo12Hour(slot.endTime);
              const label = `${slotStart} - ${slotEnd}`;
              const isSelected = selectedTime === slotStart;
              return (
                <Card
                  key={i}
                  onClick={() => onTimeSelect(slotStart, label)}
                  sx={{
                    p: 1.75,
                    borderRadius: "10px",
                    border: isSelected
                      ? `2px solid ${palette.primary.main}`
                      : `1px solid ${palette.grey[200]}`,
                    boxShadow: "none",
                    cursor: "pointer",
                    backgroundColor: isSelected ? "rgba(67,97,238,0.04)" : palette.background.paper,
                    textAlign: "center",
                    transition: "all 0.15s ease",
                    "&:hover": { borderColor: "primary.main" },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      color: isSelected ? palette.primary.main : palette.text.primary,
                    }}
                  >
                    {label}
                  </Typography>
                  <Typography sx={{ fontSize: "0.72rem", color: "text.secondary", mt: 0.25 }}>
                    {slot.activity}
                  </Typography>
                </Card>
              );
            })}
          </Box>
        )}
      </>
    )}
  </Box>
);

export default DateTimeSelectionStep;
