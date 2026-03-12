"use client";

import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import DashboardCard from "@/components/DashboardCard";

/* PhilHealth-inspired green palette for YAKAP */
const PH = {
  green: "#0D8A3F",
  greenLight: "#14A44D",
  blue: "#0066B2",
  accent: "#009B4D",
};

export default function YakapPage() {
  return (
    <div>
      {/* Welcome */}
      <div style={{ marginBottom: 28 }}>
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
        <p style={{ fontSize: "0.88rem", color: "#6F767E", margin: 0 }}>
          Universal Health Care benefit monitoring and management.
        </p>
      </div>

      {/* Stat Cards */}
      <Grid container spacing={2.5} sx={{ mb: 3.5 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DashboardCard
            title="Total Beneficiaries"
            value="3,248"
            subtitle="+12% this quarter"
            icon={<GroupsRoundedIcon />}
            color={PH.green}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DashboardCard
            title="Active Claims"
            value="164"
            subtitle="24 pending review"
            icon={<VolunteerActivismRoundedIcon />}
            color={PH.blue}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DashboardCard
            title="Consultations"
            value="892"
            subtitle="This month"
            icon={<HealthAndSafetyRoundedIcon />}
            color={PH.greenLight}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DashboardCard
            title="Resolved"
            value="728"
            subtitle="81.6% resolution rate"
            icon={<AssignmentTurnedInRoundedIcon />}
            color={PH.accent}
          />
        </Grid>
      </Grid>

      {/* Placeholder content card */}
      <Card sx={{ p: 4, textAlign: "center" }}>
        <div style={{ marginBottom: 12 }}>
          <VolunteerActivismRoundedIcon
            sx={{ fontSize: 48, color: PH.green, opacity: 0.4 }}
          />
        </div>
        <div
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "#1A1D1F",
            marginBottom: 4,
          }}
        >
          YAKAP Module Coming Soon
        </div>
        <div style={{ fontSize: "0.85rem", color: "#6F767E", marginBottom: 16 }}>
          PhilHealth Universal Health Care benefit management, claim tracking, and
          beneficiary records will be available here.
        </div>
        <Chip
          label="Under Development"
          size="small"
          sx={{
            bgcolor: `rgba(13, 138, 63, 0.08)`,
            color: PH.green,
            fontWeight: 600,
            fontSize: "0.75rem",
          }}
        />
      </Card>
    </div>
  );
}
