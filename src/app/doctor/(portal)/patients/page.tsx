"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { alpha } from "@mui/material/styles";
import PatientList from "@/components/PatientList";
import { patients } from "@/lib/patients";
import { getMedicalRecordsByPatientId } from "@/lib/medicalRecords";
import { palette } from "@/theme/palette";

const GREEN = "#0D8A3F";

export default function DoctorPatientsPage() {
  const [search, setSearch] = React.useState("");

  const patientsWithRecords = React.useMemo(
    () => patients.filter((patient) => getMedicalRecordsByPatientId(patient.patient_id).length > 0),
    []
  );

  const filteredPatients = React.useMemo(
    () =>
      patientsWithRecords.filter((patient) =>
        `${patient.name} ${patient.patient_id}`.toLowerCase().includes(search.toLowerCase())
      ),
    [patientsWithRecords, search]
  );

  return (
    <Box>
      <Paper
        sx={{
          p: "16px 18px",
          mb: 2.5,
          borderRadius: "14px",
          border: `1px solid ${palette.grey[200]}`,
          boxShadow: "none",
        }}
      >
        <Typography sx={{ fontSize: "1.1rem", fontWeight: 700, color: "text.primary" }}>
          Patients
        </Typography>
        <Typography sx={{ fontSize: "0.84rem", color: "text.secondary", mt: 0.55, mb: 1.6 }}>
          Open a patient profile to review longitudinal medical history and print the record as PDF.
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              minWidth: 260,
              bgcolor: palette.background.default,
              borderRadius: "10px",
              border: `1px solid ${palette.grey[200]}`,
              px: 1.5,
              py: 0.3,
              "&:focus-within": { borderColor: GREEN },
            }}
          >
            <SearchRoundedIcon sx={{ color: "grey.400", fontSize: 20, mr: 1 }} />
            <InputBase
              placeholder="Search patients by name or ID…"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              sx={{ flex: 1, fontSize: 14, fontWeight: 500, color: "grey.700" }}
              inputProps={{ "aria-label": "search doctor patients" }}
            />
          </Box>

          <Chip
            label={`${filteredPatients.length} patient${filteredPatients.length !== 1 ? "s" : ""}`}
            size="small"
            sx={{
              bgcolor: alpha(GREEN, 0.08),
              color: GREEN,
              fontWeight: 700,
            }}
          />
        </Box>
      </Paper>

      <PatientList
        patients={filteredPatients}
        basePath="/doctor/patients"
        showRegisterAction={false}
      />
    </Box>
  );
}
