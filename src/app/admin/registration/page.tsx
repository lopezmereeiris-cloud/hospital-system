"use client";

import React, { useState } from "react";
import PatientList from "@/components/PatientList";
import { Patient } from "@/components/PatientList/interface";
import patientsData from "@/json/patients.json";
import { Box, InputBase } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { palette } from "@/theme/palette";
import Paper from "@mui/material/Paper";
import { alpha } from "@mui/material/styles";
import Chip from "@mui/material/Chip";

const green = "#0D8A3F";

export default function PatientsPage() {
  const patients = patientsData as Patient[];
  const [search, setSearch] = useState("");

  const filteredPatients = patients.filter((p) =>
    `${p.name} ${p.patient_id}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* ── Toolbar ── */}
      <Paper
        sx={{
          p: "12px 16px",
          mb: 2.5,
          borderRadius: "12px",
          border: `1px solid ${palette.grey[200]}`,
          boxShadow: "none",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              bgcolor: palette.background.default,
              borderRadius: "8px",
              border: `1px solid ${palette.grey[200]}`,
              px: 1.5,
              py: 0.25,
              transition: "border-color 0.2s",
              "&:focus-within": { borderColor: green },
            }}
          >
            <SearchRoundedIcon sx={{ color: "grey.400", fontSize: 20, mr: 1 }} />
            <InputBase
              placeholder="Search patients by name or ID…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ flex: 1, fontSize: 14, fontWeight: 500, color: "grey.700" }}
              inputProps={{ "aria-label": "search patients" }}
            />
          </Box>
          <Chip
            label={`${filteredPatients.length} result${filteredPatients.length !== 1 ? "s" : ""}`} // ✅ fixed
            size="small"
            sx={{
              bgcolor: alpha(green, 0.08),
              color: green,
              fontWeight: 600,
              fontSize: "0.75rem",
            }}
          />
        </Box>
      </Paper>

      <PatientList patients={filteredPatients} />
    </div>
  );
}