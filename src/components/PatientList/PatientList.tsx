"use client";

import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import RegisterPatientModal from "./RegisterPatientModal";
import { PatientListProps } from "./interface";

import {
  PatientContainer,
  StyledHeaderCell,
  StyledBodyCell,
  StyledRow
} from "./elements";

const statusColor: Record<string, "success" | "error" | "warning"> = {
  Active: "success",
  Admitted: "warning",
  Discharged: "error",
};

const PatientList: React.FC<PatientListProps> = ({ patients }) => {
  const [open, setOpen] = useState(false);

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
  style={{
    backgroundColor: "#4361EE",
    color: "#FFFFFF",
    textTransform: "none",
    borderRadius: "10px",
    fontWeight: 600,
    padding: "8px 20px",
    boxShadow: "none",
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
              <StyledRow key={patient.patient_id}>
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
    </PatientContainer>
  );
};

export default PatientList;