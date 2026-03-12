"use client";

import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ContactPhoneRoundedIcon from "@mui/icons-material/ContactPhoneRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import {
  ModalHeader,
  HeaderInfo,
  ModalTitle,
  ModalSubtitle,
  SectionDivider,
  SectionTitle,
  FormGrid,
  FormActions,
} from "./elements";

interface RegisterPatientModalProps {
  open: boolean;
  onClose: () => void;
}

const RegisterPatientModal: React.FC<RegisterPatientModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent sx={{ p: 4 }}>
        <ModalHeader>
          <HeaderInfo>
            <ModalTitle>Patient Registration</ModalTitle>
            <ModalSubtitle>
              Enter the patient details below to create a new patient record.
            </ModalSubtitle>
          </HeaderInfo>

          <IconButton onClick={onClose} size="small">
            <CloseRoundedIcon />
          </IconButton>
        </ModalHeader>

        <SectionTitle>PERSONAL INFORMATION</SectionTitle>

        <FormGrid>
          <TextField label="Patient ID" fullWidth />
          <TextField label="Full Name" fullWidth />
          <TextField label="Age" type="number" fullWidth />
          <TextField label="Gender" select fullWidth>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </TextField>
        </FormGrid>

        <SectionDivider />

        <SectionTitle>CONTACT INFORMATION</SectionTitle>

        <FormGrid>
          <TextField label="Contact Number" fullWidth />
          <TextField label="PhilHealth Number" fullWidth />
          <TextField
            label="Address"
            fullWidth
            sx={{ gridColumn: { xs: "auto", sm: "1 / -1" } }}
          />
        </FormGrid>

        <SectionDivider />

        <SectionTitle>PATIENT STATUS</SectionTitle>

        <FormGrid>
          <TextField label="Status" select fullWidth>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Admitted">Admitted</MenuItem>
            <MenuItem value="Discharged">Discharged</MenuItem>
          </TextField>

          <TextField
            label="Last Visit"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
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
              backgroundColor: "#4361EE !important",
              color: "#FFFFFF !important",
              textTransform: "none",
              borderRadius: "10px",
              px: 2.5,
              py: 1,
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#3A56D4 !important",
              },
            }}
          >
            Save Patient
          </Button>
        </FormActions>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterPatientModal;
