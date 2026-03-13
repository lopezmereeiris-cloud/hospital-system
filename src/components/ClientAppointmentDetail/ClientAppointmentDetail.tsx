"use client";

import React from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import { Appointment } from "@/components/AppointmentTable/interface";

interface ClientAppointmentDetailProps {
  open: boolean;
  onClose: () => void;
  appointment: Appointment | null;
}

const statusColorMap: Record<string, "warning" | "success" | "info" | "error"> =
  {
    Pending: "warning",
    Confirmed: "info",
    Completed: "success",
    Cancelled: "error",
  };

const statusLabelMap: Record<Appointment["status"], string> = {
  Pending: "Pending",
  Confirmed: "Confirmed",
  Completed: "Completed",
  Cancelled: "Cancelled",
};

const maskId = (idNumber: string) => {
  if (idNumber.length <= 4) return idNumber;
  return `${"*".repeat(Math.max(0, idNumber.length - 4))}${idNumber.slice(-4)}`;
};

const InfoCard = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
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
        fontSize: "0.68rem",
        fontWeight: 700,
        color: "#6F767E",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        mb: 0.55,
      }}
    >
      {label}
    </Typography>
    <Typography sx={{ fontSize: "0.9rem", fontWeight: 600, color: "#1A1D1F" }}>
      {value || "-"}
    </Typography>
  </Box>
);

const ClientAppointmentDetail: React.FC<ClientAppointmentDetailProps> = ({
  open,
  onClose,
  appointment,
}) => {
  if (!appointment) return null;

  const hasVerificationId =
    Boolean(appointment.verificationIdType) &&
    Boolean(appointment.verificationIdNumber);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 2,
            mb: 2.5,
          }}
        >
          <Box>
            <Typography sx={{ fontSize: "1.25rem", fontWeight: 700, color: "#1A1D1F" }}>
              Appointment Details
            </Typography>
            <Typography sx={{ fontSize: "0.84rem", color: "#6F767E", mt: 0.45 }}>
              Review your schedule and verification details.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Chip
              label={statusLabelMap[appointment.status]}
              color={statusColorMap[appointment.status]}
              size="small"
              sx={{ fontWeight: 600 }}
            />
            <IconButton onClick={onClose} size="small">
              <CloseRoundedIcon />
            </IconButton>
          </Box>
        </Box>

        {appointment.status === "Pending" && (
          <Alert severity="info" sx={{ borderRadius: "10px", mb: 2.2 }}>
            Your request is pending admin review.
          </Alert>
        )}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 1.5,
          }}
        >
          <InfoCard label="Doctor" value={appointment.assignedDoctor} />
          <InfoCard label="Date" value={appointment.date} />
          <InfoCard label="Time" value={appointment.time} />
          <InfoCard label="Patient Name" value={appointment.patientName} />
          <InfoCard label="Contact" value={appointment.contact} />
          <InfoCard label="Email" value={appointment.email} />
        </Box>

        <Divider sx={{ my: 2.3 }} />

        <Box
          sx={{
            p: 2,
            borderRadius: "12px",
            border: "1px solid #ECEFF3",
            backgroundColor: "#FCFCFD",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.2 }}>
            <VerifiedUserRoundedIcon sx={{ fontSize: 18, color: "#4361EE" }} />
            <Typography sx={{ fontSize: "0.88rem", fontWeight: 700, color: "#1A1D1F" }}>
              Verification ID
            </Typography>
          </Box>

          {hasVerificationId ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 1.5,
              }}
            >
              <InfoCard
                label="ID Type"
                value={appointment.verificationIdType || ""}
              />
              <InfoCard
                label="ID Number"
                value={maskId(appointment.verificationIdNumber || "")}
              />
            </Box>
          ) : (
            <Alert severity="warning" sx={{ borderRadius: "10px" }}>
              No verification ID submitted yet for this request.
            </Alert>
          )}
        </Box>

        {appointment.specialNotes && (
          <>
            <Divider sx={{ my: 2.3 }} />
            <Typography
              sx={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#6F767E",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                mb: 0.8,
              }}
            >
              Notes
            </Typography>
            <Typography sx={{ fontSize: "0.88rem", color: "#4B5563", lineHeight: 1.6 }}>
              {appointment.specialNotes}
            </Typography>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ClientAppointmentDetail;
