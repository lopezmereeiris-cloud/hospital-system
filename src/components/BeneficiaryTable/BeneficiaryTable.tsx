"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import TableSortLabel from "@mui/material/TableSortLabel";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import PremiumFilter from "@/components/PremiumFilter";
import { BeneficiaryTableProps, Beneficiary } from "./interface";
import { palette } from "@/theme/palette";
import {
  BeneficiaryContainer,
  StyledHeaderCell,
  StyledBodyCell,
  StyledRow,
  BeneficiaryToolbar,
} from "./elements";

const PH = {
  green: "#0D8A3F",
};

type StatusFilter = "all" | "Active" | "Inactive" | "low_balance" | "depleted";
type SortKey =
  | "id"
  | "name"
  | "contact"
  | "barangay"
  | "registered"
  | "status"
  | "benefitUsed"
  | "balance";
type SortDirection = "asc" | "desc";

const columns: { key: SortKey; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "contact", label: "Contact" },
  { key: "barangay", label: "Barangay" },
  { key: "registered", label: "Registered" },
  { key: "status", label: "Status" },
  { key: "benefitUsed", label: "Benefit Used" },
  { key: "balance", label: "Balance" },
];

const filterOptions: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
  { value: "low_balance", label: "Low Balance" },
  { value: "depleted", label: "Depleted" },
];

const BeneficiaryTable: React.FC<BeneficiaryTableProps> = ({
  beneficiaries,
  basePath = "/admin/yakap",
}) => {
  const router = useRouter();
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<SortKey>("registered");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const filtered = beneficiaries.filter((b) => {
    if (filter === "Active" || filter === "Inactive") {
      if (b.status !== filter) return false;
    }
    if (filter === "low_balance" && !(b.benefitBalance > 0 && b.benefitBalance <= 3000)) return false;
    if (filter === "depleted" && b.benefitBalance !== 0) return false;

    return true;
  });

  const getSortValue = (beneficiary: Beneficiary, key: SortKey) => {
    if (key === "id") return beneficiary.id;
    if (key === "name") {
      return [beneficiary.firstName, beneficiary.middleName, beneficiary.lastName, beneficiary.suffix]
        .filter(Boolean)
        .join(" ");
    }
    if (key === "contact") return beneficiary.contactNumber;
    if (key === "barangay") return beneficiary.address.barangay;
    if (key === "registered") {
      const timestamp = Date.parse(beneficiary.registrationDate);
      return Number.isNaN(timestamp) ? 0 : timestamp;
    }
    if (key === "status") return beneficiary.status;
    if (key === "benefitUsed") return Number(beneficiary.benefitUsed) || 0;
    if (key === "balance") return Number(beneficiary.benefitBalance) || 0;
    return "";
  };

  const sorted = [...filtered].sort((a, b) => {
    const left = getSortValue(a, sortBy);
    const right = getSortValue(b, sortBy);
    const isNumericSort = sortBy === "registered" || sortBy === "benefitUsed" || sortBy === "balance";

    const result =
      isNumericSort
        ? Number(left) - Number(right)
        : String(left).localeCompare(String(right), undefined, {
            numeric: true,
            sensitivity: "base",
          });

    return sortDirection === "asc" ? result : -result;
  });

  const handleSort = (column: SortKey) => {
    if (sortBy === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }
    setSortBy(column);
    setSortDirection("asc");
  };

  const optionsWithCounts = filterOptions.map((opt) => ({
    ...opt,
    count:
      opt.value === "all"
        ? beneficiaries.length
        : beneficiaries.filter((b) => {
            if (opt.value === "Active" || opt.value === "Inactive") return b.status === opt.value;
            if (opt.value === "low_balance") return b.benefitBalance > 0 && b.benefitBalance <= 3000;
            if (opt.value === "depleted") return b.benefitBalance === 0;
            return false;
          }).length,
  }));

  return (
    <BeneficiaryContainer>
      <BeneficiaryToolbar>
        <div style={{ fontSize: "1rem", fontWeight: 700, color: "text.primary" }}>
          Registered Beneficiaries
        </div>
        <PremiumFilter
          options={optionsWithCounts}
          active={filter}
          onChange={setFilter}
        />
      </BeneficiaryToolbar>

      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <StyledRow>
              {columns.map((column) => (
                <StyledHeaderCell key={column.key} sortDirection={sortBy === column.key ? sortDirection : false}>
                  <TableSortLabel
                    active={sortBy === column.key}
                    direction={sortBy === column.key ? sortDirection : "asc"}
                    onClick={() => handleSort(column.key)}
                    sx={{
                      color: "inherit",
                      "&.Mui-active": { color: "grey.700" },
                      "& .MuiTableSortLabel-icon": { color: "inherit !important" },
                    }}
                  >
                    {column.label}
                  </TableSortLabel>
                </StyledHeaderCell>
              ))}
            </StyledRow>
          </TableHead>
          <TableBody>
            {sorted.map((b) => {
              const usedPct = Math.round((b.benefitUsed / b.annualBenefit) * 100);
              const barColor =
                b.benefitBalance === 0
                  ? palette.error.main
                  : b.benefitBalance <= 3000
                  ? palette.warning.main
                  : PH.green;

              const fullName = [b.firstName, b.middleName, b.lastName, b.suffix]
                .filter(Boolean)
                .join(" ");

              return (
                <StyledRow
                  key={b.id}
                  onClick={() => router.push(`${basePath}/${encodeURIComponent(b.id)}`)}
                  sx={{ cursor: "pointer" }}
                >
                  <StyledBodyCell sx={{ fontWeight: 600, whiteSpace: "nowrap" }}>
                    {b.id}
                  </StyledBodyCell>
                  <StyledBodyCell sx={{ fontWeight: 500, whiteSpace: "nowrap" }}>
                    {fullName}
                  </StyledBodyCell>
                  <StyledBodyCell sx={{ whiteSpace: "nowrap" }}>
                    {b.contactNumber}
                  </StyledBodyCell>
                  <StyledBodyCell>{b.address.barangay}</StyledBodyCell>
                  <StyledBodyCell sx={{ whiteSpace: "nowrap" }}>
                    {b.registrationDate}
                  </StyledBodyCell>
                  <StyledBodyCell>
                    <Chip
                      label={b.status}
                      color={b.status === "Active" ? "success" : "error"}
                      size="small"
                    />
                  </StyledBodyCell>
                  <StyledBodyCell sx={{ minWidth: 140 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <LinearProgress
                        variant="determinate"
                        value={usedPct}
                        sx={{
                          flex: 1,
                          height: 6,
                          borderRadius: 3,
                          bgcolor: "rgba(0,0,0,0.04)",
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 3,
                            bgcolor: barColor,
                          },
                        }}
                      />
                      <span
                        style={{
                          fontSize: "0.68rem",
                          fontWeight: 600,
                          color: "text.secondary",
                          minWidth: 28,
                        }}
                      >
                        {usedPct}%
                      </span>
                    </div>
                  </StyledBodyCell>
                  <StyledBodyCell
                    sx={{
                      fontWeight: 700,
                      color: b.benefitBalance === 0 ? palette.error.main : PH.green,
                      whiteSpace: "nowrap",
                    }}
                  >
                    PHP {b.benefitBalance.toLocaleString()}
                  </StyledBodyCell>
                </StyledRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </BeneficiaryContainer>
  );
};

export default BeneficiaryTable;
