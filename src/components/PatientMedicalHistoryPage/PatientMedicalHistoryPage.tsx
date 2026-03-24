"use client";

import * as React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LocalPharmacyRoundedIcon from "@mui/icons-material/LocalPharmacyRounded";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import {
  formatMedicalRecordDate,
  formatMedicalRecordDateTime,
  formatMedicationTotal,
  openMedicalRecordPrintPreview,
  type MedicalRecord,
} from "@/lib/medicalRecords";
import { formatPatientAddress } from "@/lib/patients";
import {
  DetailCard,
  DetailCardTitle,
  DetailField,
  DetailGrid,
  DetailLabel,
  DetailValue,
  HeroCard,
  HeroEyebrow,
  HeroSubtitle,
  HeroTitle,
  PageShell,
  RecordBanner,
  RecordBody,
  RecordCard,
  RecordGrid,
  RecordsStack,
  RecordSubline,
  RecordTitle,
  SectionHeader,
  SectionSubtitle,
  SectionTitle,
  SnapshotCard,
  SnapshotField,
  SnapshotGrid,
  SnapshotLabel,
  SnapshotValue,
  SoftList,
  SoftListItem,
  StatCard,
  StatLabel,
  StatValue,
  StatsGrid,
} from "./elements";
import type { PatientMedicalHistoryPageProps } from "./interface";

function Field({
  label,
  value,
  fullWidth = false,
}: {
  label: string;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <DetailField fullWidth={fullWidth}>
      <DetailLabel>{label}</DetailLabel>
      <DetailValue>{value || "-"}</DetailValue>
    </DetailField>
  );
}

function SnapshotItem({
  label,
  value,
  fullWidth = false,
}: {
  label: string;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <SnapshotField fullWidth={fullWidth}>
      <SnapshotLabel>{label}</SnapshotLabel>
      <SnapshotValue>{value || "-"}</SnapshotValue>
    </SnapshotField>
  );
}

function SoftItemList({
  items,
  emptyLabel,
}: {
  items: string[];
  emptyLabel: string;
}) {
  if (items.length === 0) {
    return (
      <SoftList>
        <SoftListItem>{emptyLabel}</SoftListItem>
      </SoftList>
    );
  }

  return (
    <SoftList>
      {items.map((item, index) => (
        <SoftListItem key={`${item}-${index}`}>{item}</SoftListItem>
      ))}
    </SoftList>
  );
}

function formatOutcomeLabel(record: MedicalRecord) {
  return `${record.outcomeOfTreatment} • ${record.disposition}`;
}

