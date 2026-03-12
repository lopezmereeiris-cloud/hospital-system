"use client";

import React, { useState } from "react";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Chip from "@mui/material/Chip";
import { alpha } from "@mui/material/styles";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import DashboardCard from "@/components/DashboardCard";
import BeneficiaryTable from "@/components/BeneficiaryTable";
import { Beneficiary } from "@/components/BeneficiaryTable/interface";
import yakapData from "@/json/yakap.json";

/* PhilHealth-inspired palette */
const PH = {
  green: "#0D8A3F",
  greenLight: "#14A44D",
  blue: "#0066B2",
  yellow: "#FFC107",
};

export default function YakapPage() {
  const beneficiaries = yakapData as Beneficiary[];
  const active = beneficiaries.filter((b) => b.status === "Active").length;
  const totalUsed = beneficiaries.reduce((s, b) => s + b.benefitUsed, 0);
  const totalBalance = beneficiaries.reduce((s, b) => s + b.benefitBalance, 0);
  const lowBalance = beneficiaries.filter(
    (b) => b.benefitBalance > 0 && b.benefitBalance <= 3000
  ).length;
  const depleted = beneficiaries.filter((b) => b.benefitBalance === 0).length;

  const [search, setSearch] = useState("");

  const filtered = beneficiaries.filter((b) => {
    if (!search) return true;
    const q = search.toLowerCase();
    const fullName = `${b.firstName} ${b.middleName} ${b.lastName}`.toLowerCase();
    return (
      fullName.includes(q) ||
      b.id.toLowerCase().includes(q) ||
      b.philhealthNumber.toLowerCase().includes(q)
    );
  });

  return (
    <Box sx={{ maxWidth: 1440, mx: "auto" }}>
      {/* ── Header Row ── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
          flexWrap: "wrap",
          gap: 1.5,
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              margin: "0 0 4px 0",
              color: "#1A1D1F",
            }}
          >
            YAKAP Program
          </h2>
          <p style={{ fontSize: "0.85rem", color: "#6F767E", margin: 0 }}>
            PhilHealth beneficiary management — ₱20,000 annual medicine benefit
          </p>
        </div>
        <Link href="/yakap/register" style={{ textDecoration: "none" }}>
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
              color: "#FFFFFF",
              background: `linear-gradient(135deg, ${PH.green} 0%, ${PH.greenLight} 100%)`,
              transition: "all 0.2s ease",
              "&:hover": {
                background: `linear-gradient(135deg, #0B7735 0%, ${PH.green} 100%)`,
                transform: "translateY(-1px)",
                boxShadow: `0 4px 12px ${alpha(PH.green, 0.3)}`,
              },
            }}
          >
            <PersonAddRoundedIcon sx={{ fontSize: 20 }} />
            Register Beneficiary
          </Box>
        </Link>
      </Box>

      {/* ── Stat Cards ── */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 6, sm: 4, lg: 2.4 }}>
          <DashboardCard
            title="Total Beneficiaries"
            value={beneficiaries.length}
            subtitle={`${active} active`}
            icon={<GroupsRoundedIcon />}
            color={PH.green}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 4, lg: 2.4 }}>
          <DashboardCard
            title="Active"
            value={active}
            icon={<VolunteerActivismRoundedIcon />}
            color={PH.blue}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 4, lg: 2.4 }}>
          <DashboardCard
            title="Total Disbursed"
            value={`₱${totalUsed.toLocaleString()}`}
            icon={<AccountBalanceWalletRoundedIcon />}
            color={PH.greenLight}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 4, lg: 2.4 }}>
          <DashboardCard
            title="Low Balance"
            value={lowBalance}
            subtitle="≤ ₱3,000 remaining"
            icon={<WarningAmberRoundedIcon />}
            color="#F79009"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4, lg: 2.4 }}>
          <DashboardCard
            title="Remaining Funds"
            value={`₱${totalBalance.toLocaleString()}`}
            subtitle={`${depleted} depleted`}
            icon={<AccountBalanceWalletRoundedIcon />}
            color={PH.yellow}
          />
        </Grid>
      </Grid>

      {/* ── Toolbar ── */}
      <Paper
        sx={{
          p: "12px 16px",
          mb: 2.5,
          borderRadius: "12px",
          border: "1px solid #EAECF0",
          boxShadow: "none",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              bgcolor: "#F9FAFB",
              borderRadius: "8px",
              border: "1px solid #EAECF0",
              px: 1.5,
              py: 0.25,
              transition: "border-color 0.2s",
              "&:focus-within": { borderColor: PH.green },
            }}
          >
            <SearchRoundedIcon sx={{ color: "#98A2B3", fontSize: 20, mr: 1 }} />
            <InputBase
              placeholder="Search beneficiaries by name, ID, or PhilHealth #…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ flex: 1, fontSize: 14, fontWeight: 500, color: "#344054" }}
              inputProps={{ "aria-label": "search beneficiaries" }}
            />
          </Box>
          <Chip
            label={`${filtered.length} result${filtered.length !== 1 ? "s" : ""}`}
            size="small"
            sx={{
              bgcolor: alpha(PH.green, 0.08),
              color: PH.green,
              fontWeight: 600,
              fontSize: "0.75rem",
            }}
          />
        </Box>
      </Paper>

      {/* ── Beneficiary Table ── */}
      <BeneficiaryTable beneficiaries={filtered} />
    </Box>
  );
}
