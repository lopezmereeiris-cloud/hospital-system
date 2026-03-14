"use client";

import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { palette } from "@/theme/palette";
import type { Doctor } from "../interface";

interface DoctorSelectionStepProps {
  departments: string[];
  filteredDoctors: Doctor[];
  selectedDepartment: string;
  selectedDoctor: Doctor | null;
  onDepartmentChange: (value: string) => void;
  onDoctorSelect: (doctor: Doctor) => void;
}

const DoctorSelectionStep: React.FC<DoctorSelectionStepProps> = ({
  departments,
  filteredDoctors,
  selectedDepartment,
  selectedDoctor,
  onDepartmentChange,
  onDoctorSelect,
}) => (
  <Box>
    <TextField
      select
      label="Filter by Department"
      fullWidth
      value={selectedDepartment}
      onChange={(e) => onDepartmentChange(e.target.value)}
      sx={{ mb: 3 }}
    >
      <MenuItem value="">All Departments</MenuItem>
      {departments.map((dep) => (
        <MenuItem key={dep} value={dep}>
          {dep}
        </MenuItem>
      ))}
    </TextField>

    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      {filteredDoctors.map((doc) => (
        <Card
          key={doc.doctorId}
          onClick={() => onDoctorSelect(doc)}
          sx={{
            p: 2,
            borderRadius: "12px",
            border:
              selectedDoctor?.doctorId === doc.doctorId
                ? `2px solid ${palette.primary.main}`
                : `1px solid ${palette.grey[200]}`,
            boxShadow: "none",
            cursor: "pointer",
            transition: "all 0.15s ease",
            backgroundColor:
              selectedDoctor?.doctorId === doc.doctorId
                ? "rgba(67,97,238,0.04)"
                : palette.background.paper,
            "&:hover": {
              borderColor: "primary.main",
              backgroundColor: "rgba(67,97,238,0.02)",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              sx={{
                bgcolor: "#EEF4FF",
                color: "primary.main",
                fontWeight: 700,
                width: 44,
                height: 44,
                fontSize: "0.88rem",
              }}
            >
              {doc.firstName[0]}
              {doc.lastName[0]}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: "0.92rem", fontWeight: 600, color: "text.primary" }}>
                Dr. {doc.firstName} {doc.lastName}
              </Typography>
              <Typography sx={{ fontSize: "0.78rem", color: "text.secondary", mt: 0.25 }}>
                {doc.specialization} - {doc.subSpecialization}
              </Typography>
              <Typography sx={{ fontSize: "0.74rem", color: "grey.400", mt: 0.25 }}>
                {doc.yearsOfExperience} years of experience
              </Typography>
            </Box>
            <Chip
              label={doc.department}
              size="small"
              sx={{
                fontSize: "0.72rem",
                fontWeight: 600,
                backgroundColor: "divider",
                color: "text.secondary",
              }}
            />
          </Box>
        </Card>
      ))}
    </Box>
  </Box>
);

export default DoctorSelectionStep;
