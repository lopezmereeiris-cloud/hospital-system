"use client";

import React, { useMemo, useState } from "react";
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
import { palette } from "@/theme/palette";
import { Doctor, SetAppointmentModalProps, STEPS, format24HourTo12Hour } from "./interface";
import DateTimeSelectionStep from "./steps/DateTimeSelectionStep";
import DetailsVerificationStep from "./steps/DetailsVerificationStep";
import ConfirmationStep from "./steps/ConfirmationStep";

const doctors = doctorsData as Doctor[];

const APPOINTMENT_TYPE_MATCHERS: Record<string, string[]> = {
  Consultation: ["internal medicine", "general", "family", "primary care", "cardiology"],
  "Follow-up": ["internal medicine", "general", "family", "primary care", "cardiology"],
  "Check-up": ["internal medicine", "general", "family", "primary care", "preventive"],
  Procedure: ["surgery", "procedure", "internal medicine", "specialty"],
};

const DEFAULT_TIME_OPTIONS = [
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

const SetAppointmentModal: React.FC<SetAppointmentModalProps> = ({
  open,
  onClose,
  onBook,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("Consultation");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  const assignedDoctor = useMemo(() => {
    const activeDoctors = doctors.filter((doctor) => doctor.status === "Active");
    if (activeDoctors.length === 0) return null;

    const keywords = APPOINTMENT_TYPE_MATCHERS[appointmentType] || [];

    const matchedDoctors = activeDoctors.filter((doctor) => {
      const searchableText = [doctor.department, doctor.specialization, doctor.subSpecialization]
        .join(" ")
        .toLowerCase();

      return keywords.some((keyword) => searchableText.includes(keyword));
    });

    return (matchedDoctors[0] || activeDoctors[0]) ?? null;
  }, [appointmentType]);

  const selectedTimeLabel = useMemo(() => {
    if (!selectedTime) return "";
    return format24HourTo12Hour(selectedTime);
  }, [selectedTime]);

  const handleReset = () => {
    setActiveStep(0);
    setSelectedDate("");
    setSelectedTime("");
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
        doctor: assignedDoctor
          ? `Dr. ${assignedDoctor.firstName} ${assignedDoctor.lastName}`
          : "Doctor to be assigned",
        department: assignedDoctor?.department || "General Medicine",
        date: selectedDate,
        time: selectedTimeLabel || selectedTime,
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
        return reason.trim() !== "";
      case 1:
        return selectedDate !== "" && selectedTime !== "";
      case 2:
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
          <DetailsVerificationStep
            appointmentType={appointmentType}
            reason={reason}
            notes={notes}
            selectedDoctor={assignedDoctor}
            onAppointmentTypeChange={setAppointmentType}
            onReasonChange={setReason}
            onNotesChange={setNotes}
          />
        )}

        {activeStep === 1 && (
          <DateTimeSelectionStep
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            minDate={getMinDate()}
            timeOptions={DEFAULT_TIME_OPTIONS}
            onDateChange={(value) => {
              setSelectedDate(value);
            }}
            onTimeSelect={(time) => {
              setSelectedTime(time);
            }}
          />
        )}

        {activeStep === 2 && (
          <ConfirmationStep
            selectedDoctor={assignedDoctor}
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
            onClick={handleNext}
            variant="contained"
            disabled={!canProceed()}
            sx={{ textTransform: "none", borderRadius: "10px", px: 3, py: 1, fontWeight: 700 }}
          >
            {activeStep === STEPS.length - 1 ? "Submit Request" : "Continue"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SetAppointmentModal;
