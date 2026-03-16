"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";
import VaccinesRoundedIcon from "@mui/icons-material/VaccinesRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { alpha } from "@mui/material/styles";
import doctorsData from "@/json/doctors.json";
import schedulesData from "@/json/doctorSchedules.json";
import patientsData from "@/json/patients.json";
import { Patient } from "@/components/PatientList/interface";
import { palette } from "@/theme/palette";
import {
  Doctor,
  Schedule,
  DAYS_OF_WEEK,
  format24HourTo12Hour,
} from "@/components/SetAppointmentModal/interface";
import Autocomplete from "@mui/material/Autocomplete";


const PURPLE = "#4361EE";
const doctors = doctorsData as Doctor[];
const schedules = schedulesData as Record<string, Schedule[]>;
const patients = patientsData as Patient[];

const STEPS = [
  "Select Patient",
  "Select Doctor",
  "Choose Date & Time",
  "Appointment Details",
  "Confirmation",
];

const APPOINTMENT_TYPES = [
  {
    value: "Consultation",
    label: "Consultation",
    description: "First-time visit or new health concern",
    icon: <MedicalServicesRoundedIcon />,
    color: palette.primary.main,
  },
  {
    value: "Follow-up",
    label: "Follow-up",
    description: "Return visit for an ongoing treatment",
    icon: <ReplayRoundedIcon />,
    color: palette.info.main,
  },
  {
    value: "Check-up",
    label: "Check-up",
    description: "Regular health screening or annual physical",
    icon: <MonitorHeartRoundedIcon />,
    color: palette.success.main,
  },
  {
    value: "Procedure",
    label: "Procedure",
    description: "Scheduled medical procedure or minor surgery",
    icon: <VaccinesRoundedIcon />,
    color: palette.warning.main,
  },
];

