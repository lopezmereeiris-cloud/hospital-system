"use client";

import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import {
  ModalHeader,
  HeaderInfo,
  ModalTitle,
  ModalSubtitle,
  SectionDivider,
  SectionTitle,
  FormGrid,
  FormActions,
} from "@/components/PatientList/elements";

interface BookAppointmentModalProps {
  open: boolean;
  onClose: () => void;
}

const BookAppointmentModal: React.FC<BookAppointmentModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent sx={{ p: 4 }}>
        <ModalHeader>
          <HeaderInfo>
            <ModalTitle>Book Appointment</ModalTitle>
            <ModalSubtitle>
              Enter the appointment details below to schedule a new consultation.
            </ModalSubtitle>
          </HeaderInfo>

          <IconButton onClick={onClose} size="small">
            <CloseRoundedIcon />
          </IconButton>
        </ModalHeader>

        <SectionTitle>
          <PersonRoundedIcon sx={{ fontSize: 18 }} />
          Patient Information
        </SectionTitle>

        <FormGrid>
          <TextField label="Patient Name" fullWidth />
          <TextField label="Patient ID" fullWidth />
          <TextField label="Contact Number" fullWidth />
          <TextField label="Email Address" fullWidth />
        </FormGrid>

        <SectionDivider />

        <SectionTitle>
          <LocalHospitalRoundedIcon sx={{ fontSize: 18 }} />
          Appointment Details
        </SectionTitle>

        <FormGrid>
          <TextField label="Doctor Name" fullWidth />
          <TextField label="Department" fullWidth />

          <TextField
            label="Appointment Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Appointment Time"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <TextField label="Status" select fullWidth defaultValue="Pending">
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Confirmed">Confirmed</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </TextField>

          <TextField label="Type" select fullWidth defaultValue="Consultation">
            <MenuItem value="Consultation">Consultation</MenuItem>
            <MenuItem value="Follow-up">Follow-up</MenuItem>
            <MenuItem value="Check-up">Check-up</MenuItem>
            <MenuItem value="Procedure">Procedure</MenuItem>
          </TextField>

            <TextField label="Notes" fullWidth multiline rows={3} />
        </FormGrid>

        <SectionDivider />

        <SectionTitle>
          <EventNoteRoundedIcon sx={{ fontSize: 18 }} />
          Additional Information
        </SectionTitle>

        <FormGrid>
          <TextField label="Reason for Visit" fullWidth />
          <TextField label="Referral" fullWidth />
        </FormGrid>

        <FormActions>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              px: 2.5,
              py: 1,
              fontWeight: 600,
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "primary.main",
              textTransform: "none",
              borderRadius: "10px",
              px: 2.5,
              py: 1,
              fontWeight: 600,
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#3A56D4",
                boxShadow: "none",
              },
            }}
          >
            Save Appointment
          </Button>
        </FormActions>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointmentModal;