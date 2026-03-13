"use client";

import React, { useState, useMemo } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Alert from "@mui/material/Alert";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import doctorsData from "@/json/doctors.json";
import schedulesData from "@/json/doctorSchedules.json";

interface Doctor {
  doctorId: string;
  firstName: string;
  lastName: string;
  specialization: string;
  subSpecialization: string;
  department: string;
  yearsOfExperience: number;
  status: string;
}

interface Schedule {
  day: string;
  startTime: string;
  endTime: string;
  activity: string;
  type: string;
}

interface SetAppointmentModalProps {
  open: boolean;
  onClose: () => void;
  onBook: (appointment: {
    doctor: string;
    department: string;
    date: string;
    time: string;
    type: string;
    reason: string;
    notes: string;
    verificationIdType: string;
    verificationIdNumber: string;
  }) => void;
}

const steps = [
  "Select Doctor",
  "Choose Date & Time",
  "Details & Verification",
  "Confirmation",
];

const ID_TYPES = [
  "National ID",
  "Passport",
  "Driver's License",
  "PhilHealth ID",
  "Student ID",
];

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const doctors = doctorsData as Doctor[];
const schedules = schedulesData as Record<string, Schedule[]>;

const format24HourTo12Hour = (rawTime: string) => {
  const [hoursText, minutesText] = rawTime.split(":");
  const hours = Number(hoursText);
  const minutes = Number(minutesText);

  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${String(displayHours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )} ${period}`;
};

const SetAppointmentModal: React.FC<SetAppointmentModalProps> = ({
  open,
  onClose,
  onBook,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTimeLabel, setSelectedTimeLabel] = useState("");
  const [appointmentType, setAppointmentType] = useState("Consultation");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [verificationIdType, setVerificationIdType] = useState("");
  const [verificationIdNumber, setVerificationIdNumber] = useState("");

  const isValidIdNumber = (idNumber: string) =>
    /^[A-Za-z0-9-]{6,20}$/.test(idNumber.trim());

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
      (s) =>
        s.day === dayName &&
        (s.type === "consultation" || s.type === "specialty")
    );
  }, [selectedDoctor, selectedDate]);

  const handleReset = () => {
    setActiveStep(0);
    setSelectedDepartment("");
    setSelectedDoctor(null);
    setSelectedDate("");
    setSelectedTime("");
    setSelectedTimeLabel("");
    setAppointmentType("Consultation");
    setReason("");
    setNotes("");
    setVerificationIdType("");
    setVerificationIdNumber("");
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      onBook({
        doctor: `Dr. ${selectedDoctor!.firstName} ${selectedDoctor!.lastName}`,
        department: selectedDoctor!.department,
        date: selectedDate,
        time: selectedTime,
        type: appointmentType,
        reason,
        notes,
        verificationIdType,
        verificationIdNumber: verificationIdNumber.trim().toUpperCase(),
      });
      handleClose();
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const canProceed = () => {
    switch (activeStep) {
      case 0:
        return selectedDoctor !== null;
      case 1:
        return selectedDate !== "" && selectedTime !== "";
      case 2:
        return (
          reason.trim() !== "" &&
          verificationIdType !== "" &&
          isValidIdNumber(verificationIdNumber)
        );
      case 3:
        return true;
      default:
        return false;
    }
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogContent sx={{ p: { xs: 2.5, sm: 4 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 3,
          }}
        >
          <div>
            <Typography
              sx={{ fontSize: "1.3rem", fontWeight: 700, color: "#1A1D1F" }}
            >
              Request Appointment
            </Typography>
            <Typography sx={{ fontSize: "0.88rem", color: "#6F767E", mt: 0.5 }}>
              Complete all steps and submit a valid ID for request verification.
            </Typography>
          </div>
          <IconButton onClick={handleClose} size="small">
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        <Alert severity="info" sx={{ mb: 2.5, borderRadius: "10px" }}>
          Requests are placed in <strong>Pending</strong> until admin confirms
          your schedule and verifies your submitted ID.
        </Alert>

        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            mb: 4,
            "& .MuiStepLabel-label": {
              fontSize: "0.78rem",
              fontWeight: 600,
              mt: 0.75,
            },
            "& .MuiStepIcon-root.Mui-active": { color: "#4361EE" },
            "& .MuiStepIcon-root.Mui-completed": { color: "#12B76A" },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Step 1: Select Doctor */}
        {activeStep === 0 && (
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
                <MenuItem key={dep} value={dep}>
                  {dep}
                </MenuItem>
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
                    border:
                      selectedDoctor?.doctorId === doc.doctorId
                        ? "2px solid #4361EE"
                        : "1px solid #ECEFF3",
                    boxShadow: "none",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    backgroundColor:
                      selectedDoctor?.doctorId === doc.doctorId
                        ? "rgba(67,97,238,0.04)"
                        : "#fff",
                    "&:hover": {
                      borderColor: "#4361EE",
                      backgroundColor: "rgba(67,97,238,0.02)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#EEF4FF",
                        color: "#4361EE",
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
                      <Typography
                        sx={{
                          fontSize: "0.92rem",
                          fontWeight: 600,
                          color: "#1A1D1F",
                        }}
                      >
                        Dr. {doc.firstName} {doc.lastName}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.78rem",
                          color: "#6F767E",
                          mt: 0.25,
                        }}
                      >
                        {doc.specialization} - {doc.subSpecialization}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.74rem",
                          color: "#98A2B3",
                          mt: 0.25,
                        }}
                      >
                        {doc.yearsOfExperience} years of experience
                      </Typography>
                    </Box>
                    <Chip
                      label={doc.department}
                      size="small"
                      sx={{
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        backgroundColor: "#F0F2F5",
                        color: "#6F767E",
                      }}
                    />
                  </Box>
                </Card>
              ))}
            </Box>
          </Box>
        )}

        {/* Step 2: Choose Date & Time */}
        {activeStep === 1 && (
          <Box>
            <Typography
              sx={{ fontSize: "0.92rem", fontWeight: 600, color: "#1A1D1F", mb: 2 }}
            >
              Selected Doctor: Dr. {selectedDoctor?.firstName}{" "}
              {selectedDoctor?.lastName}
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
                <Typography
                  sx={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "#6F767E",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    mb: 1.5,
                  }}
                >
                  Available Time Slots
                </Typography>
                {availableSlots.length === 0 ? (
                  <Box
                    sx={{
                      p: 3,
                      textAlign: "center",
                      backgroundColor: "#FCFCFD",
                      borderRadius: "12px",
                      border: "1px solid #ECEFF3",
                    }}
                  >
                    <Typography
                      sx={{ fontSize: "0.88rem", color: "#6F767E" }}
                    >
                      No available slots for this date. The doctor is not
                      scheduled for consultations on this day.
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                      gap: 1.5,
                    }}
                  >
                    {availableSlots.map((slot, i) => {
                      const slotStart = format24HourTo12Hour(slot.startTime);
                      const slotEnd = format24HourTo12Hour(slot.endTime);
                      const label = `${slotStart} - ${slotEnd}`;
                      const isSelected = selectedTime === slotStart;
                      return (
                        <Card
                          key={i}
                          onClick={() => {
                            setSelectedTime(slotStart);
                            setSelectedTimeLabel(label);
                          }}
                          sx={{
                            p: 1.75,
                            borderRadius: "10px",
                            border: isSelected
                              ? "2px solid #4361EE"
                              : "1px solid #ECEFF3",
                            boxShadow: "none",
                            cursor: "pointer",
                            backgroundColor: isSelected
                              ? "rgba(67,97,238,0.04)"
                              : "#fff",
                            textAlign: "center",
                            transition: "all 0.15s ease",
                            "&:hover": {
                              borderColor: "#4361EE",
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "0.88rem",
                              fontWeight: 600,
                              color: isSelected ? "#4361EE" : "#1A1D1F",
                            }}
                          >
                            {label}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "0.72rem",
                              color: "#6F767E",
                              mt: 0.25,
                            }}
                          >
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
        {activeStep === 2 && (
          <Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
                mb: 3,
              }}
            >
              <TextField
                select
                label="Appointment Type"
                fullWidth
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
              >
                <MenuItem value="Consultation">Consultation</MenuItem>
                <MenuItem value="Follow-up">Follow-up</MenuItem>
                <MenuItem value="Check-up">Check-up</MenuItem>
                <MenuItem value="Procedure">Procedure</MenuItem>
              </TextField>
            </Box>

            <TextField
              label="Reason for Visit"
              fullWidth
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Describe your reason for visiting..."
              sx={{ mb: 2 }}
            />

            <TextField
              label="Additional Notes (optional)"
              fullWidth
              multiline
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional information you'd like the doctor to know..."
              sx={{ mb: 2.2 }}
            />

            <Box
              sx={{
                p: 2,
                borderRadius: "12px",
                border: "1px solid #ECEFF3",
                backgroundColor: "#FCFCFD",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "#1A1D1F",
                  mb: 1.5,
                }}
              >
                Patient Verification ID
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 2,
                }}
              >
                <TextField
                  select
                  label="ID Type"
                  fullWidth
                  value={verificationIdType}
                  onChange={(e) => setVerificationIdType(e.target.value)}
                >
                  {ID_TYPES.map((idType) => (
                    <MenuItem key={idType} value={idType}>
                      {idType}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="ID Number"
                  fullWidth
                  value={verificationIdNumber}
                  onChange={(e) => setVerificationIdNumber(e.target.value)}
                  error={
                    verificationIdNumber.trim().length > 0 &&
                    !isValidIdNumber(verificationIdNumber)
                  }
                  helperText={
                    verificationIdNumber.trim().length > 0 &&
                    !isValidIdNumber(verificationIdNumber)
                      ? "Use 6-20 letters/numbers (dashes allowed)."
                      : "Example: A12-334455"
                  }
                />
              </Box>
            </Box>
          </Box>
        )}

        {/* Step 4: Confirmation */}
        {activeStep === 3 && (
          <Box>
            <Box
              sx={{
                textAlign: "center",
                mb: 3,
              }}
            >
              <CheckCircleRoundedIcon
                sx={{ fontSize: 48, color: "#12B76A", mb: 1 }}
              />
              <Typography
                sx={{ fontSize: "1.1rem", fontWeight: 700, color: "#1A1D1F" }}
              >
                Review Your Appointment
              </Typography>
              <Typography sx={{ fontSize: "0.85rem", color: "#6F767E", mt: 0.5 }}>
                Please review the details below before confirming.
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
                {
                  label: "Doctor",
                  value: `Dr. ${selectedDoctor?.firstName} ${selectedDoctor?.lastName}`,
                },
                {
                  label: "Department",
                  value: selectedDoctor?.department || "",
                },
                { label: "Date", value: selectedDate },
                {
                  label: "Time",
                  value: selectedTimeLabel || selectedTime,
                },
                { label: "Type", value: appointmentType },
                { label: "Reason", value: reason },
                {
                  label: "Verification ID",
                  value: `${verificationIdType} - ${
                    verificationIdNumber.trim().toUpperCase() || ""
                  }`,
                },
              ].map((item) => (
                <Box
                  key={item.label}
                  sx={{
                    p: 2,
                    borderRadius: "12px",
                    backgroundColor: "#FCFCFD",
                    border: "1px solid #F0F2F5",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      color: "#6F767E",
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
                      color: "#1A1D1F",
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
                  backgroundColor: "#FCFCFD",
                  border: "1px solid #F0F2F5",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    color: "#6F767E",
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
                    color: "#1A1D1F",
                  }}
                >
                  {notes}
                </Typography>
              </Box>
            )}

            <Alert severity="info" sx={{ mt: 2, borderRadius: "10px" }}>
              After submission, this request remains pending while admin
              validates schedule availability and your ID details.
            </Alert>
          </Box>
        )}

        {/* Navigation Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 4,
            pt: 3,
            borderTop: "1px solid #ECEFF3",
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
              backgroundColor: activeStep === 3 ? "#12B76A" : "#4361EE",
              textTransform: "none",
              borderRadius: "10px",
              px: 3,
              py: 1,
              fontWeight: 600,
              boxShadow: "none",
              "&:hover": {
                backgroundColor: activeStep === 3 ? "#0E9F5A" : "#3A56D4",
                boxShadow: "none",
              },
            }}
          >
            {activeStep === 3 ? "Submit for Admin Approval" : "Continue"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SetAppointmentModal;
