"use client";

import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { palette } from "@/theme/palette";
import { format24HourTo12Hour } from "../interface";

interface DateTimeSelectionStepProps {
  selectedDate: string;
  selectedTime: string;
  timeOptions: string[];
  minDate: string;
  onDateChange: (value: string) => void;
  onTimeSelect: (time: string) => void;
}

const DateTimeSelectionStep: React.FC<DateTimeSelectionStepProps> = ({
  selectedDate,
  selectedTime,
  timeOptions,
  minDate,
  onDateChange,
  onTimeSelect,
}) => (
  <Box>
    <TextField
      label="Select Date"
      type="date"
      fullWidth
      value={selectedDate}
      onChange={(e) => onDateChange(e.target.value)}
      InputLabelProps={{ shrink: true }}
      inputProps={{ min: minDate }}
      sx={{
        mb: 3,
        "& .MuiOutlinedInput-root": {
          borderRadius: "14px",
        },
      }}
    />

    {selectedDate && (
      <>
        <Typography
          sx={{
            fontSize: "0.82rem",
            fontWeight: 700,
            color: "text.secondary",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            mb: 1.5,
          }}
        >
          Available Time Slots
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 1.5,
          }}
        >
          {timeOptions.map((time) => {
            const label = format24HourTo12Hour(time);
            const isSelected = selectedTime === time;

            return (
              <Card
                key={time}
                onClick={() => onTimeSelect(time)}
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
                    fontWeight: 700,
                    color: isSelected ? palette.primary.main : palette.text.primary,
                  }}
                >
                  {label}
                </Typography>
                <Typography sx={{ fontSize: "0.72rem", color: "text.secondary", mt: 0.25 }}>
                  Preferred appointment time
                </Typography>
              </Card>
            );
          })}
        </Box>
      </>
    )}
  </Box>
);

export default DateTimeSelectionStep;