export default function PatientMedicalHistoryPage({
  patient,
  records,
  profileHref,
}: PatientMedicalHistoryPageProps) {
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
  const physicianCount = new Set(sortedRecords.map((record) => record.attendingPhysician)).size;
  const encounterTypes = new Set(sortedRecords.map((record) => record.encounterType)).size;

  return (
    <PageShell>
      <HeroCard>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Box>
            <HeroEyebrow>Clinical Record Timeline</HeroEyebrow>
            <HeroTitle>Medical History for {patient.name}</HeroTitle>
            <HeroSubtitle>
              Review chronological encounter summaries, diagnostics, medicines, and
              follow-up notes in a single readable view. Each encounter can still be
              exported individually or as a full PDF history.
            </HeroSubtitle>
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <Button
              component={Link}
              href={profileHref}
              variant="outlined"
              startIcon={<ArrowBackRoundedIcon />}
              sx={{ textTransform: "none", borderRadius: "10px", fontWeight: 700 }}
            >
              Back to Profile
            </Button>
            <Button
              variant="contained"
              startIcon={<PictureAsPdfRoundedIcon />}
              onClick={() => openMedicalRecordPrintPreview(patient, sortedRecords)}
              sx={{ textTransform: "none", borderRadius: "10px", fontWeight: 700, boxShadow: "none" }}
            >
              Print Full History
            </Button>
          </Stack>
        </Box>
      </HeroCard>

      <StatsGrid>
        <StatCard>
          <StatLabel>Total Encounters</StatLabel>
          <StatValue>{String(sortedRecords.length)}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Latest Visit</StatLabel>
          <StatValue>{latestRecord ? formatMedicalRecordDate(latestRecord.admissionDateTime) : "-"}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Encounter Types</StatLabel>
          <StatValue>{String(encounterTypes)}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Doctors Involved</StatLabel>
          <StatValue>{String(physicianCount)}</StatValue>
        </StatCard>
      </StatsGrid>

      <SnapshotCard>
        <SectionHeader>
          <MonitorHeartRoundedIcon sx={{ color: "primary.main", fontSize: 20 }} />
          <Box>
            <SectionTitle>Patient Snapshot</SectionTitle>
            <SectionSubtitle>
              Quick clinical context so the encounter timeline is easier to scan.
            </SectionSubtitle>
          </Box>
        </SectionHeader>

        <SnapshotGrid>
          <SnapshotItem label="Patient ID" value={patient.patient_id} />
          <SnapshotItem label="Date of Birth" value={patient.date_of_birth || "-"} />
          <SnapshotItem label="Age / Sex" value={`${patient.age} • ${patient.gender}`} />
          <SnapshotItem label="Blood Type" value={patient.blood_type || "-"} />
          <SnapshotItem label="PhilHealth Number" value={patient.philhealth_number || "-"} />
          <SnapshotItem label="Contact Number" value={patient.contact_number || "-"} />
          <SnapshotItem label="Address" value={formatPatientAddress(patient.address)} fullWidth />
          <SnapshotItem label="Existing Conditions" value={patient.existing_conditions || "None reported"} fullWidth />
          <SnapshotItem label="Current Medications" value={patient.current_medications || "None reported"} fullWidth />
          <SnapshotItem label="Known Allergies" value={patient.allergies || "None reported"} fullWidth />
        </SnapshotGrid>
      </SnapshotCard>

      {sortedRecords.length === 0 ? (
        <SnapshotCard>
          <SectionHeader>
            <SummarizeRoundedIcon sx={{ color: "primary.main", fontSize: 20 }} />
            <Box>
              <SectionTitle>No Medical Encounters Yet</SectionTitle>
              <SectionSubtitle>
                This patient does not have any recorded encounters in the seeded medical-history dataset.
              </SectionSubtitle>
            </Box>
          </SectionHeader>
        </SnapshotCard>
      ) : null}

      <RecordsStack>
        {sortedRecords.map((record) => (
          <RecordCard key={record.id}>
            <RecordBanner>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ flex: 1, minWidth: 240 }}>
                  <Stack direction="row" spacing={0.9} useFlexGap flexWrap="wrap">
                    <Chip label={record.encounterType} size="small" sx={{ fontWeight: 700 }} />
                    <Chip label={record.department} size="small" variant="outlined" sx={{ fontWeight: 700 }} />
                    <Chip label={record.attendingPhysician} size="small" variant="outlined" sx={{ fontWeight: 700 }} />
                  </Stack>

                  <RecordTitle>{record.dischargeDiagnosis}</RecordTitle>
                  <RecordSubline>
                    Chief complaint: {record.chiefComplaint} • Admitted {formatMedicalRecordDateTime(record.admissionDateTime)}
                    {record.dischargeDateTime ? ` • Discharged ${formatMedicalRecordDateTime(record.dischargeDateTime)}` : ""}
                  </RecordSubline>
                </Box>

                <Stack spacing={1} alignItems={{ xs: "flex-start", sm: "flex-end" }}>
                  <Chip
                    label={formatOutcomeLabel(record)}
                    size="small"
                    sx={{
                      fontWeight: 700,
                      bgcolor: "rgba(18, 183, 106, 0.10)",
                      color: "#027A48",
                    }}
                  />
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<PictureAsPdfRoundedIcon />}
                    onClick={() => openMedicalRecordPrintPreview(patient, [record])}
                    sx={{ textTransform: "none", borderRadius: "10px", fontWeight: 700 }}
                  >
                    Save This Record
                  </Button>
                </Stack>
              </Box>
            </RecordBanner>

            <RecordBody>
              <RecordGrid>
                <DetailCard>
                  <DetailCardTitle>Encounter Snapshot</DetailCardTitle>
                  <DetailGrid>
                    <Field label="Record ID" value={record.id} />
                    <Field label="ICD-10 / Case Rate" value={`${record.icd10Code}${record.caseRateCode ? ` • ${record.caseRateCode}` : ""}`} />
                    <Field label="Case Classification" value={record.caseClassification} />
                    <Field label="Facility" value={record.facilityName} />
                    <Field label="Room / Area" value={record.room || "-"} />
                    <Field label="License Number" value={record.physicianLicenseNumber} />
                    <Field label="Admitting Diagnosis" value={record.admittingDiagnosis} fullWidth />
                    <Field label="Disposition" value={record.disposition} fullWidth />
                  </DetailGrid>
                </DetailCard>

                <DetailCard>
                  <DetailCardTitle>History and Assessment</DetailCardTitle>
                  <DetailGrid>
                    <Field label="History of Present Illness" value={record.historyOfPresentIllness} fullWidth />
                    <Field label="Past Medical History" value={record.pastMedicalHistory} />
                    <Field label="Family History" value={record.familyHistory} />
                    <Field label="Social History" value={record.socialHistory} fullWidth />
                    <Field label="Review of Systems" value={record.reviewOfSystems.join(", ")} fullWidth />
                    {record.referredFrom ? (
                      <Field
                        label="Referred From"
                        value={`${record.referredFrom.facility} • ${record.referredFrom.reason}`}
                        fullWidth
                      />
                    ) : null}
                  </DetailGrid>
                </DetailCard>

                <DetailCard>
                  <DetailCardTitle>Vitals and Physical Examination</DetailCardTitle>
                  <Stack direction="row" spacing={0.8} useFlexGap flexWrap="wrap" sx={{ mb: 1.2 }}>
                    {[
                      `BP ${record.vitalSigns.bloodPressure}`,
                      `HR ${record.vitalSigns.heartRate}`,
                      `RR ${record.vitalSigns.respiratoryRate}`,
                      `Temp ${record.vitalSigns.temperature}`,
                      `SpO2 ${record.vitalSigns.oxygenSaturation}`,
                      `BMI ${record.vitalSigns.bmi}`,
                    ].map((item) => (
                      <Chip key={item} label={item} size="small" sx={{ fontWeight: 700 }} />
                    ))}
                  </Stack>
                  <DetailGrid>
                    <Field label="General Survey" value={record.physicalExamination.generalSurvey} />
                    <Field label="HEENT" value={record.physicalExamination.heent} />
                    <Field label="Chest / Lungs" value={record.physicalExamination.chestLungs} />
                    <Field label="Cardiovascular" value={record.physicalExamination.cardiovascular} />
                    <Field label="Abdomen" value={record.physicalExamination.abdomen} />
                    <Field label="Genitourinary" value={record.physicalExamination.genitourinary} />
                    <Field label="Skin / Extremities" value={record.physicalExamination.skinExtremities} />
                    <Field label="Neurologic" value={record.physicalExamination.neurologic} />
                  </DetailGrid>
                </DetailCard>

                <DetailCard>
                  <DetailCardTitle>Diagnostics and Clinical Course</DetailCardTitle>
                  <Box sx={{ display: "grid", gap: 1.2 }}>
                    <Box>
                      <Stack direction="row" spacing={0.8} alignItems="center" sx={{ mb: 0.8 }}>
                        <ScienceRoundedIcon sx={{ color: "primary.main", fontSize: 18 }} />
                        <Typography sx={{ fontSize: "0.82rem", fontWeight: 800, color: "text.primary" }}>
                          Laboratory and Imaging
                        </Typography>
                      </Stack>
                      <SoftItemList
                        items={record.diagnostics.map(
                          (item) =>
                            `${item.category}: ${item.name} • ${formatMedicalRecordDate(item.date)} • ${item.result}`
                        )}
                        emptyLabel="No diagnostics recorded."
                      />
                    </Box>

                    <Box>
                      <Stack direction="row" spacing={0.8} alignItems="center" sx={{ mb: 0.8 }}>
                        <SummarizeRoundedIcon sx={{ color: "primary.main", fontSize: 18 }} />
                        <Typography sx={{ fontSize: "0.82rem", fontWeight: 800, color: "text.primary" }}>
                          Course in Ward / Episode Notes
                        </Typography>
                      </Stack>
                      <SoftItemList
                        items={record.courseInWard.map(
                          (item) =>
                            `${formatMedicalRecordDate(item.date)} • ${item.author} • ${item.action}`
                        )}
                        emptyLabel="No progress notes recorded."
                      />
                    </Box>
                  </Box>
                </DetailCard>

                <DetailCard>
                  <DetailCardTitle>Drugs and Medicines</DetailCardTitle>
                  <Stack direction="row" spacing={0.8} alignItems="center" sx={{ mb: 0.8 }}>
                    <LocalPharmacyRoundedIcon sx={{ color: "primary.main", fontSize: 18 }} />
                    <Typography sx={{ fontSize: "0.82rem", fontWeight: 800, color: "text.primary" }}>
                      Prescribed or Administered Medication
                    </Typography>
                  </Stack>
                  <SoftItemList
                    items={record.medicines.map(
                      (item) =>
                        `${item.genericName} • ${item.quantity} • ${item.dosage} • ${item.frequency} • ${item.route} • ${formatMedicationTotal(item.totalCostPhp)}`
                    )}
                    emptyLabel="Drugs and medicines not required."
                  />
                </DetailCard>

                <DetailCard>
                  <DetailCardTitle>Procedures and Follow-up</DetailCardTitle>
                  <Box sx={{ display: "grid", gap: 1.2 }}>
                    <Box>
                      <Typography sx={{ fontSize: "0.8rem", fontWeight: 800, color: "text.primary", mb: 0.8 }}>
                        Procedures
                      </Typography>
                      <SoftItemList
                        items={record.procedures.map(
                          (item) =>
                            `${formatMedicalRecordDate(item.date)} • ${item.description}${item.rvsCode ? ` • ${item.rvsCode}` : ""} • ${item.outcome}`
                        )}
                        emptyLabel="No procedures documented."
                      />
                    </Box>

                    <DetailGrid>
                      <Field label="Follow-up Date" value={formatMedicalRecordDate(record.followUpDate)} />
                      <Field label="Certified By" value={record.certifiedBy} />
                      <Field label="Certified On" value={formatMedicalRecordDateTime(record.certifiedOn)} />
                      <Field label="Facility Accreditation" value={record.facilityAccreditationNumber} />
                      <Field label="Follow-up Instructions" value={record.followUpInstructions} fullWidth />
                    </DetailGrid>
                  </Box>
                </DetailCard>
              </RecordGrid>
            </RecordBody>
          </RecordCard>
        ))}
      </RecordsStack>
    </PageShell>
  );
}
