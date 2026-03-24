"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import PatientMedicalHistoryPage from "@/components/PatientMedicalHistoryPage";
import { getMedicalRecordsByPatientId } from "@/lib/medicalRecords";
import { findPatientById } from "@/lib/patients";
import { palette } from "@/theme/palette";

const BLUE = "#4361EE";

const parseParam = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

export default function DoctorPatientMedicalHistoryRoute() {
  const params = useParams<{ id: string }>();
  const patientId = parseParam(typeof params.id === "string" ? params.id : "");
  const patient = findPatientById(patientId);

  if (!patient) {
    return (
      <Box sx={{ maxWidth: 1180, mx: "auto" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 3 }}>
          <Link href="/doctor/patients" style={{ textDecoration: "none", fontSize: "0.82rem", fontWeight: 500, color: BLUE }}>
            Patients
          </Link>
          <NavigateNextRoundedIcon sx={{ fontSize: 16, color: "#9CA3AF" }} />
          <Chip label="Patient Not Found" size="small" sx={{ bgcolor: "rgba(240,68,56,0.08)", color: "error.main", fontWeight: 600 }} />
        </Box>
        <Paper sx={{ p: 3, borderRadius: "16px", border: `1px solid ${palette.divider}`, boxShadow: "none" }}>
          <h2 style={{ margin: 0, fontSize: "1.1rem" }}>Patient record not found</h2>
          <p style={{ marginTop: 8, marginBottom: 0, fontSize: "0.9rem" }}>
            No patient matched ID: {patientId || "(missing id)"}
          </p>
        </Paper>
      </Box>
    );
  }

  const medicalRecords = getMedicalRecordsByPatientId(patient.patient_id);

  return (
    <Box sx={{ maxWidth: 1180, mx: "auto", pb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 2.2, flexWrap: "wrap" }}>
        <Link href="/doctor/patients" style={{ textDecoration: "none", fontSize: "0.82rem", fontWeight: 500, color: BLUE }}>
          Patients
        </Link>
        <NavigateNextRoundedIcon sx={{ fontSize: 16, color: "#9CA3AF" }} />
        <Link
          href={`/doctor/patients/${encodeURIComponent(patient.patient_id)}`}
          style={{ textDecoration: "none", fontSize: "0.82rem", fontWeight: 500, color: BLUE }}
        >
          {patient.patient_id}
        </Link>
        <NavigateNextRoundedIcon sx={{ fontSize: 16, color: "#9CA3AF" }} />
        <Chip
          label="Medical History"
          size="small"
          sx={{ bgcolor: "rgba(67,97,238,0.08)", color: BLUE, fontWeight: 600 }}
        />
      </Box>

      <PatientMedicalHistoryPage
        patient={patient}
        records={medicalRecords}
        profileHref={`/doctor/patients/${encodeURIComponent(patient.patient_id)}`}
      />
    </Box>
  );
}
