"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import Chip from "@mui/material/Chip";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import { Box } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { palette } from "@/theme/palette";
import { PatientListProps } from "./interface";
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

const PatientList: React.FC<PatientListProps> = ({
  patients,
  basePath = "/admin/registration",
  showRegisterAction = true,
}) => {
  const router = useRouter();

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

        {showRegisterAction && (
          <Link href={`${basePath}/register`} style={{ textDecoration: "none" }}>
            <Box
              component="button"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2.5,
                py: 1.2,
                borderRadius: "10px",
                border: "none",
                fontWeight: 600,
                fontSize: "0.85rem",
                fontFamily: "inherit",
                cursor: "pointer",
                color: palette.background.paper,
                background: "#4361EE",
                transition: "all 0.2s ease",
                "&:hover": {
                  background: "#4361EE",
                  transform: "translateY(-1px)",
                  boxShadow: `0 4px 12px ${alpha(palette.success.main, 0.3)}`,
                },
              }}
            >
              <PersonAddRoundedIcon sx={{ fontSize: 20 }} />
              Register Patient
            </Box>
          </Link>
        )}
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
                onClick={() => router.push(`${basePath}/${encodeURIComponent(patient.patient_id)}`)}
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
    </PatientContainer>
  );
};

export default PatientList;
