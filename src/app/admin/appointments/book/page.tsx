"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
import patientsData from "@/json/patients.json";
import { Patient } from "@/components/PatientList/interface";
import { palette } from "@/theme/palette";

type Doctor = {
  doctorId: string;
  firstName: string;
  lastName: string;
  department: string;
  specialization: string;
  subSpecialization?: string;
  yearsOfExperience?: number;
  status: string;
};

const PURPLE = "#4361EE";
const doctors = doctorsData as Doctor[];
const patients = patientsData as Patient[];

const STEPS = [
  "Select Patient",
  "Appointment Details",
  "Choose Date & Time",
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

const TIME_SLOTS = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
];

function format24HourTo12Hour(time: string) {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  const hourNumber = Number(hours);
  const suffix = hourNumber >= 12 ? "PM" : "AM";
  const twelveHour = hourNumber % 12 || 12;
  return `${twelveHour}:${minutes} ${suffix}`;
}

function formatDateDisplay(dateString: string) {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

function getMinDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

function assignDoctorByAppointmentType(
  appointmentType: string,
  doctorList: Doctor[]
): Doctor | null {
  const activeDoctors = doctorList.filter((doctor) => doctor.status === "Active");
  if (!activeDoctors.length) return null;

  const departmentKeywords: Record<string, string[]> = {
    Consultation: ["General", "Internal", "Family", "Outpatient"],
    "Follow-up": ["General", "Internal", "Family", "Outpatient"],
    "Check-up": ["General", "Internal", "Family", "Preventive", "Outpatient"],
    Procedure: ["Surgery", "Procedure", "Orthopedic", "ENT", "OB", "Gyne", "Derm"],
  };

  const keywords = departmentKeywords[appointmentType] || ["General"];

  const matchedDoctors = activeDoctors.filter((doctor) => {
    const haystack = `${doctor.department} ${doctor.specialization} ${doctor.subSpecialization || ""}`.toLowerCase();
    return keywords.some((keyword) => haystack.includes(keyword.toLowerCase()));
  });

  return matchedDoctors[0] || activeDoctors[0];
}

export default function BookAppointmentPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("Consultation");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [patientSearch, setPatientSearch] = useState("");

  const selectedPatient =
    patients.find((patient) => patient.patient_id === selectedPatientId) ?? null;

  const assignedDoctor = useMemo(
    () => assignDoctorByAppointmentType(appointmentType, doctors),
    [appointmentType]
  );

  const canProceed = () => {
    switch (activeStep) {
      case 0:
        return !!selectedPatientId;
      case 1:
        return appointmentType.trim() !== "" && reason.trim() !== "";
      case 2:
        return selectedDate !== "" && selectedTime !== "";
      case 3:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (activeStep === STEPS.length - 1) {
      console.log("Booking appointment:", {
        patient: selectedPatient?.name,
        patientId: selectedPatient?.patient_id,
        doctor: assignedDoctor
          ? `Dr. ${assignedDoctor.firstName} ${assignedDoctor.lastName}`
          : "Unassigned",
        department: assignedDoctor?.department || "",
        date: selectedDate,
        time: selectedTime,
        type: appointmentType,
        reason,
        notes,
        status: "Confirmed",
      });

      router.push("/admin/appointments");
      return;
    }

    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <Box sx={{ maxWidth: 1180, mx: "auto", pb: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          mb: 2.5,
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/admin/appointments"
          style={{
            textDecoration: "none",
            fontSize: "0.82rem",
            fontWeight: 500,
            color: PURPLE,
          }}
        >
          Appointments
        </Link>
        <NavigateNextRoundedIcon sx={{ fontSize: 16, color: "#9CA3AF" }} />
        <Chip
          label="Book Appointment"
          size="small"
          sx={{
            bgcolor: "rgba(67, 97, 238, 0.08)",
            color: PURPLE,
            fontWeight: 600,
            fontSize: "0.75rem",
          }}
        />
      </Box>

      <Paper
        sx={{
          borderRadius: "18px",
          overflow: "hidden",
          border: "1px solid #E4E7EC",
          boxShadow: "0 8px 24px rgba(16,24,40,0.06)",
          maxWidth: 860,
          mx: "auto",
        }}
      >
        <Box
          sx={{
            p: "28px 32px",
            background: PURPLE,
            borderBottom: "1px solid rgba(255,255,255,0.16)",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "0.01em",
            }}
          >
            Book an Appointment
          </Typography>
          <Typography
            sx={{
              fontSize: "0.84rem",
              color: "rgba(255,255,255,0.9)",
              mt: 0.75,
              lineHeight: 1.5,
            }}
          >
            Complete all steps to schedule a patient appointment.
          </Typography>
        </Box>

        <Box
          sx={{
            p: "24px 32px 0",
            borderBottom: "1px solid #EEF2F6",
            bgcolor: "#FBFFFD",
          }}
        >
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{
              pb: 3,
              "& .MuiStepLabel-label": {
                fontSize: "0.78rem",
                fontWeight: 600,
                mt: 0.75,
              },
              "& .MuiStepIcon-root.Mui-active": { color: PURPLE },
              "& .MuiStepIcon-root.Mui-completed": {
                color: palette.success.main,
              },
            }}
          >
            {STEPS.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Box sx={{ p: "28px 32px 32px" }}>
          <Alert severity="info" sx={{ mb: 3, borderRadius: "10px" }}>
            Appointments booked by admin are set to <strong>Confirmed</strong>{" "}
            immediately.
          </Alert>

          {activeStep === 0 && (
            <Box>
              <Typography
                sx={{
                  fontSize: "0.92rem",
                  fontWeight: 700,
                  color: "text.primary",
                  mb: 0.5,
                }}
              >
                Select a Patient
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.82rem",
                  color: "text.secondary",
                  mb: 2.5,
                }}
              >
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
                  onClose: () => setPatientSearch(""),
                }}
              >
                <Box
                  sx={{
                    px: 1.5,
                    py: 1,
                    position: "sticky",
                    top: 0,
                    bgcolor: "background.paper",
                    zIndex: 1,
                    borderBottom: "1px solid #F2F4F7",
                  }}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Type to search..."
                    value={patientSearch}
                    onChange={(e) => setPatientSearch(e.target.value)}
                    autoFocus
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        fontSize: "0.85rem",
                      },
                    }}
                  />
                </Box>

                <MenuItem value="">Select a patient...</MenuItem>
                {patients
                  .filter((patient) =>
                    `${patient.name} ${patient.patient_id}`
                      .toLowerCase()
                      .includes(patientSearch.toLowerCase())
                  )
                  .map((patient) => (
                    <MenuItem
                      key={patient.patient_id}
                      value={patient.patient_id}
                    >
                      {patient.name} — {patient.patient_id}
                    </MenuItem>
                  ))}
              </TextField>

              {selectedPatient && (
                <Box
                  sx={{
                    p: 2,
                    borderRadius: "12px",
                    border: `1.5px solid ${PURPLE}`,
                    bgcolor: "rgba(67,97,238,0.03)",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "#EEF4FF",
                      color: PURPLE,
                      fontWeight: 700,
                      width: 44,
                      height: 44,
                      fontSize: "0.88rem",
                    }}
                  >
                    {selectedPatient.name
                      .split(" ")
                      .map((name) => name[0])
                      .slice(0, 2)
                      .join("")}
                  </Avatar>

                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "0.92rem",
                        fontWeight: 700,
                        color: "text.primary",
                      }}
                    >
                      {selectedPatient.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.78rem",
                        color: "text.secondary",
                        mt: 0.25,
                      }}
                    >
                      {selectedPatient.age} yrs · {selectedPatient.gender} ·{" "}
                      {selectedPatient.patient_id}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Chip
                      label={selectedPatient.status}
                      size="small"
                      color={
                        selectedPatient.status === "Active"
                          ? "success"
                          : selectedPatient.status === "Admitted"
                          ? "warning"
                          : "error"
                      }
                    />
                    {selectedPatient.blood_type && (
                      <Chip
                        label={`Blood: ${selectedPatient.blood_type}`}
                        size="small"
                        sx={{
                          bgcolor: "grey.100",
                          color: "grey.700",
                          fontWeight: 600,
                        }}
                      />
                    )}
                  </Box>
                </Box>
              )}
            </Box>
          )}

          {activeStep === 1 && (
            <Box>
              <Box sx={{ mb: 3.5 }}>
                <Typography
                  sx={{
                    fontSize: "0.92rem",
                    fontWeight: 700,
                    color: "text.primary",
                    mb: 0.5,
                  }}
                >
                  What type of appointment is this?
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.78rem",
                    color: "text.secondary",
                    mb: 2,
                  }}
                >
                  Select the option that best describes the visit. The system
                  will assign the most appropriate available doctor based on this
                  appointment type.
                </Typography>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr 1fr",
                      sm: "1fr 1fr 1fr 1fr",
                    },
                    gap: 1.5,
                  }}
                >
                  {APPOINTMENT_TYPES.map((type) => {
                    const isSelected = appointmentType === type.value;

                    return (
                      <Box
                        key={type.value}
                        onClick={() => setAppointmentType(type.value)}
                        sx={{
                          p: 2,
                          borderRadius: "14px",
                          border: isSelected
                            ? `2px solid ${type.color}`
                            : `1.5px solid ${palette.grey[200]}`,
                          backgroundColor: isSelected
                            ? alpha(type.color, 0.05)
                            : palette.background.paper,
                          cursor: "pointer",
                          textAlign: "center",
                          transition: "all 0.18s ease",
                          "&:hover": {
                            borderColor: type.color,
                            backgroundColor: alpha(type.color, 0.03),
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: 1,
                            backgroundColor: isSelected
                              ? alpha(type.color, 0.12)
                              : palette.grey[100],
                            color: isSelected ? type.color : palette.grey[400],
                            "& svg": { fontSize: 22 },
                          }}
                        >
                          {type.icon}
                        </Box>

                        <Typography
                          sx={{
                            fontSize: "0.82rem",
                            fontWeight: 700,
                            color: isSelected ? type.color : "text.primary",
                            mb: 0.25,
                          }}
                        >
                          {type.label}
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: "0.68rem",
                            color: "text.secondary",
                            lineHeight: 1.35,
                          }}
                        >
                          {type.description}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
                >
                  <EditNoteRoundedIcon
                    sx={{ fontSize: 20, color: "primary.main" }}
                  />
                  <Typography
                    sx={{
                      fontSize: "0.92rem",
                      fontWeight: 700,
                      color: "text.primary",
                    }}
                  >
                    Reason for visit *
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontSize: "0.78rem",
                    color: "text.secondary",
                    mb: 1.5,
                  }}
                >
                  Briefly describe the patient&apos;s symptoms or reason for the
                  appointment.
                </Typography>

                <TextField
                  fullWidth
                  required
                  multiline
                  rows={2}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g. Persistent headaches for the past two weeks..."
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      fontSize: "0.88rem",
                    },
                  }}
                />
              </Box>

              <Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
                >
                  <InfoOutlinedIcon
                    sx={{ fontSize: 20, color: "text.secondary" }}
                  />
                  <Typography
                    sx={{
                      fontSize: "0.92rem",
                      fontWeight: 700,
                      color: "text.primary",
                    }}
                  >
                    Additional notes
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "0.78rem",
                        fontWeight: 500,
                        color: "text.secondary",
                        ml: 0.75,
                      }}
                    >
                      (optional)
                    </Typography>
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontSize: "0.78rem",
                    color: "text.secondary",
                    mb: 1.5,
                  }}
                >
                  Include any details the doctor should know, such as allergies,
                  current medications, or special requests.
                </Typography>

                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Allergic to Penicillin, currently taking Metformin 500mg..."
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      fontSize: "0.88rem",
                    },
                  }}
                />
              </Box>
            </Box>
          )}

          {activeStep === 2 && (
            <Box>
              <Typography
                sx={{
                  fontSize: "0.92rem",
                  fontWeight: 700,
                  color: "text.primary",
                  mb: 0.5,
                }}
              >
                Choose Preferred Date & Time
              </Typography>

              <Typography
                sx={{
                  fontSize: "0.78rem",
                  color: "text.secondary",
                  mb: 2.5,
                }}
              >
                Select the patient&apos;s preferred appointment date and time.
                The system will assign the doctor based on the appointment type.
              </Typography>

              <TextField
                label="Select Date"
                type="date"
                fullWidth
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedTime("");
                }}
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: getMinDate() }}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />

              <Typography
                sx={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "text.secondary",
                  letterSpacing: "0.03em",
                  textTransform: "uppercase",
                  mb: 1.5,
                }}
              >
                Available Time Slots
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr 1fr",
                    md: "1fr 1fr 1fr 1fr",
                  },
                  gap: 1.5,
                }}
              >
                {TIME_SLOTS.map((slot) => {
                  const isSelected = selectedTime === slot;
                  return (
                    <Box
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      sx={{
                        p: 2.25,
                        borderRadius: "14px",
                        border: isSelected
                          ? `2px solid ${PURPLE}`
                          : `1px solid ${palette.grey[200]}`,
                        backgroundColor: isSelected
                          ? alpha(PURPLE, 0.02)
                          : palette.background.paper,
                        cursor: "pointer",
                        textAlign: "center",
                        transition: "all 0.18s ease",
                        "&:hover": {
                          borderColor: PURPLE,
                          backgroundColor: alpha(PURPLE, 0.02),
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.95rem",
                          fontWeight: 800,
                          color: isSelected ? PURPLE : "text.primary",
                          mb: 0.5,
                        }}
                      >
                        {format24HourTo12Hour(slot)}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.76rem",
                          color: "text.secondary",
                        }}
                      >
                        Preferred appointment time
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}

          {activeStep === 3 && (
            <Box>
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <CheckCircleRoundedIcon
                  sx={{ fontSize: 48, color: "success.main", mb: 1 }}
                />
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "text.primary",
                  }}
                >
                  Review Appointment
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    color: "text.secondary",
                    mt: 0.5,
                  }}
                >
                  Please review all details before confirming.
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 2,
                }}
              >
                {[
                  { label: "Patient", value: selectedPatient?.name || "-" },
                  { label: "Patient ID", value: selectedPatient?.patient_id || "-" },
                  {
                    label: "Assigned Doctor",
                    value: assignedDoctor
                      ? `Dr. ${assignedDoctor.firstName} ${assignedDoctor.lastName}`
                      : "To be assigned",
                  },
                  {
                    label: "Department",
                    value: assignedDoctor?.department || "-",
                  },
                  {
                    label: "Date",
                    value: selectedDate ? formatDateDisplay(selectedDate) : "-",
                  },
                  {
                    label: "Time",
                    value: selectedTime ? format24HourTo12Hour(selectedTime) : "-",
                  },
                  { label: "Type", value: appointmentType || "-" },
                  { label: "Reason", value: reason || "-" },
                ].map((item) => (
                  <Box
                    key={item.label}
                    sx={{
                      p: 2,
                      borderRadius: "12px",
                      backgroundColor: "grey.50",
                      border: `1px solid ${palette.divider}`,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        color: "text.secondary",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        mb: 0.5,
                      }}
                    >
                      {item.label}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.88rem",
                        fontWeight: 500,
                        color: "text.primary",
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {notes && (
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: "12px",
                    backgroundColor: "grey.50",
                    border: `1px solid ${palette.divider}`,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      color: "text.secondary",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      mb: 0.5,
                    }}
                  >
                    Additional Notes
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.88rem",
                      fontWeight: 500,
                      color: "text.primary",
                    }}
                  >
                    {notes}
                  </Typography>
                </Box>
              )}

              <Alert severity="success" sx={{ mt: 2.5, borderRadius: "10px" }}>
                This appointment will be set to <strong>Confirmed</strong>{" "}
                immediately upon booking.
              </Alert>
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 4,
              pt: 3,
              borderTop: `1px solid ${palette.grey[200]}`,
            }}
          >
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                px: 2.5,
                py: 1,
                fontWeight: 600,
              }}
            >
              Back
            </Button>

            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!canProceed()}
              sx={{
                backgroundColor:
                  activeStep === STEPS.length - 1
                    ? palette.success.main
                    : PURPLE,
                textTransform: "none",
                borderRadius: "10px",
                px: 3,
                py: 1,
                fontWeight: 600,
                boxShadow: "none",
                "&:hover": {
                  backgroundColor:
                    activeStep === STEPS.length - 1 ? "#0E9F5A" : "#3451D1",
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
