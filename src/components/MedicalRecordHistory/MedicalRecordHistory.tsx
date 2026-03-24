"use client";

import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import BiotechRoundedIcon from "@mui/icons-material/BiotechRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import HistoryEduRoundedIcon from "@mui/icons-material/HistoryEduRounded";
import LocalPharmacyRoundedIcon from "@mui/icons-material/LocalPharmacyRounded";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import { palette } from "@/theme/palette";
import {
  formatMedicalRecordDate,
  formatMedicalRecordDateTime,
  formatMedicationTotal,
  openMedicalRecordPrintPreview,
} from "@/lib/medicalRecords";
import { HistoryEmptyPanel, HistoryPanel } from "./elements";
import type { MedicalRecordHistoryProps } from "./interface";

function StatPill({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Box
      sx={{
        minWidth: 160,
        p: 1.4,
        borderRadius: "12px",
        border: `1px solid ${palette.grey[200]}`,
        bgcolor: "grey.50",
      }}
    >
      <Typography
        sx={{
          fontSize: "0.68rem",
          fontWeight: 700,
          color: "text.secondary",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </Typography>
      <Typography sx={{ fontSize: "0.92rem", fontWeight: 700, color: "text.primary", mt: 0.45 }}>
        {value}
      </Typography>
    </Box>
  );
}

function RecordField({
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
        p: 1.4,
        borderRadius: "12px",
        border: `1px solid ${palette.grey[200]}`,
        bgcolor: "grey.50",
        gridColumn: fullWidth ? "1 / -1" : "auto",
      }}
    >
      <Typography
        sx={{
          fontSize: "0.68rem",
          fontWeight: 700,
          color: "text.secondary",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          mb: 0.45,
        }}
      >
        {label}
      </Typography>
      <Typography sx={{ fontSize: "0.88rem", color: "text.primary", fontWeight: 500 }}>
        {value || "-"}
      </Typography>
    </Box>
  );
}

