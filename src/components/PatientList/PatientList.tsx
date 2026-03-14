"use client";

import React, { useState } from "react";
import { palette } from "@/theme/palette";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import RegisterPatientModal from "./RegisterPatientModal";
import PatientDetailModal from "@/components/PatientModal/PatientDetailModal";
import { Patient, PatientListProps } from "./interface";
import {
  PatientContainer,
  StyledHeaderCell,
  StyledBodyCell,
  StyledRow,
} from "./elements";

const statusColor: Record<string, "success" | "error" | "warning"> = {
  Active: "success",
  Admitted: "warning",
  Discharged: "error",
};

const PatientList: React.FC<PatientListProps> = ({ patients }) => {
  const [open, setOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <PatientContainer>
      <div
        style={{
          padding: "20px 24px",
          borderBottom: "1px solid #ECECEC",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontSize: "18px",
            fontWeight: 700,
            color: "#1A1D1F",
          }}
        >
          Patient List
        </div>

        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{
            backgroundColor: "primary.main",
            color: palette.background.paper,
            textTransform: "none",
            borderRadius: "10px",
            fontWeight: 600,
            px: 2.5,
            py: 1,
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#3A56D4",
              boxShadow: "none",
            },
          }}
        >
          Register Patient
        </Button>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <StyledRow>
              <StyledHeaderCell>Patient ID</StyledHeaderCell>
              <StyledHeaderCell>Name</StyledHeaderCell>
              <StyledHeaderCell>Age</StyledHeaderCell>
              <StyledHeaderCell>Gender</StyledHeaderCell>
              <StyledHeaderCell>PhilHealth #</StyledHeaderCell>
              <StyledHeaderCell>Status</StyledHeaderCell>
              <StyledHeaderCell>Last Visit</StyledHeaderCell>
            </StyledRow>
          </TableHead>

          <TableBody>
            {patients.map((patient) => (
              <StyledRow
                key={patient.patient_id}
                onClick={() => {
                  setSelectedPatient(patient);
                  setDetailOpen(true);
                }}
                sx={{ cursor: "pointer" }}
              >
                <StyledBodyCell>{patient.patient_id}</StyledBodyCell>
                <StyledBodyCell>{patient.name}</StyledBodyCell>
                <StyledBodyCell>{patient.age}</StyledBodyCell>
                <StyledBodyCell>{patient.gender}</StyledBodyCell>
                <StyledBodyCell>{patient.philhealth_number}</StyledBodyCell>
                <StyledBodyCell>
                  <Chip
                    label={patient.status}
                    color={statusColor[patient.status] || "success"}
                    size="small"
                  />
                </StyledBodyCell>
                <StyledBodyCell>{patient.last_visit}</StyledBodyCell>
              </StyledRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <RegisterPatientModal open={open} onClose={() => setOpen(false)} />

      <PatientDetailModal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        patient={selectedPatient}
      />
    </PatientContainer>
  );
};

export default PatientList;