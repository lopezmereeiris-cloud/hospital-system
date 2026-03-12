"use client";

import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import Chip from "@mui/material/Chip";
import { AppointmentTableProps } from "./interface";
import {
  TableContainer,
  StyledTableRow,
  StyledHeaderCell,
  StyledBodyCell,
} from "./elements";

const statusColorMap: Record<string, "warning" | "success" | "info" | "error" | "default"> = {
  Pending: "warning",
  Confirmed: "info",
  Completed: "success",
  Cancelled: "error",
};

const AppointmentTable: React.FC<AppointmentTableProps> = ({
  appointments,
  onRowClick,
}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledHeaderCell>Patient Name</StyledHeaderCell>
            <StyledHeaderCell>Assigned Doctor</StyledHeaderCell>
            <StyledHeaderCell>Date</StyledHeaderCell>
            <StyledHeaderCell>Time</StyledHeaderCell>
            <StyledHeaderCell>Status</StyledHeaderCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appt) => (
            <StyledTableRow key={appt.id} onClick={() => onRowClick(appt)}>
              <StyledBodyCell>{appt.patientName}</StyledBodyCell>
              <StyledBodyCell>{appt.assignedDoctor}</StyledBodyCell>
              <StyledBodyCell>{appt.date}</StyledBodyCell>
              <StyledBodyCell>{appt.time}</StyledBodyCell>
              <StyledBodyCell>
                <Chip
                  label={appt.status}
                  color={statusColorMap[appt.status] || "default"}
                  size="small"
                />
              </StyledBodyCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AppointmentTable;
