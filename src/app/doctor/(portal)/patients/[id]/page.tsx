"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import HistoryEduRoundedIcon from "@mui/icons-material/HistoryEduRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { getMedicalRecordsByPatientId } from "@/lib/medicalRecords";
import { findPatientById, formatPatientAddress } from "@/lib/patients";
import { palette } from "@/theme/palette";

const BLUE = "#4361EE";

const parseParam = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

function formatDisplayDate(value?: string) {
  if (!value) return "-";
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return value;

  return new Date(parsed).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function InfoField({
  label,
  value,
  fullWidth = false,
}: {
  label: string;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <Box
      sx={{
        p: 1.45,
        borderRadius: "12px",
        border: `1px solid ${palette.grey[200]}`,
        bgcolor: "grey.50",
        gridColumn: fullWidth ? "1 / -1" : "auto",
      }}
    >
      <div
        style={{
          fontSize: "0.7rem",
          fontWeight: 700,
          color: "#667085",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "0.9rem",
          color: "#1D2939",
          fontWeight: 500,
          marginTop: 4,
        }}
      >
        {value || "-"}
      </div>
    </Box>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Paper
      sx={{
        p: 2.2,
        borderRadius: "14px",
        border: `1px solid ${palette.grey[200]}`,
        boxShadow: "none",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
        {icon}
        <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1D2939" }}>{title}</div>
      </Box>
      {children}
    </Paper>
  );
}

export default function DoctorPatientDetailPage() {
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
  const latestRecord = medicalRecords[0] ?? null;
  const historyHref = `/doctor/patients/${encodeURIComponent(patient.patient_id)}/medical-history`;

  return (
    <Box sx={{ maxWidth: 1180, mx: "auto", pb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 2.2, flexWrap: "wrap" }}>
        <Link href="/doctor/patients" style={{ textDecoration: "none", fontSize: "0.82rem", fontWeight: 500, color: BLUE }}>
          Patients
        </Link>
        <NavigateNextRoundedIcon sx={{ fontSize: 16, color: "#9CA3AF" }} />
        <Chip label="Patient Profile" size="small" sx={{ bgcolor: "rgba(67,97,238,0.08)", color: BLUE, fontWeight: 600 }} />
        <NavigateNextRoundedIcon sx={{ fontSize: 16, color: "#9CA3AF" }} />
        <Chip label={patient.patient_id} size="small" sx={{ bgcolor: palette.background.default, color: "grey.700", fontWeight: 600, border: `1px solid ${palette.grey[200]}` }} />
      </Box>

      <Paper sx={{ p: { xs: 2.2, md: 3 }, mb: 2.2, borderRadius: "16px", border: `1px solid ${palette.grey[200]}`, boxShadow: "0 4px 16px rgba(16,24,40,0.04)" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2, flexWrap: "wrap" }}>
          <Box>
            <div style={{ fontSize: "1.35rem", fontWeight: 700, color: "#1D2939" }}>{patient.name}</div>
            <div style={{ fontSize: "0.86rem", color: "#667085", marginTop: 6 }}>
              Patient ID: {patient.patient_id} • PhilHealth No: {patient.philhealth_number || "-"}
            </div>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1.2, flexWrap: "wrap" }}>
              <Chip label={patient.status} color={patient.status === "Active" ? "success" : patient.status === "Admitted" ? "warning" : "error"} size="small" />
              <Chip label={`Last Visit: ${formatDisplayDate(patient.last_visit)}`} size="small" sx={{ bgcolor: "grey.100", color: "grey.700", fontWeight: 600 }} />
              {patient.patient_type && (
                <Chip label={patient.patient_type} size="small" sx={{ bgcolor: "rgba(67,97,238,0.08)", color: BLUE, fontWeight: 600 }} />
              )}
            </Box>
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1.2, minWidth: 280 }}>
            {[
              { label: "Age", value: String(patient.age) },
              { label: "Gender", value: patient.gender },
              { label: "Blood", value: patient.blood_type || "-" },
            ].map(({ label, value }) => (
              <Box key={label} sx={{ p: 1.5, borderRadius: "10px", border: `1px solid ${palette.grey[200]}`, bgcolor: "rgba(67,97,238,0.04)", textAlign: "center" }}>
                <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "#667085", textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: BLUE, marginTop: 2 }}>{value}</div>
              </Box>
            ))}
          </Box>
        </Box>
      </Paper>

      <Paper
        sx={{
          p: { xs: 2, md: 2.3 },
          mb: 2.2,
          borderRadius: "16px",
          border: `1px solid ${palette.grey[200]}`,
          boxShadow: "none",
          background:
            "linear-gradient(135deg, rgba(67,97,238,0.07) 0%, rgba(255,255,255,1) 55%, rgba(16,185,129,0.04) 100%)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ maxWidth: 700 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.8 }}>
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "rgba(67,97,238,0.12)",
                  color: BLUE,
                }}
              >
                <HistoryEduRoundedIcon sx={{ fontSize: 20 }} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: "1rem", fontWeight: 800, color: "text.primary" }}>
                  Medical History
                </Typography>
                <Typography sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
                  Dedicated inner page for encounter timeline, diagnostics, medicines, and PDF-ready summaries.
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 0.9, flexWrap: "wrap", mt: 1.2 }}>
              <Chip label={`${medicalRecords.length} record${medicalRecords.length !== 1 ? "s" : ""}`} size="small" sx={{ fontWeight: 700, bgcolor: "rgba(67,97,238,0.10)", color: BLUE }} />
              <Chip label={`Latest: ${latestRecord ? formatDisplayDate(latestRecord.admissionDateTime) : "-"}`} size="small" sx={{ fontWeight: 700, bgcolor: "grey.100", color: "grey.700" }} />
            </Box>
            <Typography sx={{ fontSize: "0.8rem", color: "text.secondary", mt: 0.9 }}>
              Latest summary: {latestRecord?.dischargeDiagnosis || "No encounter summary yet."}
            </Typography>
          </Box>

          <Button
            component={Link}
            href={historyHref}
            variant="contained"
            startIcon={<HistoryEduRoundedIcon />}
            sx={{ textTransform: "none", fontWeight: 700, borderRadius: "10px", boxShadow: "none" }}
          >
            View Medical History
          </Button>
        </Box>
      </Paper>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: 2, mb: 2 }}>
        <Section title="Patient Profile" icon={<PersonRoundedIcon sx={{ color: BLUE, fontSize: 18 }} />}>
          <Box sx={{ display: "grid", gap: 1.2, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
            <InfoField label="Full Name" value={patient.name} />
            <InfoField label="Date of Birth" value={formatDisplayDate(patient.date_of_birth)} />
            <InfoField label="Age" value={String(patient.age)} />
            <InfoField label="Gender" value={patient.gender} />
            <InfoField label="Civil Status" value={patient.civil_status || "-"} />
            <InfoField label="Nationality" value={patient.nationality || "-"} />
            <InfoField label="Religion" value={patient.religion || "-"} />
            <InfoField label="Occupation" value={patient.occupation || "-"} />
            <InfoField label="Contact Number" value={patient.contact_number || "-"} />
            <InfoField label="Email" value={patient.email || "-"} />
            <InfoField label="Address" value={formatPatientAddress(patient.address)} fullWidth />
          </Box>
        </Section>

        <Section title="Clinical Profile" icon={<MedicalServicesRoundedIcon sx={{ color: BLUE, fontSize: 18 }} />}>
          <Box sx={{ display: "grid", gap: 1.2, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
            <InfoField label="Blood Type" value={patient.blood_type || "-"} />
            <InfoField label="Patient Type" value={patient.patient_type || "-"} />
            <InfoField label="Height" value={patient.height ? `${patient.height} cm` : "-"} />
            <InfoField label="Weight" value={patient.weight ? `${patient.weight} kg` : "-"} />
            <InfoField label="Smoking Status" value={patient.smoking_status || "-"} />
            <InfoField label="Alcohol Use" value={patient.alcohol_use || "-"} />
            <InfoField label="Known Allergies" value={patient.allergies || "None"} fullWidth />
            <InfoField label="Existing Conditions" value={patient.existing_conditions || "None"} fullWidth />
            <InfoField label="Current Medications" value={patient.current_medications || "None"} fullWidth />
          </Box>
        </Section>

        <Section title="Coverage and Identification" icon={<BadgeRoundedIcon sx={{ color: BLUE, fontSize: 18 }} />}>
          <Box sx={{ display: "grid", gap: 1.2 }}>
            <InfoField label="PhilHealth Number" value={patient.philhealth_number || "-"} />
            <InfoField label="SSS Number" value={patient.sss_number || "-"} />
            <InfoField label="TIN Number" value={patient.tin_number || "-"} />
            <InfoField label="Valid ID Type" value={patient.valid_id_type || "-"} />
            <InfoField label="Valid ID Number" value={patient.valid_id_number || "-"} />
          </Box>
        </Section>

        <Section title="Emergency Contact" icon={<HomeRoundedIcon sx={{ color: BLUE, fontSize: 18 }} />}>
          <Box sx={{ display: "grid", gap: 1.2 }}>
            {patient.emergency_contacts?.length ? (
              patient.emergency_contacts.map((contact, index) => (
                <Box key={`${contact.name}-${index}`} sx={{ p: 1.5, borderRadius: "10px", border: `1px solid ${palette.grey[200]}`, bgcolor: "grey.50" }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#98A2B3", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
                    Contact {index + 1}
                  </div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1D2939" }}>{contact.name}</div>
                  <div style={{ fontSize: "0.82rem", color: "#667085", marginTop: 2 }}>
                    {contact.relationship} • {contact.contactNumber}
                  </div>
                </Box>
              ))
            ) : (
              <Typography sx={{ fontSize: "0.86rem", color: "#98A2B3" }}>
                No emergency contacts recorded.
              </Typography>
            )}
          </Box>
        </Section>
      </Box>
    </Box>
  );
}