function DetailSection({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        p: 1.8,
        borderRadius: "14px",
        border: `1px solid ${palette.grey[200]}`,
        bgcolor: "#fff",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.25 }}>
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(67, 97, 238, 0.08)",
            color: palette.primary.main,
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography sx={{ fontSize: "0.9rem", fontWeight: 700, color: "text.primary" }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography sx={{ fontSize: "0.76rem", color: "text.secondary", mt: 0.15 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
      {children}
    </Box>
  );
}

function KeyValueList({
  items,
}: {
  items: Array<{ label: string; value: string }>;
}) {
  return (
    <Stack spacing={1}>
      {items.map((item, index) => (
        <React.Fragment key={`${item.label}-${index}`}>
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
            <Typography sx={{ fontSize: "0.82rem", color: "text.secondary", fontWeight: 600 }}>
              {item.label}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.84rem",
                color: "text.primary",
                fontWeight: 500,
                textAlign: "right",
              }}
            >
              {item.value}
            </Typography>
          </Box>
          {index < items.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </Stack>
  );
}

function DataList({
  items,
  emptyLabel,
}: {
  items: string[];
  emptyLabel: string;
}) {
  if (items.length === 0) {
    return <Typography sx={{ fontSize: "0.84rem", color: "text.secondary" }}>{emptyLabel}</Typography>;
  }

  return (
    <Stack spacing={0.9}>
      {items.map((item) => (
        <Box
          key={item}
          sx={{
            p: 1.1,
            borderRadius: "10px",
            border: `1px solid ${palette.grey[200]}`,
            bgcolor: "grey.50",
          }}
        >
          <Typography sx={{ fontSize: "0.84rem", color: "text.primary" }}>{item}</Typography>
        </Box>
      ))}
    </Stack>
  );
}

export default function MedicalRecordHistory({
  patient,
  records,
  title = "Medical Record History",
}: MedicalRecordHistoryProps) {
  const sortedRecords = React.useMemo(
    () =>
      [...records].sort(
        (left, right) =>
          new Date(right.admissionDateTime).getTime() -
          new Date(left.admissionDateTime).getTime()
      ),
    [records]
  );

  const latestRecord = sortedRecords[0] ?? null;

  if (sortedRecords.length === 0) {
    return (
      <HistoryEmptyPanel
        sx={{
          p: 2.4,
        }}
      >
        <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: "text.primary" }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: "0.86rem", color: "text.secondary", mt: 0.8 }}>
          No medical record history has been seeded for this patient yet.
        </Typography>
      </HistoryEmptyPanel>
    );
  }

  return (
    <HistoryPanel
      sx={{
        p: { xs: 2, md: 2.4 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 2,
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        <Box>
          <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: "text.primary" }}>
            {title}
          </Typography>
          <Typography sx={{ fontSize: "0.82rem", color: "text.secondary", mt: 0.45, maxWidth: 760 }}>
            Structured for Philippine-facing patient data and encounter summaries, with sections aligned to
            PhilHealth CF4-style clinical documentation and printable as PDF from the browser.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<PictureAsPdfRoundedIcon />}
          onClick={() => openMedicalRecordPrintPreview(patient, sortedRecords)}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            borderRadius: "10px",
            boxShadow: "none",
            alignSelf: "center",
          }}
        >
          Print / Save PDF
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 1.2, flexWrap: "wrap", mb: 2.2 }}>
        <StatPill label="Total Records" value={String(sortedRecords.length)} />
        <StatPill label="Latest Encounter" value={latestRecord ? formatMedicalRecordDate(latestRecord.admissionDateTime) : "-"} />
        <StatPill label="Latest Diagnosis" value={latestRecord?.dischargeDiagnosis || "-"} />
      </Box>

      <Stack spacing={1.25}>
        {sortedRecords.map((record) => (
          <Accordion
            key={record.id}
            disableGutters
            sx={{
              borderRadius: "16px",
              border: `1px solid ${palette.grey[200]}`,
              overflow: "hidden",
              boxShadow: "none",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreRoundedIcon />}
              sx={{
                px: 2,
                py: 1.25,
                bgcolor: "grey.50",
                "& .MuiAccordionSummary-content": { my: 0 },
              }}
            >
              <Box sx={{ display: "flex", flex: 1, alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
                <Box sx={{ flex: 1, minWidth: 220 }}>
                  <Typography sx={{ fontSize: "0.92rem", fontWeight: 700, color: "text.primary" }}>
                    {record.dischargeDiagnosis}
                  </Typography>
                  <Typography sx={{ fontSize: "0.78rem", color: "text.secondary", mt: 0.35 }}>
                    {record.id} • {formatMedicalRecordDateTime(record.admissionDateTime)} • {record.department}
                  </Typography>
                </Box>
                <Chip label={record.encounterType} size="small" sx={{ fontWeight: 700 }} />
                <Chip
                  label={record.outcomeOfTreatment}
                  size="small"
                  sx={{
                    fontWeight: 700,
                    bgcolor: "rgba(18, 183, 106, 0.10)",
                    color: "#027A48",
                  }}
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 2 }}>
              <Stack spacing={1.6}>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<PictureAsPdfRoundedIcon />}
                    onClick={() => openMedicalRecordPrintPreview(patient, [record])}
                    sx={{ textTransform: "none", borderRadius: "10px", fontWeight: 700 }}
                  >
                    Save This Record as PDF
                  </Button>
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gap: 1.2,
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  }}
                >
                  <DetailSection
                    icon={<SummarizeRoundedIcon sx={{ fontSize: 18 }} />}
                    title="Encounter Summary"
                  >
                    <KeyValueList
                      items={[
                        { label: "Encounter Type", value: record.encounterType },
                        { label: "Case Classification", value: record.caseClassification },
                        { label: "Admitted", value: formatMedicalRecordDateTime(record.admissionDateTime) },
                        { label: "Discharged", value: formatMedicalRecordDateTime(record.dischargeDateTime) },
                        { label: "Department", value: record.department },
                        { label: "Room / Area", value: record.room || "-" },
                        { label: "Attending Physician", value: `${record.attendingPhysician} (${record.physicianLicenseNumber})` },
                        { label: "ICD-10 / Case Rate", value: `${record.icd10Code}${record.caseRateCode ? ` • ${record.caseRateCode}` : ""}` },
                        { label: "Disposition", value: record.disposition },
                      ]}
                    />
                  </DetailSection>

                  <DetailSection
                    icon={<HistoryEduRoundedIcon sx={{ fontSize: 18 }} />}
                    title="Reason for Admission"
                  >
                    <Box
                      sx={{
                        display: "grid",
                        gap: 1,
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      }}
                    >
                      <RecordField label="Chief Complaint" value={record.chiefComplaint} />
                      <RecordField label="History of Present Illness" value={record.historyOfPresentIllness} />
                      <RecordField label="Past Medical History" value={record.pastMedicalHistory} />
                      <RecordField label="Family History" value={record.familyHistory} />
                      <RecordField label="Social History" value={record.socialHistory} fullWidth />
                      <RecordField label="Admitting Diagnosis" value={record.admittingDiagnosis} />
                      <RecordField label="Discharge Diagnosis" value={record.dischargeDiagnosis} />
                      <RecordField label="Review of Systems / Signs" value={record.reviewOfSystems.join(", ")} fullWidth />
                    </Box>
                  </DetailSection>
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gap: 1.2,
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  }}
                >
                  <DetailSection
                    icon={<MonitorHeartRoundedIcon sx={{ fontSize: 18 }} />}
                    title="Vital Signs and Examination"
                    subtitle="Pertinent findings documented during the encounter."
                  >
                    <Box sx={{ display: "flex", gap: 0.8, flexWrap: "wrap", mb: 1.2 }}>
                      {[
                        `BP ${record.vitalSigns.bloodPressure}`,
                        `HR ${record.vitalSigns.heartRate}`,
                        `RR ${record.vitalSigns.respiratoryRate}`,
                        `Temp ${record.vitalSigns.temperature}`,
                        `SpO2 ${record.vitalSigns.oxygenSaturation}`,
                        `BMI ${record.vitalSigns.bmi}`,
                      ].map((item) => (
                        <Chip key={item} label={item} size="small" sx={{ fontWeight: 600 }} />
                      ))}
                    </Box>
                    <Box
                      sx={{
                        display: "grid",
                        gap: 1,
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      }}
                    >
                      <RecordField label="General Survey" value={record.physicalExamination.generalSurvey} />
                      <RecordField label="HEENT" value={record.physicalExamination.heent} />
                      <RecordField label="Chest / Lungs" value={record.physicalExamination.chestLungs} />
                      <RecordField label="Cardiovascular" value={record.physicalExamination.cardiovascular} />
                      <RecordField label="Abdomen" value={record.physicalExamination.abdomen} />
                      <RecordField label="Genitourinary" value={record.physicalExamination.genitourinary} />
                      <RecordField label="Skin / Extremities" value={record.physicalExamination.skinExtremities} />
                      <RecordField label="Neurologic" value={record.physicalExamination.neurologic} />
                    </Box>
                  </DetailSection>

                  <DetailSection
                    icon={<BiotechRoundedIcon sx={{ fontSize: 18 }} />}
                    title="Diagnostics and Course"
                  >
                    <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, color: "text.secondary", mb: 1 }}>
                      Laboratory / Imaging
                    </Typography>
                    <DataList
                      items={record.diagnostics.map(
                        (item) =>
                          `${item.category}: ${item.name} (${formatMedicalRecordDate(item.date)}) - ${item.result}`
                      )}
                      emptyLabel="No diagnostics recorded."
                    />
                    <Divider sx={{ my: 1.4 }} />
                    <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, color: "text.secondary", mb: 1 }}>
                      Course in Ward / Episode Notes
                    </Typography>
                    <DataList
                      items={record.courseInWard.map(
                        (item) => `${formatMedicalRecordDate(item.date)} - ${item.author}: ${item.action}`
                      )}
                      emptyLabel="No progress notes recorded."
                    />
                  </DetailSection>
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gap: 1.2,
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  }}
                >
                  <DetailSection
                    icon={<LocalPharmacyRoundedIcon sx={{ fontSize: 18 }} />}
                    title="Drugs and Medicines"
                  >
                    <DataList
                      items={record.medicines.map(
                        (item) =>
                          `${item.genericName} - ${item.quantity}, ${item.dosage}, ${item.frequency}, ${item.route}, ${formatMedicationTotal(item.totalCostPhp)}`
                      )}
                      emptyLabel="Drugs and medicines not required."
                    />
                  </DetailSection>

                  <DetailSection
                    icon={<PictureAsPdfRoundedIcon sx={{ fontSize: 18 }} />}
                    title="Procedures and Follow-up"
                  >
                    <DataList
                      items={record.procedures.map(
                        (item) =>
                          `${formatMedicalRecordDate(item.date)} - ${item.description}${item.rvsCode ? ` (${item.rvsCode})` : ""}: ${item.outcome}`
                      )}
                      emptyLabel="No procedures documented."
                    />
                    <Divider sx={{ my: 1.4 }} />
                    <RecordField label="Follow-up Instructions" value={record.followUpInstructions} fullWidth />
                    <Box sx={{ mt: 1 }}>
                      <KeyValueList
                        items={[
                          { label: "Follow-up Date", value: formatMedicalRecordDate(record.followUpDate) },
                          { label: "Certified By", value: record.certifiedBy },
                          { label: "Certified On", value: formatMedicalRecordDateTime(record.certifiedOn) },
                        ]}
                      />
                    </Box>
                  </DetailSection>
                </Box>
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </HistoryPanel>
  );
}
