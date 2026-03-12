"use client";

import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { AppointmentModalProps } from "./interface";
import { Appointment } from "../AppointmentTable/interface";
import {
  ModalHeader,
  DetailGrid,
  DetailItem,
  DetailLabel,
  DetailValue,
  SectionDivider,
  ModalActions,
} from "./elements";

const statuses: Appointment["status"][] = [
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
];

const statusColorMap: Record<string, "warning" | "success" | "info" | "error"> = {
  Pending: "warning",
  Confirmed: "info",
  Completed: "success",
  Cancelled: "error",
};

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  open,
  onClose,
  appointment,
  onStatusChange,
}) => {
  if (!appointment) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent sx={{ p: 4 }}>
        <ModalHeader>
          <div>
            <Typography variant="h4">{appointment.patientName}</Typography>
            <Chip
              label={appointment.status}
              color={statusColorMap[appointment.status]}
              size="small"
              sx={{ mt: 1 }}
            />
          </div>
          <IconButton onClick={onClose} size="small">
            <CloseRoundedIcon />
          </IconButton>
        </ModalHeader>

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Patient Details
        </Typography>
        <DetailGrid>
          <DetailItem>
            <DetailLabel>Age</DetailLabel>
            <DetailValue>{appointment.age} years old</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Gender</DetailLabel>
            <DetailValue>{appointment.gender}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Contact</DetailLabel>
            <DetailValue>{appointment.contact}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Email</DetailLabel>
            <DetailValue>{appointment.email}</DetailValue>
          </DetailItem>
        </DetailGrid>

        <SectionDivider />

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Appointment Info
        </Typography>
        <DetailGrid>
          <DetailItem>
            <DetailLabel>Doctor</DetailLabel>
            <DetailValue>{appointment.assignedDoctor}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Date & Time</DetailLabel>
            <DetailValue>
              {appointment.date} at {appointment.time}
            </DetailValue>
          </DetailItem>
        </DetailGrid>

        <SectionDivider />

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Medical History
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {appointment.medicalHistory}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Special Notes
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {appointment.specialNotes}
        </Typography>

        <SectionDivider />

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Update Status
        </Typography>
        <ModalActions>
          {statuses.map((s) => (
            <Button
              key={s}
              variant={appointment.status === s ? "contained" : "outlined"}
              color={statusColorMap[s]}
              size="small"
              onClick={() => onStatusChange(appointment.id, s)}
            >
              {s}
            </Button>
          ))}
        </ModalActions>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
