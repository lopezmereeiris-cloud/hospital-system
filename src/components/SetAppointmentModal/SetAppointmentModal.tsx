"use client";

import React, { useState, useMemo } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import doctorsData from "@/json/doctors.json";
import schedulesData from "@/json/doctorSchedules.json";
import { palette } from "@/theme/palette";
import { Doctor, Schedule, SetAppointmentModalProps, STEPS, DAYS_OF_WEEK } from "./interface";
import DoctorSelectionStep from "./steps/DoctorSelectionStep";
import DateTimeSelectionStep from "./steps/DateTimeSelectionStep";
import DetailsVerificationStep from "./steps/DetailsVerificationStep";
import ConfirmationStep from "./steps/ConfirmationStep";

const doctors = doctorsData as Doctor[];
const schedules = schedulesData as Record<string, Schedule[]>;

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

  const departments = useMemo(
    () => [...new Set(doctors.filter((d) => d.status === "Active").map((d) => d.department))],
    []
  );

  const filteredDoctors = useMemo(
    () =>
      doctors.filter(
        (d) => d.status === "Active" && (selectedDepartment === "" || d.department === selectedDepartment)
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
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleNext = () => {
    if (activeStep === STEPS.length - 1) {
      onBook({
        doctor: `Dr. ${selectedDoctor!.firstName} ${selectedDoctor!.lastName}`,
        department: selectedDoctor!.department,
        date: selectedDate,
        time: selectedTime,
        type: appointmentType,
        reason,
        notes,
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
        return reason.trim() !== "";
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
            <Typography sx={{ fontSize: "1.3rem", fontWeight: 700, color: "text.primary" }}>
              Request Appointment
            </Typography>
            <Typography sx={{ fontSize: "0.88rem", color: "text.secondary", mt: 0.5 }}>
              Complete all steps to submit your appointment request.
            </Typography>
          </div>
          <IconButton onClick={handleClose} size="small">
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        <Alert severity="info" sx={{ mb: 2.5, borderRadius: "10px" }}>
          Requests are placed in <strong>Pending</strong> until admin confirms your schedule.
        </Alert>

        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            mb: 4,
            "& .MuiStepLabel-label": { fontSize: "0.78rem", fontWeight: 600, mt: 0.75 },
            "& .MuiStepIcon-root.Mui-active": { color: "primary.main" },
            "& .MuiStepIcon-root.Mui-completed": { color: "success.main" },
          }}
        >
          {STEPS.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <DoctorSelectionStep
            departments={departments}
            filteredDoctors={filteredDoctors}
            selectedDepartment={selectedDepartment}
            selectedDoctor={selectedDoctor}
            onDepartmentChange={(value) => {
              setSelectedDepartment(value);
              setSelectedDoctor(null);
            }}
            onDoctorSelect={setSelectedDoctor}
          />
        )}

        {activeStep === 1 && (
          <DateTimeSelectionStep
            selectedDoctor={selectedDoctor}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            availableSlots={availableSlots}
            minDate={getMinDate()}
            onDateChange={(value) => {
              setSelectedDate(value);
              setSelectedTime("");
              setSelectedTimeLabel("");
            }}
            onTimeSelect={(time, label) => {
              setSelectedTime(time);
              setSelectedTimeLabel(label);
            }}
          />
        )}

        {activeStep === 2 && (
          <DetailsVerificationStep
            appointmentType={appointmentType}
            reason={reason}
            notes={notes}
            onAppointmentTypeChange={setAppointmentType}
            onReasonChange={setReason}
            onNotesChange={setNotes}
          />
        )}

        {activeStep === 3 && (
          <ConfirmationStep
            selectedDoctor={selectedDoctor}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedTimeLabel={selectedTimeLabel}
            appointmentType={appointmentType}
            reason={reason}
            notes={notes}
          />
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
            sx={{ textTransform: "none", borderRadius: "10px", px: 2.5, py: 1, fontWeight: 600 }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!canProceed()}
            sx={{
              backgroundColor: activeStep === 3 ? palette.success.main : palette.primary.main,
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