export default function BookAppointmentPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  // Step 0 — Patient
  const [selectedPatientId, setSelectedPatientId] = useState("");

  // Step 1 — Doctor
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  // Step 2 — Date & Time
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTimeLabel, setSelectedTimeLabel] = useState("");

  // Step 3 — Details
  const [appointmentType, setAppointmentType] = useState("Consultation");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  const selectedPatient = patients.find((p) => p.patient_id === selectedPatientId) ?? null;

  const departments = useMemo(
    () => [...new Set(doctors.filter((d) => d.status === "Active").map((d) => d.department))],
    []
  );

  const filteredDoctors = useMemo(
    () =>
      doctors.filter(
        (d) =>
          d.status === "Active" &&
          (selectedDepartment === "" || d.department === selectedDepartment)
      ),
    [selectedDepartment]
  );

  const availableSlots = useMemo(() => {
    if (!selectedDoctor || !selectedDate) return [];
    const date = new Date(selectedDate + "T00:00:00");
    const dayName = DAYS_OF_WEEK[date.getDay()];
    const doctorSchedule = schedules[selectedDoctor.doctorId] || [];
    return doctorSchedule.filter(
      (s) => s.day === dayName && (s.type === "consultation" || s.type === "specialty")
    );
  }, [selectedDoctor, selectedDate]);

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const canProceed = () => {
    switch (activeStep) {
      case 0: return !!selectedPatientId;
      case 1: return selectedDoctor !== null;
      case 2: return selectedDate !== "" && selectedTime !== "";
      case 3: return reason.trim() !== "";
      case 4: return true;
      default: return false;
    }
  };

  const handleNext = () => {
    if (activeStep === STEPS.length - 1) {
      console.log("Booking appointment:", {
        patient: selectedPatient?.name,
        doctor: `Dr. ${selectedDoctor!.firstName} ${selectedDoctor!.lastName}`,
        department: selectedDoctor!.department,
        date: selectedDate,
        time: selectedTime,
        type: appointmentType,
        reason,
        notes,
      });
      router.push("/admin/appointments");
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const [patientSearch, setPatientSearch] = useState("");


  return (
    <Box sx={{ maxWidth: 1180, mx: "auto", pb: 3 }}>

      {/* Breadcrumb */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 2.5, flexWrap: "wrap" }}>
        <Link href="/admin/appointments" style={{ textDecoration: "none", fontSize: "0.82rem", fontWeight: 500, color: PURPLE }}>
          Appointments
        </Link>
        <NavigateNextRoundedIcon sx={{ fontSize: 16, color: "#9CA3AF" }} />
        <Chip
          label="Book Appointment"
          size="small"
          sx={{ bgcolor: "rgba(67, 97, 238, 0.08)", color: PURPLE, fontWeight: 600, fontSize: "0.75rem" }}
        />
      </Box>

      <Paper sx={{ borderRadius: "18px", overflow: "hidden", border: "1px solid #E4E7EC", boxShadow: "0 8px 24px rgba(16,24,40,0.06)", maxWidth: 860, mx: "auto" }}>

        {/* Header */}
        <Box sx={{ p: "28px 32px", background: PURPLE, borderBottom: "1px solid rgba(255,255,255,0.16)" }}>
          <Typography sx={{ fontSize: "1.2rem", fontWeight: 700, color: "#fff", letterSpacing: "0.01em" }}>
            Book an Appointment
          </Typography>
          <Typography sx={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.9)", mt: 0.75, lineHeight: 1.5 }}>
            Complete all steps to schedule a patient appointment.
          </Typography>
        </Box>

        {/* Stepper */}
        <Box sx={{ p: "24px 32px 0", borderBottom: "1px solid #EEF2F6", bgcolor: "#FBFFFD" }}>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{
              pb: 3,
              "& .MuiStepLabel-label": { fontSize: "0.78rem", fontWeight: 600, mt: 0.75 },
              "& .MuiStepIcon-root.Mui-active": { color: PURPLE },
              "& .MuiStepIcon-root.Mui-completed": { color: palette.success.main },
            }}
          >
            {STEPS.map((label) => (
              <Step key={label}><StepLabel>{label}</StepLabel></Step>
            ))}
          </Stepper>
        </Box>

        {/* Body */}
        <Box sx={{ p: "28px 32px 32px" }}>

          <Alert severity="info" sx={{ mb: 3, borderRadius: "10px" }}>
            Appointments booked by admin are set to <strong>Confirmed</strong> immediately.
          </Alert>

          {/* Step 0: Patient Selection */}
          {activeStep === 0 && (
            <Box>
              <Typography sx={{ fontSize: "0.92rem", fontWeight: 700, color: "text.primary", mb: 0.5 }}>
                Select a Patient
              </Typography>
              <Typography sx={{ fontSize: "0.82rem", color: "text.secondary", mb: 2.5 }}>
                Choose the patient this appointment is being booked for.
              </Typography>

            <TextField
  select
  label="Search Patient"
  fullWidth
  value={selectedPatientId}
  onChange={(e) => setSelectedPatientId(e.target.value)}
  sx={{ mb: 3 }}
  SelectProps={{
    MenuProps: {
      PaperProps: {
        sx: { maxHeight: 400 },
      },
    },
    // Prevent the search input keystrokes from being captured by the select
    onClose: () => setPatientSearch(""),
  }}
>
  {/* Sticky search input at the top of the dropdown */}
  <Box
    sx={{ px: 1.5, py: 1, position: "sticky", top: 0, bgcolor: "background.paper", zIndex: 1, borderBottom: "1px solid #F2F4F7" }}
    onKeyDown={(e) => e.stopPropagation()} // ✅ prevents select from hijacking keystrokes
  >
    <TextField
      size="small"
      fullWidth
      placeholder="Type to search..."
      value={patientSearch}
      onChange={(e) => setPatientSearch(e.target.value)}
      autoFocus
      sx={{
        "& .MuiOutlinedInput-root": { borderRadius: "8px", fontSize: "0.85rem" },
      }}
    />
  </Box>

  <MenuItem value="">Select a patient...</MenuItem>
  {patients
    .filter((p) =>
      `${p.name} ${p.patient_id}`.toLowerCase().includes(patientSearch.toLowerCase())
    )
    .map((p) => (
      <MenuItem key={p.patient_id} value={p.patient_id}>
        {p.name} — {p.patient_id}
      </MenuItem>
    ))}
</TextField>

              {selectedPatient && (
                <Box sx={{ p: 2, borderRadius: "12px", border: `1.5px solid ${PURPLE}`, bgcolor: "rgba(67,97,238,0.03)", display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
                  <Avatar sx={{ bgcolor: "#EEF4FF", color: PURPLE, fontWeight: 700, width: 44, height: 44, fontSize: "0.88rem" }}>
                    {selectedPatient.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: "0.92rem", fontWeight: 700, color: "text.primary" }}>
                      {selectedPatient.name}
                    </Typography>
                    <Typography sx={{ fontSize: "0.78rem", color: "text.secondary", mt: 0.25 }}>
                      {selectedPatient.age} yrs · {selectedPatient.gender} · {selectedPatient.patient_id}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Chip label={selectedPatient.status} size="small" color={selectedPatient.status === "Active" ? "success" : selectedPatient.status === "Admitted" ? "warning" : "error"} />
                    {selectedPatient.blood_type && (
                      <Chip label={`Blood: ${selectedPatient.blood_type}`} size="small" sx={{ bgcolor: "grey.100", color: "grey.700", fontWeight: 600 }} />
                    )}
                  </Box>
                </Box>
              )}
            </Box>
          )}

          {/* Step 1: Doctor Selection */}
          {activeStep === 1 && (
            <Box>
              <TextField
                select
                label="Filter by Department"
                fullWidth
                value={selectedDepartment}
                onChange={(e) => {
                  setSelectedDepartment(e.target.value);
                  setSelectedDoctor(null);
                }}
                sx={{ mb: 3 }}
              >
                <MenuItem value="">All Departments</MenuItem>
                {departments.map((dep) => (
                  <MenuItem key={dep} value={dep}>{dep}</MenuItem>
                ))}
              </TextField>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {filteredDoctors.map((doc) => (
                  <Card
                    key={doc.doctorId}
                    onClick={() => setSelectedDoctor(doc)}
                    sx={{
                      p: 2,
                      borderRadius: "12px",
                      border: selectedDoctor?.doctorId === doc.doctorId ? `2px solid ${PURPLE}` : `1px solid ${palette.grey[200]}`,
                      boxShadow: "none",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      backgroundColor: selectedDoctor?.doctorId === doc.doctorId ? "rgba(67,97,238,0.04)" : palette.background.paper,
                      "&:hover": { borderColor: PURPLE, backgroundColor: "rgba(67,97,238,0.02)" },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar sx={{ bgcolor: "#EEF4FF", color: PURPLE, fontWeight: 700, width: 44, height: 44, fontSize: "0.88rem" }}>
                        {doc.firstName[0]}{doc.lastName[0]}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: "0.92rem", fontWeight: 600, color: "text.primary" }}>
                          Dr. {doc.firstName} {doc.lastName}
                        </Typography>
                        <Typography sx={{ fontSize: "0.78rem", color: "text.secondary", mt: 0.25 }}>
                          {doc.specialization} — {doc.subSpecialization}
                        </Typography>
                        <Typography sx={{ fontSize: "0.74rem", color: "grey.400", mt: 0.25 }}>
                          {doc.yearsOfExperience} years of experience
                        </Typography>
                      </Box>
                      <Chip label={doc.department} size="small" sx={{ fontSize: "0.72rem", fontWeight: 600, backgroundColor: "divider", color: "text.secondary" }} />
                    </Box>
                  </Card>
                ))}
              </Box>
            </Box>
          )}

          {/* Step 2: Date & Time */}
          {activeStep === 2 && (
            <Box>
              <Typography sx={{ fontSize: "0.92rem", fontWeight: 600, color: "text.primary", mb: 2 }}>
                Selected Doctor: Dr. {selectedDoctor?.firstName} {selectedDoctor?.lastName}
              </Typography>

              <TextField
                label="Select Date"
                type="date"
                fullWidth
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedTime("");
                  setSelectedTimeLabel("");
                }}
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: getMinDate() }}
                sx={{ mb: 3 }}
              />

              {selectedDate && (
                <>
                  <Typography sx={{ fontSize: "0.82rem", fontWeight: 600, color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.04em", mb: 1.5 }}>
                    Available Time Slots
                  </Typography>
                  {availableSlots.length === 0 ? (
                    <Box sx={{ p: 3, textAlign: "center", backgroundColor: "grey.50", borderRadius: "12px", border: `1px solid ${palette.grey[200]}` }}>
                      <Typography sx={{ fontSize: "0.88rem", color: "text.secondary" }}>
                        No available slots for this date. The doctor is not scheduled for consultations on this day.
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 1.5 }}>
                      {availableSlots.map((slot, i) => {
                        const slotStart = format24HourTo12Hour(slot.startTime);
                        const slotEnd = format24HourTo12Hour(slot.endTime);
                        const label = `${slotStart} - ${slotEnd}`;
                        const isSelected = selectedTime === slotStart;
                        return (
                          <Card
                            key={i}
                            onClick={() => { setSelectedTime(slotStart); setSelectedTimeLabel(label); }}
                            sx={{
                              p: 1.75,
                              borderRadius: "10px",
                              border: isSelected ? `2px solid ${PURPLE}` : `1px solid ${palette.grey[200]}`,
                              boxShadow: "none",
                              cursor: "pointer",
                              backgroundColor: isSelected ? "rgba(67,97,238,0.04)" : palette.background.paper,
                              textAlign: "center",
                              transition: "all 0.15s ease",
                              "&:hover": { borderColor: PURPLE },
                            }}
                          >
                            <Typography sx={{ fontSize: "0.88rem", fontWeight: 600, color: isSelected ? PURPLE : "text.primary" }}>
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
          )}

          {/* Step 3: Appointment Details */}
          {activeStep === 3 && (
            <Box>
              <Box sx={{ mb: 3.5 }}>
                <Typography sx={{ fontSize: "0.92rem", fontWeight: 700, color: "text.primary", mb: 0.5 }}>
                  What type of appointment is this?
                </Typography>
                <Typography sx={{ fontSize: "0.78rem", color: "text.secondary", mb: 2 }}>
                  Select the option that best describes the visit.
                </Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr 1fr" }, gap: 1.5 }}>
                  {APPOINTMENT_TYPES.map((type) => {
                    const isSelected = appointmentType === type.value;
                    return (
                      <Box
                        key={type.value}
                        onClick={() => setAppointmentType(type.value)}
                        sx={{
                          p: 2, borderRadius: "14px",
                          border: isSelected ? `2px solid ${type.color}` : `1.5px solid ${palette.grey[200]}`,
                          backgroundColor: isSelected ? alpha(type.color, 0.05) : palette.background.paper,
                          cursor: "pointer", textAlign: "center", transition: "all 0.18s ease",
                          "&:hover": { borderColor: type.color, backgroundColor: alpha(type.color, 0.03) },
                        }}
                      >
                        <Box sx={{ width: 44, height: 44, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 1, backgroundColor: isSelected ? alpha(type.color, 0.12) : palette.grey[100], color: isSelected ? type.color : palette.grey[400], "& svg": { fontSize: 22 } }}>
                          {type.icon}
                        </Box>
                        <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, color: isSelected ? type.color : "text.primary", mb: 0.25 }}>
                          {type.label}
                        </Typography>
                        <Typography sx={{ fontSize: "0.68rem", color: "text.secondary", lineHeight: 1.35 }}>
                          {type.description}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                  <EditNoteRoundedIcon sx={{ fontSize: 20, color: "primary.main" }} />
                  <Typography sx={{ fontSize: "0.92rem", fontWeight: 700, color: "text.primary" }}>
                    Reason for visit *
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: "0.78rem", color: "text.secondary", mb: 1.5 }}>
                  Briefly describe the patient&apos;s symptoms or reason for seeing the doctor.
                </Typography>
                <TextField fullWidth required multiline rows={2} value={reason} onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g. Persistent headaches for the past two weeks..."
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", fontSize: "0.88rem" } }}
                />
              </Box>

              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                  <InfoOutlinedIcon sx={{ fontSize: 20, color: "text.secondary" }} />
                  <Typography sx={{ fontSize: "0.92rem", fontWeight: 700, color: "text.primary" }}>
                    Additional notes
                    <Typography component="span" sx={{ fontSize: "0.78rem", fontWeight: 500, color: "text.secondary", ml: 0.75 }}>(optional)</Typography>
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: "0.78rem", color: "text.secondary", mb: 1.5 }}>
                  Include any details the doctor should know — allergies, current medications, or special requests.
                </Typography>
                <TextField fullWidth multiline rows={3} value={notes} onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Allergic to Penicillin, currently taking Metformin 500mg..."
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", fontSize: "0.88rem" } }}
                />
              </Box>
            </Box>
          )}

          {/* Step 4: Confirmation */}
          {activeStep === 4 && (
            <Box>
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <CheckCircleRoundedIcon sx={{ fontSize: 48, color: "success.main", mb: 1 }} />
                <Typography sx={{ fontSize: "1.1rem", fontWeight: 700, color: "text.primary" }}>
                  Review Appointment
                </Typography>
                <Typography sx={{ fontSize: "0.85rem", color: "text.secondary", mt: 0.5 }}>
                  Please review all details before confirming.
                </Typography>
              </Box>

              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
                {[
                  { label: "Patient", value: selectedPatient?.name || "-" },
                  { label: "Patient ID", value: selectedPatient?.patient_id || "-" },
                  { label: "Doctor", value: `Dr. ${selectedDoctor?.firstName} ${selectedDoctor?.lastName}` },
                  { label: "Department", value: selectedDoctor?.department || "" },
                  { label: "Date", value: selectedDate },
                  { label: "Time", value: selectedTimeLabel || selectedTime },
                  { label: "Type", value: appointmentType },
                  { label: "Reason", value: reason },
                ].map((item) => (
                  <Box key={item.label} sx={{ p: 2, borderRadius: "12px", backgroundColor: "grey.50", border: `1px solid ${palette.divider}` }}>
                    <Typography sx={{ fontSize: "0.68rem", fontWeight: 700, color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.06em", mb: 0.5 }}>
                      {item.label}
                    </Typography>
                    <Typography sx={{ fontSize: "0.88rem", fontWeight: 500, color: "text.primary" }}>
                      {item.value}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {notes && (
                <Box sx={{ mt: 2, p: 2, borderRadius: "12px", backgroundColor: "grey.50", border: `1px solid ${palette.divider}` }}>
                  <Typography sx={{ fontSize: "0.68rem", fontWeight: 700, color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.06em", mb: 0.5 }}>
                    Additional Notes
                  </Typography>
                  <Typography sx={{ fontSize: "0.88rem", fontWeight: 500, color: "text.primary" }}>
                    {notes}
                  </Typography>
                </Box>
              )}

              <Alert severity="success" sx={{ mt: 2.5, borderRadius: "10px" }}>
                This appointment will be set to <strong>Confirmed</strong> immediately upon booking.
              </Alert>
            </Box>
          )}

          {/* Navigation Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4, pt: 3, borderTop: `1px solid ${palette.grey[200]}` }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
              sx={{ textTransform: "none", borderRadius: "10px", px: 2.5, py: 1, fontWeight: 600 }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!canProceed()}
              sx={{
                backgroundColor: activeStep === STEPS.length - 1 ? palette.success.main : PURPLE,
                textTransform: "none",
                borderRadius: "10px",
                px: 3,
                py: 1,
                fontWeight: 600,
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: activeStep === STEPS.length - 1 ? "#0E9F5A" : "#3451D1",
                  boxShadow: "none",
                },
              }}
            >
              {activeStep === STEPS.length - 1 ? "Confirm Booking" : "Continue"}
            </Button>
          </Box>

        </Box>
      </Paper>
    </Box>
  );
}
